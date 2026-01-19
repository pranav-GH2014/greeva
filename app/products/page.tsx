import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const products = [
    {
      id: "1",
      name: "Luxury Fabric Sheet",
      price: 2200,
      image: "https://via.placeholder.com/300",
    },
    {
      id: "2",
      name: "Decorative Material Roll",
      price: 1800,
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
