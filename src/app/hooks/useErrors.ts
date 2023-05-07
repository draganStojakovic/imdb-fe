import { useState } from 'react';
import { IError } from 'app/types/IError';

const useErrors = () => {
  const [error, setError] = useState<IError | null>(null);

  return { error, setError };
};

export default useErrors;
