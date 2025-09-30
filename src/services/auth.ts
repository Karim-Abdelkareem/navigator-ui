import { apiClient, type ApiResponse } from "@/lib/axios";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

export const AuthService = {
  async register(payload: RegisterPayload) {
    const { data } = await apiClient.post<ApiResponse<UserDTO>>(
      "/auth/register",
      payload
    );
    return data;
  },

  async login(payload: LoginPayload) {
    const { data } = await apiClient.post<ApiResponse<UserDTO>>(
      "/auth/login",
      payload
    );
    return data;
  },

  async logout() {
    const { data } = await apiClient.post<ApiResponse<null>>("/auth/logout");
    return data;
  },

  async me() {
    const { data } = await apiClient.get<ApiResponse<UserDTO>>("/auth/me");
    return data;
  },
};
