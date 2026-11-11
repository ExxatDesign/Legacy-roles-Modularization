import { createPortal } from "react-dom";
import { RoleIdCard } from "./RoleIdCard";

type LegacyUnassignContext = "by-role" | "by-name";

const LEGACY_UNASSIGN_BANNER =
  "This role is legacy. Once you unassign it, you can't assign this legacy role back. Legacy roles are being phased out.";

type LegacyUnassignConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  /** By Role (Manage Users drawer) vs By Name (Manage Roles drawer). */
  context?: LegacyUnassignContext;
  legacy?: boolean;
  roleName?: string;
  modules?: string[];
  showNewTag?: boolean;
  showLegacyTag?: boolean;
  /** Person affected — user name in by-role, account name in by-name. */
  subjectName?: string;
};

function resolveCopy(
  context: LegacyUnassignContext,
  legacy: boolean,
  subjectName?: string,
  roleName?: string,
) {
  const userLabel = subjectName?.trim() || "This user";
  const roleLabel = roleName?.trim() || "this role";

  if (context === "by-role") {
    if (legacy) {
      return {
        title: "Unassign user from this role?",
        message: LEGACY_UNASSIGN_BANNER,
      };
    }
    return {
      title: "Unassign user from this role?",
      message: `Remove ${userLabel} from ${roleLabel}? You can assign them to this role again later.`,
    };
  }

  if (legacy) {
    return {
      title: "Unassign legacy role?",
      message: LEGACY_UNASSIGN_BANNER,
    };
  }

  return {
    title: "Unassign role?",
    message: `Remove ${roleLabel} from ${userLabel}? You can assign this role again later.`,
  };
}

export function LegacyUnassignConfirmDialog({
  open,
  onClose,
  onConfirm,
  context = "by-name",
  legacy = true,
  roleName,
  modules = [],
  showNewTag,
  showLegacyTag,
  subjectName,
}: LegacyUnassignConfirmDialogProps) {
  if (!open) {
    return null;
  }

  const copy = resolveCopy(context, legacy, subjectName, roleName);
  const showRoleCard = Boolean(roleName);

  return createPortal(
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
          <RoleIdCard
            roleName={roleName!}
            modules={modules}
            showNewTag={showNewTag}
            showLegacyTag={showLegacyTag}
          />
        ) : null}
        {subjectName && context === "by-role" ? (
          <p className="um-unassign-confirm__subject">
            <span className="um-unassign-confirm__subject-label">User</span>
            <span className="um-unassign-confirm__subject-value">{subjectName}</span>
          </p>
        ) : null}
        {legacy ? (
          <div
            id="um-legacy-unassign-desc"
            className="um-info-banner um-info-banner--manage-users-drawer um-info-banner--unassign-confirm"
            role="note"
          >
            <span className="um-info-banner__icon" aria-hidden="true">
              <i className="fa-solid fa-triangle-exclamation" />
            </span>
            <p className="um-info-banner__text">{copy.message}</p>
          </div>
        ) : (
          <p id="um-legacy-unassign-desc" className="um-assign-user-dialog__message">
            {copy.message}
          </p>
        )}
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
    </div>,
    document.body,
  );
}
