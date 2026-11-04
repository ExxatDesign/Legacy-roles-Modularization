export type PrismColorTheme =
  | "theme-blue-light"
  | "theme-blue-dark"
  | "theme-purple-light"
  | "theme-purple-dark"
  | "theme-highcontrast-light"
  | "theme-highcontrast-dark";

export const PRISM_COLOR_THEME_STORAGE_KEY = "exxat-prism-color-theme";

export type PrismColorThemeOption = {
  id: PrismColorTheme;
  label: string;
  scheme: "light" | "dark";
};

export const PRISM_COLOR_THEME_OPTIONS: PrismColorThemeOption[] = [
  { id: "theme-blue-light", label: "Blue Light", scheme: "light" },
  { id: "theme-blue-dark", label: "Blue Dark", scheme: "dark" },
  { id: "theme-purple-light", label: "Purple Light", scheme: "light" },
  { id: "theme-purple-dark", label: "Purple Dark", scheme: "dark" },
  { id: "theme-highcontrast-light", label: "High Contrast Light", scheme: "light" },
  { id: "theme-highcontrast-dark", label: "High Contrast Dark", scheme: "dark" },
];

const VALID = new Set<string>(PRISM_COLOR_THEME_OPTIONS.map((t) => t.id));

export function parsePrismColorTheme(raw: string | null): PrismColorTheme {
  if (raw && VALID.has(raw)) return raw as PrismColorTheme;
  return "theme-blue-light";
}

export function themeWithScheme(theme: PrismColorTheme, scheme: "light" | "dark"): PrismColorTheme {
  const family = theme.replace(/-(light|dark)$/, "");
  const next = `${family}-${scheme}` as PrismColorTheme;
  if (VALID.has(next)) return next;
  return scheme === "dark" ? "theme-blue-dark" : "theme-blue-light";
}

export function applyPrismColorTheme(theme: PrismColorTheme): void {
  const root = document.documentElement;
  for (const opt of PRISM_COLOR_THEME_OPTIONS) {
    root.classList.remove(opt.id);
  }
  root.classList.remove("dark");
  root.classList.add(theme);
  const scheme = PRISM_COLOR_THEME_OPTIONS.find((t) => t.id === theme)?.scheme;
  if (scheme === "dark") {
    root.classList.add("dark");
  }
  localStorage.setItem(PRISM_COLOR_THEME_STORAGE_KEY, theme);
}
