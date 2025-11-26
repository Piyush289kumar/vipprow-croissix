// app/(auth)/login.tsx

import { useLogin } from "@/hooks/useAuth";
import { saveToken } from "@/services/storage.service";
import { setAuth } from "@/store/slices/auth.slice";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

// validators
import { useToast } from "@/components/ui/ToastProvider";
import { validateEmail, validatePassword } from "@/utils/validators";

export default function Login() {
  const toast = useToast();
  const dispatch = useDispatch();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // live errors
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const onLogin = () => {
    if (!email || !password) return toast.error("All fields are required");

    if (emailError || passwordError)
      return toast.error("Please fix input errors");

    loginMutation.mutate(
      { email, password },
      {
        onError: (err: any) =>
          toast.error(err?.response?.data?.message || "Login failed"),

        onSuccess: async ({ token, user }) => {
          toast.success("Logged in successfully!");
          dispatch(setAuth({ user, token }));
          await saveToken(token);
          router.replace("/(tabs)");
        },
      }
    );
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!validateEmail(value)) setEmailError("Please enter a valid email.");
    else setEmailError(null);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!validatePassword(value))
      setPasswordError("Password must be at least 6 characters.");
    else setPasswordError(null);
  };

  const isButtonDisabled =
    !email || !password || emailError !== null || passwordError !== null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Enter your credentials to continue</Text>

        {/* EMAIL */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            placeholder="you@example.com"
            placeholderTextColor="#888"
            value={email}
            onChangeText={handleEmailChange}
            autoCapitalize="none"
          />

          {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        </View>

        {/* PASSWORD */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>

          <View
            style={[
              styles.passwordContainer,
              passwordError ? styles.inputError : null,
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePasswordChange}
            />

            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#666"
              />
            </Pressable>
          </View>

          {passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
        </View>

        {/* LOGIN BUTTON */}
        <Pressable
          style={[styles.button, isButtonDisabled && { opacity: 0.5 }]}
          onPress={onLogin}
          disabled={isButtonDisabled || loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </Pressable>

        {/* REGISTER LINK */}
        <Pressable
          onPress={() => router.push("/(auth)/register")}
          style={{ marginTop: 12 }}
        >
          <Text style={styles.registerText}>
            Don’t have an account?{" "}
            <Text style={styles.registerLink}>Register</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

/////////////////////////////////////////////////////////////////////
// 🎨 Styles (unchanged except error highlights)
/////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f8",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6,
    color: "#111",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },

  inputWrapper: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
    fontWeight: "500",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
    color: "#111",
  },

  inputError: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },

  passwordContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fafafa",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#111",
  },

  eyeIcon: {
    paddingHorizontal: 12,
  },

  button: {
    backgroundColor: "#111",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  registerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
  },

  registerLink: {
    fontWeight: "700",
    color: "#000",
  },
});
