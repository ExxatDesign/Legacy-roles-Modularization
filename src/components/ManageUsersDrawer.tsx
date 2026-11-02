import { useEffect, useState } from "react";
import type { UserManagementRoleRow } from "../data/user-management-role-rows";
import {
  MANAGE_USERS_ASSIGNED_ROWS,
  MANAGE_USERS_UNASSIGNED_ROWS,
  MANAGE_USERS_UNASSIGNED_ROWS_SC2,
} from "../data/manage-users-assigned-rows";
import {
  LegacyAssignDeprecationAlert,
  LegacyAssignDeprecationCopy,
} from "./legacy-assign-deprecation";

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

type ManageUsersDrawerProps = {
  row: UserManagementRoleRow | null;
  onClose: () => void;
};

export function ManageUsersDrawer({ row, onClose }: ManageUsersDrawerProps) {
  const open = row !== null;
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

  const roleName = row?.roleName ?? "";
  const roleDescription =
    row?.manageUsersDescription ??
    (row?.roleDescription && row.roleDescription !== "-"
      ? row.roleDescription
      : "This role would grant faculty access to the user.");

  const isUnassignedView = assignmentView === "unassigned";
  const showDeprecationEmpty =
    isUnassignedView && !row?.showNewTag && row?.unassignedTableVariant !== "sc2";

  const unassignedRows =
    row?.unassignedTableVariant === "sc2"
      ? MANAGE_USERS_UNASSIGNED_ROWS_SC2
      : MANAGE_USERS_UNASSIGNED_ROWS;
  const panelRows = isUnassignedView ? unassignedRows : MANAGE_USERS_ASSIGNED_ROWS;
  const legacyAssignBlocked = isUnassignedView && !row?.showNewTag;

  return (
    <div
      className={`um-drawer-root um-drawer-root--manage${open ? " um-drawer-root--open" : ""}`}
      aria-hidden={!open}
    >
      <button type="button" className="um-drawer-backdrop" aria-label="Close manage users" onClick={onClose} />
      <aside
        className="um-manage-users-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="um-manage-users-drawer-title"
        aria-hidden={!open}
      >
        <header className="um-manage-users-drawer__header">
          <button type="button" className="um-manage-users-drawer__close" aria-label="Close" onClick={onClose}>
            <IconClose />
          </button>
          <h2 id="um-manage-users-drawer-title" className="um-manage-users-drawer__title">
            Manage Users
          </h2>
        </header>

        <div className="um-manage-users-drawer__body">
          <div className="um-manage-users-drawer__intro">
            <div className="um-manage-users-drawer__field">
              <span className="um-manage-users-drawer__label">Role</span>
              <span className="um-manage-users-drawer__value">{roleName}</span>
            </div>
            <div className="um-manage-users-drawer__field um-manage-users-drawer__field--wide">
              <span className="um-manage-users-drawer__label">Role Description</span>
              <span className="um-manage-users-drawer__value">{roleDescription}</span>
            </div>
          </div>

          <div className="um-segment-toggle" role="tablist" aria-label="User assignment">
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
            {showDeprecationEmpty ? (
              <div className="um-manage-users-drawer__empty" role="status">
                <div className="um-legacy-assign-deprecation um-manage-users-drawer__empty-text">
                  <LegacyAssignDeprecationCopy idPrefix="um-manage-empty" />
                </div>
              </div>
            ) : (
              <>
                <div className="um-manage-users-drawer__toolbar">
                  <div className="um-search-bar um-search-bar--drawer">
                    <div className="um-search-bar__lead">
                      <IconSearchOutline />
                      <span className="um-search-bar__lead-text">Search</span>
                    </div>
                    <div className="um-search-bar__divider" role="separator" aria-orientation="vertical" />
                    <input type="search" className="um-search-bar__input" aria-label="Search users" />
                  </div>
                </div>

                <div className="um-manage-users-drawer__table-wrap">
                  <table className="um-table um-table--manage-users">
                    <thead>
                      <tr>
                        <th className="um-col-mu-name">Name</th>
                        <th className="um-col-mu-email">Email</th>
                        <th className="um-col-mu-action">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {panelRows.map((user) => (
                        <tr key={user.id}>
                          <td className="um-col-mu-name">{user.name}</td>
                          <td className="um-col-mu-email">{user.email}</td>
                          <td className="um-col-mu-action">
                            <button
                              type="button"
                              className={`um-btn-unassign${legacyAssignBlocked ? " um-btn-unassign--blocked" : ""}`}
                              aria-disabled={legacyAssignBlocked || undefined}
                              onClick={
                                legacyAssignBlocked
                                  ? () => setDeprecationAlertOpen(true)
                                  : undefined
                              }
                            >
                              {isUnassignedView ? "Assign" : "Unassign"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
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
