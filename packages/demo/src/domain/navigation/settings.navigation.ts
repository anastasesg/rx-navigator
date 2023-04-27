import { NavigationConfiguration } from '@rx-navigator/react';
import { RootRoutes } from '../routes';
import { ProfileScreen } from '../screens';

export const SettingsNavigation: NavigationConfiguration<RootRoutes, 'settings'> = {
  path: '/settings',
  screens: {
    profile: ProfileScreen,
  },
};
