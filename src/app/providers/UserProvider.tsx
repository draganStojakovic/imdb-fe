import { UserContext } from 'app/context/UserContext';
import useUser from 'app/hooks/useUser';

interface Props {
  children: React.ReactNode;
}

const UserProvider = ({ children }: Props) => {
  const { user, setUser, login, logout, refresh } = useUser();

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        refresh,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
