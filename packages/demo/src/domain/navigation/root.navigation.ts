import { NavigationConfiguration } from '@rx-navigator/react';
import { RootRoutes } from '../routes';
import { HomeScreen } from '../screens';
import { SettingsNavigation } from './settings.navigation.ts';

export const RootNavigation: NavigationConfiguration<RootRoutes> = {
  path: '/',
  screens: {
    home: HomeScreen,
    settings: SettingsNavigation,
  },
};
