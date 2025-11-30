// services/auth.service.ts

import { clearToken } from "@/services/auth.util";
import { store } from "@/store";
import { logout as logoutAction } from "@/store/slices/auth.slice";
import { router } from "expo-router";

export async function logout() {
  await clearToken();
  store.dispatch(logoutAction());
  router.replace("/(auth)/login");
}
