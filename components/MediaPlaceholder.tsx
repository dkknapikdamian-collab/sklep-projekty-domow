import { Image as ImageIcon } from "lucide-react";

export function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div className="media-placeholder">
      <ImageIcon size={34} strokeWidth={1.4} />
      <span>{label}</span>
    </div>
  );
}
