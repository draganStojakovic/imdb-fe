import { useGetGenresQuerry } from 'app/querries/genre.querry';

export default function useGetGenresAlt() {
  const { data } = useGetGenresQuerry();

  return data;
}
