
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore, Product } from '@/lib/store';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products in the same category
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 3);
      setRelatedProducts(related);
      
      // Simulate image loading delay
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else {
      toast.error("Product not found");
      navigate('/products');
    }
  }, [id, products, navigate]);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      // Add to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      // Reset quantity
      setQuantity(1);
    }
  };
  
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{product.name} | Minimal</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              to="/products" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden bg-secondary/30"
            >
              {isLoading ? (
                <div className="aspect-[4/3] w-full flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              ) : (
                <motion.img 
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-auto object-contain aspect-[4/3]"
                />
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-medium mb-4">{product.name}</h1>
              <p className="text-2xl font-medium mb-6">${product.price.toFixed(2)}</p>
              
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-2">Description</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-3">Quantity</h2>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 rounded-full border border-border hover:border-primary/50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="w-16 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 rounded-full border border-border hover:border-primary/50 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="premium-button w-full flex items-center justify-center mb-6"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </button>
              
              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex">
                  <span className="font-medium w-1/3">Availability:</span>
                  <span className="text-green-600">In Stock</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Shipping:</span>
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-1/3">Returns:</span>
                  <span>30-day easy returns</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-medium mb-8">You May Also Like</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((product, index) => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`}
                    className="group block bg-white border border-border/50 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium line-clamp-1">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-1">{product.description}</p>
                      <p className="font-medium">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProductDetail;
