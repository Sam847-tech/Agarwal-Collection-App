"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSafeUser } from "@/lib/safeStore";

export default function HomePage() {
  const user = useSafeUser((state) => state.user);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Agarwal Collection</h1>
      <p className="text-lg text-muted-foreground mb-6">
        {user ? `Hello, ${user.name}!` : "Browse our collection and shop your favorites."}
      </p>
      <Link href="/products">
        <Button size="lg">Shop Now</Button>
      </Link>
    </main>
  );
}
