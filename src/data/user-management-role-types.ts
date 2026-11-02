export type RoleType = "Standard" | "Custom";

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
};
