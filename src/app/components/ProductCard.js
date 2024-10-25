// components/ProductCard.js
'use client';

import { Card, CardContent, CardFooter } from "./ui/card";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

export default function ProductCard({ product, onAddToCart }) {
  // Function to handle adding to cart
  const handleAddToCart = () => {
    if (typeof onAddToCart === 'function') {
      onAddToCart(product);
    } else {
      console.error('onAddToCart is not a function');
    }
  };

  return (
    <Card className="w-64 flex-shrink-0">
      <CardContent className="p-4">
        {/* Placeholder for product image */}
        <div className="w-full h-40 bg-gray-200 rounded-md mb-2"></div>

        {/* Product name */}
        <h4 className="font-semibold mb-1 text-black">{product.name}</h4>

        {/* Product size */}
        <p className="text-sm text-gray-800 mb-2">{product.size}</p>

        {/* Rating stars and text */}
        <div className="flex items-center mb-2">
          {[...Array(product.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
          ))}
          <span className="ml-1 text-sm text-gray-800">({product.rating})</span>
        </div>

        {/* Product price */}
        <p className="font-bold text-black">${product.price}</p>
      </CardContent>

      {/* Add to Cart button */}
      <CardFooter>
        <Button
          className="w-full bg-green-800 hover:bg-green-700 text-white"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
