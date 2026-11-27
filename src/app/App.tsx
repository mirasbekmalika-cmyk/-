// @ts-nocheck
import { AppShell } from './AppShell';
import { useTeam } from '../features/auth';

function App() {
  useTeam();
  return <AppShell />;
}

export { App };
