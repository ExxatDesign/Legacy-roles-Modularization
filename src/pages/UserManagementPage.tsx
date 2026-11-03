import { useState } from "react";
import { UserManagementSiteHeader } from "../components/UserManagementSiteHeader";
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
      <UserManagementSiteHeader />

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
