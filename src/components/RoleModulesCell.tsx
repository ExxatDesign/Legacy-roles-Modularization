import { getModuleTagToneClass } from "../lib/module-tag-tone";

type RoleModulesCellProps = {
  modules: string[];
};

function ModuleTag({ name }: { name: string }) {
  return <span className={`um-module-tag ${getModuleTagToneClass(name)}`}>{name}</span>;
}

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
