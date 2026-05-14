"use client";

import { deleteProjectMediaItemBoundAction, deleteProjectPrivateFileItemBoundAction, setProjectMediaTypeBoundAction } from "@/app/admin/projekty/actions";
import { AdminFileUploadBox } from "./AdminFileUploadBox";
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
        <button
          type="submit"
          formAction={setProjectMediaTypeBoundAction.bind(null, projectId, projectSlug, projectCode, item.id, "hero")}
          formNoValidate
          className="admin-secondary-button"
          data-admin-set-media-hero="true"
          disabled={isHero}
        >
          Ustaw jako hero
        </button>
        <button
          type="submit"
          formAction={setProjectMediaTypeBoundAction.bind(null, projectId, projectSlug, projectCode, item.id, "thumbnail")}
          formNoValidate
          className="admin-secondary-button"
          data-admin-set-media-thumbnail="true"
          disabled={isThumbnail}
        >
          Ustaw jako miniature
        </button>
        <button
          type="submit"
          formAction={deleteProjectMediaItemBoundAction.bind(null, projectId, projectSlug, projectCode, item.id, item.path, item.bucket || "project-media")}
          formNoValidate
          className="admin-secondary-button"
          data-admin-delete-media-item="true"
        >
          Usun media
        </button>
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
        <AdminFileUploadBox name="heroFile" title="Hero" hint="hero.jpg" accept="image/*" />
        <AdminFileUploadBox name="thumbnailFile" title="Miniatura" hint="thumbnail.jpg" accept="image/*" />
        <AdminFileUploadBox name="galleryFiles" title="Galeria" hint="gallery-01, gallery-02..." accept="image/*" multiple />
        <AdminFileUploadBox name="floorPlanGroundFile" title="Rzut parteru" hint="floor-plan-ground.jpg" accept="image/*,.pdf" />
        <AdminFileUploadBox name="floorPlanRoofFile" title="Rzut dachu" hint="floor-plan-roof.jpg" accept="image/*,.pdf" />
        <AdminFileUploadBox name="sectionAaFile" title="Przekroj A-A" hint="section-aa.jpg" accept="image/*,.pdf" />
        <AdminFileUploadBox name="sectionBbFile" title="Przekroj B-B" hint="section-bb.jpg" accept="image/*,.pdf" />
        <AdminFileUploadBox name="elevationFrontFile" title="Elewacja frontowa" hint="elevation-front.jpg" accept="image/*,.pdf" />
        <AdminFileUploadBox name="elevationGardenFile" title="Elewacja ogrodowa" hint="elevation-garden.jpg" accept="image/*,.pdf" />
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
                <button
                  type="submit"
                  formAction={deleteProjectPrivateFileItemBoundAction.bind(null, projectId, item.id, item.path, "project-private-files")}
                  formNoValidate
                  className="admin-secondary-button"
                  data-admin-delete-private-file-item="true"
                >
                  Usun plik prywatny
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="media-upload-grid private">
        <AdminFileUploadBox name="documentationFile" title="Dokumentacja PDF" hint="documentation-v1.pdf" accept=".pdf" />
        <AdminFileUploadBox name="fullPackageFile" title="Pelna paczka ZIP" hint="full-package-v1.zip" accept=".zip" />
        <AdminFileUploadBox name="pdfEmailPackageFile" title="PDF na e-mail" hint="pdf-email-package-v1.pdf" accept=".pdf" />
      </div>
    </>
  );
}
