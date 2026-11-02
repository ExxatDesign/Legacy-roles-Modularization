import type { UserManagementRow } from "./user-management-rows";
import { MODULAR_ROLES_SC1 } from "./modular-roles-sc1";
import { MODULAR_ROLES_SC2_NEW } from "./modular-roles-sc2";
import type { UserManagementRoleRow } from "./user-management-role-types";

export type ManageRolesAssignmentRow = {
  id: string;
  roleName: string;
  roleDescription: string;
  module: string;
  assignedDateTime?: string;
  allowAssign?: boolean;
};

function toManageRow(role: UserManagementRoleRow, allowAssign: boolean): ManageRolesAssignmentRow {
  return {
    id: role.id,
    roleName: role.roleName,
    roleDescription: role.roleDescription,
    module: role.modules[0] ?? "—",
    allowAssign,
  };
}

const NEW_MODULAR_UNASSIGNED: ManageRolesAssignmentRow[] = [...MODULAR_ROLES_SC2_NEW, ...MODULAR_ROLES_SC1]
  .slice(0, 6)
  .map((role) => toManageRow(role, true));

const BROWN_ASSIGNED: ManageRolesAssignmentRow[] = [
  {
    id: "brown-assigned-1",
    roleName: "Standard Faculty Role",
    roleDescription: "This role would grant faculty access to the user.",
    module: "FacultyPersona",
    assignedDateTime: "03/31/2026 06:09:51",
  },
];

const GENERIC_ASSIGNED: ManageRolesAssignmentRow[] = [
  {
    id: "generic-assigned-1",
    roleName: "Standard Faculty Role",
    roleDescription: "This role would grant faculty access to the user.",
    module: "FacultyPersona",
    assignedDateTime: "03/31/2026 06:09:51",
  },
  {
    id: "generic-assigned-2",
    roleName: "ClinEd Placement Administrator",
    roleDescription:
      "Full access to ClinEd placement workflows, including sites, placements, and related clinical education operations for the program.",
    module: "ClinEd",
    assignedDateTime: "04/01/2026 09:15:03",
  },
];

const UNASSIGNED_ROLES: ManageRolesAssignmentRow[] = [
  {
    id: "unassigned-1",
    roleName: "Program Super Administrator",
    roleDescription: "Legacy program-wide administrator across all modules. Existing assignments remain valid.",
    module: "Curriculum Management",
    allowAssign: false,
  },
  ...NEW_MODULAR_UNASSIGNED,
  {
    id: "unassigned-global",
    roleName: "Global",
    roleDescription: "Legacy institution-wide access across all modules. Existing assignments remain valid.",
    module: "Compliance",
    allowAssign: false,
  },
];

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
