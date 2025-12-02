// components/AuthGuard.tsx

// components/AuthGuard.tsx
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
import { clearToken, getToken, decodeToken } from "@/services/auth.util";
import { useRouter, useSegments, useRootNavigationState } from "expo-router";
import { logout as logoutAction } from "@/store/slices/auth.slice";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function verify() {
      // ⛔ Don’t run until router is hydrated
      if (!navigationState?.key) return;

      const current = segments.join("/") || "";
      console.log("🚦 Segments", segments);
      console.log("🧭 Current", current);

      const token = await getToken();

      // ------------------ CASE 1: NO TOKEN -------------------
      if (!token) {
        const inAuth = current.startsWith("(auth)");
        if (!inAuth) router.replace("/(auth)/login");

        mounted && setChecking(false);
        return;
      }

      // ---------------- CASE 2: TOKEN EXISTS ------------------
      const decoded: any = decodeToken(token);
      const expired = !decoded || decoded.exp * 1000 < Date.now();

      if (expired) {
        await clearToken();
        store.dispatch(logoutAction());

        const inAuth = current.startsWith("(auth)");
        if (!inAuth) router.replace("/(auth)/login");

        mounted && setChecking(false);
        return;
      }

      // --------- CASE 3: LOGGED IN BUT IN AUTH ROUTE ---------
      if (current.startsWith("(auth)")) {
        router.replace("/(tabs)/(home)");
      }

      mounted && setChecking(false);
    }

    verify();

    return () => {
      mounted = false;
    };
  }, [segments, isAuthenticated, navigationState]);

  if (checking) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return <>{children}</>;
}
