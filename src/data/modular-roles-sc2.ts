import type { UserManagementRoleRow } from "./user-management-role-types";

/** SC2 — ClinEd modular (New) and legacy program roles from capability mapping. */
export const MODULAR_ROLES_SC2_NEW: UserManagementRoleRow[] = [
  {
    id: "sc2-clined-admin",
    roleName: "ClinEd Clinical Education Administrator",
    roleType: "Standard",
    modules: ["ClinEd"],
    showNewTag: true,
    totalUsers: 0,
    roleDescription:
      "Full access to all ClinEd clinical education sections, including managing all aspects of clinical education for the program.",
    selectedPersona: "Program Level Admin",
  },
  {
    id: "sc2-clined-read-only",
    roleName: "ClinEd Clinical Education Read Only Administrator",
    roleType: "Standard",
    modules: ["ClinEd"],
    showNewTag: true,
    totalUsers: 0,
    roleDescription: "Read-only access to all ClinEd clinical education sections.",
    selectedPersona: "Program Level Admin",
  },
  {
    id: "sc2-clined-placement-admin",
    roleName: "ClinEd Placement Administrator",
    roleType: "Standard",
    modules: ["ClinEd"],
    showNewTag: true,
    totalUsers: 3,
    roleDescription:
      "Full access to ClinEd placement workflows, including sites, placements, and related clinical education operations for the program.",
    selectedPersona: "Program Level Admin",
  },
];

export const MODULAR_ROLES_SC2_LEGACY: UserManagementRoleRow[] = [
  {
    id: "sc2-limited-site-contract",
    roleName: "Limited Access Site & Contract Administrator",
    roleType: "Standard",
    modules: ["ClinEd"],
    totalUsers: 1,
    roleDescription:
      "Manage site, location, personnel, and contract entries without access to interventions, communications, assessments, or other modules.",
  },
  {
    id: "sc2-site-placement-legacy",
    roleName: "Site & Placement Administrator",
    roleType: "Standard",
    modules: ["ClinEd"],
    totalUsers: 5,
    roleDescription: "Complete access to site and placement functionalities within the legacy ClinEd role model.",
  },
  {
    id: "sc2-prism-lite",
    roleName: "PRISM LITE",
    roleType: "Standard",
    modules: ["ClinEd"],
    totalUsers: 0,
    roleDescription:
      "Limited access for PTAMACS/PTMACS clients to set up placement forms for students during placements.",
  },
];
