
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };
  
  return (
    <>
      <Helmet>
        <title>Shopping Cart | Minimal</title>
        <meta name="description" content="View and manage your shopping cart." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16 min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
              Your Cart
            </span>
            <h1 className="text-3xl md:text-4xl font-medium mb-4">Shopping Cart</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Review and manage your selected items before checkout.
            </p>
          </motion.div>
          
          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center py-16 max-w-md mx-auto"
            >
              <div className="bg-secondary/50 inline-flex items-center justify-center rounded-full p-6 mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-medium mb-3">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link 
                to="/products" 
                className="premium-button inline-flex items-center"
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <AnimatePresence initial={false}>
                  {cart.map(item => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row items-center bg-white border border-border/50 rounded-xl overflow-hidden shadow-sm p-4">
                        <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {item.product.description}
                          </p>
                          <p className="font-medium mt-1">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex flex-row sm:flex-col items-center gap-4 mt-4 sm:mt-0">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 rounded-full border border-border hover:border-primary/50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-10 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 rounded-full border border-border hover:border-primary/50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            aria-label="Remove item"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-6 flex justify-end"
                >
                  <button
                    onClick={clearCart}
                    className="inline-flex items-center text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </button>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-secondary rounded-xl p-6"
              >
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-3 border-b border-border/50 pb-6 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {totalPrice() > 50 ? "Free" : "$10.00"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">
                      ${(totalPrice() * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between mb-8">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-medium">
                    ${(
                      totalPrice() + 
                      (totalPrice() > 50 ? 0 : 10) + 
                      (totalPrice() * 0.1)
                    ).toFixed(2)}
                  </span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="premium-button w-full flex items-center justify-center mb-4"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
                
                <div className="text-xs text-muted-foreground flex items-start">
                  <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0 mt-px" />
                  <p>
                    This is a demo store. No actual purchases will be made. 
                    Your cart will be cleared after "checkout".
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Cart;
