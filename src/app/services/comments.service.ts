import { ICommentPaginated } from 'app/types/IComment';
import { httpService } from './http.service';
import { IError } from 'app/types/IError';

class CommentsService {
  async getComments(movieId: string, page: string, limit: string) {
    return await httpService.request<ICommentPaginated | IError>({
      url: `/api/comments?movieId=${movieId}&page=${page}&limit=${limit}`,
      method: 'GET',
    });
  }
}

export const commentsService = new CommentsService();
