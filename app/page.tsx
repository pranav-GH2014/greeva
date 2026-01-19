import Link from "next/link";

export default function HomePage() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Handcrafted <br />
            <span className="text-yellow-200">Fancy Adornments</span>
          </h1>

          <p className="mt-6 text-lg text-white/80 max-w-md">
            Discover premium handmade materials and adornments crafted for
            designers, decorators, and creative minds across the globe.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <Link
              href="/products"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Shop Now →
            </Link>

            <Link
              href="/signup"
              className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              Join Us
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE – RANDOM HANDMADE IMAGES */}
        <div className="relative grid grid-cols-2 gap-6">
          {[
            "handmade jewelry",
            "handcrafted decor",
            "artisan craft materials",
            "handmade embellishments",
          ].map((query, index) => (
            <img
              key={index}
              src={`https://source.unsplash.com/400x400/?${query}`}
              alt={query}
              className="rounded-2xl shadow-2xl hover:scale-105 transition transform"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
