import { NavigationScreen, Screen } from '@rx-navigator/react';
import { HomeScreenProps } from '../routes';

@Screen({ initial: true, path: '/home', name: 'Home', type: 'page' })
export class HomeScreen extends NavigationScreen<HomeScreenProps> {
  render(): JSX.Element {
    const { route, navigation } = this.props;
    return (
      <>
        <h2>Name: {route.name}</h2>
        <h3>Path: {route.path}</h3>
        <h4>Params: {`${route.params}`}</h4>
        <button onClick={() => navigation.push({ screen: 'settings.profile', params: { profileId: 'anastasesg' } })}>Go to Profile!</button>
      </>
    );
  }
}
