import type { UserManagementRow } from "./user-management-rows";
import { MODULAR_ROLES_SC1 } from "./modular-roles-sc1";
import { MODULAR_ROLES_SC2_NEW } from "./modular-roles-sc2";
import type { UserManagementRoleRow } from "./user-management-role-types";
import { USER_MANAGEMENT_ROLE_ROWS } from "./user-management-role-rows";

export type ManageRolesAssignmentRow = {
  id: string;
  roleName: string;
  roleDescription: string;
  module: string;
  assignedDateTime?: string;
  allowAssign?: boolean;
  showNewTag?: boolean;
  showLegacyTag?: boolean;
};

function toManageRow(role: UserManagementRoleRow, allowAssign: boolean): ManageRolesAssignmentRow {
  return {
    id: role.id,
    roleName: role.roleName,
    roleDescription: role.roleDescription,
    module: role.modules[0] ?? "—",
    allowAssign,
    showNewTag: role.showNewTag,
    showLegacyTag: allowAssign ? undefined : !role.showNewTag,
  };
}

const NEW_MODULAR_UNASSIGNED: ManageRolesAssignmentRow[] = [...MODULAR_ROLES_SC2_NEW, ...MODULAR_ROLES_SC1].map((role) =>
  toManageRow(role, true),
);

const LEGACY_UNASSIGNED: ManageRolesAssignmentRow[] = USER_MANAGEMENT_ROLE_ROWS.filter(
  (role) => !role.showNewTag,
).map((role) => toManageRow(role, false));

const BROWN_ASSIGNED: ManageRolesAssignmentRow[] = [
  {
    id: "brown-assigned-legacy-faculty",
    roleName: "Standard Faculty Role",
    roleDescription: "This role would grant faculty access to the user.",
    module: "FacultyPersona",
    assignedDateTime: "03/31/2026 06:09:51",
    allowAssign: false,
    showLegacyTag: true,
  },
  {
    id: "brown-assigned-clined-admin",
    roleName: "ClinEd Clinical Education Administrator",
    roleDescription:
      "Full access to all ClinEd clinical education sections, including managing all aspects of clinical education for the program.",
    module: "ClinEd",
    assignedDateTime: "04/02/2026 10:22:15 AM EDT",
    allowAssign: true,
    showNewTag: true,
  },
];

const GENERIC_ASSIGNED: ManageRolesAssignmentRow[] = [
  {
    id: "generic-assigned-1",
    roleName: "Standard Faculty Role",
    roleDescription: "This role would grant faculty access to the user.",
    module: "FacultyPersona",
    assignedDateTime: "03/31/2026 06:09:51",
    allowAssign: false,
    showLegacyTag: true,
  },
  {
    id: "generic-assigned-2",
    roleName: "ClinEd Placement Administrator",
    roleDescription:
      "Full access to ClinEd placement workflows, including sites, placements, and related clinical education operations for the program.",
    module: "ClinEd",
    assignedDateTime: "04/01/2026 09:15:03",
    allowAssign: true,
    showNewTag: true,
  },
];

/** New modular roles first, then legacy (By Name → Assign roles picker). */
const UNASSIGNED_ROLES: ManageRolesAssignmentRow[] = [...NEW_MODULAR_UNASSIGNED, ...LEGACY_UNASSIGNED];

export function getAssignedRolesForUser(user: UserManagementRow): ManageRolesAssignmentRow[] {
  if (user.name === "Brown, Dr. Michael") {
    return BROWN_ASSIGNED;
  }
  if (user.associatedRoles <= 1) {
    return GENERIC_ASSIGNED.slice(0, 1);
  }
  return GENERIC_ASSIGNED.slice(0, Math.min(user.associatedRoles, GENERIC_ASSIGNED.length));
}

export function getUnassignedRolesForUser(_user: UserManagementRow): ManageRolesAssignmentRow[] {
  return UNASSIGNED_ROLES;
}
