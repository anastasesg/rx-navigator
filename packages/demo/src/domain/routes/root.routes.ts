import { NavigationRoute } from '@rx-navigator/react';
import { SettingsRoutes } from './settings.routes.ts';

export type RootRoutes = {
  home: NavigationRoute<undefined>;
  settings: SettingsRoutes;
};
