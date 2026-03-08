import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/greevaAbout/1920/1080"
            alt="Greeva Workshop"
            className="w-full h-full object-cover object-center filter brightness-[0.6] sepia-[0.2]"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl leading-relaxed drop-shadow-md">
            Crafting premium experiences since 2024. At Greeva, we believe in the perfect intersection of timeless design and modern utility.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl transform transition hover:scale-[1.02] duration-500">
            <img 
              src="https://picsum.photos/seed/greevaCrafting/800/1000" 
              alt="Crafting Process" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-sm font-bold tracking-widest text-[#B8860B] uppercase">The Pursuit of Excellence</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Elevating the Everyday.
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Greeva was born from a simple observation: beautiful things should be accessible, durable, and thoughtfully designed. We source the finest materials globally to create pieces that not only look stunning but stand the test of time.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Every curve, every stitch, and every finish is meticulously inspected. We don't just sell products; we deliver a standard of living.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Our Core Values</h2>
            <div className="h-1 w-20 bg-black mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Value 1 */}
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition duration-300 border border-transparent hover:border-gray-100">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.53a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Uncompromising Quality</h4>
              <p className="text-gray-600 font-light leading-relaxed">We partner with generational artisans and select only premium-grade materials.</p>
            </div>

            {/* Value 2 */}
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition duration-300 border border-transparent hover:border-gray-100">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Sustainable Sourcing</h4>
              <p className="text-gray-600 font-light leading-relaxed">Our commitment to the planet ensures ethical labor and eco-friendly manufacturing.</p>
            </div>

            {/* Value 3 */}
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition duration-300 border border-transparent hover:border-gray-100">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Modern Aesthetics</h4>
              <p className="text-gray-600 font-light leading-relaxed">Designs tailored for the modern home, transcending fleeting trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-6">Experience the Greeva Difference</h2>
          <p className="text-xl text-gray-400 font-light mb-10">
            Explore our latest collection and discover the pieces that will redefine your space.
          </p>
          <Link 
            href="/products"
            className="inline-block bg-white text-black font-bold text-lg px-10 py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:scale-105 transition duration-300"
          >
            Explore Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
