"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import { createClient } from '@/utils/supabase/client';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { name: 'All', image: 'https://picsum.photos/seed/catAll/200/200' },
    { name: 'Bangles', image: 'https://picsum.photos/seed/catBangles/200/200' },
    { name: 'Handmade', image: 'https://picsum.photos/seed/catHand/200/200' },
    { name: 'Home Decor', image: 'https://picsum.photos/seed/catDecor/200/200' },
    { name: 'Art', image: 'https://picsum.photos/seed/catArt/200/200' }
  ];

  useEffect(() => {
    async function fetchTrendingProducts() {
      try {
        const supabase = createClient();
        // Fetch the newest 8 items for the homepage "Trending" section
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setTrendingProducts(data);
        } else {
          // Fallback if DB is empty for demo purposes
          setTrendingProducts([
            { id: '1', name: "Midnight Onyx Vase", price: 4500, category: "Home Decor", image: "https://picsum.photos/seed/trend1/600/600" },
            { id: '2', name: "Velvet Accent Chair", price: 22000, category: "Home Decor", image: "https://picsum.photos/seed/trend2/600/600" },
            { id: '3', name: "Abstract Canvas Art", price: 8900, category: "Art", image: "https://picsum.photos/seed/trend3/600/600" },
            { id: '4', name: "Gold Plated Bangles", price: 5200, category: "Bangles", image: "https://picsum.photos/seed/trend4/600/600" },
          ]);
        }
      } catch (err) {
        console.error('Error fetching trending products:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchTrendingProducts();
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? trendingProducts.slice(0, 4) // Show first 4 on 'All'
    : trendingProducts.filter(p => p.category === activeCategory).slice(0, 4);

  const bentoCollections = [
    { 
      title: "The Minimalist Edition", 
      subtitle: "Clean Lines", 
      image: "https://picsum.photos/seed/bento1/1200/1000",
      colSpan: "md:col-span-2 md:row-span-2",
      height: "h-[400px] md:h-full"
    },
    { 
      title: "Organic Textures", 
      subtitle: "Nature Inspired", 
      image: "https://picsum.photos/seed/bento2/800/800",
      colSpan: "md:col-span-1 md:row-span-1",
      height: "h-[300px] md:h-[350px]"
    },
    { 
      title: "Bold Accents", 
      subtitle: "Make a Statement", 
      image: "https://picsum.photos/seed/bento3/800/800",
      colSpan: "md:col-span-1 md:row-span-1",
      height: "h-[300px] md:h-[350px]"
    }
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24">
      {/* 1. Hero Slider Section */}
      <section className="w-full relative shadow-2xl">
        <HeroSlider />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent h-full w-full"></div>
      </section>

      {/* INFINITE MARQUEE (Social Proof / Benefits) */}
      <div className="w-full overflow-hidden bg-black text-white py-3 border-y border-white/10 flex relative z-20 shadow-xl">
        <div className="whitespace-nowrap flex animate-[marquee_20s_linear_infinite] group hover:[animation-play-state:paused]">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-12 px-6 items-center flex-shrink-0 text-sm md:text-base font-bold tracking-widest uppercase">
              <span className="flex items-center gap-2">
                <span className="text-[#B8860B]">✦</span> Free Shipping Worldwide
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#B8860B]">✦</span> 100% Handcrafted
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#B8860B]">✦</span> 30-Day Returns
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#B8860B]">✦</span> Premium Quality Materials
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Welcome & Action Section */}
      <section className="relative px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gray-900 leading-tight mb-8">
          Elevate Your Space with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">Greeva</span>
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-2xl font-light">
          Minimalist adornments for the modern world. Experience the perfect intersection of generational craftsmanship and contemporary curation.
        </p>
        
        {/* ACTION BUTTONS */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/products"
            className="rounded-full bg-black px-10 py-4 text-base font-bold text-white shadow-xl hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-1 transition duration-300 w-full sm:w-auto min-w-[200px]"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* 3. Trending Now Grid with Filters */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Trending Now</h2>
            <p className="text-gray-500 font-light">The pieces everyone is talking about this week.</p>
          </div>
          
          {/* Category Filters (Visual Bubbles) */}
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 w-full scrollbar-hide gap-6 md:gap-8 justify-start md:justify-end items-center">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className="flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1 group flex-shrink-0"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full p-1 transition-all duration-300 ${
                  activeCategory === category.name 
                    ? 'bg-gradient-to-tr from-black to-gray-500 scale-110 shadow-lg' 
                    : 'bg-transparent border-2 border-transparent group-hover:border-gray-200'
                }`}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <span className={`text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category.name 
                    ? 'font-extrabold text-black scale-105' 
                    : 'font-medium text-gray-500 group-hover:text-black'
                }`}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link href="/products" key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square shadow-sm mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge overlay */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-gray-800">
                    {product.category}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-600 transition">{product.name}</h3>
                  <p className="text-gray-500">₹{typeof product.price === 'number' ? product.price.toLocaleString('en-IN') : product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-gray-500 text-lg">No items currently trending in {activeCategory}.</p>
            <button 
              onClick={() => setActiveCategory('All')}
              className="mt-4 text-black font-bold border-b border-black pb-1 hover:text-gray-600 transition"
            >
              View All Trends
            </button>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/products" className="inline-block text-sm font-bold uppercase tracking-wider text-black border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition">
            View All Trends
          </Link>
        </div>
      </section>

      {/* 4. Bento Box Collections */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Curated Aesthetics</h2>
          <p className="text-gray-500 max-w-2xl text-lg">Discover pieces uniquely chosen to elevate specific styles.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 md:h-[724px]">
          {bentoCollections.map((collection, index) => (
            <Link 
              href="/products" 
              key={index} 
              className={`relative rounded-3xl overflow-hidden group block ${collection.colSpan} ${collection.height}`}
            >
              <img 
                src={collection.image} 
                className="w-full h-full object-cover transition duration-1000 transform group-hover:scale-105"
                alt={collection.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 transition-opacity duration-500 group-hover:opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end h-full">
                <span className="inline-block w-fit px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest text-white uppercase mb-3 border border-white/30">
                  {collection.subtitle}
                </span>
                <h3 className={`font-extrabold text-white mb-2 leading-tight ${index === 0 ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                  {collection.title}
                </h3>
                <div className="overflow-hidden">
                  <p className="text-white/80 font-medium transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2">
                    Shop Collection <span>→</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* 5. Brand Promise */}
      <section className="border-t border-gray-200 mt-12 pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
        <svg className="w-12 h-12 mx-auto text-black mb-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 font-serif italic">Exceptional Craftsmanship</h2>
        <p className="text-gray-500 text-lg leading-relaxed font-light">
          We don't believe in fast furniture or disposable decor. Every piece on Greeva is vetted for quality, durability, and timeless aesthetic appeal. When you buy from us, you're investing in your environment.
        </p>
      </section>
    </div>
  );
}