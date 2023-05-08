import { NavigationScreenProps } from '../types';

export abstract class NavigationScreen<TProps extends NavigationScreenProps<any, any>> {
  abstract render(props: TProps): JSX.Element;
}
