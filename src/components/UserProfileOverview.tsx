import { useId, type ReactNode } from "react";
import type { UserManagementRow } from "../data/user-management-rows";

function isEmptyLogin(value: string) {
  return value.trim().toLowerCase() === "no data found";
}

type ProfileFactProps = {
  label: string;
  children: ReactNode;
};

function ProfileFact({ label, children }: ProfileFactProps) {
  return (
    <li className="um-fb-profile__fact">
      <span className="um-fb-profile__fact-label">{label}</span>
      <span className="um-fb-profile__fact-value">{children}</span>
    </li>
  );
}

type UserProfileOverviewProps = {
  user: UserManagementRow | null;
};

export function UserProfileOverview({ user }: UserProfileOverviewProps) {
  const aboutId = useId();

  if (!user) {
    return null;
  }

  return (
    <article className="um-fb-profile" aria-label={`Profile for ${user.name}`}>
      <div className="um-fb-profile__header">
        <h4 className="um-fb-profile__name">{user.name}</h4>
        <p className="um-fb-profile__headline">
          {user.moduleAccess}
          <span className="um-fb-profile__headline-sep" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <span className="um-fb-profile__headline-roles">
            <span className="um-role-count">{user.associatedRoles}</span> associated roles
          </span>
        </p>
      </div>

      <section className="um-fb-profile__about" aria-labelledby={aboutId}>
        <h5 id={aboutId} className="um-fb-profile__about-title">
          About
        </h5>
        <ul className="um-fb-profile__facts">
          <ProfileFact label="User name">{user.userName}</ProfileFact>
          <ProfileFact label="Email">{user.emailId}</ProfileFact>
          <ProfileFact label="Module access">{user.moduleAccess}</ProfileFact>
          <ProfileFact label="Last login">
            <span className={isEmptyLogin(user.lastLoginTime) ? "um-cell-empty" : undefined}>
              {user.lastLoginTime}
            </span>
          </ProfileFact>
          <ProfileFact label="Created">
            <span className="um-datetime-cell">
              <span>{user.createdDateTime}</span>
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
          </ProfileFact>
          <ProfileFact label="Last updated">{user.lastUpdatedDateTime}</ProfileFact>
        </ul>
      </section>
    </article>
  );
}
