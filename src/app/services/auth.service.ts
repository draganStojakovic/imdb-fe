import { httpService } from "./http.service";
import { IUser, ISignIn } from "../types/IUser";

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
}

export const authService = new AuthService();
