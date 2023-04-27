import { NavigationRoute } from '../navigation';
import { RouteConfiguration } from './route_configuration.type';

type Join<T extends string> = T extends '' ? '' : `.${T}`;
export type Path<TRouteConfiguration extends RouteConfiguration> = {
  [TKey in Extract<keyof TRouteConfiguration, string>]: TRouteConfiguration[TKey] extends NavigationRoute<any>
    ? `${TKey}`
    : TRouteConfiguration[TKey] extends RouteConfiguration
    ? `${TKey}${Join<Path<TRouteConfiguration[TKey]>>}`
    : never;
}[Extract<keyof TRouteConfiguration, string>] extends infer D
  ? Extract<D, string>
  : never;

type ExtractKey<T extends RouteConfiguration, K extends string> = K extends keyof T ? T[K] : never;
export type ExtractPath<T extends RouteConfiguration, K extends string = Path<T>> = T extends object
  ? K extends `${infer F}.${infer R}`
    ? ExtractKey<T, F> extends RouteConfiguration
      ? ExtractPath<ExtractKey<T, F>, R>
      : never
    : ExtractKey<T, K>
  : never;
