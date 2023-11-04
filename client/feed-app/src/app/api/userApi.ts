import axios, { AxiosResponse } from "axios";
const SERVER_URL = "http://localhost:5001";
export const userApi = {
  login: async (
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse> | undefined> => {
    try {
      const res = await axios.post<AuthResponse>(`${SERVER_URL}/user/login`, {
        email,
        password,
      });
      return res;
    } catch (error) {
      console.error("Ошибка:", error);
    }
  },
  registration: async (
    email: string,
    password: string,
    name: string,
    moderatorCode: string
  ): Promise<AxiosResponse<AuthResponse> | undefined> => {
    try {
      const req = await axios.post<AuthResponse>(
        `${SERVER_URL}/user/registration`,
        { email, password, name, moderatorCode }
      );
      return req;
    } catch (error) {
      console.error("Ошибка:", error);
    }
  },
  logout: async (email: string, password: string): Promise<void> => {
    try {
      return axios.post("/logout");
    } catch (error) {
      console.error("Ошибка:", error);
    }
  },
  getUser: async (email: any) => {
    try {
      const req = await axios.get<AuthResponse>(
        `${SERVER_URL}/user/getUser/${email}`
      );
      return req;
    } catch (error) {
      console.error("Ошибка:", error);
    }
  },
};
