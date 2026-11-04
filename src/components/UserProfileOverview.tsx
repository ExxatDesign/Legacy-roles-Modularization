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

  return (
    <div className="um-role-drawer__meta-card um-user-profile-overview">
      <div className="um-role-drawer__meta um-user-profile-overview__grid">
        <div className="um-role-drawer__meta-item">
          <span className="um-role-drawer__meta-label">Name</span>
          <span className="um-role-drawer__meta-value">{user.name}</span>
        </div>
        <div className="um-role-drawer__meta-item">
          <span className="um-role-drawer__meta-label">User Name</span>
          <span className="um-role-drawer__meta-value">{user.userName}</span>
        </div>
        <div className="um-role-drawer__meta-item">
          <span className="um-role-drawer__meta-label">Email ID</span>
          <span className="um-role-drawer__meta-value">{user.emailId}</span>
        </div>
        <div className="um-role-drawer__meta-item">
          <span className="um-role-drawer__meta-label">Associated Roles</span>
          <span className="um-role-drawer__meta-value">
            <span className="um-role-count">{user.associatedRoles}</span>
          </span>
        </div>
        <div className="um-role-drawer__meta-item">
          <span className="um-role-drawer__meta-label">Module Access</span>
          <span className="um-role-drawer__meta-value">{user.moduleAccess}</span>
        </div>
        <div className="um-role-drawer__meta-item">
          <span className="um-role-drawer__meta-label">Last Login Time</span>
          <span
            className={`um-role-drawer__meta-value${isEmptyLogin(user.lastLoginTime) ? " um-cell-empty" : ""}`}
          >
            {user.lastLoginTime}
          </span>
        </div>
        <div className="um-role-drawer__meta-item">
          <span className="um-role-drawer__meta-label">Created Date And Time</span>
          <span className="um-role-drawer__meta-value">
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
          </span>
        </div>
        <div className="um-role-drawer__meta-item">
          <span className="um-role-drawer__meta-label">Last Updated Date And Time</span>
          <span className="um-role-drawer__meta-value">{user.lastUpdatedDateTime}</span>
        </div>
      </div>
    </div>
  );
}
