import { useState, type ReactNode } from "react";
import { ManageRolesDrawer } from "../components/ManageRolesDrawer";
import { RoleModulesCell } from "../components/RoleModulesCell";
import { ModularizationBanner } from "../components/ModularizationBanner";
import { RoleNameWithTags } from "../components/RoleNameWithTags";
import { ManageUsersDrawer } from "../components/ManageUsersDrawer";
import { RoleDetailsDrawer } from "../components/RoleDetailsDrawer";
import type { UserManagementRoleRow } from "../data/user-management-role-rows";
import { USER_MANAGEMENT_ROLE_ROWS } from "../data/user-management-role-rows";
import type { UserManagementRow } from "../data/user-management-rows";
import { USER_MANAGEMENT_ROWS } from "../data/user-management-rows";

type RolesView = "by-role" | "by-name";

const MAIN_TABS = [
  "Setup",
  "Standards",
  "Notification Hub",
  "User Roles",
  "Program 360",
  "Calendar",
] as const;

function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="5" cy="5" r="1.75" />
      <circle cx="12" cy="5" r="1.75" />
      <circle cx="19" cy="5" r="1.75" />
      <circle cx="5" cy="12" r="1.75" />
      <circle cx="12" cy="12" r="1.75" />
      <circle cx="19" cy="12" r="1.75" />
      <circle cx="5" cy="19" r="1.75" />
      <circle cx="12" cy="19" r="1.75" />
      <circle cx="19" cy="19" r="1.75" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22zm7-6V11a7 7 0 0 0-5-6.71V4a2 2 0 1 0-4 0v.29A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2z" />
    </svg>
  );
}

/** Document with check — legacy tasks icon */
function IconTaskList() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2 5 5h-5V4zM8 13.5l1.41 1.41L12 12.33l4.59 4.58L18 15.5l-6-6-6 6z" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2v3l3.5-3H20a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
      <path d="M7 18.5 9.5 16H4V6h14v8H9l-2 4.5z" opacity="0.45" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 10l5 5 5-5H7z" />
    </svg>
  );
}

function IconMegaphone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 11c.7 0 1.37-.1 2-.29V16l-8 4V4l8 4v3.71c-.63-.19-1.3-.29-2-.29zM4 9v6h4l5 5V4L8 9H4z" />
    </svg>
  );
}

function IconLeoMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3c2 4 6 5 6 9s-4 5-6 9c-2-4-6-5-6-9s4-5 6-9z" />
      <path d="M12 8v8M8 12h8" strokeLinecap="round" />
    </svg>
  );
}

function IconSearchOutline() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <circle cx="10.5" cy="10.5" r="6.75" />
      <path d="M15.5 15.5L20 20" strokeLinecap="round" />
    </svg>
  );
}

function IconExportOutline() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <rect x="4" y="5" width="11" height="14" rx="1" />
      <path d="M15 12h5M18 9.5L20.5 12 18 14.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  );
}

function IconSortUp() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 14l5-5 5 5H7z" />
    </svg>
  );
}

function IconSortDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 10l5 5 5-5H7z" />
    </svg>
  );
}

function IconFilterOutline() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
    </svg>
  );
}

function IconEyeOutline() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  );
}

function UtilityIconButton({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-label={label} className={`um-icon-btn ${className ?? ""}`}>
      {children}
    </button>
  );
}

function isEmptyLogin(value: string) {
  return value.trim().toLowerCase() === "no data found";
}

export function UserManagementPage() {
  const [rolesView, setRolesView] = useState<RolesView>("by-role");
  const [roleDetailsRow, setRoleDetailsRow] = useState<UserManagementRoleRow | null>(null);
  const [manageUsersRole, setManageUsersRole] = useState<UserManagementRoleRow | null>(null);
  const [manageRolesUser, setManageRolesUser] = useState<UserManagementRow | null>(null);

  return (
    <div className="um-page">
      <header className="um-site-header">
        <div className="um-site-header__left">
          <button type="button" aria-label="Open menu" className="um-icon-btn">
            <IconMenu />
          </button>
          <h1 className="um-site-header__title">User Management</h1>
        </div>

        <div className="um-site-header__utilities">
          <div className="um-site-header__icon-group">
            <UtilityIconButton label="Apps">
              <IconGrid />
            </UtilityIconButton>
            <div className="um-notify-wrap">
              <UtilityIconButton label="Notifications">
                <IconBell />
              </UtilityIconButton>
              <span className="um-notify-badge">New</span>
            </div>
            <UtilityIconButton label="Tasks">
              <IconTaskList />
            </UtilityIconButton>
          </div>
          <button type="button" className="um-btn-help" aria-label="Help">
            ?
          </button>
          <button type="button" className="um-btn-chat">
            <IconChat />
            Chat
          </button>
          <UtilityIconButton label="Announcements" className="um-icon-btn--dark">
            <IconMegaphone />
          </UtilityIconButton>
          <button type="button" className="um-btn-ask-leo">
            <IconLeoMark />
            Ask Leo
          </button>
          <button type="button" className="um-user-block" aria-label="Account menu">
            <span className="um-user-block__text">
              <span className="um-user-block__name">Alexia Bracken d</span>
              <span className="um-user-block__org">Exxat Sales Golden Data (Nursing)</span>
            </span>
            <IconChevronDown />
          </button>
        </div>
      </header>

      <div className="um-primary-tabs-rail">
        <nav className="um-primary-tabs" aria-label="Setup sections">
          {MAIN_TABS.map((tab) => {
            const active = tab === "User Roles";
            return (
              <button
                key={tab}
                type="button"
                className={`um-primary-tab${active ? " um-primary-tab--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      <section className="um-content">
        <div className="um-content-inset">
          <ModularizationBanner />
          <div className="um-sub-tabs" role="tablist" aria-label="User roles view">
            <button
              type="button"
              role="tab"
              className={`um-sub-tab${rolesView === "by-role" ? " um-sub-tab--active" : ""}`}
              aria-selected={rolesView === "by-role"}
              onClick={() => setRolesView("by-role")}
            >
              By Role
            </button>
            <button
              type="button"
              role="tab"
              className={`um-sub-tab${rolesView === "by-name" ? " um-sub-tab--active" : ""}`}
              aria-selected={rolesView === "by-name"}
              onClick={() => setRolesView("by-name")}
            >
              By Name
            </button>
          </div>

          <div className="um-data-panel">
          <div className="um-toolbar">
            <div className="um-search-bar">
              <div className="um-search-bar__lead">
                <IconSearchOutline />
                <span className="um-search-bar__lead-text">Search</span>
              </div>
              <div className="um-search-bar__divider" role="separator" aria-orientation="vertical" />
              <input type="search" className="um-search-bar__input" aria-label="Search" />
              {rolesView === "by-role" ? (
                <button type="button" className="um-search-bar__export" aria-label="Filter">
                  <IconFilterOutline />
                </button>
              ) : (
                <button type="button" className="um-search-bar__export" aria-label="Export">
                  <IconExportOutline />
                </button>
              )}
            </div>
          </div>

          {rolesView === "by-name" ? (
            <div className="um-info-banner" role="note">
              <span className="um-info-banner__icon">
                <IconInfo />
              </span>
              <p className="um-info-banner__text">
                The <span className="um-info-inline-i">i</span> icon indicates that if we didn&apos;t
                track when users were created and last updated, we set the date and time to when the
                institute joined Exxat.
              </p>
            </div>
          ) : null}

          {rolesView === "by-role" ? (
            <div className="um-table-wrap um-table-wrap--by-role">
              <table className="um-table um-table--by-role">
                <thead>
                  <tr>
                    <th className="um-col-role-name">Role Name</th>
                    <th className="um-col-role-type">Role Type</th>
                    <th className="um-col-role-module">Module(s)</th>
                    <th className="um-col-total-users">
                      <span className="um-th-sort">
                        Total Users
                        <IconSortDown />
                      </span>
                    </th>
                    <th className="um-col-role-desc">Role Description</th>
                    <th className="um-col-role-action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {USER_MANAGEMENT_ROLE_ROWS.map((row) => (
                    <tr key={row.id}>
                      <td className="um-col-role-name">
                        <RoleNameWithTags roleName={row.roleName} showNewTag={row.showNewTag} />
                      </td>
                      <td className="um-col-role-type">
                        <span
                          className={`um-role-type-badge${
                            row.roleType === "Custom" ? " um-role-type-badge--custom" : " um-role-type-badge--standard"
                          }`}
                        >
                          {row.roleType}
                        </span>
                      </td>
                      <td className="um-col-role-module">
                        <RoleModulesCell modules={row.modules} />
                      </td>
                      <td className="um-col-total-users">
                        <button
                          type="button"
                          className={`um-user-count${row.totalUsers === 0 ? " um-user-count--zero" : ""}`}
                        >
                          {row.totalUsers}
                        </button>
                      </td>
                      <td className="um-col-role-desc">{row.roleDescription}</td>
                      <td className="um-col-role-action">
                        <div className="um-role-action-cell">
                          <button
                            type="button"
                            className="um-btn-manage um-btn-manage-user"
                            onClick={() => setManageUsersRole(row)}
                          >
                            Manage User
                          </button>
                          <button
                            type="button"
                            className="um-btn-icon-view"
                            aria-label={`View role details for ${row.roleName}`}
                            onClick={() => setRoleDetailsRow(row)}
                          >
                            <IconEyeOutline />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="um-table-split">
              <div className="um-table-scroll">
                <table className="um-table um-table--data">
                  <thead>
                    <tr>
                      <th className="um-col-name">
                        <span className="um-th-sort">
                          Name
                          <IconSortUp />
                        </span>
                      </th>
                      <th className="um-col-user">User Name</th>
                      <th className="um-col-email">Email ID</th>
                      <th className="um-col-roles">Associated Roles</th>
                      <th className="um-col-module">Module Access</th>
                      <th className="um-col-login">Last Login Time</th>
                      <th className="um-col-created">Created Date And Time</th>
                      <th className="um-col-updated">Last Updated Date And Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USER_MANAGEMENT_ROWS.map((row) => (
                      <tr key={row.userName}>
                        <td className="um-col-name">{row.name}</td>
                        <td className="um-col-user">{row.userName}</td>
                        <td className="um-col-email">{row.emailId}</td>
                        <td className="um-col-roles">
                          <span className="um-role-count">{row.associatedRoles}</span>
                        </td>
                        <td className="um-col-module">{row.moduleAccess}</td>
                        <td
                          className={`um-col-login${isEmptyLogin(row.lastLoginTime) ? " um-cell-empty" : ""}`}
                        >
                          {row.lastLoginTime}
                        </td>
                        <td className="um-col-created">
                          <span className="um-datetime-cell">
                            <span>{row.createdDateTime}</span>
                            {row.showCreatedInfoIcon ? (
                              <span
                                className="um-date-info-icon"
                                title="Date set when the institute joined Exxat"
                                aria-label="Institute join fallback date"
                              >
                                i
                              </span>
                            ) : null}
                          </span>
                        </td>
                        <td className="um-col-updated">{row.lastUpdatedDateTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="um-table-action-rail">
                <table className="um-table um-table--actions">
                  <thead>
                    <tr>
                      <th className="um-col-action">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USER_MANAGEMENT_ROWS.map((row) => (
                      <tr key={row.userName}>
                        <td className="um-col-action">
                          <button
                            type="button"
                            className="um-btn-manage"
                            onClick={() => setManageRolesUser(row)}
                          >
                            Manage Role
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="um-paginator" aria-label="Table pagination">
            <label className="um-paginator__page-size">
              Items per page:
              <select className="um-paginator__select" defaultValue="10" aria-label="Items per page">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </label>
            <div className="um-paginator__divider" aria-hidden />
            <span className="um-paginator__range">
              {rolesView === "by-role" ? "1 – 10 of 15" : "1 – 10 of 67"}
            </span>
            <div className="um-paginator__divider" aria-hidden />
            <div className="um-paginator__nav">
              <button type="button" className="um-page-btn um-page-btn--icon" aria-label="First page" disabled>
                |‹
              </button>
              <button type="button" className="um-page-btn um-page-btn--icon" aria-label="Previous page" disabled>
                ‹
              </button>
              <button type="button" className="um-page-btn um-page-btn--active" aria-label="Page 1">
                1
              </button>
              <button type="button" className="um-page-btn um-page-btn--number" aria-label="Page 2">
                2
              </button>
              <span className="um-page-ellipsis" aria-hidden>
                …
              </span>
              <button type="button" className="um-page-btn um-page-btn--icon" aria-label="Next page">
                ›
              </button>
              <button type="button" className="um-page-btn um-page-btn--icon" aria-label="Last page">
                ›|
              </button>
            </div>
          </div>
          </div>
        </div>
      </section>

      <RoleDetailsDrawer row={roleDetailsRow} onClose={() => setRoleDetailsRow(null)} />
      <ManageUsersDrawer row={manageUsersRole} onClose={() => setManageUsersRole(null)} />
      <ManageRolesDrawer user={manageRolesUser} onClose={() => setManageRolesUser(null)} />
    </div>
  );
}
