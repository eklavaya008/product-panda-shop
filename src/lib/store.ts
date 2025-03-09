
import { create } from 'zustand';
import { toast } from 'sonner';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

// Sample product data
const productData: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Earbuds",
    description: "Experience crystal-clear sound with our premium wireless earbuds. Featuring active noise cancellation, touch controls, and up to 24 hours of battery life with the charging case.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    category: "Audio",
    featured: true
  },
  {
    id: "2",
    name: "Minimalist Smart Watch",
    description: "A sleek, minimalist smartwatch with health tracking, notifications, and a beautiful OLED display. Water-resistant and includes a premium leather band.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    category: "Wearables",
    featured: true
  },
  {
    id: "3",
    name: "Ultra-Thin Laptop",
    description: "Our thinnest laptop ever, featuring a stunning 4K display, all-day battery life, and powerful performance in an impossibly thin design.",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    category: "Computers",
    featured: true
  },
  {
    id: "4",
    name: "Professional Camera",
    description: "Capture stunning photos and videos with our professional-grade camera. Features a full-frame sensor, 4K video recording, and advanced autofocus system.",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    category: "Photography"
  },
  {
    id: "5",
    name: "Smart Home Speaker",
    description: "A beautiful smart speaker with premium sound quality and intelligent voice assistant. Controls your smart home and plays your favorite music.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1589491104513-3471a4e4cf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    category: "Smart Home"
  },
  {
    id: "6",
    name: "Noise-Cancelling Headphones",
    description: "Premium over-ear headphones with industry-leading noise cancellation, exceptional sound quality, and up to 30 hours of battery life.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    category: "Audio"
  },
  {
    id: "7",
    name: "Portable Power Bank",
    description: "A slim, high-capacity power bank with fast charging capabilities. Charges multiple devices simultaneously and fits in your pocket.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1585336261176-3e408a56cc18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    category: "Accessories"
  },
  {
    id: "8",
    name: "Wireless Charging Pad",
    description: "Elegantly designed wireless charging pad compatible with all Qi-enabled devices. Features fast charging and a minimalist design.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1600490036275-35f5f1656861?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    category: "Accessories"
  }
];

export const useStore = create<StoreState>((set, get) => ({
  products: productData,
  cart: [],
  
  addToCart: (product: Product) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      const updatedCart = cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      set({ cart: updatedCart });
      toast.success(`Added another ${product.name} to cart`);
    } else {
      set({ cart: [...cart, { product, quantity: 1 }] });
      toast.success(`${product.name} added to cart`);
    }
  },
  
  removeFromCart: (productId: string) => {
    const { cart } = get();
    const updatedCart = cart.filter(item => item.product.id !== productId);
    set({ cart: updatedCart });
    toast.info("Item removed from cart");
  },
  
  updateQuantity: (productId: string, quantity: number) => {
    const { cart } = get();
    
    if (quantity <= 0) {
      // Remove the item if quantity is 0 or negative
      get().removeFromCart(productId);
      return;
    }
    
    const updatedCart = cart.map(item => 
      item.product.id === productId 
        ? { ...item, quantity } 
        : item
    );
    
    set({ cart: updatedCart });
  },
  
  clearCart: () => {
    set({ cart: [] });
    toast.info("Cart cleared");
  },
  
  totalItems: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
  
  totalPrice: () => {
    const { cart } = get();
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity, 
      0
    );
  }
}));
