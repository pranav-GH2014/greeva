"use client";

import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ProductsPage() {
  const { cartItems, addToCart } = useCart();
  const selectedItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const categories = ['All', 'Bangles', 'Handcrafted', 'Necklaces', 'Rings'];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // Fallback if DB is empty for demo purposes
          setProducts(Array.from({ length: 12 }).map((_, i) => {
            const catOptions = ['Bangles', 'Handcrafted', 'Necklaces', 'Rings'];
            const localImages = ['/images/gold_bangles.png', '/images/gold_ring.png', '/images/model_earrings.png', '/images/jewelry_box.png', '/images/hero_bg.png'];
            return {
              id: `demo-${i}`,
              name: `Signature ${catOptions[i % catOptions.length]} Piece`,
              price: 1500 + Math.floor(Math.random() * 5000),
              image: localImages[i % localImages.length],
              category: catOptions[i % catOptions.length]
            };
          }));
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleSelectItem = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4 tracking-tighter">Our Collection</h1>
            <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
              Discover our exclusive range of {filteredProducts.length} meticulously curated products. Every piece is crafted with care and designed to elevate your style.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 w-full md:w-auto scrollbar-hide gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-black hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                onSelect={() => handleSelectItem(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg">No products found in the "{activeCategory}" category.</p>
            <button 
              onClick={() => setActiveCategory('All')}
              className="mt-4 text-black font-bold border-b border-black pb-1 hover:text-gray-600 transition"
            >
              View All Products
            </button>
          </div>
        )}
      </div>

      {/* Floating Checkout Bar */}
      {selectedItemsCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50 pointer-events-none flex justify-center animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-white px-6 py-4 rounded-full shadow-2xl border border-gray-100 flex items-center gap-6 pointer-events-auto max-w-lg w-full justify-between backdrop-blur-md bg-white/90">
            <div className="flex items-center gap-3">
              <div className="bg-black/5 text-black rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {selectedItemsCount}
              </div>
              <span className="font-semibold text-gray-900 hidden sm:inline">Items Selected</span>
            </div>
            
            <Link 
              href="/cart"
              className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2"
            >
              Checkout Now
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
