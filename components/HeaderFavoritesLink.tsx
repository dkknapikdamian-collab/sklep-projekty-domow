"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { FAVORITES_UPDATED_EVENT, readFavorites } from "@/lib/favorites/storage";

function favoritesCount() {
  return readFavorites().items.length;
}

export function HeaderFavoritesLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const refresh = () => setCount(favoritesCount());

    refresh();
    window.addEventListener(FAVORITES_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(FAVORITES_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <a href="#ulubione" aria-label={`Ulubione projekty: ${count}`}>
      <Heart size={21} />
      <span>Ulubione</span>
      <em>{count}</em>
    </a>
  );
}
