import {
  ICommentDelete,
  ICommentDeleteResponse,
  ICommentDraft,
  ICommentPaginated,
  ICommentResponse,
} from 'app/types/IComment';
import { httpService } from './http.service';
import { IError } from 'app/types/IError';
import { AxiosResponse } from 'axios';

class CommentsService {
  async getComments(movieId: string, limit: number) {
    return await httpService.request<ICommentPaginated | IError>({
      url: `/api/comments?movieId=${movieId}&limit=${limit}`,
      method: 'GET',
    });
  }

  async postComment(payload: ICommentDraft) {
    return await httpService.request<AxiosResponse<ICommentResponse, IError>>({
      url: '/api/comments',
      method: 'POST',
      data: payload,
    });
  }

  async deleteCommment(payload: ICommentDelete) {
    return await httpService.request<
      AxiosResponse<ICommentDeleteResponse, IError>
    >({
      url: '/api/comments',
      method: 'DELETE',
      data: payload,
    });
  }
}

export const commentsService = new CommentsService();
