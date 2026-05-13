import Image from "next/image";
import { MediaPlaceholder } from "./MediaPlaceholder";

type MediaSlotProps = {
  src?: string;
  alt: string;
  label: string;
  sizes?: string;
};

export function MediaSlot({ src, alt, label, sizes = "100vw" }: MediaSlotProps) {
  if (!src) {
    return <MediaPlaceholder label={label} />;
  }

  return <Image src={src} alt={alt} fill sizes={sizes} />;
}
