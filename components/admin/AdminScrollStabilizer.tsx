"use client";

import { useEffect } from "react";

const STORAGE_KEY = "sklep-admin-scroll-restore-v34";
const MAX_AGE_MS = 2 * 60 * 1000;

type ScrollPayload = {
  path: string;
  y: number;
  x: number;
  hash: string;
  savedAt: number;
};

function readPayload(): ScrollPayload | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const payload = JSON.parse(raw) as ScrollPayload;
    if (!payload || typeof payload.path !== "string") return null;
    if (Date.now() - Number(payload.savedAt || 0) > MAX_AGE_MS) return null;
    return payload;
  } catch {
    return null;
  }
}

function saveCurrentScroll() {
  try {
    const payload: ScrollPayload = {
      path: window.location.pathname,
      y: window.scrollY,
      x: window.scrollX,
      hash: window.location.hash || "",
      savedAt: Date.now()
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    document.documentElement.setAttribute("data-admin-action-pending", "true");
  } catch {
    // ignore unavailable storage
  }
}

function restoreScroll(payload: ScrollPayload) {
  const targetY = Math.max(0, Number(payload.y || 0));
  const targetX = Math.max(0, Number(payload.x || 0));

  let attempts = 0;
  const tick = () => {
    attempts += 1;
    window.scrollTo(targetX, targetY);

    if (attempts < 8 && Math.abs(window.scrollY - targetY) > 8) {
      window.requestAnimationFrame(tick);
    } else {
      document.documentElement.removeAttribute("data-admin-action-pending");
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  };

  window.requestAnimationFrame(() => window.requestAnimationFrame(tick));
}

export function AdminScrollStabilizer() {
  useEffect(() => {
    if (!window.location.pathname.startsWith("/admin")) return;

    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const payload = readPayload();
    if (payload && payload.path === window.location.pathname) {
      restoreScroll(payload);
    }

    const onSubmitCapture = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (!form.closest(".admin-shell") && !form.closest(".admin-header-v24")) return;
      saveCurrentScroll();
    };

    const onClickCapture = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const submitButton = target.closest("button[type='submit'], input[type='submit']");
      if (!submitButton) return;
      if (!submitButton.closest(".admin-shell")) return;
      saveCurrentScroll();
    };

    document.addEventListener("submit", onSubmitCapture, true);
    document.addEventListener("click", onClickCapture, true);

    return () => {
      document.removeEventListener("submit", onSubmitCapture, true);
      document.removeEventListener("click", onClickCapture, true);
      window.history.scrollRestoration = previousRestoration;
      document.documentElement.removeAttribute("data-admin-action-pending");
    };
  }, []);

  return null;
}
