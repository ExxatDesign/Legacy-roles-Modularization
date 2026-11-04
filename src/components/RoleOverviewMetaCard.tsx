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
  const roleDescription =
    row?.manageUsersDescription ??
    (row?.roleDescription && row.roleDescription !== "-"
      ? row.roleDescription
      : "This role is for program administrators who need read only access for all the functionalities that PRISM provides.");

  return (
    <article
      className={`um-fb-profile um-fb-profile--role${className ? ` ${className}` : ""}`}
      aria-label={roleName ? `Role profile for ${roleName}` : "Role profile"}
    >
      <div className="um-role-meta">
        <div className="um-role-meta__title">
          <RoleNameWithTags
            roleName={roleName}
            showNewTag={row?.showNewTag}
            showLegacyTag={row ? !row.showNewTag : false}
          />
          <span
            className={`um-role-type-badge${
              roleType === "Custom" ? " um-role-type-badge--custom" : " um-role-type-badge--standard"
            }`}
          >
            {roleType}
          </span>
        </div>

        <dl className="um-role-meta__facts">
          <div className="um-role-meta__fact">
            <dt className="um-role-meta__label">Module</dt>
            <dd className="um-role-meta__value">
              <RoleModulesCell modules={row?.modules ?? []} />
            </dd>
          </div>
          <div className="um-role-meta__fact">
            <dt className="um-role-meta__label">Persona</dt>
            <dd className="um-role-meta__value">{persona}</dd>
          </div>
        </dl>

        <p className="um-role-meta__summary">
          {roleDescription}
        </p>
      </div>
    </article>
  );
}
