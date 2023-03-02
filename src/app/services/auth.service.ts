import { httpService } from "./http.service";
import { IUser, ISignIn, IRegister } from "app/types/IUser";

class AuthService {
  async LogIn(payload: ISignIn) {
    return await httpService.request<IUser>({
      url: "/api/auth/login",
      method: "POST",
      data: payload,
    });
  }

  async LogOut() {
    return await httpService.request({
      url: "/api/auth/logout",
      method: "POST",
    });
  }

  async register(payload: IRegister) {
    return await httpService.request({
      url: "/api/auth/register",
      method: "POST",
      data: payload,
    });
  }
}

export const authService = new AuthService();
