"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { readCart } from "@/lib/cart/storage";

function cartItemsCount() {
  return readCart().items.length;
}

export function HeaderCartLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const refresh = () => setCount(cartItemsCount());

    refresh();
    window.addEventListener("project-cart-updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("project-cart-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <Link href="/koszyk" aria-label={`Koszyk: ${count} pozycji`}>
      <ShoppingCart size={21} />
      <span>Koszyk</span>
      <em>{count}</em>
    </Link>
  );
}
