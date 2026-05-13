import Image from "next/image";
import { Project } from "@/data/projects";
import { ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react";

export function ProjectGallery({ project }: { project: Project }) {
  return (
    <div className="gallery-side">
      <div className="title-row">
        <div>
          <h1>{project.name}</h1>
          <div className="badges">
            {project.badgePrimary && <span className="badge green">{project.badgePrimary}</span>}
            {project.badgeSecondary && <span className="badge grey">{project.badgeSecondary}</span>}
          </div>
        </div>
        <div className="title-tools">
          <button><Heart size={18} /> Dodaj do ulubionych</button>
          <button><Share2 size={18} /> Udostępnij</button>
        </div>
      </div>

      <div className="main-gallery">
        <button className="slider-arrow left"><ChevronLeft size={23} /></button>
        <Image src={project.media.hero} alt={project.name} fill priority sizes="760px" />
        <button className="slider-arrow right"><ChevronRight size={23} /></button>
        <button className="heart-float"><Heart size={35} /></button>
      </div>

      <div className="thumbs">
        {project.media.gallery.map((src, index) => (
          <button className={index === 0 ? "active" : ""} key={src}>
            <Image src={src} alt={`${project.name} miniatura ${index + 1}`} fill sizes="140px" />
          </button>
        ))}
        <button className="more-thumb">+12<br /><span>więcej</span></button>
      </div>
    </div>
  );
}
