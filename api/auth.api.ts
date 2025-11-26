// api/auth.api.ts

import { API } from "@/api/client";
import {
    LoginPayload,
    LoginResponse,
    RegisterPayload,
    RegisterResponse,
} from "@/types/auth";

export const loginApi = (data: LoginPayload) =>
  API.post<LoginResponse>("/auth/login", data);

export const registerApi = (data: RegisterPayload) =>
  API.post<RegisterResponse>("/auth/register", data);
