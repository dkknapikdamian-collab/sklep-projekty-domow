"use client";

import { UploadCloud } from "lucide-react";
import type { AdminProjectFileItem, AdminProjectMediaItem } from "@/lib/admin/projects-admin";

export function AdminProjectMediaManager({ media, privateFiles }: { media: AdminProjectMediaItem[]; privateFiles: AdminProjectFileItem[] }) {
  return (
    <>
      <div className="admin-side-card">
        <span>Aktualne media</span>
        <p>{media.length > 0 ? `${media.length} plikow publicznych podlaczonych` : "Brak publicznych mediow"}</p>
        {media.length > 0 && (
          <ul>
            {media.map((item) => <li key={item.id}>{item.title || item.mediaType}: {item.path}</li>)}
          </ul>
        )}
      </div>

      <div className="media-upload-grid">
        <label className="upload-box"><UploadCloud size={25} /><strong>Hero</strong><span>hero.jpg</span><input type="file" name="heroFile" accept="image/*" /></label>
        <label className="upload-box"><UploadCloud size={25} /><strong>Miniatura</strong><span>thumbnail.jpg</span><input type="file" name="thumbnailFile" accept="image/*" /></label>
        <label className="upload-box"><UploadCloud size={25} /><strong>Galeria</strong><span>gallery-01, gallery-02...</span><input type="file" name="galleryFiles" accept="image/*" multiple /></label>
        <label className="upload-box"><UploadCloud size={25} /><strong>Rzut parteru</strong><span>floor-plan-ground.jpg</span><input type="file" name="floorPlanGroundFile" accept="image/*,.pdf" /></label>
        <label className="upload-box"><UploadCloud size={25} /><strong>Rzut dachu</strong><span>floor-plan-roof.jpg</span><input type="file" name="floorPlanRoofFile" accept="image/*,.pdf" /></label>
        <label className="upload-box"><UploadCloud size={25} /><strong>Przekroj A-A</strong><span>section-aa.jpg</span><input type="file" name="sectionAaFile" accept="image/*,.pdf" /></label>
        <label className="upload-box"><UploadCloud size={25} /><strong>Przekroj B-B</strong><span>section-bb.jpg</span><input type="file" name="sectionBbFile" accept="image/*,.pdf" /></label>
        <label className="upload-box"><UploadCloud size={25} /><strong>Elewacja frontowa</strong><span>elevation-front.jpg</span><input type="file" name="elevationFrontFile" accept="image/*,.pdf" /></label>
        <label className="upload-box"><UploadCloud size={25} /><strong>Elewacja ogrodowa</strong><span>elevation-garden.jpg</span><input type="file" name="elevationGardenFile" accept="image/*,.pdf" /></label>
      </div>

      <div className="admin-side-card">
        <span>Aktualne pliki prywatne</span>
        <p>{privateFiles.length > 0 ? `${privateFiles.length} plikow prywatnych podlaczonych` : "Brak plikow prywatnych"}</p>
        {privateFiles.length > 0 && (
          <ul>
            {privateFiles.map((item) => <li key={item.id}>{item.title || item.fileType}: {item.path}</li>)}
          </ul>
        )}
      </div>

      <div className="media-upload-grid private">
        <label className="upload-box"><UploadCloud size={25} /><strong>Dokumentacja PDF</strong><span>documentation-v1.pdf</span><input type="file" name="documentationFile" accept=".pdf" /></label>
        <label className="upload-box"><UploadCloud size={25} /><strong>Pelna paczka ZIP</strong><span>full-package-v1.zip</span><input type="file" name="fullPackageFile" accept=".zip" /></label>
        <label className="upload-box"><UploadCloud size={25} /><strong>PDF na e-mail</strong><span>pdf-email-package-v1.pdf</span><input type="file" name="pdfEmailPackageFile" accept=".pdf" /></label>
      </div>
    </>
  );
}

