import { NavigationScreen, Screen } from '@rx-navigator/react';
import { ProfileScreenProps } from '../routes';

@Screen({ path: '/profile/:profileId', name: 'Profile', type: 'page' })
export class ProfileScreen extends NavigationScreen<ProfileScreenProps> {
  render(): JSX.Element {
    const { route, navigation } = this.props;
    return (
      <>
        <h2>Name: {route.name}</h2>
        <h3>Path: {route.path}</h3>
        <h4>Params: {`{ profileId: ${route.params.profileId} }`}</h4>
        <button onClick={() => navigation.goBack()}>Go to back to Home!</button>
      </>
    );
  }
}
