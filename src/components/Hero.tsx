
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0"
          >
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-6">
              Premium Quality
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
              Designed for <br/>
              <span className="text-primary">Perfection</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Experience innovation and elegance with our collection of premium products designed to elevate your everyday life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="premium-button flex items-center justify-center"
              >
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/cart" 
                className="px-6 py-3 rounded-full border border-border hover:border-primary/50 transition-colors duration-300 flex items-center justify-center"
              >
                View Cart
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80" 
                alt="Premium Laptop"
                className="w-full h-auto"
              />
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute -top-10 -right-10 w-60 h-60 bg-secondary/20 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
