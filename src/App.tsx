import { AccessProvider } from "./lib/access-state";
import { UserManagementPage } from "./pages/UserManagementPage";

export default function App() {
  return <AccessProvider><UserManagementPage /></AccessProvider>;
}
