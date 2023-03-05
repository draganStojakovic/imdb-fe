import { Context, createContext } from "react";

interface ILoading {
  loading: boolean;
  error: string | null;
  setLoading: (state: boolean) => void;
  setLoadingError: (error: string | null) => void;
}

export const LoadingContext: Context<ILoading> = createContext<ILoading>({
  loading: false,
  error: null,
  setLoading: (state: boolean) => Function,
  setLoadingError: (error: string | null) => Function,
});
