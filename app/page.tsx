"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import { createClient } from '@/utils/supabase/client';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { name: 'All', image: '/images/hero_bg.png' },
    { name: 'Bangles', image: '/images/gold_bangles.png' },
    { name: 'Handcrafted', image: '/images/gold_ring.png' },
    { name: 'Necklaces', image: '/images/model_earrings.png' },
    { name: 'Rings', image: '/images/jewelry_box.png' }
  ];

  useEffect(() => {
    async function fetchTrendingProducts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setTrendingProducts(data);
        } else {
          setTrendingProducts([
            { id: '1', name: "Midnight Onyx Ring", price: 4500, category: "Rings", image: "/images/gold_ring.png" },
            { id: '2', name: "Pearl Drop Earrings", price: 22000, category: "Handcrafted", image: "/images/model_earrings.png" },
            { id: '3', name: "Minimalist Gold Chain", price: 8900, category: "Necklaces", image: "/images/hero_bg.png" },
            { id: '4', name: "Vintage Polki Bangles", price: 5200, category: "Bangles", image: "/images/gold_bangles.png" },
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
    ? trendingProducts.slice(0, 4)
    : trendingProducts.filter(p => p.category === activeCategory).slice(0, 4);

  const bentoCollections = [
    { 
      title: "The Signature Gold Collection", 
      subtitle: "Timeless Elegance", 
      image: "/images/jewelry_box.png",
      colSpan: "md:col-span-2 md:row-span-2",
      height: "h-[450px] md:h-[700px]"
    },
    { 
      title: "Precious Stones", 
      subtitle: "Natural Radiance", 
      image: "/images/gold_bangles.png",
      colSpan: "md:col-span-1 md:row-span-1",
      height: "h-[300px] md:h-[338px]"
    },
    { 
      title: "Statement Adornments", 
      subtitle: "Bold Authenticity", 
      image: "/images/gold_ring.png",
      colSpan: "md:col-span-1 md:row-span-1",
      height: "h-[300px] md:h-[338px]"
    }
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24 font-sans selection:bg-[#B8860B] selection:text-white">
      {/* 1. Hero Section */}
      <section className="w-full relative z-0">
        <HeroSection />
      </section>

      {/* INFINITE MARQUEE */}
      <div className="w-full overflow-hidden bg-black text-white py-4 flex relative z-20 shadow-2xl border-t border-white/10">
        <div className="whitespace-nowrap flex animate-[marquee_25s_linear_infinite] group hover:[animation-play-state:paused]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-16 px-8 items-center flex-shrink-0 text-sm font-semibold tracking-[0.2em] uppercase text-gray-300">
              <span className="flex items-center gap-3">
                <span className="text-[#B8860B]">✦</span> Fine Craftsmanship
              </span>
              <span className="flex items-center gap-3">
                <span className="text-[#B8860B]">✦</span> Secure Delivery
              </span>
              <span className="flex items-center gap-3">
                <span className="text-[#B8860B]">✦</span> Certified Purity
              </span>
              <span className="flex items-center gap-3">
                <span className="text-[#B8860B]">✦</span> Signature Packaging
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Welcome & Action Section (Editorial Layout) */}
      <section className="relative px-6 lg:px-12 py-32 md:py-48 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="md:w-1/2 animate-fade-in-up">
          <p className="uppercase tracking-[0.3em] text-sm font-bold text-[#B8860B] mb-6 border-l-2 border-[#B8860B] pl-4">Discover Greeva</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9] mb-8 text-balance">
            Wear Your <br /> Narrative.
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-600 font-light text-balance mb-10">
            From heirloom bangles to minimalist modern rings. We blend ancestral artistry with contemporary luxury to adorn your everyday moments.
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center justify-center gap-4 border border-black px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-500 hover:bg-black hover:text-white hover:shadow-xl hover:border-black"
          >
            Explore Masterpieces
            <span className="w-8 h-[1px] bg-black group-hover:bg-[#B8860B] transition-colors duration-500"></span>
          </Link>
        </div>
        <div className="md:w-1/2 w-full grid grid-cols-2 gap-4 animate-fade-in-up delay-200">
          <img src="/images/model_earrings.png" alt="Jewelry Model" className="w-full h-[300px] md:h-[450px] object-cover rounded-tr-[4rem] rounded-bl-[4rem] shadow-2xl" />
          <img src="/images/jewelry_box.png" alt="Jewelry Box" className="w-full h-[300px] md:h-[450px] object-cover rounded-tl-[4rem] rounded-br-[4rem] shadow-2xl mt-12" />
        </div>
      </section>

      {/* 3. Trending Now Grid */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-0 w-1/3 h-[600px] bg-gradient-to-bl from-[#B8860B]/5 to-transparent rounded-full blur-[120px] -z-10 absolute pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 animate-fade-in-up">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 mb-4">Trending Pieces</h2>
            <p className="text-gray-500 text-lg font-light">The jewelry pieces our clients are cherishing this season.</p>
          </div>
          
          {/* Glassmorphic Category Toggles */}
          <div className="flex flex-wrap gap-3 bg-white/50 backdrop-blur-xl p-2 rounded-3xl shadow-sm border border-gray-100">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-6 py-2.5 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 ${
                  activeCategory === category.name 
                    ? 'bg-black text-[#B8860B] shadow-lg scale-105' 
                    : 'text-gray-500 hover:text-black hover:bg-white/80'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
             <div className="w-12 h-12 border-4 border-gray-200 border-t-[#B8860B] rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <Link href="/products" key={product.id} className={`group cursor-pointer animate-fade-in-up delay-${(index % 4) * 100}`}>
                <div className="relative overflow-hidden rounded-[2rem] bg-white aspect-[4/5] shadow-sm mb-6 transition-all duration-500 group-hover:shadow-2xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition duration-700 ease-out group-hover:scale-110"
                  />
                  
                  {/* Sleek Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-black">
                    {product.category}
                  </div>

                  {/* Quick view button on hover */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out w-11/12">
                    <div className="bg-black text-[#B8860B] text-center py-3 rounded-xl text-sm font-bold uppercase tracking-wider shadow-lg">
                      View Details
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-[#B8860B] font-bold">₹{typeof product.price === 'number' ? product.price.toLocaleString('en-IN') : product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-gray-100 animate-fade-in-up">
            <p className="text-gray-500 text-xl font-light">No pieces currently trending in {activeCategory}.</p>
            <button 
              onClick={() => setActiveCategory('All')}
              className="mt-6 text-[#B8860B] font-bold uppercase tracking-widest text-sm border-b-2 border-[#B8860B] pb-1 hover:text-black hover:border-black transition-colors"
            >
              Back to All
            </button>
          </div>
        )}
      </section>

      {/* 4. Bento Box Collections */}
      <section className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 text-center animate-fade-in-up">
          <p className="uppercase tracking-[0.3em] text-sm font-bold text-[#B8860B] mb-4">Curated Visions</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-gray-900 mb-6 text-balance">The Editorial <br/> Collection</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {bentoCollections.map((collection, index) => (
            <Link 
              href="/products" 
              key={index} 
              className={`relative rounded-[2rem] overflow-hidden group block animate-fade-in-up delay-${index * 200} ${collection.colSpan} ${collection.height}`}
            >
              <img 
                src={collection.image} 
                className="w-full h-full object-cover transition duration-[1.5s] ease-out transform group-hover:scale-105"
                alt={collection.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-700 opacity-60 group-hover:opacity-80"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="inline-block px-4 py-1.5 bg-[#B8860B]/80 backdrop-blur-xl border border-[#B8860B]/20 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white uppercase mb-4">
                    {collection.subtitle}
                  </span>
                  <h3 className={`font-black text-white mb-4 leading-[1.1] ${index === 0 ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'}`}>
                    {collection.title}
                  </h3>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-3 text-white/90 text-sm font-bold uppercase tracking-widest transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100 border-b border-white/30 inline-flex pb-1">
                      Shop the Look
                      <svg className="w-4 h-4 text-[#B8860B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* 5. Brand Promise */}
      <section className="mt-16 pt-32 pb-24 px-6 text-center max-w-4xl mx-auto border-t border-gray-200">
        <div className="w-16 h-16 bg-[#B8860B] text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-[#B8860B]/20">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 tracking-tighter text-balance">The Signature of Quality</h2>
        <p className="text-gray-500 text-xl md:text-2xl leading-relaxed font-light text-balance mb-12 max-w-3xl mx-auto">
          We reject fast fashion and thoughtless adornments. Every piece of jewelry at Greeva is vetted for endurance, crafted with intention, and designed to radiate elegance.
        </p>
      </section>
    </div>
  );
}