export type RoleType = "Standard" | "Custom";

export type UserManagementRoleRow = {
  id: string;
  roleName: string;
  roleType: RoleType;
  module: string;
  totalUsers: number;
  roleDescription: string;
  selectedPersona?: string;
  /** New modular roles — Unassigned tab allows assign; legacy roles show deprecation empty state */
  showNewTag?: boolean;
  /** Legacy role that still shows the sc2 unassigned assign table (Manage Users → Unassigned) */
  unassignedTableVariant?: "sc2";
  manageUsersDescription?: string;
};

export const USER_MANAGEMENT_ROLE_ROWS: UserManagementRoleRow[] = [
  {
    id: "standard-faculty",
    roleName: "Standard Faculty Role",
    roleType: "Standard",
    module: "ClinEd",
    totalUsers: 62,
    roleDescription:
      "Provides access to faculty-specific modules including student evaluations, course management, and reporting.",
    manageUsersDescription: "This role would grant faculty access to the user.",
  },
  {
    id: "program-super-admin",
    roleName: "Program Super Administrator",
    roleType: "Standard",
    module: "Curriculum Management",
    totalUsers: 4,
    roleDescription:
      "Full administrative access to program configuration, user management, and all module settings.",
    selectedPersona: "Program Level Admin",
    unassignedTableVariant: "sc2",
  },
  {
    id: "global",
    roleName: "Global",
    roleType: "Standard",
    module: "Compliance",
    totalUsers: 3,
    roleDescription:
      "Institution-wide access across all programs and modules with read and write permissions.",
  },
  {
    id: "clinical-coordinator",
    roleName: "Clinical Coordinator",
    roleType: "Standard",
    module: "Placement Student",
    showNewTag: true,
    totalUsers: 2,
    roleDescription:
      "Manages clinical placements, site contracts, and student scheduling for assigned cohorts.",
  },
  {
    id: "compliance-admin",
    roleName: "Compliance Administrator",
    roleType: "Standard",
    module: "Compliance",
    showNewTag: true,
    totalUsers: 1,
    roleDescription:
      "Oversees compliance requirements, document review, and accreditation reporting workflows.",
  },
  {
    id: "custom-admissions",
    roleName: "Admissions Reviewer (Custom)",
    roleType: "Custom",
    module: "Curriculum Management",
    showNewTag: true,
    totalUsers: 1,
    roleDescription:
      "Custom role for reviewing applicant materials and updating admission status within the admissions module.",
  },
  {
    id: "student",
    roleName: "Student",
    roleType: "Standard",
    module: "Placement Student",
    showNewTag: true,
    totalUsers: 0,
    roleDescription: "-",
  },
  {
    id: "preceptor",
    roleName: "Preceptor",
    roleType: "Standard",
    module: "ClinEd",
    showNewTag: true,
    totalUsers: 0,
    roleDescription: "-",
  },
  {
    id: "read-only",
    roleName: "Program Read Only Administrator",
    roleType: "Standard",
    module: "Curriculum Management",
    showNewTag: true,
    totalUsers: 0,
    roleDescription:
      "This role is for program administrators who need read only access for all the functionalities that PRISM provides.",
    selectedPersona: "Program Level Admin",
  },
  {
    id: "reporting",
    roleName: "Reporting Analyst",
    roleType: "Standard",
    module: "Compliance",
    showNewTag: true,
    totalUsers: 0,
    roleDescription:
      "View-only access to analytics dashboards and export capabilities for institutional reports.",
  },
];
