import type { UserManagementRow } from "./user-management-rows";

export type ExamDynamicAccessRow = {
  id: string;
  courseName: string;
  facultyRoleOnCourse: string;
  effectiveExamRole: string;
};

export type ExamCollaboratorAccessRow = {
  id: string;
  assessmentName: string;
  collaboratorRole: string;
  grantedBy: string;
  grantedAt: string;
};

export type ExamEffectiveAccess = {
  dynamic: ExamDynamicAccessRow[];
  collaborators: ExamCollaboratorAccessRow[];
};

const BROWN_EFFECTIVE: ExamEffectiveAccess = {
  dynamic: [
    {
      id: "dyn-1",
      courseName: "NUR 410 — Pharmacology",
      facultyRoleOnCourse: "Instructor",
      effectiveExamRole: "Exam Management - Course Contributor",
    },
    {
      id: "dyn-2",
      courseName: "NUR 520 — Advanced Assessment",
      facultyRoleOnCourse: "Course lead",
      effectiveExamRole: "Exam Management - Course Manager",
    },
  ],
  collaborators: [
    {
      id: "col-1",
      assessmentName: "Midterm — Pharmacology (Spring 2026)",
      collaboratorRole: "Exam Management - Grade",
      grantedBy: "Johnson, Mary",
      grantedAt: "04/02/2026 10:15 AM EDT",
    },
  ],
};

const JOHNSON_EFFECTIVE: ExamEffectiveAccess = {
  dynamic: [
    {
      id: "dyn-j1",
      courseName: "NUR 302 — Health Assessment",
      facultyRoleOnCourse: "Instructor",
      effectiveExamRole: "Exam Management - Course Contributor",
    },
  ],
  collaborators: [
    {
      id: "col-j1",
      assessmentName: "Skills check — Health Assessment",
      collaboratorRole: "Exam Management - Proctor",
      grantedBy: "Davis, Sarah",
      grantedAt: "03/30/2026 03:40 PM EDT",
    },
    {
      id: "col-j2",
      assessmentName: "Final — Pathophysiology",
      collaboratorRole: "Exam Management - Publish",
      grantedBy: "Admin, System",
      grantedAt: "03/28/2026 09:00 AM EDT",
    },
  ],
};

const EMPTY: ExamEffectiveAccess = { dynamic: [], collaborators: [] };

export function getExamEffectiveAccessForUser(user: UserManagementRow): ExamEffectiveAccess {
  if (user.userName === "michael.brown@university.edu") {
    return BROWN_EFFECTIVE;
  }
  if (user.userName === "mary.johnson@university.edu") {
    return JOHNSON_EFFECTIVE;
  }
  // Explicit demo course association; module/persona labels do not grant course membership.
  if (user.userName === "robert.smith@university.edu") {
    return {
      dynamic: [
        {
          id: "dyn-generic",
          courseName: "PT 301 — Musculoskeletal",
          facultyRoleOnCourse: "Instructor",
          effectiveExamRole: "Exam Management - Course Contributor",
        },
      ],
      collaborators: [],
    };
  }
  return EMPTY;
}

export function userHasExamEffectiveAccess(access: ExamEffectiveAccess) {
  return access.dynamic.length > 0 || access.collaborators.length > 0;
}