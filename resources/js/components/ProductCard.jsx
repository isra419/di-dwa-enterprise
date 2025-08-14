// src/components/ProductCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function ProductCard({ image, name, priceRange }) {
  return (
    <Card className="w-full hover:shadow-2xl transition">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <img src={image} alt={name} className="h-32 object-contain mb-2" />
        <h3 className="font-semibold">{name}</h3>
        <p className="text-gray-600 mb-1">GHC {priceRange}</p>
        <div className="flex items-center justify-center text-yellow-500 text-sm gap-1 mb-3">
          {Array(5).fill(0).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-500" />
          ))}
          <span className="ml-1 text-xs text-gray-500">(225)</span>
        </div>
        <Button className="bg-red-600 hover:bg-green-500 text-white w-full">
          🛒 Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
