import { NavigationScreenProps } from '@rx-navigator/react';
import { RootRoutes } from './root.routes.ts';

export type HomeScreenProps = NavigationScreenProps<RootRoutes, 'home'>;
export type ProfileScreenProps = NavigationScreenProps<RootRoutes, 'settings.profile'>;
