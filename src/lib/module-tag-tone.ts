/**
 * Module marks follow the Exxat home product tiles
 * (https://exxat-ds-home.pages.dev/home).
 * Prism apps share #E31C79. Sites and Contracts uses the admin indigo.
 * Foundation uses the workspace slate.
 */
const MODULE_TAG_TONE_BY_NAME: Record<string, string> = {
  ClinEd: "clined",
  "Curriculum Management": "curriculum",
  Compliance: "compliance",
  "Sites and Contracts": "sites",
  Foundation: "foundation",
};

export function getModuleTone(moduleName: string): string {
  return MODULE_TAG_TONE_BY_NAME[moduleName] ?? "default";
}

export function getModuleTagToneClass(moduleName: string): string {
  return `um-module-tag--${getModuleTone(moduleName)}`;
}
