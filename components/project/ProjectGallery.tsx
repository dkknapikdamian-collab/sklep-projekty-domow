import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import type { Project } from "@/types/project";
import { MediaSlot } from "@/components/MediaSlot";

type GalleryImage = {
  url: string;
  label: string;
};

function uniqueImages(items: GalleryImage[]) {
  const seen = new Set<string>();
  const result: GalleryImage[] = [];

  for (const item of items) {
    const url = String(item.url || "").trim();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    result.push({ ...item, url });
  }

  return result;
}

function fileLabelFromUrl(url: string, fallback: string) {
  try {
    const parsed = new URL(url);
    const last = parsed.pathname.split("/").filter(Boolean).pop();
    return last || fallback;
  } catch {
    const last = url.split("/").filter(Boolean).pop();
    return last || fallback;
  }
}

function buildProjectGalleryImages(project: Project): GalleryImage[] {
  const planImages = [...project.media.plans, ...project.media.elevations]
    .map((item) => ({
      url: item.url || "",
      label: item.fileName || item.title || "rysunek-projektu.jpg"
    }));

  return uniqueImages([
    { url: project.media.hero || "", label: "hero.jpg" },
    { url: project.media.thumbnail || "", label: "thumbnail.jpg" },
    ...project.media.gallery.map((url, index) => ({
      url,
      label: fileLabelFromUrl(url, `gallery-${String(index + 1).padStart(2, "0")}.jpg`)
    })),
    ...planImages
  ]);
}

export function ProjectGallery({ project }: { project: Project }) {
  const images = buildProjectGalleryImages(project);
  const mainImage = images[0];
  const thumbs = images.slice(0, 4);
  const extraCount = Math.max(images.length - thumbs.length, 0);

  return (
    <div className="project-gallery" data-project-gallery-v30="true">
      <div className="main-photo">
        <button className="gallery-arrow left" type="button"><ChevronLeft size={24} /></button>
        <MediaSlot src={mainImage?.url} alt={project.name} label="Dodaj zdjęcie główne projektu" />
        <button className="gallery-arrow right" type="button"><ChevronRight size={24} /></button>
        <button className="heart-floating" type="button"><Heart size={35} /></button>
      </div>

      <div className="thumbnail-row">
        {Array.from({ length: 4 }).map((_, index) => {
          const image = thumbs[index];
          return (
            <button className={index === 0 ? "active" : ""} key={index} type="button">
              <MediaSlot
                src={image?.url}
                alt={`${project.name} miniatura ${index + 1}`}
                label={image?.label || `gallery-${String(index + 1).padStart(2, "0")}.jpg`}
              />
            </button>
          );
        })}
        <button className="more-photos" type="button">
          +{extraCount}
          <span>więcej</span>
        </button>
      </div>
    </div>
  );
}
