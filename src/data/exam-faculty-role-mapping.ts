export type ExamCourseRoleKey = "course-manager" | "course-contributor" | "none";

export type ExamFacultyRoleMappingRow = {
  id: string;
  facultyRoleName: string;
  examCourseRole: ExamCourseRoleKey;
};

export const EXAM_COURSE_ROLE_LABELS: Record<Exclude<ExamCourseRoleKey, "none">, string> = {
  "course-manager": "Exam Management - Course Manager",
  "course-contributor": "Exam Management - Course Contributor",
};

export function examCourseRoleLabel(key: ExamCourseRoleKey): string {
  if (key === "none") {
    return "No exam course role";
  }
  return EXAM_COURSE_ROLE_LABELS[key];
}

export const INITIAL_EXAM_FACULTY_ROLE_MAPPINGS: ExamFacultyRoleMappingRow[] = [
  { id: "map-instructor", facultyRoleName: "Instructor", examCourseRole: "course-contributor" },
  { id: "map-co-instructor", facultyRoleName: "Co-instructor", examCourseRole: "course-contributor" },
  { id: "map-course-lead", facultyRoleName: "Course lead", examCourseRole: "course-manager" },
  { id: "map-clinical-coordinator", facultyRoleName: "Clinical coordinator", examCourseRole: "none" },
];