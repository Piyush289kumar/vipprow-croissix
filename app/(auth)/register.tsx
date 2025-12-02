// app/(auth)/ register.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
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
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react-native";
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
import { useRouter } from "expo-router";
import { useToast } from "@/components/ui/toast";
import { handleRegister } from "@/services/(auth)/register.service";
import { useDispatch } from "react-redux";

export default function RegisterPage() {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailError =
    email && !email.includes("@") ? "Please enter a valid email address" : "";
  const passwordError =
    password && password.length < 6
      ? "Password must be at least 6 characters"
      : "";
  const fullNameError =
    fullName && fullName.length < 6
      ? "First must be at least 3 characters"
      : "";
  // Background parallax animation
  const translateY = useSharedValue(0);
  const router = useRouter();
  useEffect(() => {
    translateY.value = withTiming(-20, { duration: 6000 });
  }, []);

  // Inside onPress
  async function onRegister() {
    console.log("Press : onRegister");

    if (!fullName || !email || !password) {
      toast({
        title: "Error",
        description: "All fields required",
        variant: "error",
      });
      return;
    }

    const res = await handleRegister(fullName, email, password, dispatch);

    if (res.success) {
      toast({
        title: "Success",
        description: res.message,
        variant: "success",
      });

      router.replace("/(tabs)/(home)");
    } else {
      toast({
        title: "Failed",
        description: res.message,
        variant: "error",
      });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            className="!text-white text-5xl font-bold text-center px-10 leading-tight mt-0"
          >
            Sign Up
          </Animated.Text>
          <Animated.View entering={FadeInUp.delay(400).duration(900)}>
            <BNAText variant="caption" className="!text-white mt-8">
              Create your account with Admin Console
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
                {/* INPUTS */}
                <BNAView style={{ gap: 16 }}>
                  <Input
                    placeholder="Enter your Full Name"
                    icon={User}
                    value={fullName}
                    onChangeText={setFullName}
                    error={fullNameError}
                    keyboardType="default"
                  />
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
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    error={passwordError}
                    rightComponent={
                      <Pressable onPress={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <EyeOff size={20} color="#6b7280" />
                        ) : (
                          <Eye size={20} color="#6b7280" />
                        )}
                      </Pressable>
                    }
                  />
                  <View className="flex-row items-center justify-between mt-3">
                    <BNACheckbox
                      checked={checked}
                      onCheckedChange={setChecked}
                      label="Terms and Conditions"
                    />
                    <BNAText variant="link" style={{ color: "#4D81E7" }}>
                      Read Policy
                    </BNAText>
                  </View>
                </BNAView>
              </CardContent>
              {/* LOG IN BUTTON */}
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
                  onPress={onRegister}
                >
                  Log In
                </BNAButton>
              </BNAView>
              {/* FOOTER */}
              {/* Separator */}
              <View className="flex-row items-center my-6 px-2">
                <View className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                <Text className="px-5 text-gray-500 dark:text-gray-400">
                  Or
                </Text>
                <View className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
              </View>
              {/* GOOGLE LOGIN BUTTON */}
              <Pressable
                className="
                  flex-row items-center justify-center 
                  bg-white dark:bg-zinc-900
                  border border-zinc-100 dark:border-zinc-800
                  h-14 rounded-3xl gap-3
                  active:opacity-80 mx-1"
              >
                <GoogleIcon width={26} height={26} />
                <Text className="text-base text-zinc-700 dark:text-zinc-200 font-medium">
                  Sign Up with Google
                </Text>
              </Pressable>
              <BNAView
                style={{
                  marginTop: 16,
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <BNAText variant="caption"> Already have an account?</BNAText>
                <BNAText
                  variant="link"
                  style={{ color: "#4D81E7" }}
                  onPress={() => router.push("/(auth)/login")}
                >
                  Log In
                </BNAText>
              </BNAView>
            </Card>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
// Styles
const styles = StyleSheet.create({
  bgContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
