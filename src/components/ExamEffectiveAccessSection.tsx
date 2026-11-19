import { getExamEffectiveAccessForUser } from "../data/exam-effective-access";
import type { UserManagementRow } from "../data/user-management-rows";
import { EXAM_MANAGEMENT_ENABLED } from "../lib/exam-management-feature";
import { getAssignedRolesForUser } from "../data/manage-roles-rows";

type ExamEffectiveAccessSectionProps = {
  user: UserManagementRow;
};

function userHasExamFacultyStatic(user: UserManagementRow) {
  return getAssignedRolesForUser(user).some(
    (role) => role.roleName === "Exam Management - Faculty",
  );
}

export function ExamEffectiveAccessSection({ user }: ExamEffectiveAccessSectionProps) {
  if (!EXAM_MANAGEMENT_ENABLED) {
    return null;
  }

  const access = getExamEffectiveAccessForUser(user);
  const showCourse = userHasExamFacultyStatic(user) || access.dynamic.length > 0;
  const showAssessment = access.collaborators.length > 0;

  if (!showCourse && !showAssessment) {
    return null;
  }

  return (
    <section className="um-manage-roles-drawer__section" aria-labelledby="um-exam-effective-heading">
      <h3 id="um-exam-effective-heading" className="um-manage-roles-drawer__section-title">
        Exam access
      </h3>

      <div className="um-manage-users-drawer__panel">
        {showCourse ? (
          <div className="um-exam-effective__block">
            <h4 className="um-exam-effective__kind">Course</h4>
            <div className="um-manage-users-drawer__table-wrap">
              <table className="um-table um-table--manage-roles" aria-label="Exam roles by course">
                <thead>
                  <tr>
                    <th scope="col" className="um-col-ex-course">
                      Course offering
                    </th>
                    <th scope="col" className="um-col-ex-faculty">
                      Faculty role on course
                    </th>
                    <th scope="col" className="um-col-ex-role">
                      Exam role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {access.dynamic.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="um-exam-effective__none">
                        —
                      </td>
                    </tr>
                  ) : (
                    access.dynamic.map((row) => (
                      <tr key={row.id}>
                        <td className="um-col-ex-course">{row.courseName}</td>
                        <td className="um-col-ex-faculty">{row.facultyRoleOnCourse}</td>
                        <td className="um-col-ex-role">{row.effectiveExamRole}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {showAssessment ? (
          <div className={`um-exam-effective__block${showCourse ? " um-exam-effective__block--separated" : ""}`}>
            <h4 className="um-exam-effective__kind">Assessment</h4>
            <div className="um-manage-users-drawer__table-wrap">
              <table className="um-table um-table--manage-roles" aria-label="Exam roles by assessment">
                <thead>
                  <tr>
                    <th scope="col" className="um-col-ex-assessment">
                      Assessment
                    </th>
                    <th scope="col" className="um-col-ex-role">
                      Exam role
                    </th>
                    <th scope="col" className="um-col-ex-granted">
                      Granted by
                    </th>
                    <th scope="col" className="um-col-ex-date">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {access.collaborators.map((row) => (
                    <tr key={row.id}>
                      <td className="um-col-ex-assessment">{row.assessmentName}</td>
                      <td className="um-col-ex-role">{row.collaboratorRole}</td>
                      <td className="um-col-ex-granted">{row.grantedBy}</td>
                      <td className="um-col-ex-date">{row.grantedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}