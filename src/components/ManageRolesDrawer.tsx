import { useEffect, useMemo, useState } from "react";
import { AssignRolesDialog } from "./AssignRolesDialog";
import { RoleNameWithTags } from "./RoleNameWithTags";
import { UserProfileOverview } from "./UserProfileOverview";
import type { UserManagementRow } from "../data/user-management-rows";
import {
  getAssignedRolesForUser,
  getUnassignedRolesForUser,
  type ManageRolesAssignmentRow,
} from "../data/manage-roles-rows";
import { LegacyUnassignConfirmDialog } from "./LegacyUnassignConfirmDialog";

function isLegacyRoleAssignment(row: ManageRolesAssignmentRow) {
  return row.showLegacyTag === true;
}

function IconClose() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

type ManageRolesDrawerProps = {
  user: UserManagementRow | null;
  onClose: () => void;
};

export function ManageRolesDrawer({ user, onClose }: ManageRolesDrawerProps) {
  const open = user !== null;

  const [roleSearchQuery, setRoleSearchQuery] = useState("");
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [pendingUnassign, setPendingUnassign] = useState<ManageRolesAssignmentRow | null>(null);
  const [unassignedRoleIds, setUnassignedRoleIds] = useState<string[]>([]);
  const [addedRoles, setAddedRoles] = useState<ManageRolesAssignmentRow[]>([]);

  useEffect(() => {
    if (!open) {
      return;
    }
    setRoleSearchQuery("");
    setAssignDialogOpen(false);
    setPendingUnassign(null);
    setUnassignedRoleIds([]);
    setAddedRoles([]);
  }, [open, user?.userName]);

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

  const assignedRows = useMemo(
    () => (user ? [...getAssignedRolesForUser(user), ...addedRoles] : addedRoles),
    [addedRoles, user],
  );
  const unassignedRoles = useMemo(() => {
    if (!user) {
      return [];
    }
    const assignedNames = new Set(
      assignedRows.filter((row) => !unassignedRoleIds.includes(row.id)).map((row) => row.roleName),
    );
    return getUnassignedRolesForUser(user).filter((role) => !assignedNames.has(role.roleName));
  }, [assignedRows, unassignedRoleIds, user]);

  const currentlyAssignedRows = useMemo(
    () => assignedRows.filter((row) => !unassignedRoleIds.includes(row.id)),
    [assignedRows, unassignedRoleIds],
  );

  const filteredAssignedRows = useMemo(() => {
    const query = roleSearchQuery.trim().toLowerCase();
    const visible = currentlyAssignedRows;
    if (query.length === 0) {
      return visible;
    }
    return visible.filter(
      (row) =>
        row.roleName.toLowerCase().includes(query) ||
        row.roleDescription.toLowerCase().includes(query),
    );
  }, [currentlyAssignedRows, roleSearchQuery]);

  const handleUnassignClick = (roleRow: ManageRolesAssignmentRow) => {
    setPendingUnassign(roleRow);
  };

  const confirmLegacyUnassign = () => {
    if (pendingUnassign) {
      setUnassignedRoleIds((current) => [...current, pendingUnassign.id]);
    }
    setPendingUnassign(null);
  };

  const assignRoles = (roles: ManageRolesAssignmentRow[]) => {
    const assignedDateTime = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(new Date());
    setAddedRoles((current) => [
      ...current,
      ...roles.map((role, index) => ({
        ...role,
        id: `${role.id}-assigned-${current.length + index}`,
        assignedDateTime,
        allowAssign: true,
      })),
    ]);
  };

  const totalRows = filteredAssignedRows.length;
  const rangeLabel = totalRows === 0 ? "0 – 0 of 0" : `1 – ${totalRows} of ${totalRows}`;

  return (
    <div
      className={`um-drawer-root um-drawer-root--manage${open ? " um-drawer-root--open" : ""}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="um-drawer-backdrop"
        aria-label="Close manage roles"
        onClick={() => {
          if (!assignDialogOpen && !pendingUnassign) {
            onClose();
          }
        }}
      />
      <aside
        className="um-manage-users-drawer um-manage-roles-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="um-manage-roles-drawer-title"
        aria-hidden={!open}
      >
        <header className="um-manage-users-drawer__header">
          <div className="um-manage-users-drawer__header-start">
            <button type="button" className="um-manage-users-drawer__close" aria-label="Close" onClick={onClose}>
              <IconClose />
            </button>
            <h2 id="um-manage-roles-drawer-title" className="um-manage-users-drawer__title">
              Manage Roles
            </h2>
          </div>
        </header>

        <div className="um-manage-users-drawer__body um-manage-roles-drawer__body">
          <section className="um-manage-roles-drawer__section" aria-labelledby="um-manage-roles-overview-heading">
            <h3 id="um-manage-roles-overview-heading" className="um-manage-roles-drawer__section-title">
              Overview
            </h3>
            <UserProfileOverview key={user?.userName} user={user} />
          </section>

          <section className="um-manage-roles-drawer__section" aria-labelledby="um-manage-roles-assigned-heading">
            <div className="um-manage-roles-drawer__section-head">
              <h3 id="um-manage-roles-assigned-heading" className="um-manage-roles-drawer__section-title">
                Assigned roles
              </h3>
              <button
                type="button"
                className="um-btn-primary um-manage-roles-drawer__assign"
                onClick={() => setAssignDialogOpen(true)}
              >
                Assign roles
              </button>
            </div>
            <div className="um-manage-users-drawer__panel">
              <div className="um-manage-users-drawer__toolbar">
                <label className="um-search-field">
                  <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                  <input
                    type="search"
                    placeholder="Search"
                    aria-label="Search by role name and description"
                    value={roleSearchQuery}
                    onChange={(event) => setRoleSearchQuery(event.target.value)}
                  />
                </label>
              </div>

              <div className="um-manage-users-drawer__table-wrap">
                <table className="um-table um-table--manage-roles" aria-label="Assigned roles">
                  <thead>
                    <tr>
                      <th scope="col" className="um-col-mr-name">Role Name</th>
                      <th scope="col" className="um-col-mr-desc">Role Description</th>
                      <th scope="col" className="um-col-mr-module">Module(s)</th>
                      <th scope="col" className="um-col-mr-datetime">Assigned Date and Time</th>
                      <th scope="col" className="um-col-mr-action">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssignedRows.map((roleRow) => (
                      <tr key={roleRow.id}>
                        <td className="um-col-mr-name">
                          <RoleNameWithTags
                            roleName={roleRow.roleName}
                            showNewTag={roleRow.showNewTag}
                            showLegacyTag={roleRow.showLegacyTag}
                          />
                        </td>
                        <td className="um-col-mr-desc">{roleRow.roleDescription}</td>
                        <td className="um-col-mr-module">{roleRow.module}</td>
                        <td className="um-col-mr-datetime">{roleRow.assignedDateTime}</td>
                        <td className="um-col-mr-action">
                          <button
                            type="button"
                            className="um-btn-unassign"
                            onClick={() => handleUnassignClick(roleRow)}
                          >
                            Unassign
                          </button>
                        </td>
                      </tr>
                    ))}
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
          </section>
        </div>

        <AssignRolesDialog
          open={assignDialogOpen}
          roles={unassignedRoles}
          assignedRoles={currentlyAssignedRows}
          onClose={() => setAssignDialogOpen(false)}
          onAssign={assignRoles}
        />

        <LegacyUnassignConfirmDialog
          open={pendingUnassign !== null}
          context="by-name"
          legacy={pendingUnassign ? isLegacyRoleAssignment(pendingUnassign) : true}
          roleName={pendingUnassign?.roleName}
          modules={
            pendingUnassign?.module && pendingUnassign.module !== "—" ? [pendingUnassign.module] : []
          }
          showNewTag={pendingUnassign?.showNewTag}
          showLegacyTag={pendingUnassign?.showLegacyTag}
          subjectName={user?.name}
          onClose={() => setPendingUnassign(null)}
          onConfirm={confirmLegacyUnassign}
        />
      </aside>
    </div>
  );
}
