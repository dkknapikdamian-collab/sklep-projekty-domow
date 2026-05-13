import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import type { Project } from "@/types/project";
import { MediaSlot } from "@/components/MediaSlot";

export function ProjectGallery({ project }: { project: Project }) {
  const thumbs = project.media.gallery.slice(0, 4);

  return (
    <div className="project-gallery">
      <div className="main-photo">
        <button className="gallery-arrow left"><ChevronLeft size={24} /></button>
        <MediaSlot src={project.media.hero} alt={project.name} label="Dodaj hero.jpg w folderze projektu" sizes="760px" />
        <button className="gallery-arrow right"><ChevronRight size={24} /></button>
        <button className="heart-floating"><Heart size={35} /></button>
      </div>

      <div className="thumbnail-row">
        {Array.from({ length: 4 }).map((_, index) => (
          <button className={index === 0 ? "active" : ""} key={index}>
            <MediaSlot src={thumbs[index]} alt={`${project.name} miniatura ${index + 1}`} label={`gallery-${String(index + 1).padStart(2, "0")}.jpg`} sizes="140px" />
          </button>
        ))}
        <button className="more-photos">
          +{Math.max(project.media.gallery.length, 0)}
          <span>więcej</span>
        </button>
      </div>
    </div>
  );
}
