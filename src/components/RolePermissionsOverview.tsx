import { useEffect, useState } from "react";
import { RoleOverviewMetaCard } from "./RoleOverviewMetaCard";
import type { UserManagementRoleRow } from "../data/user-management-role-rows";
import { getExamPermissionsForRole } from "../data/exam-role-permissions";
import { EXAM_MANAGEMENT_MODULE } from "../lib/exam-management-feature";

const BASE_PERMISSION_NAV = [
  "General",
  "Plan",
  "Placement",
  "Sites and Contracts",
  "Student Compliance",
  "Faculty",
  "Student",
] as const;

type PermissionNavId = (typeof BASE_PERMISSION_NAV)[number] | "Exam Management";

const GENERAL_PERMISSION_ITEMS = [
  "Allow Users to Create, Edit & Select Templates While Sending Email out of the PRISM System",
];

function IconChevronUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 14l5-5 5 5H7z" />
    </svg>
  );
}

type RolePermissionsOverviewProps = {
  row: UserManagementRoleRow | null;
  includeMetaCard?: boolean;
};

export function RolePermissionsOverview({ row, includeMetaCard = true }: RolePermissionsOverviewProps) {
  const showExamNav = row?.modules.includes(EXAM_MANAGEMENT_MODULE) === true;
  const permissionNav = showExamNav ? ["Exam Management" as const] : [...BASE_PERMISSION_NAV];
  const [activeNav, setActiveNav] = useState<PermissionNavId>("General");
  const examPermissionGroups = getExamPermissionsForRole(row?.id);

  useEffect(() => {
    setActiveNav(showExamNav ? "Exam Management" : "General");
  }, [row?.id, showExamNav]);

  return (
    <>
      {includeMetaCard ? <RoleOverviewMetaCard row={row} /> : null}

      <h3 className="um-role-drawer__section-title">Permissions</h3>

      <div className="um-role-drawer__permissions">
        <nav className="um-role-drawer__nav" aria-label="Permission categories">
          {permissionNav.map((item) => {
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
          ) : activeNav === "Exam Management" ? (
            <div className="um-role-drawer__perm-groups">
              {examPermissionGroups.map((group) => (
                <div key={group.title} className="um-role-drawer__accordion">
                  <div className="um-role-drawer__accordion-head">
                    <span>{group.title}</span>
                    <IconChevronUp />
                  </div>
                  <ul className="um-role-drawer__accordion-body">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="um-role-drawer__perm-empty">No permissions configured for this category.</p>
          )}
        </div>
      </div>
    </>
  );
}
