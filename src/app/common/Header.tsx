import { Navigation } from 'app/components/NavigationComponent';
import { APP_BAR_AUTH, APP_BAR_GUEST } from 'app/utils/static';
import useLogOutUser from 'app/hooks/useLogOutUser';

export const Header = () => {
  const { user, mutate } = useLogOutUser();

  if (user) {
    return <Navigation header={APP_BAR_AUTH} mutate={mutate} />;
  } else {
    return <Navigation header={APP_BAR_GUEST} mutate={mutate} />;
  }
};
