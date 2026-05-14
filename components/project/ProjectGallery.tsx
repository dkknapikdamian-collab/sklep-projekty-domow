"use client";

import { useState } from "react";
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
  const elevationImages = project.media.elevations.map((item, index) => ({
    url: item.url || "",
    label: item.fileName || item.title || `elevation-${index + 1}.jpg`
  }));

  const floorPlanImages = project.media.plans
    .filter((item) => item.type === "floor_plan")
    .map((item, index) => ({
      url: item.url || "",
      label: item.fileName || item.title || `floor-plan-${index + 1}.jpg`
    }));

  const roofPlanImages = project.media.plans
    .filter((item) => item.type === "roof_plan")
    .map((item, index) => ({
      url: item.url || "",
      label: item.fileName || item.title || `roof-plan-${index + 1}.jpg`
    }));

  const sectionImages = project.media.plans
    .filter((item) => item.type === "section")
    .map((item, index) => ({
      url: item.url || "",
      label: item.fileName || item.title || `section-${index + 1}.jpg`
    }));

  const otherImages = project.media.plans
    .filter((item) => item.type === "other")
    .map((item, index) => ({
      url: item.url || "",
      label: item.fileName || item.title || `other-${index + 1}.jpg`
    }));

  return uniqueImages([
    { url: project.media.hero || "", label: "hero.jpg" },
    { url: project.media.thumbnail || "", label: "thumbnail.jpg" },
    ...project.media.gallery.map((url, index) => ({
      url,
      label: fileLabelFromUrl(url, `gallery-${String(index + 1).padStart(2, "0")}.jpg`)
    })),
    ...elevationImages,
    ...floorPlanImages,
    ...roofPlanImages,
    ...sectionImages,
    ...otherImages
  ]);
}

export function ProjectGallery({ project }: { project: Project }) {
  const images = buildProjectGalleryImages(project);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainImage = images[activeIndex] || images[0];
  const thumbs = images.slice(0, 4);
  const extraCount = Math.max(images.length - thumbs.length, 0);
  const hasMultipleImages = images.length > 1;

  if (!mainImage) return null;

  function move(direction: 1 | -1) {
    setActiveIndex((current) => {
      const next = current + direction;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }

  return (
    <div className="project-gallery" data-project-gallery-v30="true">
      <div className="main-photo">
        {hasMultipleImages && (
          <button className="gallery-arrow left" type="button" onClick={() => move(-1)} aria-label="Poprzednie zdjecie">
            <ChevronLeft size={24} />
          </button>
        )}
        <MediaSlot src={mainImage.url} alt={project.name} label={mainImage.label} />
        {hasMultipleImages && (
          <button className="gallery-arrow right" type="button" onClick={() => move(1)} aria-label="Nastepne zdjecie">
            <ChevronRight size={24} />
          </button>
        )}
        <button className="heart-floating" type="button" aria-label="Dodaj do ulubionych"><Heart size={35} /></button>
      </div>

      {thumbs.length > 1 && (
        <div className="thumbnail-row">
          {thumbs.map((image, index) => (
            <button
              className={index === activeIndex ? "active" : ""}
              key={image.url}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Pokaz ${image.label}`}
            >
              <MediaSlot
                src={image.url}
                alt={`${project.name} miniatura ${index + 1}`}
                label={image.label}
              />
            </button>
          ))}
          {extraCount > 0 && (
            <button className="more-photos" type="button" onClick={() => setActiveIndex(thumbs.length)} aria-label="Pokaz wiecej zdjec">
              +{extraCount}
              <span>wiecej</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
