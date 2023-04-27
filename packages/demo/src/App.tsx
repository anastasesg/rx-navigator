import { RootNavigation } from '@rx-navigator/dev';
import { Provider } from '@rx-navigator/react';

export function App() {
  return <Provider configuration={RootNavigation} />;
}
