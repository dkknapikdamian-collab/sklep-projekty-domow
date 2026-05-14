"use client";

import { useFormStatus } from "react-dom";
import { Save } from "lucide-react";

type AdminSubmitButtonProps = {
  idleLabel?: string;
  pendingLabel?: string;
  className?: string;
  iconSize?: number;
};

export function AdminSubmitButton({
  idleLabel = "Zapisz dane",
  pendingLabel = "Zapisywanie...",
  className = "admin-primary-button",
  iconSize = 17
}: AdminSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={pending} aria-busy={pending}>
      <Save size={iconSize} /> {pending ? pendingLabel : idleLabel}
    </button>
  );
}
