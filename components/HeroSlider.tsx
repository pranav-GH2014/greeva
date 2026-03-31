"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const newArrivals = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1611085583191-a3b15886b1f1?q=80&w=2070&auto=format&fit=crop",
    title: "Golden Adornments",
    subtitle: "New Collection 2026",
    description: "Discover pieces that redefine elegance and sophistication."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
    title: "Minimalist Rings",
    subtitle: "Crafted for Elegance",
    description: "Subtle statements for the modern aesthetic."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1629824209355-081446700c28?q=80&w=2070&auto=format&fit=crop",
    title: "Handcrafted Decor",
    subtitle: "Artisanal Excellence",
    description: "Bring the touch of masterful craftsmanship to your space."
  }
];

export default function HeroSlider() {
  return (
    <div className="w-full h-[85vh] min-h-[600px] relative group">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true, 
          renderBullet: function (index, className) {
            return '<span class="' + className + ' bg-white/50 hover:bg-white transition-all duration-300 w-12 h-1 rounded-full"></span>';
          }
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="h-full w-full"
      >
        {newArrivals.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div 
                className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center"
              >
                {/* Background Image with slow zoom effect when active */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out ${isActive ? 'scale-110' : 'scale-100'}`}
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                
                {/* Refined Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[#FAF9F6]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
                
                {/* Content Container */}
                <div className="relative z-10 text-center text-white px-6 w-full max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-20">
                  <div className={`overflow-hidden mb-6 ${isActive ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <p className="uppercase tracking-[0.4em] text-xs md:text-sm font-bold text-gray-300">
                      — {slide.subtitle} —
                    </p>
                  </div>
                  
                  <h2 className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-[0.9] tracking-tighter text-balance drop-shadow-2xl ${isActive ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
                    {slide.title}
                  </h2>
                  
                  <p className={`text-lg md:text-xl text-gray-200 font-light max-w-2xl mb-12 drop-shadow-md ${isActive ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
                    {slide.description}
                  </p>
                  
                  <div className={`${isActive ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
                    <Link href="/products" className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-black bg-white rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]">
                      <span className="relative z-10 flex items-center gap-2">
                        Explore Collection
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gray-100 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Decorative Bottom Fade matching the app background */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAF9F6] to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}