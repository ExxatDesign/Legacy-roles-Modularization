import { createContext, useContext, useState, type ReactNode } from "react";
import { USER_MANAGEMENT_ROWS, type UserManagementRow } from "../data/user-management-rows";
import { getAssignedRolesForUser, type ManageRolesAssignmentRow } from "../data/manage-roles-rows";
import { INITIAL_EXAM_FACULTY_ROLE_MAPPINGS, examCourseRoleLabel } from "../data/exam-faculty-role-mapping";
import { getExamEffectiveAccessForUser } from "../data/exam-effective-access";
import { EXAM_MANAGEMENT_ENABLED } from "./exam-management-feature";
import { EXAM_COLLABORATOR_ROLE_NAMES } from "../data/exam-management-roles";

export type CollaboratorRole = typeof EXAM_COLLABORATOR_ROLE_NAMES[number];
export const PROGRAM = "Nursing program";
export const ASSESSMENTS = ["Midterm — Pharmacology (Spring 2026)", "Skills check — Health Assessment", "Final — Pathophysiology"];
export type Grant = { id: string; userName: string; assessmentName: string; collaboratorRole: CollaboratorRole; grantedBy: string; grantedAt: string };
export function useAccessState() {
  const [assignments, setAssignments] = useState<Record<string, ManageRolesAssignmentRow[]>>(() => Object.fromEntries(USER_MANAGEMENT_ROWS.map(user => [user.userName, getAssignedRolesForUser(user)])));
  const [mappings, setMappings] = useState(INITIAL_EXAM_FACULTY_ROLE_MAPPINGS);
  const [grants, setGrants] = useState<Grant[]>(() => USER_MANAGEMENT_ROWS.flatMap(user => getExamEffectiveAccessForUser(user).collaborators.map(grant => ({ ...grant, id: `${user.userName}:${grant.id}`, userName: user.userName, collaboratorRole: grant.collaboratorRole as CollaboratorRole }))));
  const rolesFor = (user: UserManagementRow) => (assignments[user.userName] ?? []).filter(role => EXAM_MANAGEMENT_ENABLED || role.module !== "Exam Management");
  const eligible = (user: UserManagementRow) => EXAM_MANAGEMENT_ENABLED && rolesFor(user).some(role => role.module === "Exam Management");
  const assign = (user: UserManagementRow, roles: ManageRolesAssignmentRow[]) => setAssignments(current => {
    const existing = current[user.userName] ?? [];
    return { ...current, [user.userName]: [...existing, ...roles.filter(role => !existing.some(item => item.roleName === role.roleName) && (EXAM_MANAGEMENT_ENABLED || role.module !== "Exam Management")).map(role => ({ ...role, assignedDateTime: new Date().toLocaleString() }))] };
  });
  const unassign = (user: UserManagementRow, id: string) => setAssignments(current => ({ ...current, [user.userName]: (current[user.userName] ?? []).filter(role => role.id !== id) }));
  const effectiveFor = (user: UserManagementRow) => ({
    dynamic: EXAM_MANAGEMENT_ENABLED && rolesFor(user).some(role => role.roleName === "Exam Management - Faculty") ? getExamEffectiveAccessForUser(user).dynamic.flatMap(course => {
      const mapping = mappings.find(item => item.facultyRoleName === course.facultyRoleOnCourse);
      return mapping && mapping.examCourseRole !== "none" ? [{ ...course, courseName: `${course.courseName} · Spring 2026 · Section 01`, effectiveExamRole: examCourseRoleLabel(mapping.examCourseRole) }] : [];
    }) : [],
    collaborators: eligible(user) ? grants.filter(grant => grant.userName === user.userName) : [],
  });
  const saveGrant = (userName: string, assessmentName: string, collaboratorRole: CollaboratorRole) => {
    const user = USER_MANAGEMENT_ROWS.find(item => item.userName === userName);
    if (!user || !eligible(user) || !ASSESSMENTS.includes(assessmentName) || !EXAM_COLLABORATOR_ROLE_NAMES.includes(collaboratorRole)) return;
    setGrants(current => [...current.filter(grant => grant.userName !== userName || grant.assessmentName !== assessmentName), { id: `${userName}:${assessmentName}`, userName, assessmentName, collaboratorRole, grantedBy: "System administrator (demo)", grantedAt: new Date().toLocaleString() }]);
  };
  return { rolesFor, assign, unassign, mappings, setMappings, effectiveFor, eligible, grants, saveGrant, removeGrant: (id: string) => setGrants(current => current.filter(grant => grant.id !== id)) };
}
const AccessContext = createContext<ReturnType<typeof useAccessState> | null>(null);
export function AccessProvider({ children }: { children: ReactNode }) {
  const state = useAccessState();
  return <AccessContext.Provider value={state}>{children}</AccessContext.Provider>;
}
export function useAccess() {
  const state = useContext(AccessContext);
  if (!state) throw new Error("AccessProvider is required");
  return state;
}
