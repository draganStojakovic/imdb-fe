import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useMutation } from 'react-query';
import { authService } from 'app/services/auth.service';
import { HeaderBar } from 'app/components/HeaderBarComponent';
import { APP_BAR_AUTH, APP_BAR_GUEST } from 'app/utils/static';

export const Header = () => {
  const { user, logout } = useContext(UserContext);

  const { mutate } = useMutation(authService.LogOut, {
    onSuccess: () => {
      logout();
    },
    onError: () => {
      logout();
    },
  });

  return (
    <>
      {user ? (
        <HeaderBar header={APP_BAR_AUTH} mutate={mutate} />
      ) : (
        <HeaderBar header={APP_BAR_GUEST} mutate={mutate} />
      )}
    </>
  );
};
