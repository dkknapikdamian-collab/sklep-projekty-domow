"use server";

import { createOrder } from "@/lib/order/create-order";
import { createStripeCheckoutForOrder } from "@/lib/payments/stripe-payments";
import type { CartPayload } from "@/lib/cart/types";

export type CheckoutState = {
  ok: boolean;
  message: string;
  orderId?: string;
  checkoutUrl?: string;
  paymentStatus?: string;
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

    const stripeCheckout = await createStripeCheckoutForOrder({
      orderId: order.orderId,
      amountGross: order.totalGross,
      customerEmail,
      customerName,
      currency: process.env.STRIPE_PAYMENT_CURRENCY || "pln",
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || ""
    });

    if (stripeCheckout.ok && stripeCheckout.checkoutUrl) {
      return {
        ok: true,
        message: "Zamówienie zostało zapisane. Przekierowujemy do bezpiecznej płatności online.",
        orderId: order.orderId,
        checkoutUrl: stripeCheckout.checkoutUrl,
        paymentStatus: "stripe_checkout_created"
      };
    }

    return {
      ok: true,
      message: `Zamówienie zostało zapisane, ale płatności online nie są jeszcze skonfigurowane: ${stripeCheckout.reason}. Nie wysyłamy plików bez statusu paid.`,
      orderId: order.orderId,
      paymentStatus: stripeCheckout.reason === "STRIPE_PROVIDER_NOT_CONFIGURED" ? "stripe_provider_not_configured" : "stripe_checkout_not_created"
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Nie udało się zapisać zamówienia."
    };
  }
}
