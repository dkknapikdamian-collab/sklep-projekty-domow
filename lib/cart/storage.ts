"use client";

import type { CartAddon, CartItem, CartPayload } from "./types";

export const CART_STORAGE_KEY = "project-cart-v38";

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function finitePrice(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

function normalizeAddon(value: unknown): CartAddon | null {
  if (!value || typeof value !== "object") return null;
  const addon = value as Partial<CartAddon>;
  const code = nonEmptyString(addon.code);
  const name = nonEmptyString(addon.name);
  const priceGross = finitePrice(addon.priceGross);

  if (!code || !name || priceGross === null) return null;

  return {
    code,
    name,
    priceGross,
    description: nonEmptyString(addon.description) || undefined,
    deliveryAction: nonEmptyString(addon.deliveryAction) || undefined
  };
}

function normalizeAddons(value: unknown): CartAddon[] {
  if (!Array.isArray(value)) return [];
  return value.map(normalizeAddon).filter((addon): addon is CartAddon => Boolean(addon));
}

function normalizeCartItem(value: unknown): CartItem | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<CartItem>;
  const id = nonEmptyString(item.id);
  const projectCode = nonEmptyString(item.projectCode);
  const projectSlug = nonEmptyString(item.projectSlug);
  const projectName = nonEmptyString(item.projectName);
  const basePriceGross = finitePrice(item.basePriceGross);
  const variantName = nonEmptyString(item.variantName);
  const variantPriceGross = finitePrice(item.variantPriceGross);
  const addedAt = nonEmptyString(item.addedAt);

  if (
    !id ||
    !projectCode ||
    !projectSlug ||
    !projectName ||
    basePriceGross === null ||
    !variantName ||
    variantPriceGross === null ||
    !addedAt
  ) {
    return null;
  }

  const availableAddons = normalizeAddons(item.availableAddons);
  const availableCodes = new Set(availableAddons.map((addon) => addon.code));
  const selectedAddons = normalizeAddons(item.selectedAddons).filter((addon) => availableCodes.has(addon.code));

  return {
    id,
    projectCode,
    projectSlug,
    projectName,
    basePriceGross,
    variantName,
    variantPriceGross,
    selectedAddons,
    availableAddons,
    addedAt
  };
}

function safeCartPayload(value: unknown): CartPayload {
  if (!value || typeof value !== "object" || !("items" in value)) return { items: [] };
  const rawItems = Array.isArray((value as { items?: unknown }).items) ? (value as { items: unknown[] }).items : [];
  const items = rawItems.map(normalizeCartItem).filter((item): item is CartItem => Boolean(item));
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
  const safeCart = safeCartPayload(cart);
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: safeCart.items }));
  window.dispatchEvent(new Event("project-cart-updated"));
}

export function clearCart() {
  writeCart({ items: [] });
}

export function cartItemTotal(item: CartItem) {
  const safeItem = normalizeCartItem(item);
  if (!safeItem) return 0;
  const addonsTotal = safeItem.selectedAddons.reduce((sum, addon) => sum + addon.priceGross, 0);
  return safeItem.basePriceGross + safeItem.variantPriceGross + addonsTotal;
}

export function cartTotal(cart: CartPayload) {
  return cart.items.reduce((sum, item) => sum + cartItemTotal(item), 0);
}

export function addCartItem(input: Omit<CartItem, "id" | "addedAt">) {
  const cart = readCart();
  const item = normalizeCartItem({
    ...input,
    id: `${input.projectSlug}-${Date.now()}`,
    addedAt: new Date().toISOString()
  });

  if (!item) {
    throw new Error("Niepoprawna pozycja koszyka: brakuje projektu, wariantu albo ceny.");
  }

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
    items: cart.items.map((item) => {
      if (item.id !== itemId) return item;
      const allowedCodes = new Set(item.availableAddons.map((addon) => addon.code));
      return {
        ...item,
        selectedAddons: normalizeAddons(selectedAddons).filter((addon) => allowedCodes.has(addon.code))
      };
    })
  });
}
