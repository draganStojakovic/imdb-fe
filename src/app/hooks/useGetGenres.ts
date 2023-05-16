import { useGetGenresQuerry } from 'app/querries/genre.querry';

export default function useGetGenres() {
  const { data } = useGetGenresQuerry();

  return data;
}
