import { useEffect, useMemo, useState } from "react";
import {
  LegacyAssignDeprecationAlert,
} from "./legacy-assign-deprecation";
import { RoleNameWithTags } from "./RoleNameWithTags";
import type { UserManagementRow } from "../data/user-management-rows";
import {
  getAssignedRolesForUser,
  getUnassignedRolesForUser,
} from "../data/manage-roles-rows";

type AssignmentView = "assigned" | "unassigned";

function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
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

type ManageRolesDrawerProps = {
  user: UserManagementRow | null;
  onClose: () => void;
};

export function ManageRolesDrawer({ user, onClose }: ManageRolesDrawerProps) {
  const open = user !== null;
  const [assignmentView, setAssignmentView] = useState<AssignmentView>("assigned");
  const [deprecationAlertOpen, setDeprecationAlertOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    setAssignmentView("assigned");
    setDeprecationAlertOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      setDeprecationAlertOpen((visible) => {
        if (visible) {
          return false;
        }
        onClose();
        return false;
      });
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const assignedRows = useMemo(() => (user ? getAssignedRolesForUser(user) : []), [user]);
  const unassignedRows = useMemo(() => (user ? getUnassignedRolesForUser(user) : []), [user]);

  const isUnassignedView = assignmentView === "unassigned";
  const panelRows = isUnassignedView ? unassignedRows : assignedRows;
  const totalRows = panelRows.length;
  const rangeLabel = totalRows === 0 ? "0 – 0 of 0" : `1 – ${totalRows} of ${totalRows}`;

  const userName = user?.name ?? "";

  return (
    <div
      className={`um-drawer-root um-drawer-root--manage${open ? " um-drawer-root--open" : ""}`}
      aria-hidden={!open}
    >
      <button type="button" className="um-drawer-backdrop" aria-label="Close manage roles" onClick={onClose} />
      <aside
        className="um-manage-users-drawer um-manage-roles-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="um-manage-roles-drawer-title"
        aria-hidden={!open}
      >
        <header className="um-manage-users-drawer__header">
          <button type="button" className="um-manage-users-drawer__close" aria-label="Close" onClick={onClose}>
            <IconClose />
          </button>
          <h2 id="um-manage-roles-drawer-title" className="um-manage-users-drawer__title">
            Manage Roles
          </h2>
        </header>

        <div className="um-manage-users-drawer__body">
          <div className="um-manage-roles-drawer__intro">
            <div className="um-manage-users-drawer__field">
              <span className="um-manage-users-drawer__label">User</span>
              <span className="um-manage-users-drawer__value um-manage-roles-drawer__user-name">{userName}</span>
            </div>
          </div>

          <div className="um-segment-toggle" role="tablist" aria-label="Role assignment">
            <button
              type="button"
              role="tab"
              className={`um-segment-toggle__btn${assignmentView === "assigned" ? " um-segment-toggle__btn--active" : ""}`}
              aria-selected={assignmentView === "assigned"}
              onClick={() => setAssignmentView("assigned")}
            >
              Assigned
            </button>
            <button
              type="button"
              role="tab"
              className={`um-segment-toggle__btn${assignmentView === "unassigned" ? " um-segment-toggle__btn--active" : ""}`}
              aria-selected={assignmentView === "unassigned"}
              onClick={() => setAssignmentView("unassigned")}
            >
              Unassigned
            </button>
          </div>

          <div className="um-manage-users-drawer__panel">
            <div className="um-manage-users-drawer__toolbar">
              <div className="um-search-bar um-search-bar--drawer">
                <div className="um-search-bar__lead">
                  <IconSearchOutline />
                  <span className="um-search-bar__lead-text">Search</span>
                </div>
                <div className="um-search-bar__divider" role="separator" aria-orientation="vertical" />
                <input type="search" className="um-search-bar__input" aria-label="Search roles" />
              </div>
            </div>

            <div className="um-manage-users-drawer__table-wrap">
              <table className="um-table um-table--manage-roles">
                <thead>
                  <tr>
                    <th className="um-col-mr-name">Role Name</th>
                    <th className="um-col-mr-desc">Role Description</th>
                    <th className="um-col-mr-module">Module(s)</th>
                    {!isUnassignedView ? (
                      <th className="um-col-mr-datetime">Assigned Date and Time</th>
                    ) : null}
                    <th className="um-col-mr-action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {panelRows.map((roleRow) => {
                    const legacyAssignBlocked = isUnassignedView && roleRow.allowAssign === false;
                    return (
                      <tr key={roleRow.id}>
                        <td className="um-col-mr-name">
                          <RoleNameWithTags
                            roleName={roleRow.roleName}
                            showNewTag={isUnassignedView && roleRow.allowAssign === true}
                          />
                        </td>
                        <td className="um-col-mr-desc">{roleRow.roleDescription}</td>
                        <td className="um-col-mr-module">{roleRow.module}</td>
                        {!isUnassignedView ? (
                          <td className="um-col-mr-datetime">{roleRow.assignedDateTime}</td>
                        ) : null}
                        <td className="um-col-mr-action">
                          <button
                            type="button"
                            className={`um-btn-unassign${legacyAssignBlocked ? " um-btn-unassign--blocked" : ""}`}
                            aria-disabled={legacyAssignBlocked || undefined}
                            onClick={
                              legacyAssignBlocked ? () => setDeprecationAlertOpen(true) : undefined
                            }
                          >
                            {isUnassignedView ? "Assign" : "Unassign"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="um-paginator um-paginator--drawer" aria-label="Roles table pagination">
              <label className="um-paginator__page-size">
                Items per page:
                <select className="um-paginator__select" defaultValue="20" aria-label="Items per page">
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </label>
              <div className="um-paginator__divider" aria-hidden />
              <span className="um-paginator__range">{rangeLabel}</span>
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
                <button type="button" className="um-page-btn um-page-btn--icon" aria-label="Next page" disabled>
                  ›
                </button>
                <button type="button" className="um-page-btn um-page-btn--icon" aria-label="Last page" disabled>
                  ›|
                </button>
              </div>
            </div>
          </div>
        </div>

        <LegacyAssignDeprecationAlert
          open={deprecationAlertOpen}
          onClose={() => setDeprecationAlertOpen(false)}
        />
      </aside>
    </div>
  );
}
