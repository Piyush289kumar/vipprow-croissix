// app/(tabs)/login.tsx

// import { Redirect } from "expo-router";

// export default function LoginProxy() {
//   return <Redirect href="/(auth)/login" />;
// }

// ORG

// app/(auth)/login.tsx

import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

// Assets
import Logo from "@/assets/images/logo.svg";
import StartBg from "@/assets/images/bg/auth/star_bg.svg";
import GoogleIcon from "@/assets/images/logo/google.svg";

// BNA UI
import { Button as BNAButton } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text as BNAText } from "@/components/ui/text";
import { View as BNAView } from "@/components/ui/view";
import { Input } from "@/components/ui/input";
import { Checkbox as BNACheckbox } from "@/components/ui/checkbox";
import { Lock, Mail } from "lucide-react-native";

// Reanimated
import Animated, {
  FadeIn,
  FadeInUp,
  FadeInDown,
  ZoomIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

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

  // Background parallax animation
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(-20, { duration: 6000 });
  }, []);

  return (
    <View className="flex-1">
      {/* Top 50% with SVG background */}
      <View style={{ flex: 1 }}>
        {/* Background Image Layer */}
        <View
          style={styles.bgContainer}
          className="bg-[#2567E8] dark:bg-zinc-900/90"
        >
          <StartBg
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
          />
        </View>
      </View>

      {/* Bottom white section */}
      <View className="flex-1 bg-[#F6F8FA] dark:bg-zinc-950" />

      {/* HEADER SECTION */}
      <Animated.View
        className="absolute top-20 inset-x-0 items-center"
        entering={FadeInUp.duration(700).springify()}
      >
        {/* App Logo */}
        <Animated.View entering={ZoomIn.duration(800)}>
          <Logo width={42} height={42} style={{ marginBottom: 20 }} />
        </Animated.View>

        <Animated.Text
          entering={FadeInUp.delay(200).duration(900)}
          className="!text-white text-5xl font-bold text-center px-10 leading-tight mt-5"
        >
          Sign in to your Account
        </Animated.Text>

        <Animated.View entering={FadeInUp.delay(400).duration(900)}>
          <BNAText variant="caption" className="!text-white mt-6">
            Enter your email and password to log in
          </BNAText>
        </Animated.View>
      </Animated.View>

      {/* FLOATING LOGIN CARD */}
      <Animated.View
        entering={FadeInDown.delay(300).springify().duration(900)}
        className="absolute inset-0 -bottom-40 items-center justify-center px-6 min-w-lg max-w-lg mx-auto"
      >
        <View className="bg-white dark:bg-zinc-800 rounded-3xl shadow-md dark:shadow-none">
          <Card style={{ backgroundColor: "transparent" }}>
            <CardContent>
              {/* GOOGLE LOGIN BUTTON */}
              <Pressable
                className="
                  flex-row items-center justify-center 
                  bg-white dark:bg-zinc-900
                  border border-zinc-300 dark:border-zinc-800
                  h-14 rounded-3xl gap-3
                  active:opacity-80 mx-1"
              >
                <GoogleIcon width={26} height={26} />
                <Text className="text-base text-zinc-700 dark:text-zinc-200 font-medium">
                  Continue with Google
                </Text>
              </Pressable>

              {/* Separator */}
              <View className="flex-row items-center my-6 px-2">
                <View className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                <Text className="px-5 text-gray-500 dark:text-gray-400">
                  Or login with
                </Text>
                <View className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
              </View>

              {/* INPUTS */}
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

            {/* SIGN IN BUTTON */}
            <BNAView
              style={{
                flex: 1,
                gap: 16,
                marginTop: 20,
                marginBottom: 50,
                justifyContent: "center",
              }}
            >
              <BNAButton
                variant="ghost"
                size="sm"
                style={{ backgroundColor: "#2567E8" }}
                textStyle={{ color: "white" }}
              >
                Sign In
              </BNAButton>
            </BNAView>

            {/* FOOTER */}
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
                Sign Up
              </BNAText>
            </BNAView>
          </Card>
        </View>
      </Animated.View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  bgContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
