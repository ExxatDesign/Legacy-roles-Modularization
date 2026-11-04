import { RoleModulesCell } from "./RoleModulesCell";
import { RoleNameWithTags } from "./RoleNameWithTags";
import type { UserManagementRoleRow } from "../data/user-management-role-rows";

type RoleOverviewMetaCardProps = {
  row: UserManagementRoleRow | null;
  className?: string;
};

export function RoleOverviewMetaCard({ row, className }: RoleOverviewMetaCardProps) {
  const persona = row?.selectedPersona ?? "Program Level Admin";
  const roleName = row?.roleName ?? "";
  const roleType = row?.roleType ?? "Standard";
  const totalUsers = row?.totalUsers ?? 0;
  const roleDescription =
    row?.manageUsersDescription ??
    (row?.roleDescription && row.roleDescription !== "-"
      ? row.roleDescription
      : "This role is for program administrators who need read only access for all the functionalities that PRISM provides.");

  return (
    <div className={`um-role-drawer__meta-card${className ? ` ${className}` : ""}`}>
      <div className="um-role-drawer__meta">
        <div className="um-role-drawer__meta-item">
          <span className="um-role-drawer__meta-label">Role name</span>
          <span className="um-role-drawer__meta-value um-role-drawer__meta-value--with-modules">
            <RoleNameWithTags
              roleName={roleName}
              showNewTag={row?.showNewTag}
              showLegacyTag={row ? !row.showNewTag : false}
            />
            <RoleModulesCell modules={row?.modules ?? []} />
          </span>
        </div>
        <div className="um-role-drawer__meta-item">
          <span className="um-role-drawer__meta-label">Selected Persona</span>
          <span className="um-role-drawer__meta-value">{persona}</span>
        </div>
        <div className="um-role-drawer__meta-item">
          <span className="um-role-drawer__meta-label">Role Type</span>
          <span className="um-role-drawer__meta-value">
            <span
              className={`um-role-type-badge${
                roleType === "Custom" ? " um-role-type-badge--custom" : " um-role-type-badge--standard"
              }`}
            >
              {roleType}
            </span>
          </span>
        </div>
        <div className="um-role-drawer__meta-item">
          <span className="um-role-drawer__meta-label">Total Users</span>
          <span className="um-role-drawer__meta-value">
            <span
              className={`um-user-count um-user-count--display${totalUsers === 0 ? " um-user-count--zero" : ""}`}
            >
              {totalUsers}
            </span>
          </span>
        </div>
        <div className="um-role-drawer__meta-item um-role-drawer__meta-item--wide">
          <span className="um-role-drawer__meta-label">Role Description</span>
          <span className="um-role-drawer__meta-value">{roleDescription}</span>
        </div>
      </div>
    </div>
  );
}
