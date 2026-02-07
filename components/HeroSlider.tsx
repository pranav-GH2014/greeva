"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
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
    <div className="w-full h-[500px] lg:h-[600px]">
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
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30" />
              
              <div className="relative text-center text-white p-6">
                <p className="uppercase tracking-[0.2em] text-sm mb-4">{slide.subtitle}</p>
                <h2 className="text-4xl md:text-6xl font-bold mb-8">{slide.title}</h2>
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}