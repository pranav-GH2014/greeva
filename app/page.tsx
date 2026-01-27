import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Elevate Your Style with <span className="text-blue-600">Greeva</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
          Minimalist adornments for the modern world. Experience the perfect blend of 
          craftsmanship and contemporary design.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/products"
            className="rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition"
          >
            Explore Products
          </Link>
          <Link href="/signup" className="text-sm font-semibold leading-6 text-gray-900">
            Create Account <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop by Category</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          <div className="group relative border rounded-xl p-4 hover:shadow-md transition">
            <div className="h-60 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
               {/* Placeholder for Product Image */}
               <div className="flex h-full items-center justify-center text-gray-400">New Arrivals</div>
            </div>
            <h3 className="mt-4 text-sm text-gray-700 font-medium">New Arrivals</h3>
          </div>
          {/* Add more categories here */}
        </div>
      </section>
    </div>
  );
}