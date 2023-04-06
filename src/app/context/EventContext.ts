/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

interface IEventContext {
  reloadCommentsEvent: boolean;
  setReloadCommentsEvent: (reloadComments: boolean) => void;
}

export const EventContext = createContext<IEventContext>({
  reloadCommentsEvent: false,
  setReloadCommentsEvent: (_reloadComments: boolean) => Function,
});
