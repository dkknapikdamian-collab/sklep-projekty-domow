"use client";

import { useEffect, useMemo, useState } from "react";
import { UploadCloud } from "lucide-react";

type SelectedFilePreview = {
  name: string;
  url?: string;
  count: number;
};

type AdminFileUploadBoxProps = {
  name: string;
  title: string;
  hint: string;
  accept: string;
  multiple?: boolean;
};

function firstPreviewableImage(files: FileList | null) {
  if (!files) return undefined;
  return Array.from(files).find((file) => file.type.startsWith("image/"));
}

export function AdminFileUploadBox({ name, title, hint, accept, multiple }: AdminFileUploadBoxProps) {
  const [preview, setPreview] = useState<SelectedFilePreview | null>(null);
  const previewText = useMemo(() => {
    if (!preview) return hint;
    return preview.count > 1 ? `${preview.name} +${preview.count - 1}` : preview.name;
  }, [hint, preview]);

  useEffect(() => {
    return () => {
      if (preview?.url) URL.revokeObjectURL(preview.url);
    };
  }, [preview?.url]);

  return (
    <label className="upload-box admin-file-upload-box" data-admin-file-upload-preview="true">
      <span className="admin-upload-preview-thumb">
        {preview?.url ? <img src={preview.url} alt={preview.name} /> : <UploadCloud size={25} />}
      </span>
      <strong>{title}</strong>
      <span>{previewText}</span>
      <input
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={(event) => {
          const files = event.currentTarget.files;
          const firstFile = files?.[0];
          const previewableImage = firstPreviewableImage(files);

          setPreview((current) => {
            if (current?.url) URL.revokeObjectURL(current.url);
            if (!firstFile) return null;
            return {
              name: firstFile.name,
              count: files?.length || 1,
              url: previewableImage ? URL.createObjectURL(previewableImage) : undefined
            };
          });
        }}
      />
    </label>
  );
}
