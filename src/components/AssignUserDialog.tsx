import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ManageUsersAssignedRow } from "../data/manage-users-assigned-rows";
import type { UserManagementRoleRow } from "../data/user-management-role-rows";
import { findAlreadyAssignedUsers, userMatchesAssignSearch } from "../lib/assign-picker-search";
import { AssignPickerAlreadyAssigned } from "./AssignPickerAlreadyAssigned";
import { RoleModulesCell } from "./RoleModulesCell";
import { RoleNameWithTags } from "./RoleNameWithTags";

type AssignPhase = "edit" | "error" | "success";

type AssignUserDialogProps = {
  open: boolean;
  users: ManageUsersAssignedRow[];
  /** Users already on this role — used when search matches no pickable options. */
  assignedUsers?: ManageUsersAssignedRow[];
  role?: UserManagementRoleRow | null;
  onClose: () => void;
  onViewDetails?: () => void;
  onAssign?: (users: ManageUsersAssignedRow[]) => void;
};

function IconChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AssignUserDialog({
  open,
  users,
  assignedUsers = [],
  role = null,
  onClose,
  onViewDetails,
  onAssign,
}: AssignUserDialogProps) {
  const labelId = useId();
  const listId = useId();
  const comboboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [phase, setPhase] = useState<AssignPhase>("edit");
  const statusRef = useRef<HTMLParagraphElement>(null);

  const roleName = role?.roleName ?? "";
  const persona = role?.selectedPersona ?? "Program Level Admin";
  const description =
    role?.manageUsersDescription ??
    (role?.roleDescription && role.roleDescription !== "-"
      ? role.roleDescription
      : "This role is for program administrators who need read only access for all the functionalities that PRISM provides.");

  useEffect(() => {
    if (open) {
      setSelectedIds([]);
      setQuery("");
      setListOpen(false);
      setPhase("edit");
    }
  }, [open]);

  useEffect(() => {
    if (phase === "edit") return;
    statusRef.current?.focus();
  }, [phase]);

  useEffect(() => {
    if (!listOpen) {
      return;
    }
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setListOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [listOpen]);

  const selectedUsers = useMemo(
    () => selectedIds.map((id) => users.find((user) => user.id === id)).filter(Boolean) as ManageUsersAssignedRow[],
    [selectedIds, users],
  );

  const filteredOptions = useMemo(
    () => users.filter((user) => userMatchesAssignSearch(user, query)),
    [query, users],
  );

  const alreadyAssignedMatches = useMemo(
    () => findAlreadyAssignedUsers(query, assignedUsers),
    [assignedUsers, query],
  );

  const listEmptyMessage = useMemo(() => {
    if (query.trim().length === 0) {
      return users.length === 0 ? "No users available to assign." : null;
    }
    if (alreadyAssignedMatches.length > 0) {
      return null;
    }
    return "No matching users.";
  }, [alreadyAssignedMatches.length, query, users.length]);

  if (!open) {
    return null;
  }

  const toggleUser = (user: ManageUsersAssignedRow) => {
    setSelectedIds((current) =>
      current.includes(user.id) ? current.filter((id) => id !== user.id) : [...current, user.id],
    );
    inputRef.current?.focus();
  };

  const removeUser = (userId: string) => {
    setSelectedIds((current) => current.filter((id) => id !== userId));
    inputRef.current?.focus();
  };

  const handleAssign = () => {
    if (selectedUsers.length === 0 || phase === "success") {
      return;
    }
    setListOpen(false);
    if (phase === "edit") {
      setPhase("error");
      return;
    }
    onAssign?.(selectedUsers);
    setPhase("success");
  };

  return (
    <div className="um-assign-user-dialog" role="presentation">
      <div className="um-assign-user-dialog__backdrop" aria-hidden />
      <div
        className="um-assign-user-dialog__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
      >
        <h3 id={labelId} className="um-assign-user-dialog__title">
          Assign users to role
        </h3>
        {role ? (
          <section className="um-assign-role-brief" aria-label={`Details for ${roleName}`}>
            <div className="um-assign-role-brief__title">
              <RoleNameWithTags
                roleName={roleName}
                showNewTag={role.showNewTag}
                showLegacyTag={!role.showNewTag}
              />
              <span
                className={`um-role-type-badge${
                  role.roleType === "Custom" ? " um-role-type-badge--custom" : " um-role-type-badge--standard"
                }`}
              >
                {role.roleType}
              </span>
            </div>
            <dl className="um-assign-role-brief__facts">
              {role.modules.length > 0 ? (
                <div>
                  <dt>Module</dt>
                  <dd>
                    <RoleModulesCell modules={role.modules} />
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>Persona</dt>
                <dd>{persona}</dd>
              </div>
              <div>
                <dt>Assigned users</dt>
                <dd>{role.totalUsers}</dd>
              </div>
            </dl>
            <p className="um-assign-role-brief__summary">{description}</p>
            {onViewDetails ? (
              <button type="button" className="um-assign-role-brief__details" onClick={onViewDetails}>
                View details
              </button>
            ) : null}
          </section>
        ) : null}
        {phase !== "edit" ? (
          <p
            ref={statusRef}
            tabIndex={-1}
            className={`um-assign-user-dialog__status um-assign-user-dialog__status--${phase}`}
            role={phase === "error" ? "alert" : "status"}
          >
            {phase === "error"
              ? "Couldn't assign these users. Try again."
              : `${selectedUsers.length} ${selectedUsers.length === 1 ? "user" : "users"} assigned to ${roleName}.`}
          </p>
        ) : null}
        <div className="um-assign-user-dialog__field">
          <span className="um-assign-user-dialog__label" id={`${comboboxId}-label`}>
            Users
          </span>
          <div className="um-assign-user-combobox" ref={rootRef}>
            <div
              className={`um-assign-user-combobox__control${listOpen ? " um-assign-user-combobox__control--open" : ""}`}
            >
              {selectedUsers.map((user) => (
                <span key={user.id} className="um-assign-user-combobox__tag">
                  <span className="um-assign-user-combobox__tag-text">{user.name}</span>
                  <button
                    type="button"
                    className="um-assign-user-combobox__tag-remove"
                    aria-label={`Remove ${user.name}`}
                    onClick={() => removeUser(user.id)}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                ref={inputRef}
                id={comboboxId}
                type="text"
                className="um-assign-user-combobox__input"
                role="combobox"
                aria-expanded={listOpen}
                aria-controls={listId}
                aria-labelledby={`${comboboxId}-label`}
                aria-autocomplete="list"
                placeholder={selectedUsers.length === 0 ? "Select unassigned users" : "Type to search"}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setListOpen(true);
                }}
                onFocus={() => setListOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setListOpen(false);
                    return;
                  }
                  if (event.key === "Backspace" && query.length === 0 && selectedIds.length > 0) {
                    setSelectedIds((current) => current.slice(0, -1));
                  }
                  if (event.key === "Enter" && filteredOptions[0]) {
                    event.preventDefault();
                    toggleUser(filteredOptions[0]);
                  }
                }}
              />
              <button
                type="button"
                className="um-assign-user-combobox__toggle"
                aria-label={listOpen ? "Close user list" : "Open user list"}
                aria-expanded={listOpen}
                onClick={() => {
                  setListOpen((visible) => !visible);
                  inputRef.current?.focus();
                }}
              >
                <IconChevronDown />
              </button>
            </div>
            {listOpen ? (
              <ul
                id={listId}
                className="um-assign-user-combobox__list"
                role="listbox"
                aria-label="Unassigned users"
                aria-multiselectable="true"
              >
                {filteredOptions.length === 0 ? (
                  <li
                    className={`um-assign-user-combobox__option${
                      alreadyAssignedMatches.length > 0
                        ? " um-assign-user-combobox__option--already-assigned"
                        : " um-assign-user-combobox__option--empty"
                    }`}
                    aria-disabled
                  >
                    {alreadyAssignedMatches.length > 0 ? (
                      <AssignPickerAlreadyAssigned
                        label="Already assigned"
                        tags={alreadyAssignedMatches.map((user) => ({
                          key: user.id,
                          text: user.name,
                        }))}
                      />
                    ) : (
                      listEmptyMessage
                    )}
                  </li>
                ) : (
                  filteredOptions.map((user) => {
                    const checked = selectedIds.includes(user.id);
                    return (
                      <li key={user.id} role="option" aria-selected={checked}>
                        <label className="um-assign-user-combobox__option">
                          <input
                            type="checkbox"
                            className="um-assign-user-combobox__checkbox"
                            checked={checked}
                            onChange={() => toggleUser(user)}
                          />
                          <span className="um-assign-user-combobox__option-label">
                            {user.name} — {user.email}
                          </span>
                        </label>
                      </li>
                    );
                  })
                )}
              </ul>
            ) : null}
          </div>
        </div>
        <div className="um-assign-user-dialog__actions">
          {phase === "success" ? (
            <button type="button" className="um-assign-user-dialog__btn um-assign-user-dialog__btn--primary" onClick={onClose}>
              Done
            </button>
          ) : (
            <>
              <button type="button" className="um-assign-user-dialog__btn um-assign-user-dialog__btn--secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="um-assign-user-dialog__btn um-assign-user-dialog__btn--primary"
                disabled={selectedUsers.length === 0}
                onClick={handleAssign}
              >
                {phase === "error" ? "Try again" : "Assign"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
