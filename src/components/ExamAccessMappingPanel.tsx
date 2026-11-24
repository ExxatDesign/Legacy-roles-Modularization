import { useAccess } from "../lib/access-state";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  EXAM_COURSE_ROLE_LABELS,
  examCourseRoleLabel,
  type ExamCourseRoleKey,
  type ExamFacultyRoleMappingRow,
} from "../data/exam-faculty-role-mapping";

type ExamMappingEditDialogProps = {
  row: ExamFacultyRoleMappingRow | null;
  onClose: () => void;
  onSave: (id: string, examCourseRole: ExamCourseRoleKey) => void;
};

function ExamMappingEditDialog({ row, onClose, onSave }: ExamMappingEditDialogProps) {
  const [selected, setSelected] = useState<ExamCourseRoleKey>(row?.examCourseRole ?? "none");

  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!row) return;
    const previous = document.activeElement as HTMLElement | null;
    cardRef.current?.querySelector<HTMLInputElement>("input:checked")?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); onClose(); }
      if (event.key === "Tab") {
        const nodes = Array.from(cardRef.current?.querySelectorAll<HTMLElement>("input:checked, button") ?? []);
        const first = nodes[0]; const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", keydown, true);
    return () => { document.removeEventListener("keydown", keydown, true); previous?.focus(); };
  }, [row, onClose]);
  if (!row) {
    return null;
  }

  const options: { value: ExamCourseRoleKey; label: string }[] = [
    { value: "course-manager", label: EXAM_COURSE_ROLE_LABELS["course-manager"] },
    { value: "course-contributor", label: EXAM_COURSE_ROLE_LABELS["course-contributor"] },
    { value: "none", label: "No exam course role" },
  ];

  return createPortal(
    <div className="um-assign-user-dialog um-assign-user-dialog--confirm" role="presentation">
      <button type="button" className="um-assign-user-dialog__backdrop" aria-label="Cancel" onClick={onClose} />
      <div
        className="um-assign-user-dialog__card um-assign-user-dialog__card--confirm"
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="um-exam-mapping-edit-title"
      >
        <h3 id="um-exam-mapping-edit-title" className="um-assign-user-dialog__title">
          {row.facultyRoleName}
        </h3>
        <fieldset className="um-exam-mapping-edit__options">
          <legend className="sr-only">Exam course role</legend>
          {options.map((option) => (
            <label key={option.value} className="um-exam-mapping-edit__option">
              <input
                type="radio"
                name="exam-course-role"
                checked={selected === option.value}
                onChange={() => setSelected(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </fieldset>
        <div className="um-assign-user-dialog__actions">
          <button
            type="button"
            className="um-assign-user-dialog__btn um-assign-user-dialog__btn--secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="um-assign-user-dialog__btn um-assign-user-dialog__btn--primary"
            onClick={() => onSave(row.id, selected)}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

type ExamAccessMappingPanelProps = {
  variant?: "standalone" | "inline" | "drawer";
};

export function ExamAccessMappingPanel({ variant = "standalone" }: ExamAccessMappingPanelProps) {
  const { mappings, setMappings } = useAccess();
  const [editRow, setEditRow] = useState<ExamFacultyRoleMappingRow | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return mappings;
    }
    return mappings.filter((row) => row.facultyRoleName.toLowerCase().includes(query));
  }, [mappings, searchQuery]);

  const saveMapping = (id: string, examCourseRole: ExamCourseRoleKey) => {
    setMappings((current) => current.map((row) => (row.id === id ? { ...row, examCourseRole } : row)));
    setEditRow(null);
  };

  return (
    <div
      className={`um-exam-access-mapping${
        variant === "inline"
          ? " um-exam-access-mapping--inline"
          : variant === "drawer"
            ? " um-exam-access-mapping--drawer"
            : ""
      }`}
    >
      {variant === "inline" ? (
        <h3 className="um-exam-access-mapping__inline-title">Faculty role mapping</h3>
      ) : null}

      <div
        className={`um-exam-access-mapping__panel um-manage-users-drawer__panel${
          variant === "drawer" ? " um-exam-access-mapping__panel--drawer" : ""
        }`}
      >
        <div className="um-manage-users-drawer__toolbar">
          <label className="um-search-field">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search"
              aria-label="Search faculty roles"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="um-manage-users-drawer__table-wrap">
          <table className="um-table um-table--manage-roles um-table--exam-mapping" aria-label="Faculty role mapping">
            <thead>
              <tr>
                <th scope="col" className="um-col-map-faculty">
                  Faculty role
                </th>
                <th scope="col" className="um-col-map-exam">
                  Exam role
                </th>
                <th scope="col" className="um-col-exam-mapping-action">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td className="um-col-map-faculty">{row.facultyRoleName}</td>
                  <td className="um-col-map-exam">
                    <span
                      className={
                        row.examCourseRole === "none"
                          ? "um-exam-mapping-none"
                          : "um-exam-mapping-role-label"
                      }
                    >
                      {examCourseRoleLabel(row.examCourseRole)}
                    </span>
                  </td>
                  <td className="um-col-exam-mapping-action">
                    <button
                      type="button"
                      className="um-btn-icon-action"
                      aria-label={`Edit mapping for ${row.facultyRoleName}`}
                      onClick={() => setEditRow(row)}
                    >
                      <i className="fa-solid fa-pencil" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExamMappingEditDialog key={editRow?.id ?? "closed"} row={editRow} onClose={() => setEditRow(null)} onSave={saveMapping} />
    </div>
  );
}