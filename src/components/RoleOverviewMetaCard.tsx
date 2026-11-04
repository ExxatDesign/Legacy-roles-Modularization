import { useId } from "react";
import { RoleModulesCell } from "./RoleModulesCell";
import { RoleNameWithTags } from "./RoleNameWithTags";
import type { UserManagementRoleRow } from "../data/user-management-role-rows";

type RoleOverviewMetaCardProps = {
  row: UserManagementRoleRow | null;
  className?: string;
};

export function RoleOverviewMetaCard({ row, className }: RoleOverviewMetaCardProps) {
  const aboutId = useId();
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
    <article
      className={`um-fb-profile um-fb-profile--role${className ? ` ${className}` : ""}`}
      aria-label={roleName ? `Role profile for ${roleName}` : "Role profile"}
    >
      <div className="um-fb-profile__header">
        <div className="um-fb-profile__name-row">
          <RoleNameWithTags
            roleName={roleName}
            showNewTag={row?.showNewTag}
            showLegacyTag={row ? !row.showNewTag : false}
          />
        </div>
        <div className="um-fb-profile__headline um-fb-profile__headline--modules">
          <RoleModulesCell modules={row?.modules ?? []} />
        </div>
        <p className="um-fb-profile__headline">
          {persona}
          <span className="um-fb-profile__headline-sep" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <span
            className={`um-role-type-badge${
              roleType === "Custom" ? " um-role-type-badge--custom" : " um-role-type-badge--standard"
            }`}
          >
            {roleType}
          </span>
        </p>
      </div>

      <section className="um-fb-profile__about" aria-labelledby={aboutId}>
        <h4 id={aboutId} className="um-role-drawer__perm-heading">
          About this role
        </h4>
        <ul className="um-fb-profile__facts">
          <li className="um-fb-profile__fact">
            <span className="um-fb-profile__fact-label">Selected persona</span>
            <span className="um-fb-profile__fact-value">{persona}</span>
          </li>
          <li className="um-fb-profile__fact">
            <span className="um-fb-profile__fact-label">Role type</span>
            <span className="um-fb-profile__fact-value">
              <span
                className={`um-role-type-badge${
                  roleType === "Custom" ? " um-role-type-badge--custom" : " um-role-type-badge--standard"
                }`}
              >
                {roleType}
              </span>
            </span>
          </li>
          <li className="um-fb-profile__fact">
            <span className="um-fb-profile__fact-label">Total users</span>
            <span className="um-fb-profile__fact-value">
              <span
                className={`um-user-count um-user-count--display${totalUsers === 0 ? " um-user-count--zero" : ""}`}
              >
                {totalUsers}
              </span>
            </span>
          </li>
        </ul>
        <p className="um-fb-profile__bio">{roleDescription}</p>
      </section>
    </article>
  );
}
