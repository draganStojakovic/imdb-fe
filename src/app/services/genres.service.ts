import { httpService } from './http.service';
import { AxiosResponse } from 'axios';
import { IGenre } from 'app/types/IGenre';
import { IError } from 'app/types/IError';

class GenresService {
  async GetGenres() {
    return await httpService.request<AxiosResponse<IGenre[], IError>>({
      url: '/api/genres',
      method: 'GET',
    });
  }

  async GetGenre(payload: string) {
    return await httpService.request<AxiosResponse<IGenre, IError>>({
      url: `/api/genres/${payload}`,
      method: 'GET',
    });
  }
}

export const genresService = new GenresService();
