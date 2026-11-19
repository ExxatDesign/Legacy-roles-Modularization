import type { UserManagementRoleRow } from "./user-management-role-types";

/** Static Exam Management roles (assignable in User Management when module is enabled). */
export const EXAM_MANAGEMENT_STATIC_ROLES: UserManagementRoleRow[] = [
  {
    id: "exam-admin",
    roleName: "Exam Management - Admin",
    roleType: "Standard",
    modules: ["Exam Management"],
    showNewTag: true,
    examRoleKind: "static",
    examScope: "program",
    totalUsers: 3,
    selectedPersona: "Program Level Admin",
    roleDescription: "Program-level administrative access to Exam Management.",
    manageUsersDescription: "Program-level administrative access to Exam Management.",
  },
  {
    id: "exam-admin-limited",
    roleName: "Exam Management - Admin Limited",
    roleType: "Standard",
    modules: ["Exam Management"],
    showNewTag: true,
    examRoleKind: "static",
    examScope: "program",
    totalUsers: 1,
    selectedPersona: "Program Level Admin",
    roleDescription: "Program-level administrative access to Exam Management with a limited permission set.",
    manageUsersDescription: "Program-level administrative access to Exam Management with a limited permission set.",
  },
  {
    id: "exam-faculty",
    roleName: "Exam Management - Faculty",
    roleType: "Standard",
    modules: ["Exam Management"],
    showNewTag: true,
    examRoleKind: "static",
    examScope: "course-associated",
    totalUsers: 14,
    selectedPersona: "Faculty",
    roleDescription: "Faculty access to Exam Management for associated courses.",
    manageUsersDescription: "Faculty access to Exam Management for associated courses.",
  },
];

export const EXAM_DYNAMIC_ROLE_NAMES = [
  "Exam Management - Course Manager",
  "Exam Management - Course Contributor",
] as const;

export const EXAM_COLLABORATOR_ROLE_NAMES = [
  "Exam Management - Collaborate",
  "Exam Management - Publish",
  "Exam Management - Proctor",
  "Exam Management - Grade",
] as const;