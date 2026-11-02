import type { UserManagementRoleRow } from "./user-management-role-types";

/** SC1 — modular roles (Curr. Management, Compliance, Exxat One, Foundation, Tenant). */
export const MODULAR_ROLES_SC1: UserManagementRoleRow[] = [
  {
    id: "sc1-curr-read-only",
    roleName: "Curriculum Management Read Only Administrator",
    roleType: "Standard",
    modules: ["Curriculum Management"],
    showNewTag: true,
    totalUsers: 0,
    roleDescription:
      "Read-only access to curriculum management sections for program administrators who need view access without edits.",
    selectedPersona: "Program Level Admin",
  },
  {
    id: "sc1-student-compliance",
    roleName: "Compliance Student Administrator",
    roleType: "Standard",
    modules: ["Compliance"],
    showNewTag: true,
    totalUsers: 2,
    roleDescription:
      "Full access to student compliance management, including student compliance profiles and related compliance workflows.",
    selectedPersona: "Program Level Admin",
  },
  {
    id: "sc1-faculty-compliance",
    roleName: "Compliance Faculty Administrator",
    roleType: "Standard",
    modules: ["Compliance"],
    showNewTag: true,
    totalUsers: 1,
    roleDescription:
      "Full access to faculty compliance management, including faculty compliance and faculty sections.",
    selectedPersona: "Program Level Admin",
  },
  {
    id: "sc1-compliance-read-only",
    roleName: "Compliance Read Only Administrator",
    roleType: "Standard",
    modules: ["Compliance"],
    showNewTag: true,
    totalUsers: 0,
    roleDescription: "Read-only access to compliance sections for audit and oversight without edit rights.",
    selectedPersona: "Program Level Admin",
  },
  {
    id: "sc1-exxat-one",
    roleName: "Exxat One Access",
    roleType: "Standard",
    modules: ["Exxat One"],
    showNewTag: true,
    totalUsers: 0,
    roleDescription: "Access to Exxat One capabilities scoped to the program.",
    selectedPersona: "Program Level Admin",
  },
  {
    id: "sc1-config-manager",
    roleName: "Configuration Manager",
    roleType: "Standard",
    modules: ["Foundation"],
    showNewTag: true,
    totalUsers: 0,
    roleDescription:
      "Manage roles for other users, assign and remove licenses, request additional licenses, and manage notification settings for the program.",
    selectedPersona: "Program Level Admin",
  },
];
