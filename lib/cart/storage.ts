"use client";

import type { CartAddon, CartItem, CartPayload } from "./types";

export const CART_STORAGE_KEY = "project-cart-v38";

function safeCartPayload(value: unknown): CartPayload {
  if (!value || typeof value !== "object" || !("items" in value)) return { items: [] };
  const items = Array.isArray((value as { items?: unknown }).items) ? (value as { items: CartItem[] }).items : [];
  return { items };
}

export function readCart(): CartPayload {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return { items: [] };
    return safeCartPayload(JSON.parse(raw));
  } catch {
    return { items: [] };
  }
}

export function writeCart(cart: CartPayload) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: cart.items }));
  window.dispatchEvent(new Event("project-cart-updated"));
}

export function clearCart() {
  writeCart({ items: [] });
}

export function cartItemTotal(item: CartItem) {
  const addonsTotal = item.selectedAddons.reduce((sum, addon) => sum + addon.priceGross, 0);
  return item.basePriceGross + item.variantPriceGross + addonsTotal;
}

export function cartTotal(cart: CartPayload) {
  return cart.items.reduce((sum, item) => sum + cartItemTotal(item), 0);
}

export function addCartItem(input: Omit<CartItem, "id" | "addedAt">) {
  const cart = readCart();
  const item: CartItem = {
    ...input,
    id: `${input.projectSlug}-${Date.now()}`,
    addedAt: new Date().toISOString()
  };

  writeCart({ items: [...cart.items, item] });
  return item;
}

export function removeCartItem(itemId: string) {
  const cart = readCart();
  writeCart({ items: cart.items.filter((item) => item.id !== itemId) });
}

export function updateCartItemAddons(itemId: string, selectedAddons: CartAddon[]) {
  const cart = readCart();
  writeCart({
    items: cart.items.map((item) => (item.id === itemId ? { ...item, selectedAddons } : item))
  });
}
