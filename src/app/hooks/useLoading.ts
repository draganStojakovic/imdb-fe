import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setLoadingError] = useState<string | null>(null);

  return { loading, setLoading, error, setLoadingError };
};

export default useLoading;
