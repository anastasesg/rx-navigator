import { NavigationRoute } from '../navigation';

export type RouteConfiguration = {
  [route: string]: NavigationRoute<any> | RouteConfiguration;
};
