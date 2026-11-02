import { MODULAR_ROLES_SC1 } from "./modular-roles-sc1";
import { MODULAR_ROLES_SC2_LEGACY, MODULAR_ROLES_SC2_NEW } from "./modular-roles-sc2";
export type { RoleType, UserManagementRoleRow } from "./user-management-role-types";

/** Cross-module legacy standard roles (sunset path). */
const LEGACY_CROSS_MODULE_ROLES: import("./user-management-role-types").UserManagementRoleRow[] = [
  {
    id: "standard-faculty",
    roleName: "Standard Faculty Role",
    roleType: "Standard",
    modules: ["ClinEd", "Curriculum Management", "Placement Student"],
    totalUsers: 62,
    roleDescription:
      "Legacy cross-module faculty access spanning multiple products. Existing assignments remain valid.",
    manageUsersDescription: "This role would grant faculty access to the user.",
  },
  {
    id: "program-super-admin",
    roleName: "Program Super Administrator",
    roleType: "Standard",
    modules: ["Curriculum Management", "ClinEd", "Compliance", "Placement Student"],
    totalUsers: 4,
    roleDescription:
      "Legacy program-wide administrator across all modules. Existing assignments remain valid.",
    selectedPersona: "Program Level Admin",
    unassignedTableVariant: "sc2",
  },
  {
    id: "global",
    roleName: "Global",
    roleType: "Standard",
    modules: ["ClinEd", "Curriculum Management", "Compliance", "Placement Student"],
    totalUsers: 3,
    roleDescription: "Legacy institution-wide access across all modules. Existing assignments remain valid.",
  },
];

export const USER_MANAGEMENT_ROLE_ROWS: import("./user-management-role-types").UserManagementRoleRow[] = [
  ...LEGACY_CROSS_MODULE_ROLES,
  ...MODULAR_ROLES_SC2_LEGACY,
  ...MODULAR_ROLES_SC2_NEW,
  ...MODULAR_ROLES_SC1,
];
