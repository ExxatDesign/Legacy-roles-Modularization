import { EmployeeIcon } from "./EmployeeIcon";
import { RoleModulesCell } from "./RoleModulesCell";
import { RoleNameWithTags } from "./RoleNameWithTags";

type RoleIdCardProps = {
  roleName: string;
  modules?: string[];
  showNewTag?: boolean;
  showLegacyTag?: boolean;
  bandLabel?: string;
  className?: string;
};

export function RoleIdCard({
  roleName,
  modules = [],
  showNewTag,
  showLegacyTag,
  bandLabel = "Role details",
  className,
}: RoleIdCardProps) {
  return (
    <div
      className={`um-assign-user-dialog__context um-role-id-card${className ? ` ${className}` : ""}`}
      aria-label="Selected role"
    >
      <div className="um-role-id-card__band">
        <span className="um-role-id-card__band-label">{bandLabel}</span>
      </div>
      <div className="um-role-id-card__content">
        <div className="um-role-id-card__portrait">
          <EmployeeIcon size={48} className="um-assign-user-dialog__context-icon" />
        </div>
        <div className="um-assign-user-dialog__context-body um-role-id-card__details">
          <RoleNameWithTags roleName={roleName} showNewTag={showNewTag} showLegacyTag={showLegacyTag} />
          <div className="um-role-id-card__modules">
            <RoleModulesCell modules={modules} />
          </div>
        </div>
      </div>
    </div>
  );
}
