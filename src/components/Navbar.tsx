
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const totalItems = useStore(state => state.totalItems);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-medium tracking-tighter"
            >
              Minimal
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                location.pathname === "/" 
                  ? "text-primary" 
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                location.pathname.includes("/products") 
                  ? "text-primary" 
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              Products
            </Link>
            <Link 
              to="/cart" 
              className="relative text-foreground/80 hover:text-foreground transition-colors duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems()}
                </span>
              )}
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground/80 hover:text-foreground focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden absolute w-full bg-background/95 backdrop-blur-md shadow-md transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-64 border-b" : "max-h-0 overflow-hidden"
        )}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
          <Link 
            to="/"
            className={cn(
              "block py-3 text-base font-medium transition-colors duration-200",
              location.pathname === "/" 
                ? "text-primary" 
                : "text-foreground/80 hover:text-foreground"
            )}
          >
            Home
          </Link>
          <Link 
            to="/products"
            className={cn(
              "block py-3 text-base font-medium transition-colors duration-200",
              location.pathname.includes("/products") 
                ? "text-primary" 
                : "text-foreground/80 hover:text-foreground"
            )}
          >
            Products
          </Link>
          <Link 
            to="/cart"
            className="flex items-center py-3 text-base font-medium text-foreground/80 hover:text-foreground transition-colors duration-200"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Cart
            {totalItems() > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {totalItems()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
