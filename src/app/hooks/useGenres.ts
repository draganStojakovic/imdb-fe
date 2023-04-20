import { useGetGenresQuerry } from 'app/querries/genre.querry';
import { IGenre } from 'app/types/IGenre';
import { isObjOfType } from 'app/utils/typeCheckers';

const useGenres = () => {
  const { data } = useGetGenresQuerry();
  
  const getGenres = () => {
    if (isObjOfType<IGenre[]>(data)) return data;
    return undefined;
  };

  return { getGenres };
};

export default useGenres;
