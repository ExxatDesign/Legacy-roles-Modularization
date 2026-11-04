import type { UserManagementRow } from "../data/user-management-rows";

function isEmptyLogin(value: string) {
  return value.trim().toLowerCase() === "no data found";
}

type UserProfileOverviewProps = {
  user: UserManagementRow | null;
};

export function UserProfileOverview({ user }: UserProfileOverviewProps) {
  if (!user) {
    return null;
  }

  const roleLabel = user.associatedRoles === 1 ? "1 associated role" : `${user.associatedRoles} associated roles`;

  return (
    <article className="um-fb-profile um-fb-profile--person" aria-label={`Profile for ${user.name}`}>
      <div className="um-role-meta">
        <h4 className="um-fb-profile__name">{user.name}</h4>
        <p className="um-fb-profile__headline">
          <span>{user.moduleAccess}</span>
          <span className="um-fb-profile__headline-sep" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <span>{user.emailId}</span>
          <span className="um-fb-profile__headline-sep" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <span>{roleLabel}</span>
        </p>
        <p className="um-fb-profile__meta">
          <span>
            Last login{" "}
            <span className={isEmptyLogin(user.lastLoginTime) ? "um-cell-empty" : undefined}>
              {user.lastLoginTime}
            </span>
          </span>
          <span className="um-fb-profile__headline-sep" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <span className="um-datetime-cell">
            Created {user.createdDateTime}
            {user.showCreatedInfoIcon ? (
              <span
                className="um-date-info-icon"
                title="Date set when the institute joined Exxat"
                aria-label="Institute join fallback date"
              >
                i
              </span>
            ) : null}
          </span>
          <span className="um-fb-profile__headline-sep" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <span>Updated {user.lastUpdatedDateTime}</span>
        </p>
      </div>
    </article>
  );
}
