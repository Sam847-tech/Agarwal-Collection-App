"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSafeCart } from "@/lib/safeStore";

// Mock products — replace with real API/data later
const products = [
  { id: "1", name: "Classic Kurta", price: 899 },
  { id: "2", name: "Sherwani", price: 2499 },
  { id: "3", name: "Designer Saree", price: 3499 },
];

export default function ProductsPage() {
  const addToCart = useSafeCart((state) => state.addToCart);

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Card key={p.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow justify-between">
              <p className="text-lg font-semibold mb-4">₹{p.price.toLocaleString()}</p>
              <Button
                className="mt-auto"
                onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, qty: 1 })}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
