export type ExamPermissionGroup = { title: string; items: string[] };
// Platform RBAC v1, Exam!A1:K27. Blank matrix cells grant no permission.
const SETUP = { title: "Setup", items: ["View, create, update, and delete email templates", "View, create, and update academic calendar"] };
const DIRECTORY = { title: "Directory", items: ["View courses, faculty, and students"] };
const BANK = { title: "Question bank", items: ["View and update course bank", "View, edit, and delete questions", "Update owner"] };
const VIEW = { title: "Assessments — View", items: ["View associated assessment list and details"] };
const BUILD = { title: "Assessments — Build", items: ["View, create, update, and delete assessments", "View, add, and update questions", "View, add, and update collaborators"] };
const SCHEDULE = { title: "Assessments — Schedule", items: ["View, add, and update assessment configuration", "View, add, and update distribution settings", "Schedule assessment"] };
const PROCTOR = { title: "Assessments — Proctor", items: ["View assessment configuration and distribution settings", "View submissions list"] };
const SUBMISSIONS = { title: "Submissions", items: ["View submissions list, individual responses, and results", "Grade", "Discard a submission", "Adjust answer key", "Publish results"] };
const owned = (group: ExamPermissionGroup, scope: string): ExamPermissionGroup => ({ title: `${group.title} — ${scope}`, items: group.items.map(item => `${item} (${scope})`) });
export function getExamPermissionsForRole(roleId: string | undefined): ExamPermissionGroup[] {
  switch (roleId) {
    case "exam-admin": return [SETUP, DIRECTORY, owned(BANK, "all question banks"), VIEW, BUILD, SCHEDULE, PROCTOR, SUBMISSIONS];
    case "exam-admin-limited": return [SETUP, DIRECTORY, owned(BANK, "all question banks"), VIEW, BUILD, SCHEDULE, PROCTOR, { title: "Submissions", items: ["No submissions permissions granted"] }];
    case "exam-faculty": return [{ title: "Faculty prerequisite", items: ["Enables Exam Management for associated course offerings. Permissions resolve from the mapped Course Manager or Course Contributor role on each offering."] }, { title: "Course Manager", items: ["View course directory; access owned question banks; view, build, schedule, and proctor course assessments; manage submissions"] }, { title: "Course Contributor", items: ["View course directory, owned question banks, and associated assessments; build, schedule, proctor, and manage submissions only for own assessments"] }];
    case "Exam Management - Course Manager": return [DIRECTORY, owned(BANK, "owned question banks"), VIEW, BUILD, SCHEDULE, PROCTOR, SUBMISSIONS];
    case "Exam Management - Course Contributor": return [DIRECTORY, owned(BANK, "owned question banks"), VIEW, ...[BUILD, SCHEDULE, PROCTOR, SUBMISSIONS].map(group => owned(group, "own assessments only"))];
    case "Exam Management - Collaborate": return [VIEW, BUILD, SCHEDULE, PROCTOR, SUBMISSIONS];
    case "Exam Management - Publish": return [VIEW, SCHEDULE];
    case "Exam Management - Proctor": return [VIEW, PROCTOR];
    case "Exam Management - Grade": return [VIEW, SUBMISSIONS];
    default: return [];
  }
}
