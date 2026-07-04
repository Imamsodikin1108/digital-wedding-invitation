export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://anindya-rizky.wedding";

export const PLACEHOLDER = {
  formspreeId: "YOUR_FORMSPREE_ID",
  giscusRepo: "YOUR_USERNAME/YOUR_REPO",
} as const;

export function isConfigured(value: string, placeholder: string): boolean {
  return Boolean(value) && value !== placeholder;
}

export function isFormspreeConfigured(id: string): boolean {
  return isConfigured(id, PLACEHOLDER.formspreeId);
}

export function isGiscusConfigured(repo: string): boolean {
  return isConfigured(repo, PLACEHOLDER.giscusRepo);
}
