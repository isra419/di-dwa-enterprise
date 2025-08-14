// src/components/ProductSection.jsx
import ProductCard from "./ProductCard";

export default function ProductSection({ title, products }) {
  return (
    <section className="mb-10 px-4 md:px-16">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <button className="bg-yellow-400 hover:bg-green-500 hover:text-white text-black font-bold px-4 py-1 rounded-md">
          VIEW ALL
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
}
