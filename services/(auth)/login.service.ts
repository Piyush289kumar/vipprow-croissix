// services/(auth)/login.service.ts

import { loginApi } from "@/api/auth.api";
import { saveToken } from "@/services/auth.util";
import { setAuth } from "@/store/slices/auth.slice";
import { AppDispatch } from "@/store";

export async function handleLogin(
  email: string,
  password: string,
  dispatch: AppDispatch
) {
  try {
    const payload = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };

    console.log("🚀 Payload Sent:", payload);

    const response = await loginApi(payload);

    console.log("🚀 Response :", response);

    console.log("🔥 Login API success:", response.data);

    const data = response.data;

    // Save token in Storage
    await saveToken(data.token);

    // Save in Redux
    dispatch(
      setAuth({
        user: data.user,
        token: data.token,
      })
    );

    return { success: true, message: data.message };
  } catch (error: any) {
    console.log("❌ Login API Error:", error.response?.data);

    return {
      success: false,
      message:
        error.response?.data?.message || "Something went wrong. Try again.",
    };
  }
}
