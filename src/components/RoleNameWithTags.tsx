type RoleNameWithTagsProps = {
  roleName: string;
  showNewTag?: boolean;
  showLegacyTag?: boolean;
};

export function RoleNameWithTags({ roleName, showNewTag, showLegacyTag }: RoleNameWithTagsProps) {
  return (
    <span className="um-role-name-cell">
      <span>{roleName}</span>
      {showNewTag ? <span className="um-role-new-tag">New</span> : null}
      {showLegacyTag ? <span className="um-role-legacy-tag">Legacy</span> : null}
    </span>
  );
}
