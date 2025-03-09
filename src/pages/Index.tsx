
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';

const Index = () => {
  const products = useStore(state => state.products);
  
  return (
    <>
      <Helmet>
        <title>Minimal - Premium Products</title>
        <meta name="description" content="Discover our collection of premium quality products with minimalist design." />
      </Helmet>
      
      <Navbar />
      
      <main>
        <Hero />
        <FeaturedProducts />
        
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-16 bg-secondary"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-medium mb-4">The Minimal Difference</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our commitment to quality, design, and customer satisfaction sets us apart.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Premium Quality",
                  description: "We use only the finest materials and craftsmanship in every product we create."
                },
                {
                  title: "Timeless Design",
                  description: "Our designs are clean, minimalist, and made to stand the test of time."
                },
                {
                  title: "Exceptional Service",
                  description: "We're committed to providing an outstanding experience from start to finish."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-background rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-medium mb-4">What Our Customers Say</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Morgan",
                  quote: "The quality of their products is outstanding. Everything is beautifully designed and built to last."
                },
                {
                  name: "Jamie Chen",
                  quote: "Minimal's attention to detail is impressive. I've never been disappointed with any of my purchases."
                },
                {
                  name: "Sam Taylor",
                  quote: "Not only are the products amazing, but their customer service is exceptional. Always responsive and helpful."
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-secondary/50 rounded-xl p-6"
                >
                  <p className="text-foreground italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-medium">{testimonial.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
