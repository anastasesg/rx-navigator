import { NavigationHandler, NavigationRoute } from '../navigation';
import { ExtractPath, Path } from './navigation_paths.type';
import { RouteConfiguration } from './route_configuration.type';

export type ExtractRoute<TRouteConfiguration extends RouteConfiguration, TPath extends Path<TRouteConfiguration>> = ExtractPath<
  TRouteConfiguration,
  TPath
> extends NavigationRoute<infer TParam>
  ? NavigationRoute<TParam>
  : never;

export type NavigationScreenProps<TRouteConfiguration extends RouteConfiguration, TPath extends Path<TRouteConfiguration>> = {
  route: ExtractRoute<TRouteConfiguration, TPath>;
  navigation: NavigationHandler<TRouteConfiguration>;
};
