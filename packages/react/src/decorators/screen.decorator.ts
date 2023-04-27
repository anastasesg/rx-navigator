import { NavigationScreen } from '../components';
import { ClassLike } from '../types';
import { InitialMetadata, NameMetadata, PathMetadata, TypeMetadata } from './decorator.metadata';

type ScreenProps = {
  type?: 'page' | 'modal';
  initial?: boolean;
  name?: string;
  path?: string;
};

export function Screen(props: ScreenProps) {
  return (target: ClassLike<NavigationScreen<any>>) => {
    const { type = 'page', initial = false, path = `/${target.name.toLowerCase()}`, name = target.name } = props;

    Reflect.defineMetadata(TypeMetadata, type, target);
    Reflect.defineMetadata(PathMetadata, path, target);
    Reflect.defineMetadata(NameMetadata, name, target);
    Reflect.defineMetadata(InitialMetadata, initial, target);
  };
}
