type RoleModulesCellProps = {
  modules: string[];
};

export function RoleModulesCell({ modules }: RoleModulesCellProps) {
  if (modules.length === 0) {
    return <>—</>;
  }

  if (modules.length === 1) {
    return <>{modules[0]}</>;
  }

  return (
    <span className="um-role-modules">
      {modules.map((moduleName) => (
        <span key={moduleName} className="um-role-modules__item">
          {moduleName}
        </span>
      ))}
    </span>
  );
}
