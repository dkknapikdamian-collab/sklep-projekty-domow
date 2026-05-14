"use client";

import { useFormStatus } from "react-dom";
import { Save } from "lucide-react";

type AdminSubmitButtonProps = {
  idleLabel?: string;
  pendingLabel?: string;
  className?: string;
  iconSize?: number;
  disabled?: boolean;
};

export function AdminSubmitButton({
  idleLabel = "Zapisz dane",
  pendingLabel = "Zapisywanie...",
  className = "admin-primary-button",
  iconSize = 17,
  disabled = false
}: AdminSubmitButtonProps) {
  const { pending } = useFormStatus();
  const finalDisabled = pending || disabled;

  return (
    <button type="submit" className={className} disabled={finalDisabled} aria-busy={pending}>
      <Save size={iconSize} /> {pending ? pendingLabel : idleLabel}
    </button>
  );
}
