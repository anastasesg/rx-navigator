import { RouteConfiguration } from '../types';
import { NavigationRoute } from './navigation.route';

export type NavigateProps<TRouteConfiguration extends RouteConfiguration> = {
  // [TRoute in Extract<Path<TRouteConfiguration>, string>]: ExtractPath<TRouteConfiguration, TRoute> extends NavigationRoute<infer P>
  //   ? { screen: TRoute; params: P }
  //   : never;
  [TRoute in Extract<keyof TRouteConfiguration, string>]: TRouteConfiguration[TRoute] extends NavigationRoute<infer P>
    ? { screen: TRoute; params: P }
    : TRouteConfiguration[TRoute] extends RouteConfiguration
    ? { screen: TRoute; params: NavigateProps<TRouteConfiguration[TRoute]> }
    : never;
}[Extract<keyof TRouteConfiguration, string>];

export interface NavigationHandler<TRouteConfiguration extends RouteConfiguration> {
  goBack: () => void;
  pop: (times?: number) => void;
  push: (params: NavigateProps<TRouteConfiguration>) => void;
}
