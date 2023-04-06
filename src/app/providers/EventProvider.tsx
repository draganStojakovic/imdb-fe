import { EventContext } from 'app/context/EventContext';
import useEvent from 'app/hooks/useEvent';

interface Props {
  children: React.ReactNode;
}

const EventProvider = ({ children }: Props) => {
  const { reloadCommentsEvent, setReloadCommentsEvent } = useEvent();

  return (
    <EventContext.Provider
      value={{
        reloadCommentsEvent,
        setReloadCommentsEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
