
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | Minimal</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="max-w-md mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
              Error 404
            </span>
            <h1 className="text-4xl md:text-5xl font-medium mb-4">Page Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <Link 
              to="/" 
              className="premium-button inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return to Home
            </Link>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NotFound;
