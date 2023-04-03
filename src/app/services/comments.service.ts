import { ICommentPaginated } from 'app/types/IComment';
import { httpService } from './http.service';
import { IError } from 'app/types/IError';

class CommentsService {
  async getComments(movieId: string, limit: number) {
    return await httpService.request<ICommentPaginated | IError>({
      url: `/api/comments?movieId=${movieId}&limit=${limit}`,
      method: 'GET',
    });
  }
}

export const commentsService = new CommentsService();
