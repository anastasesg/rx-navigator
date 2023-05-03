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

function isNavigateProps(obj: any): obj is NavigateProps<any> {
  if (!obj || typeof obj !== 'object') return false;
  return 'screen' in obj && 'params' in obj;
}

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
    if (state.stack.size() === 1) return;

    state.stack.pop();
    this.emit({ ...state });
  }

  private [NavigationEvents.pop](state: NavigationState<TRouteConfiguration>, params: NavigationEventParams<TRouteConfiguration>[NavigationEvents.pop]) {
    const { times } = params;
    for (let i = 0; i++; i < times) {
      if (state.stack.size() === 1) break;
      state.stack.pop();
    }

    this.emit({ ...state });
  }

  private [NavigationEvents.push](state: NavigationState<TRouteConfiguration>, args: NavigationEventParams<TRouteConfiguration>[NavigationEvents.push]) {
    const { screen, params: initialParams } = args.params;
    let index = screen as string;
    let params: any = initialParams;

    // To handle nested navigation we need to check whether the params object
    // is a navigate prop or not. If it is, add its screen to the index and set
    // its value as its own params object and then check again. Do that until the
    // params is actually the params of the route.
    if (isNavigateProps(params)) {
      while (isNavigateProps(params)) {
        index += `.${params.screen}`;
        params = { ...(params.params as any) };
      }
    }
    const route = state.routes.find((r) => r.index === index);
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
