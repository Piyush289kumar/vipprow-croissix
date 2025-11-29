// app/_layout.tsx

import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context"; // ✅ FIX

import { useColorScheme } from "@/hooks/use-color-scheme";

// Redux
import { store } from "@/store";
import { Provider } from "react-redux";

// TanStack Query
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const unstable_settings = {
  // anchor: "(tabs)",
  initialRouteName: "(auth)",
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <GluestackUIProvider>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <ToastProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen
                    name="modal"
                    options={{ presentation: "modal", title: "Modal" }}
                  />
                </Stack>
                <StatusBar style="auto" />
              </ToastProvider>
            </ThemeProvider>
          </GluestackUIProvider>
        </QueryClientProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
