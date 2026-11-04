import { RoleIdCard } from "./RoleIdCard";

type LegacyUnassignContext = "by-role" | "by-name";

type LegacyUnassignConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  /** By Role (Manage Users drawer) vs By Name (Manage Roles drawer). */
  context?: LegacyUnassignContext;
  roleName?: string;
  modules?: string[];
};

const COPY_BY_NAME = {
  title: "Unassign user?",
  message:
    "As this person is assigned to a legacy role, you won't be able to assign them back to this role. This role is being phased out.",
} as const;

const COPY_BY_ROLE = {
  title: "Unassign user from this role?",
  message:
    "As this is a legacy role you won't be allowed to reassign this person to this role again. legacy roles are being phased out.",
} as const;

export function LegacyUnassignConfirmDialog({
  open,
  onClose,
  onConfirm,
  context = "by-name",
  roleName,
  modules = [],
}: LegacyUnassignConfirmDialogProps) {
  if (!open) {
    return null;
  }

  const copy = context === "by-role" ? COPY_BY_ROLE : COPY_BY_NAME;
  const showRoleCard = Boolean(roleName);

  return (
    <div className="um-assign-user-dialog um-assign-user-dialog--confirm" role="presentation">
      <button
        type="button"
        className="um-assign-user-dialog__backdrop"
        aria-label="Cancel unassign"
        onClick={onClose}
      />
      <div
        className={`um-assign-user-dialog__card um-assign-user-dialog__card--confirm${
          showRoleCard ? " um-assign-user-dialog__card--confirm-with-role" : ""
        }`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="um-legacy-unassign-title"
        aria-describedby="um-legacy-unassign-desc"
      >
        <h3 id="um-legacy-unassign-title" className="um-assign-user-dialog__title">
          {copy.title}
        </h3>
        {showRoleCard ? (
          <RoleIdCard roleName={roleName!} modules={modules} showLegacyTag />
        ) : null}
        <p id="um-legacy-unassign-desc" className="um-assign-user-dialog__message">
          {copy.message}
        </p>
        <div className="um-assign-user-dialog__actions">
          <button type="button" className="um-assign-user-dialog__btn um-assign-user-dialog__btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="um-assign-user-dialog__btn um-assign-user-dialog__btn--primary"
            onClick={onConfirm}
          >
            Unassign
          </button>
        </div>
      </div>
    </div>
  );
}
