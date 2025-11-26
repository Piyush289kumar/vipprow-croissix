// hooks/useAuth.ts

import { loginApi, registerApi } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () =>
  useMutation({
    mutationFn: (data) => loginApi(data),
  });

export const useRegister = () =>
  useMutation({
    mutationFn: (data) => registerApi(data),
  });
