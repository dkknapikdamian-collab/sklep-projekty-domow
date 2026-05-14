"use client";

import { UploadCloud } from "lucide-react";
import { deleteProjectMediaItemAction, deleteProjectPrivateFileItemAction, setProjectMediaTypeAction } from "@/app/admin/projekty/actions";
import type { AdminProjectFileItem, AdminProjectMediaItem } from "@/lib/admin/projects-admin";

function isPreviewableImage(path: string, publicUrl: string) {
  const value = `${path} ${publicUrl}`.toLowerCase();
  return /\.(png|jpe?g|webp|gif|avif)(\?|$|\s)/.test(value);
}

function MediaPreviewCard({ item, projectId, projectSlug, projectCode }: { item: AdminProjectMediaItem; projectId: string; projectSlug: string; projectCode: string }) {
  const canPreview = Boolean(item.publicUrl) && isPreviewableImage(item.path, item.publicUrl);
  const isHero = item.mediaType === "hero";
  const isThumbnail = item.mediaType === "thumbnail";

  return (
    <article className="admin-media-preview-card" data-admin-media-preview="true">
      <div className="admin-media-preview-thumb">
        {canPreview ? (
          <img src={item.publicUrl} alt={item.title || item.mediaType || item.path} loading="lazy" />
        ) : (
          <span>plik</span>
        )}
      </div>
      <div className="admin-media-preview-body">
        <span>{item.mediaType || "media"}</span>
        <strong>{item.title || item.path}</strong>
        <small data-admin-media-sort-order="true">Kolejnosc: {item.sortOrder}</small>
        <small data-admin-media-is-hero="true">Hero: {isHero ? "tak" : "nie"}</small>
        <small data-admin-media-is-thumbnail="true">Miniatura: {isThumbnail ? "tak" : "nie"}</small>
        <small data-admin-media-bucket="true">Bucket: {item.bucket || "project-media"}</small>
        <code>{item.path}</code>
        {item.publicUrl && <code data-admin-media-public-url="true">{item.publicUrl}</code>}
        {item.publicUrl ? (
          <a href={item.publicUrl} target="_blank" rel="noreferrer">Otworz plik</a>
        ) : (
          <p>Brak publicznego URL</p>
        )}
        <form action={setProjectMediaTypeAction}>
          <input type="hidden" name="projectId" value={projectId} />
          <input type="hidden" name="projectSlug" value={projectSlug} />
          <input type="hidden" name="projectCode" value={projectCode} />
          <input type="hidden" name="mediaId" value={item.id} />
          <input type="hidden" name="targetType" value="hero" />
          <button type="submit" className="admin-secondary-button" data-admin-set-media-hero="true" disabled={isHero}>Ustaw jako hero</button>
        </form>
        <form action={setProjectMediaTypeAction}>
          <input type="hidden" name="projectId" value={projectId} />
          <input type="hidden" name="projectSlug" value={projectSlug} />
          <input type="hidden" name="projectCode" value={projectCode} />
          <input type="hidden" name="mediaId" value={item.id} />
          <input type="hidden" name="targetType" value="thumbnail" />
          <button type="submit" className="admin-secondary-button" data-admin-set-media-thumbnail="true" disabled={isThumbnail}>Ustaw jako miniature</button>
        </form>
        <form action={deleteProjectMediaItemAction}>
          <input type="hidden" name="projectId" value={projectId} />
          <input type="hidden" name="projectSlug" value={projectSlug} />
          <input type="hidden" name="projectCode" value={projectCode} />
          <input type="hidden" name="mediaId" value={item.id} />
          <input type="hidden" name="path" value={item.path} />
          <input type="hidden" name="bucket" value={item.bucket || "project-media"} />
          <button type="submit" className="admin-secondary-button" data-admin-delete-media-item="true">Usun media</button>
        </form>
      </div>
    </article>
  );
}

export function AdminProjectMediaManager({
  projectId,
  projectSlug,
  projectCode,
  media,
  privateFiles
}: {
  projectId: string;
  projectSlug: string;
  projectCode: string;
  media: AdminProjectMediaItem[];
  privateFiles: AdminProjectFileItem[];
}) {
  return (
    <>
      <div className="admin-media-current-panel" data-admin-project-current-media="true">
        <div className="admin-media-current-head">
          <span>Aktualne media publiczne</span>
          <strong>{media.length > 0 ? `${media.length} plikow publicznych podlaczonych` : "Brak publicznych mediow"}</strong>
          <p>Inputy ponizej sluza tylko do wyboru nowych plikow. Zapisane media sa widoczne w tej sekcji.</p>
        </div>

        {media.length > 0 ? (
          <div className="admin-media-preview-grid">
            {media.map((item) => <MediaPreviewCard key={item.id} item={item} projectId={projectId} projectSlug={projectSlug} projectCode={projectCode} />)}
          </div>
        ) : (
          <p className="admin-field-help">Ten projekt nie ma jeszcze rekordow w tabeli project_media.</p>
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

      <div className="admin-media-current-panel private" data-admin-project-current-private-files="true">
        <div className="admin-media-current-head">
          <span>Aktualne pliki prywatne</span>
          <strong>{privateFiles.length > 0 ? `${privateFiles.length} plikow prywatnych podlaczonych` : "Brak plikow prywatnych"}</strong>
        </div>
        {privateFiles.length > 0 && (
          <ul className="admin-private-file-list">
            {privateFiles.map((item) => (
              <li key={item.id}>
                <strong>{item.title || item.fileType}</strong>
                <code>{item.path}</code>
                <form action={deleteProjectPrivateFileItemAction}>
                  <input type="hidden" name="projectId" value={projectId} />
                  <input type="hidden" name="fileId" value={item.id} />
                  <input type="hidden" name="path" value={item.path} />
                  <input type="hidden" name="bucket" value="project-private-files" />
                  <button type="submit" className="admin-secondary-button" data-admin-delete-private-file-item="true">Usun plik prywatny</button>
                </form>
              </li>
            ))}
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
