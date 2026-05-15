"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { FAVORITES_UPDATED_EVENT, isFavorite, toggleFavorite } from "@/lib/favorites/storage";

type FavoriteButtonProps = {
  projectCode: string;
  projectSlug: string;
  projectName: string;
  className?: string;
  iconSize?: number;
  children?: ReactNode;
};

export function FavoriteButton({
  projectCode,
  projectSlug,
  projectName,
  className,
  iconSize = 20,
  children
}: FavoriteButtonProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const refresh = () => setActive(isFavorite(projectSlug));

    refresh();
    window.addEventListener(FAVORITES_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener(FAVORITES_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [projectSlug]);

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setActive(toggleFavorite({ projectCode, projectSlug, projectName }));
  }

  return (
    <button
      className={className}
      type="button"
      aria-label={active ? "Usun z ulubionych" : "Dodaj do ulubionych"}
      aria-pressed={active}
      data-favorite-project-button="true"
      data-favorite-active={active ? "true" : "false"}
      onClick={handleClick}
    >
      <Heart size={iconSize} fill={active ? "currentColor" : "none"} />
      {children}
    </button>
  );
}
