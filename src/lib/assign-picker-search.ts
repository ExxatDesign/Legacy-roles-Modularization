import type { ManageUsersAssignedRow } from "../data/manage-users-assigned-rows";
import type { ManageRolesAssignmentRow } from "../data/manage-roles-rows";

export function normalizeAssignSearchQuery(query: string) {
  return query.trim().toLowerCase();
}

export function userMatchesAssignSearch(user: ManageUsersAssignedRow, query: string) {
  const normalized = normalizeAssignSearchQuery(query);
  if (normalized.length === 0) {
    return true;
  }
  return (
    user.name.toLowerCase().includes(normalized) || user.email.toLowerCase().includes(normalized)
  );
}

export function roleMatchesAssignSearch(role: ManageRolesAssignmentRow, query: string) {
  const normalized = normalizeAssignSearchQuery(query);
  if (normalized.length === 0) {
    return true;
  }
  return (
    role.roleName.toLowerCase().includes(normalized) ||
    role.module.toLowerCase().includes(normalized) ||
    role.roleDescription.toLowerCase().includes(normalized)
  );
}

export function filterUnassignedUsersForRole(
  pool: ManageUsersAssignedRow[],
  alreadyAssigned: ManageUsersAssignedRow[],
) {
  const assignedEmails = new Set(alreadyAssigned.map((user) => user.email.toLowerCase()));
  return pool.filter((user) => !assignedEmails.has(user.email.toLowerCase()));
}

export function findAlreadyAssignedUsers(query: string, assigned: ManageUsersAssignedRow[]) {
  const normalized = normalizeAssignSearchQuery(query);
  if (normalized.length === 0) {
    return [];
  }
  return uniqueAssignedUserMatches(assigned.filter((user) => userMatchesAssignSearch(user, query)));
}

export function findAlreadyAssignedRoles(query: string, assigned: ManageRolesAssignmentRow[]) {
  const normalized = normalizeAssignSearchQuery(query);
  if (normalized.length === 0) {
    return [];
  }
  return uniqueAssignedRoleMatches(assigned.filter((role) => roleMatchesAssignSearch(role, query)));
}

export function uniqueAssignedUserMatches(matches: ManageUsersAssignedRow[]) {
  const seen = new Set<string>();
  return matches.filter((user) => {
    const key = user.email.trim().toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export function uniqueAssignedRoleMatches(matches: ManageRolesAssignmentRow[]) {
  const seen = new Set<string>();
  return matches.filter((role) => {
    const key = role.id;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
