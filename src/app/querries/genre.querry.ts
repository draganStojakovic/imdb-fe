import { genresService } from 'app/services/genres.service';
import { IError } from 'app/types/IError';
import { IGenre } from 'app/types/IGenre';
import { QUERRY_KEYS } from 'app/utils/static';
import { QueryKey, useQuery } from 'react-query';

export const useGetGenresQuerry = () =>
  useQuery<IGenre[] | IError>([QUERRY_KEYS.GENRES] as QueryKey, async () => {
    const data = await genresService.GetGenres();
    return data;
  });
