/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

interface IEventContext {
  reloadCommentsEvent: boolean;
  setReloadCommentsEvent: (reloadComments: boolean) => void;
  loadMoreCommentsEvent: number;
  setLoadMoreCommentsEvent: (loadMoreCommentsEvent: number) => void;
}

export const EventContext = createContext<IEventContext>({
  reloadCommentsEvent: false,
  setReloadCommentsEvent: (_reloadComments: boolean) => Function,
  loadMoreCommentsEvent: 5,
  setLoadMoreCommentsEvent: (_loadMoreCommentsEvent: number) => Function,
});
