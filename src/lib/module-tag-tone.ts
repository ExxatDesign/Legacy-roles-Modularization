/** Maps module labels to um-module-tag--* tone classes (Prism token pairs in CSS). */
const MODULE_TAG_TONE_BY_NAME: Record<string, string> = {
  ClinEd: "clined",
  "Curriculum Management": "curriculum",
  "Placement Student": "placement",
  Compliance: "compliance",
  "Exxat One": "exxat-one",
  Foundation: "foundation",
};

export function getModuleTagToneClass(moduleName: string): string {
  const tone = MODULE_TAG_TONE_BY_NAME[moduleName] ?? "default";
  return `um-module-tag--${tone}`;
}
