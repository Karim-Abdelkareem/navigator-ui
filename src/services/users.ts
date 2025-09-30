import { apiClient, type ApiResponse } from "@/lib/axios";

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

export const UsersService = {
  async getById(userId: string) {
    const { data } = await apiClient.get<ApiResponse<UserDTO>>(
      `/users/${userId}`
    );
    return data;
  },

  async list() {
    const { data } = await apiClient.get<ApiResponse<UserDTO[]>>(`/users`);
    return data;
  },
};
