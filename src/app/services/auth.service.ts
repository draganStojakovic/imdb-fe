import { httpService } from "./http.service";
import { IUser } from "../types/user";

class AuthService {
  private client = httpService;

  async LogIn(user: IUser) {
    const response = await this.client.post("/api/auth/login", user);
    console.log(response);
    return;
  }

  // setLoginTokenAndredirect(response: IUser) {
  //   window.localStorage.setItem("loginToken", response.data.access_token);
  //   window.location.replace("/");
  // }
}

export const authService = new AuthService();
