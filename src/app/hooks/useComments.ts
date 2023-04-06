import { useGetCommentsQuery } from 'app/querries/comment.querry';

export default function useComments() {
  function getComments(id: string, limit: number) {
    const { data, refetch } = useGetCommentsQuery(id, limit);
    return { data, refetch };
  }

  return { getComments };
}
