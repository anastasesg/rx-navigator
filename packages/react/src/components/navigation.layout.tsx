import { Component } from 'react';
import { NavigationHandler, NavigationRoute } from '../navigation';
import { RouteConfiguration } from '../types';

type NavigationLayoutProps<TRouteConfiguration extends RouteConfiguration> = {
  navigation: NavigationHandler<TRouteConfiguration>;
  activeRoute: NavigationRoute<any>;
  children: JSX.Element;
};

export abstract class NavigationLayout<TRouteConfiguration extends RouteConfiguration> extends Component<NavigationLayoutProps<TRouteConfiguration>> {}

export class DefaultLayout extends NavigationLayout<any> {
  override render() {
    const { children } = this.props;
    return children;
  }
}
