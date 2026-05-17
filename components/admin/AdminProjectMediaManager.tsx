"use client";

import {
  deleteProjectMediaItemBoundAction,
  deleteProjectPrivateFileItemBoundAction,
  setProjectMediaTypeBoundAction,
  setProjectPrivateFileActiveBoundAction
} from "@/app/admin/projekty/actions";
import { AdminFileUploadBox } from "./AdminFileUploadBox";
import type { AdminProjectFileItem, AdminProjectMediaItem } from "@/lib/admin/projects-admin";

const PRIVATE_FILE_LABELS: Record<string, string> = {
  documentation: "Dokumentacja PDF",
  floor_plans: "Rzuty pomieszczeń PDF",
  full_package: "Pełna paczka ZIP",
  pdf_email_package: "PDF na e-mail"
};

function privateFileLabel(fileType: string, title: string) {
  return PRIVATE_FILE_LABELS[fileType] || title || fileType || "Plik prywatny";
}

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
        <small data-admin-media-sort-order="true">Kolejność: {item.sortOrder}</small>
        <small data-admin-media-is-hero="true">Hero: {isHero ? "tak" : "nie"}</small>
        <small data-admin-media-is-thumbnail="true">Miniatura: {isThumbnail ? "tak" : "nie"}</small>
        <small data-admin-media-bucket="true">Bucket: {item.bucket || "project-media"}</small>
        <code>{item.path}</code>
        {item.publicUrl && <code data-admin-media-public-url="true">{item.publicUrl}</code>}
        {item.publicUrl ? (
          <a href={item.publicUrl} target="_blank" rel="noreferrer" data-admin-media-open-link="Otworz plik">Otwórz plik</a>
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
          Ustaw jako miniaturę
        </button>
        <button
          type="submit"
          formAction={deleteProjectMediaItemBoundAction.bind(null, projectId, projectSlug, projectCode, item.id, item.path, item.bucket || "project-media")}
          formNoValidate
          className="admin-secondary-button"
          data-admin-delete-media-item="true"
        >
          Usuń media
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
          <strong>{media.length > 0 ? `${media.length} plików publicznych podłączonych` : "Brak publicznych mediów"}</strong>
          <p>Inputy poniżej służą tylko do wyboru nowych plików. Zapisane media są widoczne w tej sekcji.</p>
        </div>

        {media.length > 0 ? (
          <div className="admin-media-preview-grid">
            {media.map((item) => <MediaPreviewCard key={item.id} item={item} projectId={projectId} projectSlug={projectSlug} projectCode={projectCode} />)}
          </div>
        ) : (
          <p className="admin-field-help">Ten projekt nie ma jeszcze rekordów w tabeli project_media.</p>
        )}
      </div>

      <div className="media-upload-grid">
        <AdminFileUploadBox name="heroFile" title="Hero" hint="hero.jpg" accept="image/*" />
        <AdminFileUploadBox name="thumbnailFile" title="Miniatura" hint="thumbnail.jpg" accept="image/*" />
        <AdminFileUploadBox name="galleryFiles" title="Galeria" hint="gallery-01, gallery-02..." accept="image/*" multiple />
        <AdminFileUploadBox name="floorPlanGroundFile" title="Rzut parteru" hint="floor-plan-ground.jpg" accept="image/*,.pdf" />
        <AdminFileUploadBox name="floorPlanRoofFile" title="Rzut dachu" hint="floor-plan-roof.jpg" accept="image/*,.pdf" />
        <AdminFileUploadBox name="sectionAaFile" title="Przekrój A-A" hint="section-aa.jpg" accept="image/*,.pdf" />
        <AdminFileUploadBox name="sectionBbFile" title="Przekrój B-B" hint="section-bb.jpg" accept="image/*,.pdf" />
        <AdminFileUploadBox name="elevationFrontFile" title="Elewacja frontowa" hint="elevation-front.jpg" accept="image/*,.pdf" />
        <AdminFileUploadBox name="elevationGardenFile" title="Elewacja ogrodowa" hint="elevation-garden.jpg" accept="image/*,.pdf" />
      </div>

      <div className="admin-media-current-panel private" data-admin-project-current-private-files="true" data-admin-private-file-fulfillment-source="true">
        <div className="admin-media-current-head">
          <span>Aktualne pliki prywatne</span>
          <strong>{privateFiles.length > 0 ? `${privateFiles.length} plików prywatnych podłączonych` : "Brak plików prywatnych"}</strong>
          <p>Te pliki nie są publiczne. Panel zamówień pokaże je adminowi jako materiały do ręcznej wysyłki po potwierdzeniu płatności.</p>
        </div>
        {privateFiles.length > 0 && (
          <ul className="admin-private-file-list">
            {privateFiles.map((item) => (
              <li key={item.id}>
                <strong>{privateFileLabel(item.fileType, item.title)}</strong>
                <span data-admin-private-file-type="true">Typ realizacji: {item.fileType}</span>
                <small data-admin-private-file-bucket="true">Bucket: {item.bucket || "project-private-files"}</small>
                {item.version && <small>Wersja: {item.version}</small>}
                <small data-admin-private-file-active="true">Aktywny: {item.active ? "tak" : "nie"}</small>
                <small data-admin-private-file-required-for-publication="true">Wymagany do publikacji: {item.requiredForPublication ? "tak" : "nie"}</small>
                <small data-admin-private-file-auto-send="true">Auto po płatności: {item.autoSendAfterPayment ? "tak" : "nie"}</small>
                <small data-admin-private-file-manual-fulfillment="true">Widoczne w panelu zamówień jako plik do ręcznej wysyłki.</small>
                <code>{item.path}</code>
                <button
                  type="submit"
                  formAction={setProjectPrivateFileActiveBoundAction.bind(null, projectId, item.id, !item.active)}
                  formNoValidate
                  className="admin-secondary-button"
                  data-admin-set-private-file-active="true"
                >
                  {item.active ? "Dezaktywuj plik" : "Aktywuj plik"}
                </button>
                <button
                  type="submit"
                  formAction={deleteProjectPrivateFileItemBoundAction.bind(null, projectId, item.id, item.path, item.bucket || "project-private-files")}
                  formNoValidate
                  className="admin-secondary-button"
                  data-admin-delete-private-file-item="true"
                >
                  Usuń plik prywatny
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="media-upload-grid private">
        <AdminFileUploadBox name="documentationFile" title="Dokumentacja PDF" hint="documentation-v1.pdf" accept=".pdf" />
        <AdminFileUploadBox name="floorPlansPrivateFile" title="Rzuty pomieszczeń PDF" hint="floor-plans-v1.pdf" accept=".pdf" />
        <AdminFileUploadBox name="fullPackageFile" title="Pełna paczka ZIP" hint="full-package-v1.zip" accept=".zip" />
        <AdminFileUploadBox name="pdfEmailPackageFile" title="PDF na e-mail" hint="pdf-email-package-v1.pdf" accept=".pdf" />
      </div>
    </>
  );
}
