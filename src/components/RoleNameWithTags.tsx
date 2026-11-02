type RoleNameWithTagsProps = {
  roleName: string;
  showNewTag?: boolean;
};

export function RoleNameWithTags({ roleName, showNewTag }: RoleNameWithTagsProps) {
  return (
    <span className="um-role-name-cell">
      <span>{roleName}</span>
      {showNewTag ? <span className="um-role-new-tag">New</span> : null}
    </span>
  );
}
