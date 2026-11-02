export const LEGACY_ASSIGN_DEPRECATION_LINES = [
  "You cannot assign new users to this role as this is slowly",
  "being deprecated.",
  "Don't worry, your current access will be preserved.",
] as const;

export function LegacyAssignDeprecationCopy({ idPrefix }: { idPrefix: string }) {
  return (
    <>
      {LEGACY_ASSIGN_DEPRECATION_LINES.map((line, index) => (
        <p
          key={line}
          id={index === 0 ? `${idPrefix}-desc` : undefined}
          className="um-legacy-assign-deprecation__line"
        >
          {line}
        </p>
      ))}
    </>
  );
}

type LegacyAssignDeprecationAlertProps = {
  open: boolean;
  onClose: () => void;
};

export function LegacyAssignDeprecationAlert({ open, onClose }: LegacyAssignDeprecationAlertProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="um-deprecation-alert" role="presentation">
      <button type="button" className="um-deprecation-alert__backdrop" aria-label="Close message" onClick={onClose} />
      <div
        className="um-deprecation-alert__panel"
        role="alertdialog"
        aria-modal="true"
        aria-label="Role assignment unavailable"
        aria-describedby="um-deprecation-alert-desc"
      >
        <div className="um-legacy-assign-deprecation um-deprecation-alert__message">
          <LegacyAssignDeprecationCopy idPrefix="um-deprecation-alert" />
        </div>
        <button type="button" className="um-deprecation-alert__ok" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
