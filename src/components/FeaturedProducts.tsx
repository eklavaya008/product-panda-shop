
import { useStore, Product } from '@/lib/store';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const FeaturedProducts = () => {
  const products = useStore(state => state.products);
  const featuredProducts = products.filter(product => product.featured);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
            Featured Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Our Premium Selection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated collection of premium products designed to elevate your everyday experience.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {featuredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
