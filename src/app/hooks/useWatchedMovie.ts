import { useContext } from 'react';
import { UserContext } from 'app/context/UserContext';
import { useMutation } from 'react-query';
import { moviesService } from 'app/services/movies.service';
import { IUser } from 'app/types/IUser';
import { AxiosResponse } from 'axios';
import { isObjOfType } from 'app/utils/typeCheckers';
import { notficationManager } from 'app/utils/NotificationManager';

export default function useWatchedMovie() {
  const { refresh } = useContext(UserContext);

  const { mutate } = useMutation(moviesService.WatchedMovie, {
    onSuccess: (data: AxiosResponse<IUser>) => {
      if (isObjOfType<IUser>(data)) refresh(data);
    },
    onError: () => {
      notficationManager.error(
        'Something went wrong, please refresh the page and try again.'
      );
    },
  });

  async function watchedMovie(data: string) {
    mutate(data);
  }

  return { watchedMovie };
}
