"use server";

import { createOrder } from "@/lib/order/create-order";
import type { CartPayload } from "@/lib/cart/types";

export type CheckoutState = {
  ok: boolean;
  message: string;
  orderId?: string;
};

function str(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function parseCart(raw: string): CartPayload {
  try {
    const parsed = JSON.parse(raw) as CartPayload;
    return { items: Array.isArray(parsed.items) ? parsed.items : [] };
  } catch {
    return { items: [] };
  }
}

export async function submitOrderAction(_prevState: CheckoutState, formData: FormData): Promise<CheckoutState> {
  try {
    const customerName = str(formData, "customerName");
    const customerEmail = str(formData, "customerEmail");
    const customerPhone = str(formData, "customerPhone");
    const termsConsent = bool(formData, "termsConsent");
    const contactConsent = bool(formData, "contactConsent");
    const cart = parseCart(str(formData, "cartJson"));

    if (!customerName) throw new Error("Podaj imię i nazwisko.");
    if (!customerEmail || !customerEmail.includes("@")) throw new Error("Podaj poprawny e-mail.");
    if (!customerPhone) throw new Error("Podaj telefon.");
    if (!termsConsent || !contactConsent) throw new Error("Zaznacz wymagane zgody.");
    if (cart.items.length === 0) throw new Error("Koszyk jest pusty.");

    const order = await createOrder({
      customerName,
      customerEmail,
      customerPhone,
      invoiceData: str(formData, "invoiceData"),
      notes: str(formData, "notes"),
      termsConsent,
      contactConsent,
      cart
    });

    return {
      ok: true,
      message: "Zamówienie projektu zostało przyjęte. Po wysłaniu potwierdzimy dostępność, płatność i sposób realizacji.",
      orderId: order.orderId
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Nie udało się zapisać zamówienia."
    };
  }
}
