import { httpService } from "./http.service";
import { IUser, IUserForm } from "../types/IUser";

class AuthService {
  private client = httpService;

  async LogIn(payload: IUserForm) {
    return await this.client.request<IUser>({
      url: "/api/auth/login",
      method: "POST",
      data: payload,
    });
  }

  async LogOut() {
    return await this.client.request({
      url: "/api/auth/logout",
      method: "POST",
    });
  }
}

export const authService = new AuthService();