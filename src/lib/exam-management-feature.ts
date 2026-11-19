/** Prototype toggle — Exam Management module enabled for the tenant. */
export const EXAM_MANAGEMENT_ENABLED = true;

export const EXAM_MANAGEMENT_MODULE = "Exam Management";

export const EXAM_FACULTY_ROLE_ID = "exam-faculty";

export function isExamFacultyRole(row: { id: string } | null | undefined) {
  return row?.id === EXAM_FACULTY_ROLE_ID;
}