
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Product, useStore } from '@/lib/store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const addToCart = useStore(state => state.addToCart);
  
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      }
    },
    whileHover: { 
      y: -5,
      transition: { duration: 0.2 }
    }
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <motion.div
      {...fadeInUp}
      className="group relative h-full rounded-xl overflow-hidden bg-white border border-border/50 shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative overflow-hidden aspect-[4/3]">
          {isLoading && (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={product.image} 
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsLoading(false)}
          />
          <div className="absolute bottom-0 left-0 w-full p-2">
            <div className="inline-block px-2 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm rounded-full">
              {product.category}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="font-medium text-lg">
              ${product.price.toFixed(2)}
            </span>
            
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center p-2 rounded-full bg-primary text-primary-foreground shadow-sm hover:shadow transition-all duration-200"
              aria-label="Add to cart"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
