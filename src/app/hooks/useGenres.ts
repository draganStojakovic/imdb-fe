import { useGetGenresQuerry } from 'app/querries/genre.querry';
import { isGenres } from 'app/utils/typeCheckers';

const useGenres = () => {
  const { data } = useGetGenresQuerry();

  const getGenres = () => {
    if (isGenres(data)) return data;
    return undefined;
  };

  return { getGenres };
};

export default useGenres;
