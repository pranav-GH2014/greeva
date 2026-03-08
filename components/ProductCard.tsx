"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  onSelect?: () => void;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
  onSelect,
}: ProductCardProps) {
  const { buyNow } = useCart();
  const router = useRouter();
  const [isBuying, setIsBuying] = useState(false);

  const handleBuyNow = async () => {
    setIsBuying(true);
    await buyNow({ id, name, price, image });
    router.push("/address");
  };

  return (
    <div className="group rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 cursor-pointer" />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{name}</h2>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          Minimalist perfection for daily use.
        </p>

        <div className="mt-auto flex flex-col items-start gap-4">
          <p className="text-xl font-black text-gray-900">
            ₹{price.toLocaleString('en-IN')}
          </p>
          
          <div className="flex w-full gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button
              className="flex-1 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold text-black hover:bg-gray-50 transition"
              onClick={() => {
                if (onSelect) {
                  onSelect();
                } else {
                  alert(`Added ${name} to cart`);
                }
              }}
            >
              Add to Cart
            </button>
            <button
              className={`flex-1 rounded-full bg-black px-4 py-2 text-sm font-bold text-white transition ${isBuying ? 'opacity-50' : 'hover:bg-gray-800'}`}
              onClick={handleBuyNow}
              disabled={isBuying}
            >
              {isBuying ? "..." : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
