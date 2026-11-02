import { useEffect, useState } from "react";
import type { UserManagementRoleRow } from "../data/user-management-role-rows";

const PERMISSION_NAV = [
  "General",
  "Plan",
  "Placement",
  "Sites and Contracts",
  "Student Compliance",
  "Faculty",
  "Student",
] as const;

type PermissionNavId = (typeof PERMISSION_NAV)[number];

const GENERAL_PERMISSION_ITEMS = [
  "Allow Users to Create, Edit & Select Templates While Sending Email out of the PRISM System",
];

function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function IconChevronUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 14l5-5 5 5H7z" />
    </svg>
  );
}

type RoleDetailsDrawerProps = {
  row: UserManagementRoleRow | null;
  onClose: () => void;
};

export function RoleDetailsDrawer({ row, onClose }: RoleDetailsDrawerProps) {
  const open = row !== null;
  const [activeNav, setActiveNav] = useState<PermissionNavId>("General");

  useEffect(() => {
    if (!open) {
      return;
    }
    setActiveNav("General");
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

  const persona = row?.selectedPersona ?? "Program Level Admin";
  const roleName = row?.roleName ?? "";
  const roleDescription =
    row?.roleDescription && row.roleDescription !== "-"
      ? row.roleDescription
      : "This role is for program administrators who need read only access for all the functionalities that PRISM provides.";

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
          <div className="um-role-drawer__meta-card">
            <div className="um-role-drawer__meta">
              <div className="um-role-drawer__meta-item">
                <span className="um-role-drawer__meta-label">Selected Persona</span>
                <span className="um-role-drawer__meta-value">{persona}</span>
              </div>
              <div className="um-role-drawer__meta-item">
                <span className="um-role-drawer__meta-label">Role name</span>
                <span className="um-role-drawer__meta-value">{roleName}</span>
              </div>
              <div className="um-role-drawer__meta-item um-role-drawer__meta-item--wide">
                <span className="um-role-drawer__meta-label">Role Description</span>
                <span className="um-role-drawer__meta-value">{roleDescription}</span>
              </div>
            </div>
          </div>

          <h3 className="um-role-drawer__section-title">Permissions</h3>

          <div className="um-role-drawer__permissions">
            <nav className="um-role-drawer__nav" aria-label="Permission categories">
              {PERMISSION_NAV.map((item) => {
                const active = item === activeNav;
                return (
                  <button
                    key={item}
                    type="button"
                    className={`um-role-drawer__nav-item${active ? " um-role-drawer__nav-item--active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setActiveNav(item)}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>

            <div className="um-role-drawer__perm-panel">
              <h4 className="um-role-drawer__perm-heading">{activeNav}</h4>
              {activeNav === "General" ? (
                <div className="um-role-drawer__accordion">
                  <div className="um-role-drawer__accordion-head">
                    <span>Program Details</span>
                    <IconChevronUp />
                  </div>
                  <ul className="um-role-drawer__accordion-body">
                    {GENERAL_PERMISSION_ITEMS.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="um-role-drawer__perm-empty">No permissions configured for this category.</p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
