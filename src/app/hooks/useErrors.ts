import { useState } from 'react';

interface IError {
  param?: string;
  msg: string
}

const useErrors = () => {
  const [error, setError] = useState<IError | null>(null);
  
  return { error, setError };
};

export default useErrors;
