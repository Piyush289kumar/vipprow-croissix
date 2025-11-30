// app/(auth)/login.tsx

import React from "react";
import { View, Text } from "react-native"; // ⬅️ use RN components for Tailwind
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <View className="flex-1 bg-black">
      <View className="flex-1 justify-center px-6">
        {/* App title */}
        <Text className="text-3xl font-semibold text-blue-800 mb-12">
          Welcome back 👋
        </Text>
        <Text className="text-base text-neutral-400 mb-8">
          Sign in to continue to your dashboard.
        </Text>

        {/* Email */}
        <View className="gap-2 mb-4">
          <Text className="text-sm text-neutral-300">Email</Text>
          <Input
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View className="gap-2 mb-2">
          <Text className="text-sm text-neutral-300">Password</Text>
          <Input
            placeholder="••••••••"
            secureTextEntry
          />
        </View>

        {/* Forgot password */}
        <View className="items-end mb-6">
          <Text className="text-xs text-blue-400">Forgot password?</Text>
        </View>

        {/* Primary button (BNA UI) */}
        <Button className="h-12 rounded-2xl" /* if BNA Button supports className */>
          <Text className="text-base font-medium text-white">
            Sign in
          </Text>
        </Button>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-neutral-800" />
          <Text className="mx-3 text-xs text-neutral-500">OR CONTINUE WITH</Text>
          <View className="flex-1 h-px bg-neutral-800" />
        </View>

        {/* Secondary auth providers could go here */}

        {/* Bottom text */}
        <View className="mt-4 flex-row justify-center">
          <Text className="text-xs text-neutral-500">
            Don't have an account?{" "}
          </Text>
          <Text className="text-xs text-blue-400 font-medium">
            Sign up
          </Text>
        </View>
      </View>
    </View>
  );
}
