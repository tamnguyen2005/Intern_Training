import api from "../api/api";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "../types/auth.type";

export const AuthService = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    return api.post("/auth/login", request);
  },
  register: async (request: RegisterRequest): Promise<void> => {
    return api.post("/auth/register", request);
  },
};
