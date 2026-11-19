export type RoleType = "Standard" | "Custom";

export type ExamAccessScope = "program" | "course-associated";

export type UserManagementRoleRow = {
  id: string;
  roleName: string;
  roleType: RoleType;
  modules: string[];
  totalUsers: number;
  roleDescription: string;
  selectedPersona?: string;
  showNewTag?: boolean;
  unassignedTableVariant?: "sc2";
  manageUsersDescription?: string;
  /** Exam Management static roles — assignable scope label */
  examScope?: ExamAccessScope;
  /** Shown in By Role directory for Exam static roles */
  examRoleKind?: "static";
};
