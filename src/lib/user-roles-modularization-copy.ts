/** Product copy for legacy → module-scoped role transition (User Roles). */
export const USER_ROLES_MODULARIZATION_BANNER =
  "Legacy standard roles span multiple modules and are being retired in favor of module-scoped roles. Roles marked New belong to a single module (for example, ClinEd or Placement Student). Existing users on legacy roles keep their access; new assignments to those roles are limited during the transition.";

export function isLegacyStandardRole(row: { showNewTag?: boolean }) {
  return !row.showNewTag;
}
