import { useEffect } from "react";
import type { UserManagementRoleRow } from "../data/user-management-role-rows";
import { RolePermissionsOverview } from "./RolePermissionsOverview";

function IconClose() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

type RoleDetailsDrawerProps = {
  row: UserManagementRoleRow | null;
  onClose: () => void;
};

export function RoleDetailsDrawer({ row, onClose }: RoleDetailsDrawerProps) {
  const open = row !== null;

  useEffect(() => {
    if (!open) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div className={`um-drawer-root${open ? " um-drawer-root--open" : ""}`} aria-hidden={!open}>
      <button type="button" className="um-drawer-backdrop" aria-label="Close role details" onClick={onClose} />
      <aside
        className="um-role-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="um-role-drawer-title"
        aria-hidden={!open}
      >
        <header className="um-role-drawer__header">
          <button type="button" className="um-role-drawer__close" aria-label="Close" onClick={onClose}>
            <IconClose />
          </button>
          <h2 id="um-role-drawer-title" className="um-role-drawer__title">
            Role Details
          </h2>
        </header>

        <div className="um-role-drawer__body">
          <RolePermissionsOverview key={row?.id} row={row} />
        </div>
      </aside>
    </div>
  );
}
