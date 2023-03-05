import { Alert, Backdrop, Box, LinearProgress } from "@mui/material";
import { LoadingContext } from "../context/LoadingContext";
import useLoading from "../hooks/useLoading";

interface Props {
  children: React.ReactNode;
}

export default function LoadingProvider({ children }: Props) {
  const { loading, setLoading, error, setLoadingError } = useLoading();

  return (
    <LoadingContext.Provider value={{ loading, setLoading, error, setLoadingError }}>
      <>
        {children}
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <Box sx={{ width: "100%", position: "absolute", top: 0, left: 0 }}>
            <LinearProgress />
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
        </Backdrop>
      </>
    </LoadingContext.Provider>
  );
}
