import { ModuleTag } from "./ModuleTag";

type RoleModulesCellProps = {
  modules: string[];
};

export function RoleModulesCell({ modules }: RoleModulesCellProps) {
  if (modules.length === 0) {
    return <>—</>;
  }

  return (
    <span className="um-role-modules">
      {modules.map((moduleName) => (
        <ModuleTag key={moduleName} name={moduleName} />
      ))}
    </span>
  );
}
