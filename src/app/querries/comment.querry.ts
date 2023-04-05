import { QUERRY_KEYS } from 'app/utils/static';
import { ICommentPaginated } from 'app/types/IComment';
import { IError } from 'app/types/IError';
import { useQuery, QueryKey } from 'react-query';
import { commentsService } from 'app/services/comments.service';

export const useGetCommentsQuery = (movieId: string, limit: number) =>
  useQuery<ICommentPaginated | IError>(
    [QUERRY_KEYS.COMMENTS] as QueryKey,
    async () => {
      const data = await commentsService.getComments(movieId, limit);
      return data;
    }
  );
