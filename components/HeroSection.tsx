import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#FAF9F6]">
      {/* Background with slight zoom animation */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-image-zoom opacity-30"
        style={{ backgroundImage: 'url(/images/hero_bg.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12">
        
        {/* Typographic Left Side */}
        <div className="md:w-3/5 pt-20">
          <div className="overflow-hidden mb-6">
            <p className="uppercase tracking-[0.4em] text-xs md:text-sm font-bold text-gray-500 animate-fade-in-up">
              — Fine Jewelry
            </p>
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black text-gray-900 leading-[0.85] tracking-tighter text-balance mb-8 animate-fade-in-up delay-200">
            Adorn <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] to-gray-400">Your Elegance.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-lg mb-12 animate-fade-in-up delay-400">
            Discover a curated collection of handcrafted adornments, designed to capture the essence of minimalist luxury and timeless beauty.
          </p>
          
          <div className="flex flex-wrap gap-6 items-center animate-fade-in-up delay-500">
            <Link href="/products" className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white bg-black rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-2xl">
              <span className="relative z-10 flex items-center gap-2">
                Shop the Collection
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gray-800 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
            </Link>
            
            <Link href="/about" className="text-sm font-bold uppercase tracking-widest text-[#B8860B] border-b-2 border-[#B8860B] pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
              Our Craft
            </Link>
          </div>
        </div>

        {/* Floating Right Side Images (Editorial composition) */}
        <div className="md:w-2/5 relative h-[600px] w-full hidden md:block animate-fade-in-up delay-700">
          <img 
            src="/images/model_earrings.png" 
            alt="Gold Necklace Model" 
            className="absolute top-10 right-0 w-72 h-[400px] object-cover rounded-t-full rounded-b-full shadow-2xl z-20"
          />
          <img 
            src="/images/gold_ring.png" 
            alt="Minimalist Ring" 
            className="absolute bottom-10 left-0 w-64 h-[350px] object-cover rounded-t-[4rem] rounded-b-[4rem] shadow-xl z-10 hover:z-30 transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in delay-1000">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#B8860B]">Discover More</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#B8860B] to-transparent"></div>
      </div>
    </div>
  );
}
