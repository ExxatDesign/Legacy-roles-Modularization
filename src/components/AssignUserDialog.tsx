import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ManageUsersAssignedRow } from "../data/manage-users-assigned-rows";
import { RoleIdCard } from "./RoleIdCard";

type AssignUserDialogProps = {
  open: boolean;
  users: ManageUsersAssignedRow[];
  roleName?: string;
  modules?: string[];
  showNewTag?: boolean;
  onClose: () => void;
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
  roleName = "",
  modules = [],
  showNewTag,
  onClose,
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

  useEffect(() => {
    if (open) {
      setSelectedIds([]);
      setQuery("");
      setListOpen(false);
    }
  }, [open]);

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

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return users.filter((user) => {
      if (normalizedQuery.length === 0) {
        return true;
      }
      return (
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.email.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query, users]);

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
    if (selectedUsers.length === 0) {
      return;
    }
    onAssign?.(selectedUsers);
    onClose();
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
        {roleName ? <RoleIdCard roleName={roleName} modules={modules} showNewTag={showNewTag} /> : null}
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
                  <li className="um-assign-user-combobox__option um-assign-user-combobox__option--empty" aria-disabled>
                    No matching users
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
          <button type="button" className="um-assign-user-dialog__btn um-assign-user-dialog__btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="um-assign-user-dialog__btn um-assign-user-dialog__btn--primary"
            disabled={selectedUsers.length === 0}
            onClick={handleAssign}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}
