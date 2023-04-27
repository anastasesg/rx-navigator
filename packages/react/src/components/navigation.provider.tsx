import React, { useEffect, useMemo, useState } from 'react';
import { NavigationController, NavigationState } from '../navigation';
import { NavigationConfiguration, RouteConfiguration } from '../types';

type ProviderProps<TRouteConfiguration extends RouteConfiguration> = {
  configuration: NavigationConfiguration<TRouteConfiguration>;
};

export function Provider<TRouteConfiguration extends RouteConfiguration>({ configuration }: ProviderProps<TRouteConfiguration>) {
  const navigation = useMemo(() => new NavigationController<TRouteConfiguration>(configuration), [configuration]);
  const [state, setState] = useState<NavigationState<TRouteConfiguration>>(navigation.subject.value);

  useEffect(() => {
    navigation.subscribe(setState);
  }, [navigation]);

  const route = state.stack.peek();
  if (!route) throw new Error('There are no more routes. Did you go back on your first route?');

  return (
    <>
      <route.screen route={{ name: route.name, path: route.path, params: route.params } as any} navigation={navigation} />
    </>
  );
}