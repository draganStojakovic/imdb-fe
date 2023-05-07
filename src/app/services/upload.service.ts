import { httpService } from './http.service';
import { AxiosResponse } from 'axios';
import { IPoster, IPosterDelete } from 'app/types/IPoster';
import { IError } from 'app/types/IError';

class UploadService {
  async UploadFile(payload: FormData) {
    return await httpService.request<AxiosResponse<IPoster, IError>>({
      url: '/api/upload',
      method: 'POST',
      data: payload,
    });
  }

  async DeleteFile(payload: string) {
    return await httpService.request<IPosterDelete | IError>({
      url: `/api/upload?posterId=${payload}`,
      method: 'DELETE',
    });
  }
}

export const uploadService = new UploadService();
