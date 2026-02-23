// services/(auth)/register.service.ts

import { loginApi, registerApi } from "@/api/auth.api";
import { AppDispatch } from "@/store";
import { saveToken } from "../auth.util";
import { setAuth } from "@/store/slices/auth.slice";

export async function handleRegister(
  name: string,
  email: string,
  password: string,
  dispatch: AppDispatch
) {
  try {
    const payload = {
      name: name.trim(),
      email: email.trim().toLocaleLowerCase(),
      password: password.trim(),
    };

    // Register user
    const reg = await registerApi(payload);

    // After registration -> directly login
    const loginRes = await loginApi({
      email: payload.email,
      password: payload.password,
    });

    const data = loginRes.data;

    // Save token
    await saveToken(data.token);

    // Set Redux
    dispatch(setAuth({ user: data.user, token: data.token }));

    // return
    return { success: true, message: "Registered & Logged in" };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Registration Failed",
    };
  }
}
