export type ExamPermissionGroup = {
  title: string;
  items: string[];
};

const EXAM_ADMIN: ExamPermissionGroup[] = [
  {
    title: "Program administration",
    items: [
      "Configure Exam Management settings for the program",
      "Create, edit, and publish exams and assessments",
      "Manage exam content, schedules, and delivery options",
      "View and export program-level exam reports",
    ],
  },
  {
    title: "Access management",
    items: [
      "Assign Exam Management – Faculty to users",
      "View effective course and assessment roles for users",
    ],
  },
];

const EXAM_ADMIN_LIMITED: ExamPermissionGroup[] = [
  {
    title: "Program administration",
    items: [
      "View Exam Management configuration",
      "Create and edit exams and assessments",
      "Publish assessments with approval workflow",
      "View program-level exam reports",
    ],
  },
  {
    title: "Restricted",
    items: [
      "Cannot delete published exams",
      "Cannot change tenant-level Exam Management settings",
    ],
  },
];

const EXAM_FACULTY: ExamPermissionGroup[] = [
  {
    title: "Course access",
    items: [
      "Access Exam Management for courses the user is associated with",
      "View and manage assessments on assigned courses",
      "View student attempts and results for assigned courses",
    ],
  },
  {
    title: "Course roles (automatic)",
    items: [
      "Course Manager or Course Contributor on a course offering based on faculty role on that course",
    ],
  },
];

export function getExamPermissionsForRole(roleId: string | undefined): ExamPermissionGroup[] {
  switch (roleId) {
    case "exam-admin":
      return EXAM_ADMIN;
    case "exam-admin-limited":
      return EXAM_ADMIN_LIMITED;
    case "exam-faculty":
      return EXAM_FACULTY;
    default:
      return [
        {
          title: "Exam Management",
          items: ["Permissions for this role are defined in Platform RBAC."],
        },
      ];
  }
}