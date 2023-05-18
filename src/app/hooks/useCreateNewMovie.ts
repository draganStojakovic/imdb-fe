import { IError, IErrors } from 'app/types/IError';
import { moviesService } from 'app/services/movies.service';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';

export default function useCreateNewMovie() {
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<Array<IErrors> | null>(null);

  const { mutate } = useMutation(moviesService.CreateMovie, {
    onSuccess: () => {
      setSuccess(true);
    },
    onError: (error: AxiosError<IError>) => {
      setSuccess(false);
      const errorArray = error.response?.data.errors;

      if (errorArray) {
        setError(errorArray);
      }
    },
  });

  function clearSuccess() {
    setSuccess(null);
  }

  return { error, mutate, success, clearSuccess };
}
