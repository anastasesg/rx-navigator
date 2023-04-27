import { NavigationScreen } from '../components';
import { ClassLike } from './class_like.type';
import { Path } from './navigation_paths.type';
import { ExtractRoute, NavigationScreenProps } from './navigation_screen_props.type';
import { RouteConfiguration } from './route_configuration.type';

export type Route<TRouteConfiguration extends RouteConfiguration, TRoute extends Path<TRouteConfiguration>> = {
  type: 'page' | 'modal';
  index: string;
  path: string;
  name: string;
  initial: boolean;
  params?: ExtractRoute<TRouteConfiguration, TRoute>;
  screen: ClassLike<NavigationScreen<NavigationScreenProps<TRouteConfiguration, TRoute>>>;
};
