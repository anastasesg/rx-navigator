import { NavigationScreen } from '../components';
import { NavigationRoute } from '../navigation';
import { ClassLike } from './class_like.type';
import { ExtractPath, Path } from './navigation_paths.type';
import { NavigationScreenProps } from './navigation_screen_props.type';
import { RouteConfiguration } from './route_configuration.type';

type ConditionalJoin<TLeft extends string | '', TRight extends string> = TLeft extends '' ? TRight : `${TLeft}.${TRight}`;
type ConditionalExtract<TRouteConfiguration extends RouteConfiguration, TRoute extends string = ''> = TRoute extends ''
  ? TRouteConfiguration
  : TRoute extends keyof TRouteConfiguration | Path<TRouteConfiguration>
  ? ExtractPath<TRouteConfiguration, TRoute>
  : never;
type NaiveNavigationScreenProps<TRouteConfiguration extends RouteConfiguration, TRoute extends string> = TRoute extends Path<TRouteConfiguration>
  ? NavigationScreenProps<TRouteConfiguration, TRoute>
  : never;
type Keys<TRouteConfiguration extends RouteConfiguration, TRoute extends string = ''> = Extract<keyof ConditionalExtract<TRouteConfiguration, TRoute>, string>;

// TODO: Add authenticated routes
// TODO: Add layout to routes
export type NavigationConfiguration<TRouteConfiguration extends RouteConfiguration, TLeftover extends string = ''> = {
  path: string;
  screens: {
    [TRoute in Keys<TRouteConfiguration, TLeftover>]: ConditionalExtract<TRouteConfiguration, ConditionalJoin<TLeftover, TRoute>> extends NavigationRoute<any>
      ? ClassLike<NavigationScreen<NaiveNavigationScreenProps<TRouteConfiguration, ConditionalJoin<TLeftover, TRoute>>>>
      : ConditionalExtract<TRouteConfiguration, ConditionalJoin<TLeftover, TRoute>> extends RouteConfiguration
      ? NavigationConfiguration<TRouteConfiguration, ConditionalJoin<TLeftover, TRoute>>
      : false;
  };
};
