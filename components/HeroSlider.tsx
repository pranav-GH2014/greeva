"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const newArrivals = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1611085583191-a3b15886b1f1?q=80&w=2070&auto=format&fit=crop",
    title: "Golden Adornments",
    subtitle: "New Collection 2026"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
    title: "Minimalist Rings",
    subtitle: "Crafted for Elegance"
  }
];

export default function HeroSlider() {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full"
      >
        {newArrivals.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="relative w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay for better text readability, darker at bottom */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
              
              <div className="relative text-center text-white p-6 max-w-4xl mx-auto flex flex-col items-center justify-center h-full pt-20">
                <p className="uppercase tracking-[0.3em] text-xs md:text-sm mb-4 md:mb-6 font-bold text-gray-300 animate-in slide-in-from-bottom-5 fade-in duration-700">{slide.subtitle}</p>
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tighter animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-150">{slide.title}</h2>
                <Link href="/products" className="bg-white text-black px-10 py-4 rounded-full text-lg font-bold hover:bg-black hover:text-white border-2 border-transparent hover:border-white transition-all transform hover:scale-105 shadow-2xl animate-in fade-in duration-1000 delay-300">
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}