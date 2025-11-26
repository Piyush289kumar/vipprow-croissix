// hooks/useAuth.ts

import { loginApi, registerApi } from "@/api/auth.api";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: (data) => loginApi(data).then((res) => res.data),
  });

export const useRegister = () =>
  useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: (data) => registerApi(data).then((res) => res.data),
  });
