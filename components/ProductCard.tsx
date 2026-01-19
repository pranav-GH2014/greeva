"use client";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  return (
    <div className="rounded-lg border bg-white shadow-sm hover:shadow-md transition">
      
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="h-48 w-full object-cover rounded-t-lg"
      />

      {/* Product Info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{name}</h2>

        <p className="mt-2 text-gray-700 font-medium">
          ₹{price}
        </p>

        <button
          className="mt-4 w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800 transition"
          onClick={() => alert(`Added ${name} to cart`)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
