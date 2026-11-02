import type { UserManagementRow } from "./user-management-rows";

export type ManageRolesAssignmentRow = {
  id: string;
  roleName: string;
  roleDescription: string;
  module: string;
  assignedDateTime?: string;
  /** Unassigned list — false shows blocked Assign + deprecation popup */
  allowAssign?: boolean;
};

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
    roleName: "Program Read Only Administrator",
    roleDescription:
      "This role is for program administrators who need read only access for all the functionalities that PRISM provides.",
    module: "Curriculum Management",
    assignedDateTime: "04/01/2026 09:15:03",
  },
];

const UNASSIGNED_ROLES: ManageRolesAssignmentRow[] = [
  {
    id: "unassigned-1",
    roleName: "Program Super Administrator",
    roleDescription: "Full administrative access to program configuration, user management, and all module settings.",
    module: "Curriculum Management",
    allowAssign: false,
  },
  {
    id: "unassigned-2",
    roleName: "Clinical Coordinator",
    roleDescription: "Manages clinical placements, site contracts, and student scheduling for assigned cohorts.",
    module: "Placement Student",
    allowAssign: true,
  },
  {
    id: "unassigned-3",
    roleName: "Compliance Administrator",
    roleDescription: "Oversees compliance requirements, document review, and accreditation reporting workflows.",
    module: "Compliance",
    allowAssign: true,
  },
  {
    id: "unassigned-4",
    roleName: "Global",
    roleDescription: "Institution-wide access across all programs and modules with read and write permissions.",
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
