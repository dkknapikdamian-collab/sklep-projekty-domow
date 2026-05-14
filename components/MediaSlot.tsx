import { MediaPlaceholder } from "./MediaPlaceholder";

type MediaSlotProps = {
  src?: string;
  alt: string;
  label: string;
  sizes?: string;
};

function normalizeSrc(src?: string) {
  const value = String(src || "").trim();
  return value || "";
}

export function MediaSlot({ src, alt, label }: MediaSlotProps) {
  const normalizedSrc = normalizeSrc(src);

  if (!normalizedSrc) {
    return <MediaPlaceholder label={label} />;
  }

  return (
    <img
      className="media-slot-image"
      src={normalizedSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      data-media-slot-image="true"
    />
  );
}
