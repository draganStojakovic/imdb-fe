import { useContext } from 'react';
import { UserContext } from 'app/context/UserContext';
import { useMutation } from 'react-query';
import { IUser } from 'app/types/IUser';
import { AxiosResponse } from 'axios';
import { isObjOfType } from 'app/utils/typeCheckers';
import { moviesService } from 'app/services/movies.service';
import { notficationManager } from 'app/utils/NotificationManager';

export default function useWatchList() {
  const { refresh } = useContext(UserContext);

  const { mutate } = useMutation(moviesService.WatchList, {
    onSuccess: (data: AxiosResponse<IUser>) => {
      if (isObjOfType<IUser>(data)) refresh(data);
    },
    onError: () => {
      notficationManager.error(
        'Something went wrong, please refresh the page and try again.'
      );
    },
  });

  async function addOrRemoveFromWatchList(data: string) {
    mutate(data);
  }

  return { addOrRemoveFromWatchList };
}
