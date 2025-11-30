// app/(auth)/login.tsx
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Logo from "@/assets/images/logo.svg";

// BNA UI
import { Button as BNAButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text as BNAText } from "@/components/ui/text";
import { View as BNAView } from "@/components/ui/view";
import { Input } from "@/components/ui/input";
import { Checkbox as BNACheckbox } from "@/components/ui/checkbox";
import { Lock, Mail } from "lucide-react-native";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const emailError =
    email && !email.includes("@") ? "Please enter a valid email address" : "";
  const passwordError =
    password && password.length < 6
      ? "Password must be at least 6 characters"
      : "";

  return (
    <View className="flex-1">
      {/* Top 50% : Blue */}
      <View className="flex-1 !bg-[#2567E8] dark:bg-zinc-900" />

      {/* Bottom 50% : White */}
      <View className="flex-1 bg-[#F6F8FA] dark:bg-zinc-950" />

      {/* Heading inside blue section */}
      <View className="absolute top-20 inset-x-0 items-center">
        {/* SVG Logo */}
        <Logo width={32} height={32} style={{ marginBottom: 20 }} />

        <Text className="!text-white text-5xl font-bold text-center px-10 leading-tight mt-5">
          Sign in to your Account
        </Text>
        <BNAText variant="caption" className="!text-white mt-8">
          Enter your email and password to log in
        </BNAText>
      </View>

      {/* Floating card */}
      <View className="absolute inset-0 -bottom-40 items-center justify-center px-6 min-w-lg max-w-lg mx-auto shadow-sm shadow-zinc-200 dark:shadow-none">
        <View className="bg-white dark:bg-zinc-800 rounded-3xl">
          <Card
            style={{
              backgroundColor: "transparent",
            }}
          >
            <CardContent>
              {/* Login With Google Button */}

              <Pressable
                className="
                    flex-row items-center justify-center 
                    bg-white dark:bg-zinc-900
                    border border-zinc-300 dark:border-zinc-800
                    h-14 rounded-3xl gap-3
                    active:opacity-80 mx-1"
              >
                <AntDesign
                  name="google"
                  size={26}
                  className="text-zinc-800 dark:!text-white"
                />
                <Text className="text-base text-zinc-700 dark:text-zinc-200 font-medium">
                  Continue with Google
                </Text>
              </Pressable>

              <View className="flex-row items-center my-6 px-2">
                <View className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                <Text className="px-5 text-gray-500 dark:text-gray-400">
                  Or login with
                </Text>
                <View className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
              </View>

              <BNAView style={{ gap: 16 }}>
                <Input
                  placeholder="Enter your email"
                  icon={Mail}
                  value={email}
                  onChangeText={setEmail}
                  error={emailError}
                  keyboardType="email-address"
                />
                <Input
                  placeholder="Enter password"
                  icon={Lock}
                  value={password}
                  onChangeText={setPassword}
                  error={passwordError}
                  secureTextEntry
                />

                <View className="flex-row items-center justify-between mt-3">
                  <BNACheckbox
                    checked={checked}
                    onCheckedChange={setChecked}
                    label="Remember Me"
                  />

                  <BNAText variant="link" style={{ color: "#4D81E7" }}>
                    Forget Password?
                  </BNAText>
                </View>
              </BNAView>
            </CardContent>

            <BNAView
              style={{
                flex: 1,
                gap: 16,
                marginTop: 20,
                marginBottom: 50,
                justifyContent: "center",
              }}
            >
              <BNAButton variant="default" size="sm">
                Sign In
              </BNAButton>
            </BNAView>

            <BNAView
              style={{
                marginTop: 16,
                flexDirection: "row",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <BNAText variant="caption">Don’t have an account?</BNAText>
              <BNAText variant="link" style={{ color: "#4D81E7" }}>
                Sign Out
              </BNAText>
            </BNAView>
          </Card>
        </View>
      </View>
    </View>
  );
}
