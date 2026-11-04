import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ManageRolesAssignmentRow } from "../data/manage-roles-rows";
import { getModuleTagToneClass } from "../lib/module-tag-tone";
import { AssignRoleOptionInfo } from "./AssignRoleOptionInfo";

type AssignRolesDialogProps = {
  open: boolean;
  roles: ManageRolesAssignmentRow[];
  onClose: () => void;
  onAssign?: (roles: ManageRolesAssignmentRow[]) => void;
};

function IconChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function isLegacyAssignRole(role: ManageRolesAssignmentRow) {
  return role.showLegacyTag === true || role.allowAssign === false;
}

export function AssignRolesDialog({ open, roles, onClose, onAssign }: AssignRolesDialogProps) {
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

  const listRoles = useMemo(() => {
    return [...roles].sort((a, b) => {
      const rank = (role: ManageRolesAssignmentRow) => {
        if (role.showNewTag) {
          return 0;
        }
        if (role.showLegacyTag) {
          return 1;
        }
        return 2;
      };
      const byRank = rank(a) - rank(b);
      if (byRank !== 0) {
        return byRank;
      }
      return a.roleName.localeCompare(b.roleName);
    });
  }, [roles]);

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

  const selectedRoles = useMemo(
    () =>
      selectedIds
        .map((id) => listRoles.find((role) => role.id === id))
        .filter(Boolean) as ManageRolesAssignmentRow[],
    [listRoles, selectedIds],
  );

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return listRoles.filter((role) => {
      if (normalizedQuery.length === 0) {
        return true;
      }
      return (
        role.roleName.toLowerCase().includes(normalizedQuery) ||
        role.module.toLowerCase().includes(normalizedQuery) ||
        role.roleDescription.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [listRoles, query]);

  if (!open) {
    return null;
  }

  const toggleRole = (role: ManageRolesAssignmentRow) => {
    if (isLegacyAssignRole(role)) {
      return;
    }
    setSelectedIds((current) =>
      current.includes(role.id) ? current.filter((id) => id !== role.id) : [...current, role.id],
    );
    inputRef.current?.focus();
  };

  const removeRole = (roleId: string) => {
    setSelectedIds((current) => current.filter((id) => id !== roleId));
    inputRef.current?.focus();
  };

  const handleAssign = () => {
    if (selectedRoles.length === 0) {
      return;
    }
    onAssign?.(selectedRoles);
    onClose();
  };

  return (
    <div className="um-assign-user-dialog" role="presentation">
        <div className="um-assign-user-dialog__backdrop" aria-hidden />
        <div
          className="um-assign-user-dialog__card um-assign-user-dialog__card--wide"
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
        >
          <h3 id={labelId} className="um-assign-user-dialog__title">
            Assign roles
          </h3>
          <div className="um-assign-user-dialog__field">
            <span className="um-assign-user-dialog__label" id={`${comboboxId}-label`}>
              Roles
            </span>
            <div className="um-assign-user-combobox" ref={rootRef}>
              <div
                className={`um-assign-user-combobox__control${listOpen ? " um-assign-user-combobox__control--open" : ""}`}
              >
                {selectedRoles.map((role) => (
                  <span key={role.id} className="um-assign-user-combobox__tag">
                    <span className="um-assign-user-combobox__tag-text">{role.roleName}</span>
                    <button
                      type="button"
                      className="um-assign-user-combobox__tag-remove"
                      aria-label={`Remove ${role.roleName}`}
                      onClick={() => removeRole(role.id)}
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
                  placeholder={selectedRoles.length === 0 ? "Select roles" : "Type to search"}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setListOpen(true);
                  }}
                  onFocus={() => setListOpen(true)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setListOpen(false);
                    }
                  }}
                />
                <button
                  type="button"
                  className="um-assign-user-combobox__toggle"
                  aria-label={listOpen ? "Close role list" : "Open role list"}
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
                  className="um-assign-user-combobox__list um-assign-user-combobox__list--assign-roles"
                  role="listbox"
                  aria-label="Available roles"
                  aria-multiselectable="true"
                >
                  {filteredOptions.length === 0 ? (
                    <li className="um-assign-user-combobox__option um-assign-user-combobox__option--empty" aria-disabled>
                      No matching roles
                    </li>
                  ) : (
                    filteredOptions.map((role) => {
                      const legacyRole = isLegacyAssignRole(role);
                      const checked = !legacyRole && selectedIds.includes(role.id);
                      return (
                        <li
                          key={role.id}
                          className="um-assign-roles-list__item"
                          role="option"
                          aria-selected={checked}
                          aria-disabled={legacyRole}
                        >
                          <label
                            className={`um-assign-user-combobox__option um-assign-roles-option-row${
                              legacyRole ? " um-assign-roles-option-row--legacy-disabled" : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="um-assign-user-combobox__checkbox"
                              checked={checked}
                              disabled={legacyRole}
                              aria-disabled={legacyRole}
                              onChange={() => toggleRole(role)}
                            />
                            <span className="um-assign-roles-option__main">
                              <span className="um-assign-roles-option__name">{role.roleName}</span>
                              <span className="um-assign-roles-option__meta">
                                {role.showNewTag ? <span className="um-role-new-tag">New</span> : null}
                                {role.showLegacyTag ? <span className="um-role-legacy-tag">Legacy</span> : null}
                                <span className={`um-module-tag ${getModuleTagToneClass(role.module)}`}>
                                  {role.module}
                                </span>
                              </span>
                            </span>
                            <AssignRoleOptionInfo description={role.roleDescription} />
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
            <button
              type="button"
              className="um-assign-user-dialog__btn um-assign-user-dialog__btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="um-assign-user-dialog__btn um-assign-user-dialog__btn--primary"
              disabled={selectedRoles.length === 0}
              onClick={handleAssign}
            >
              Assign
            </button>
          </div>
        </div>
      </div>
  );
}
