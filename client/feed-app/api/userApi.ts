import axios, { AxiosResponse } from "axios";
import instanceApi from "./instance/instance";

export const userApi = {
  login: async (
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse> | undefined> => {
    try {
      return instanceApi.post<AuthResponse>("/login", { email, password });
    } catch (error) {
      console.error("Ошибка:", error);
    }
  },
  registration: async (
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse> | undefined> => {
    try {
      return instanceApi.post<AuthResponse>("/registration", { email, password });
    } catch (error) {
      console.error("Ошибка:", error);
    }
  },
  logout: async (email: string, password: string): Promise<void> => {
    try {
      return instanceApi.post("/logout");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  },
};
