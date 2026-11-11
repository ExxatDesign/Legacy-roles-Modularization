type AssignPickerAlreadyAssignedProps = {
  label: string;
  tags: { key: string; text: string }[];
};

export function AssignPickerAlreadyAssigned({ label, tags }: AssignPickerAlreadyAssignedProps) {
  if (tags.length === 0) {
    return null;
  }

  const tagSummary = tags.map((tag) => tag.text).join(", ");

  return (
    <div className="um-assign-picker-already" role="status" aria-label={`${label}: ${tagSummary}`}>
      <span className="um-assign-picker-already__label">{label}</span>
      <div className="um-assign-picker-already__tags">
        {tags.map((tag) => (
          <span key={tag.key} className="um-assign-user-combobox__tag um-assign-user-combobox__tag--readonly">
            <span className="um-assign-user-combobox__tag-text">{tag.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
