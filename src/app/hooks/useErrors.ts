import { useState } from 'react';

interface IError {
  body: string;
  msg: string
}

const useErrors = () => {
  const [error, setError] = useState<IError | null>(null);
  console.log(error)
  return { error, setError };
};

export default useErrors;
