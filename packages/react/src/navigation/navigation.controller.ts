import { Controller } from '@rx-controller/core';
import { NavigationConfiguration, Route, RouteConfiguration, Stack } from '../types';
import { configurationParser } from '../utils';
import { NavigateProps, NavigationHandler } from './navigation.handler';

export type NavigationState<TRouteConfiguration extends RouteConfiguration> = {
  initialized: boolean;
  stack: Stack<Route<TRouteConfiguration, any>>;
  routes: Route<TRouteConfiguration, any>[];
};

enum NavigationEvents {
  initialize = 'INITIALIZE',
  goBack = 'GO_BACK',
  pop = 'POP',
  push = 'PUSH',
}

type NavigationEventParams<TRouteConfiguration extends RouteConfiguration> = {
  [NavigationEvents.initialize]: { configuration: NavigationConfiguration<TRouteConfiguration> };
  [NavigationEvents.goBack]: undefined;
  [NavigationEvents.pop]: { times: number };
  [NavigationEvents.push]: { params: NavigateProps<TRouteConfiguration> };
};

export class NavigationController<TRouteConfiguration extends RouteConfiguration>
  extends Controller<NavigationState<TRouteConfiguration>, NavigationEventParams<TRouteConfiguration>>
  implements NavigationHandler<TRouteConfiguration>
{
  constructor(configuration: NavigationConfiguration<TRouteConfiguration>) {
    super({ initialized: false, routes: [], stack: new Stack<Route<TRouteConfiguration, any>>() });

    this.on(NavigationEvents.initialize, this[NavigationEvents.initialize].bind(this));
    this.on(NavigationEvents.goBack, this[NavigationEvents.goBack].bind(this));
    this.on(NavigationEvents.pop, this[NavigationEvents.pop].bind(this));
    this.on(NavigationEvents.push, this[NavigationEvents.push].bind(this));

    this.add(NavigationEvents.initialize, { configuration });
  }

  // ##################################################
  // #      Navigation Controller Implementations     #
  // ##################################################
  private [NavigationEvents.initialize](
    state: NavigationState<TRouteConfiguration>,
    params: NavigationEventParams<TRouteConfiguration>[NavigationEvents.initialize],
  ) {
    if (state.initialized) return;

    const { configuration } = params;
    const routes = configurationParser(configuration);
    const initialRoutes = routes.filter((r) => r.initial);

    if (initialRoutes.length === 0) throw new Error('Did not specify initial route');
    if (initialRoutes.length > 1) throw new Error('Specified more than one initial route');
    state.stack.push(initialRoutes[0]);

    this.emit({ ...state, routes, initialized: true });
  }

  private [NavigationEvents.goBack](state: NavigationState<TRouteConfiguration>) {
    state.stack.pop();
    this.emit({ ...state });
  }

  private [NavigationEvents.pop](state: NavigationState<TRouteConfiguration>, params: NavigationEventParams<TRouteConfiguration>[NavigationEvents.pop]) {
    console.log(state, params);
    // TODO: Implement
  }

  private [NavigationEvents.push](state: NavigationState<TRouteConfiguration>, args: NavigationEventParams<TRouteConfiguration>[NavigationEvents.push]) {
    const { screen, params } = args.params;
    const route = state.routes.find((r) => r.index === screen);
    if (!route) throw new Error(`Could not find route for index: ${screen}`);

    state.stack.push({ ...route, params: params as any });
    this.emit({ ...state });
  }

  // ##################################################
  // #        Navigation Handler Implementation       #
  // ##################################################
  public goBack() {
    this.add(NavigationEvents.goBack);
  }

  public pop(times = 1): void {
    this.add(NavigationEvents.pop, { times });
  }

  public push(params: NavigateProps<TRouteConfiguration>): void {
    this.add(NavigationEvents.push, { params });
  }
}
