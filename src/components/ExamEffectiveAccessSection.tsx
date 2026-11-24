import { useAccess, PROGRAM } from "../lib/access-state";
import type { UserManagementRow } from "../data/user-management-rows";
import { EXAM_MANAGEMENT_ENABLED } from "../lib/exam-management-feature";

type ExamEffectiveAccessSectionProps = {
  user: UserManagementRow;
};

export function ExamEffectiveAccessSection({ user }: ExamEffectiveAccessSectionProps) {
  const state = useAccess();
  if (!EXAM_MANAGEMENT_ENABLED) {
    return null;
  }

  const access = state.effectiveFor(user);
  const showCourse = state.rolesFor(user).some(role => role.roleName === "Exam Management - Faculty") || access.dynamic.length > 0;
  if (!showCourse) return null;

  return (
    <section className="um-manage-roles-drawer__section" aria-labelledby="um-exam-effective-heading">
      <h3 id="um-exam-effective-heading" className="um-manage-roles-drawer__section-title">
        Course access (automatic)
      </h3>

      <p>Program: {PROGRAM}</p>
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
                        No mapped course access. Assign Faculty and check course associations and faculty role mappings.
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


      </div>
    </section>
  );
}