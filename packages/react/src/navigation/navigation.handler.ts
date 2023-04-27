import { ExtractPath, Path, RouteConfiguration } from '../types';
import { NavigationRoute } from './navigation.route';

// TODO: Maybe workout a different way to navigate to nested navigation
export type NavigateProps<TRouteConfiguration extends RouteConfiguration> = {
  [TRoute in Extract<Path<TRouteConfiguration>, string>]: ExtractPath<TRouteConfiguration, TRoute> extends NavigationRoute<infer P>
    ? { screen: TRoute; params: P }
    : never;
}[Extract<Path<TRouteConfiguration>, string>];

export interface NavigationHandler<TRouteConfiguration extends RouteConfiguration> {
  goBack: () => void;
  pop: (times?: number) => void;
  push: (params: NavigateProps<TRouteConfiguration>) => void;
}
