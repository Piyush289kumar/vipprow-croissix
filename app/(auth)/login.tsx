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

export default function Login() {
  const dispatch = useDispatch();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 👁️ Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = () => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: async (res) => {
          const { token, user } = res.data;

          dispatch(setAuth({ user, token }));
          await saveToken(token);

          router.replace("/(tabs)");
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Enter your credentials to continue</Text>

        {/* Email */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password with Show/Hide */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
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
        </View>

        {/* Login Button */}
        <Pressable
          style={styles.button}
          onPress={onLogin}
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </Pressable>

        {/* Register Link */}
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

// --------------------------------------------------
// ⚡ Add extra styles for password field
// --------------------------------------------------
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

  // 👇 Password Field Styling
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
