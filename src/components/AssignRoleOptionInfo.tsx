type AssignRoleOptionInfoProps = {
  description: string;
};

function IconInfoCircle() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  );
}

export function AssignRoleOptionInfo({ description }: AssignRoleOptionInfoProps) {
  return (
    <span
      className="um-assign-roles-option-info"
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => event.preventDefault()}
    >
      <button
        type="button"
        className="um-assign-roles-option-info__trigger"
        aria-label="Role description"
        tabIndex={0}
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
      >
        <IconInfoCircle />
      </button>
      <span className="um-assign-roles-option-info__popover" role="tooltip">
        {description}
      </span>
    </span>
  );
}
