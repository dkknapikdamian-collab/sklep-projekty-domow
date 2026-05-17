export const PROJECT_FILE_STORAGE_BUCKET = "project-private-files";

export const PROJECT_FILE_TYPES = [
  "documentation",
  "floor_plans",
  "pdf_email_package",
  "full_package",
  "cost_estimate"
] as const;

export type ProjectFileType = (typeof PROJECT_FILE_TYPES)[number];

export type ProjectFileTypeConfig = {
  type: ProjectFileType;
  label: string;
  requiredForPublication: boolean;
  autoSendAfterPayment: boolean;
  sortOrder: number;
};

export const PROJECT_FILE_TYPE_CONFIG: Record<ProjectFileType, ProjectFileTypeConfig> = {
  documentation: { type: "documentation", label: "Dokumentacja PDF", requiredForPublication: true, autoSendAfterPayment: true, sortOrder: 10 },
  floor_plans: { type: "floor_plans", label: "Rzuty pomieszczeń PDF", requiredForPublication: false, autoSendAfterPayment: true, sortOrder: 20 },
  pdf_email_package: { type: "pdf_email_package", label: "PDF na e-mail", requiredForPublication: false, autoSendAfterPayment: true, sortOrder: 30 },
  full_package: { type: "full_package", label: "Pełna paczka ZIP", requiredForPublication: false, autoSendAfterPayment: false, sortOrder: 40 },
  cost_estimate: { type: "cost_estimate", label: "Kosztorys", requiredForPublication: false, autoSendAfterPayment: false, sortOrder: 50 }
};

export function normalizeProjectFileType(value: string) { return String(value || "").trim().toLowerCase(); }
export function isProjectFileType(value: string): value is ProjectFileType { return PROJECT_FILE_TYPES.includes(normalizeProjectFileType(value) as ProjectFileType); }
export function getProjectFileTypeConfig(value: string): ProjectFileTypeConfig {
  const normalized = normalizeProjectFileType(value);
  if (isProjectFileType(normalized)) return PROJECT_FILE_TYPE_CONFIG[normalized];
  return { type: "documentation", label: value || "Plik prywatny", requiredForPublication: false, autoSendAfterPayment: false, sortOrder: 100 };
}
export function getProjectFileDefaults(value: string) {
  const config = getProjectFileTypeConfig(value);
  return { bucket: PROJECT_FILE_STORAGE_BUCKET, active: true, autoSendAfterPayment: config.autoSendAfterPayment, requiredForPublication: config.requiredForPublication, sortOrder: config.sortOrder };
}
export function isProjectFileActive(file: { active?: boolean | null }) { return file.active !== false; }
export function isProjectFileRequiredForPublication(file: { required_for_publication?: boolean | null; requiredForPublication?: boolean | null }) { return file.required_for_publication === true || file.requiredForPublication === true; }
export function isProjectFileAutoSendAfterPayment(file: { auto_send_after_payment?: boolean | null; autoSendAfterPayment?: boolean | null }) { return file.auto_send_after_payment === true || file.autoSendAfterPayment === true; }
