// components/AuthGuard.tsx

import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getToken, decodeToken } from "@/services/auth.util";
import { useRouter, useSegments } from "expo-router";

export default function AuthGuard({ children }: any) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    async function verifyAuth() {
      const token = await getToken();

      const current = segments.join("/");

      // No token → redirect
      if (!token) {
        // User is NOT logged in
        if (!current.includes("(auth)")) {
          router.replace("/(auth)/login");
        }
        setLoading(false);
        return;
      }

      // Token exists → check expiry (validate)
      const decoded = decodeToken(token);
      const expired = decoded?.exp * 1000 < Date.now();

      if (expired) {
        router.replace("/(auth)/login");
      } else {
        // User is logged in but visiting login/register -> redirect home
        if (current.includes("(auth)")) {
          router.replace("/(tabs)/(home)");
        }
      }

      setLoading(false);
    }

    verifyAuth();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
}
