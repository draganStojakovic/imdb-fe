/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, createContext } from 'react';

interface ILoading {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

export const LoadingContext: Context<ILoading> = createContext<ILoading>({
  loading: false,
  setLoading: (state: boolean) => Function,
});
