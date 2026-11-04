import { useEffect, useMemo, useState } from "react";
import type { UserManagementRoleRow } from "../data/user-management-role-rows";
import {
  MANAGE_USERS_ASSIGNED_ROWS,
  MANAGE_USERS_UNASSIGNED_ROWS,
  type ManageUsersAssignedRow,
} from "../data/manage-users-assigned-rows";
import { AssignUserDialog } from "./AssignUserDialog";
import { LegacyUnassignConfirmDialog } from "./LegacyUnassignConfirmDialog";
import { RoleOverviewMetaCard } from "./RoleOverviewMetaCard";
import { RolePermissionsOverview } from "./RolePermissionsOverview";

type ManageView = "overview" | "assigned";

function IconClose() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
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

type ManageUsersDrawerProps = {
  row: UserManagementRoleRow | null;
  onClose: () => void;
};

export function ManageUsersDrawer({ row, onClose }: ManageUsersDrawerProps) {
  const open = row !== null;
  const isNewModularRole = row?.showNewTag === true;

  const [manageView, setManageView] = useState<ManageView>("overview");
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [pendingUnassign, setPendingUnassign] = useState<ManageUsersAssignedRow | null>(null);
  const [unassignedIds, setUnassignedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!open) {
      return;
    }
    setManageView("overview");
    setAssignDialogOpen(false);
    setUserSearchQuery("");
    setPendingUnassign(null);
    setUnassignedIds([]);
  }, [open, row?.id]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      if (assignDialogOpen || pendingUnassign) {
        if (pendingUnassign) {
          setPendingUnassign(null);
        }
        return;
      }
      onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [assignDialogOpen, open, onClose, pendingUnassign]);

  const assignedPeople = useMemo(
    () => MANAGE_USERS_ASSIGNED_ROWS.filter((user) => !unassignedIds.includes(user.id)),
    [unassignedIds],
  );

  const assignedRows = useMemo(() => {
    const query = userSearchQuery.trim().toLowerCase();
    if (query.length === 0) {
      return assignedPeople;
    }
    return assignedPeople.filter(
      (user) =>
        user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
    );
  }, [assignedPeople, userSearchQuery]);

  const handleUnassignClick = (user: ManageUsersAssignedRow) => {
    if (isNewModularRole) {
      setUnassignedIds((current) => [...current, user.id]);
      return;
    }
    setPendingUnassign(user);
  };

  const confirmLegacyUnassign = () => {
    if (pendingUnassign) {
      setUnassignedIds((current) => [...current, pendingUnassign.id]);
    }
    setPendingUnassign(null);
  };

  return (
    <div
      className={`um-drawer-root um-drawer-root--manage${open ? " um-drawer-root--open" : ""}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="um-drawer-backdrop"
        aria-label="Close manage users"
        onClick={() => {
          if (!assignDialogOpen && !pendingUnassign) {
            onClose();
          }
        }}
      />
      <aside
        className="um-manage-users-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="um-manage-users-drawer-title"
        aria-hidden={!open}
      >
        <header className="um-manage-users-drawer__header">
          <div className="um-manage-users-drawer__header-start">
            <button type="button" className="um-manage-users-drawer__close" aria-label="Close" onClick={onClose}>
              <IconClose />
            </button>
            <h2 id="um-manage-users-drawer-title" className="um-manage-users-drawer__title">
              Manage Users
            </h2>
          </div>
          {isNewModularRole ? (
            <button
              type="button"
              className="um-btn-primary um-manage-users-drawer__header-assign"
              onClick={() => setAssignDialogOpen(true)}
            >
              Assign users
            </button>
          ) : null}
        </header>

        <div className="um-manage-users-drawer__body">
          {!isNewModularRole ? (
            <div
              className="um-info-banner um-info-banner--manage-users-drawer um-info-banner--manage-users-drawer-top"
              role="note"
            >
              <span className="um-info-banner__icon">
                <IconInfo />
              </span>
              <p className="um-info-banner__text">
                This role is being phased out, hence you cannot assign any new users to this role.
                Current assignees of this role will automatically be transferred to their
                corresponding new roles. No access will be lost.
              </p>
            </div>
          ) : null}
          <RoleOverviewMetaCard key={row?.id} row={row} className="um-manage-users-drawer__role-meta" />

          <div className="um-manage-users-drawer__sub-tabs" role="tablist" aria-label="Manage users views">
            <button
              type="button"
              role="tab"
              className={`um-sub-tab${manageView === "overview" ? " um-sub-tab--active" : ""}`}
              aria-selected={manageView === "overview"}
              onClick={() => setManageView("overview")}
            >
              Overview
            </button>
            <button
              type="button"
              role="tab"
              className={`um-sub-tab${manageView === "assigned" ? " um-sub-tab--active" : ""}`}
              aria-selected={manageView === "assigned"}
              onClick={() => setManageView("assigned")}
            >
              Assigned users
              <span className="um-tab-count">{assignedPeople.length}</span>
            </button>
          </div>

          {manageView === "overview" ? (
            <div className="um-manage-users-drawer__overview">
              <RolePermissionsOverview row={row} includeMetaCard={false} />
            </div>
          ) : (
            <>
              <div className="um-manage-users-drawer__panel">
              <div className="um-manage-users-drawer__toolbar">
                <label className="um-search-field">
                  <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                  <input
                    type="search"
                    placeholder="Search"
                    aria-label="Search users by name or email"
                    value={userSearchQuery}
                    onChange={(event) => setUserSearchQuery(event.target.value)}
                  />
                </label>
              </div>
              <div className="um-manage-users-drawer__table-wrap">
                <table className="um-table um-table--manage-users" aria-label="Assigned users">
                  <thead>
                    <tr>
                      <th scope="col" className="um-col-mu-name">Name</th>
                      <th scope="col" className="um-col-mu-email">Email</th>
                      <th scope="col" className="um-col-mu-action">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedRows.map((user) => (
                      <tr key={user.id}>
                        <td className="um-col-mu-name">{user.name}</td>
                        <td className="um-col-mu-email">{user.email}</td>
                        <td className="um-col-mu-action">
                          <button type="button" className="um-btn-unassign" onClick={() => handleUnassignClick(user)}>
                            Unassign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div>
            </>
          )}
        </div>

        <AssignUserDialog
          open={assignDialogOpen}
          users={MANAGE_USERS_UNASSIGNED_ROWS}
          role={row}
          onClose={() => setAssignDialogOpen(false)}
          onViewDetails={() => setAssignDialogOpen(false)}
        />

        <LegacyUnassignConfirmDialog
          open={pendingUnassign !== null}
          context="by-role"
          roleName={row?.roleName}
          modules={row?.modules}
          onClose={() => setPendingUnassign(null)}
          onConfirm={confirmLegacyUnassign}
        />
      </aside>
    </div>
  );
}
