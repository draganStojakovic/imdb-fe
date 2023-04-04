import { httpService } from './http.service';
import { IUser, ISignIn, IRegister } from 'app/types/IUser';
import { IError } from 'app/types/IError';
import { AxiosResponse } from 'axios';

class AuthService {
  async LogIn(payload: ISignIn) {
    return await httpService.request<AxiosResponse<IUser, IError>>({
      url: '/api/auth/login',
      method: 'POST',
      data: payload,
    });
  }

  async LogOut() {
    return await httpService.request({
      url: '/api/auth/logout',
      method: 'POST',
    });
  }

  async Register(payload: IRegister) {
    return await httpService.request<AxiosResponse<IUser | IError>>({
      url: '/api/auth/register',
      method: 'POST',
      data: payload,
    });
  }
}

export const authService = new AuthService();
