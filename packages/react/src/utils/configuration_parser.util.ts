import { NavigationScreen } from '../components';
import { InitialMetadata, NameMetadata, PathMetadata, TypeMetadata } from '../decorators';
import { ClassLike, NavigationConfiguration, Route } from '../types';

function isClassLike<T>(obj: any): obj is ClassLike<T> {
  try {
    new obj();
  } catch (err) {
    return false;
  }
  return true;
}

function isClassLikeNavigationScreen(obj: any): obj is ClassLike<NavigationScreen<any>> {
  return isClassLike(obj) && new obj() instanceof NavigationScreen;
}

function pathJoiner(...paths: string[]): string {
  const pathString = new Array<string>('');
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    pathString.push(
      path
        .trim()
        .replace(/\/(.*)/gm, '$1')
        .replace(/(.*)\/+$/gm, '$1'),
    );
  }

  return pathString.join('/').replaceAll('//', '/');
}

function indexer(...indices: string[]): string {
  return indices.filter((i) => i !== '').join('.');
}

export function configurationParser(configuration: NavigationConfiguration<any, any>, index = '', path = ''): Route<any, any>[] {
  const routes = new Array<Route<any, any>>();
  const screenNames = Object.keys(configuration.screens);

  for (let i = 0; i < screenNames.length; i++) {
    const screenName = screenNames[i];
    const screen = configuration.screens[screenName];

    if (!screen) throw Error(`Screen ${screenName} is undefined`);
    if (isClassLikeNavigationScreen(screen))
      routes.push({
        type: Reflect.getMetadata(TypeMetadata, screen),
        index: indexer(index, screenName),
        name: Reflect.getMetadata(NameMetadata, screen),
        path: pathJoiner(path, Reflect.getMetadata(PathMetadata, screen)),
        initial: Reflect.getMetadata(InitialMetadata, screen),
        screen: screen,
      });
    else routes.push(...configurationParser(screen, indexer(index, screenName), pathJoiner(path, screen.path)));
  }

  return routes;
}
