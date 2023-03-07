import axios, { AxiosInstance } from "axios";
import { IUser } from "../types/user";

class HttpService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "http://localhost:3500",
      withCredentials: true,
      headers: {
        XMLHttpRequest: "HMLHttpRequest",
      },
    });
  }

  async post(route: string, payload: IUser) {
    return await this.httpClient.post(route, payload);
  }
}

export const httpService = new HttpService();