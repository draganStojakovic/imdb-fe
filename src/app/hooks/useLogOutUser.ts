import { useMutation } from 'react-query';
import { authService } from 'app/services/auth.service';
import { useContext } from 'react';
import { UserContext } from 'app/context/UserContext';
import { AxiosError } from 'axios';

export default function useLogOutUser() {
  const { user, logout } = useContext(UserContext);

  const { mutate } = useMutation(authService.LogOut, {
    onSuccess: () => {
      logout();
    },
    onError: (err: AxiosError) => {
      console.log(err.message);
      logout();
    },
  });

  return { user, mutate };
}
