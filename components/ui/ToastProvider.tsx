// components/ui/ToastProvider.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { createContext, useContext, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ToastContext = createContext<any>(null);

interface ToastItem {
  message: string;
  type: "success" | "error" | "info";
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastItem | null>(null);
  const timeoutRef = useRef<any>(null);

  const show = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    // Remove existing toast instantly before showing a new one
    hide(true);

    const fadeAnim = new Animated.Value(0);
    const slideAnim = new Animated.Value(-20);

    const newToast = { message, type, fadeAnim, slideAnim };
    setToast(newToast);

    // Animate IN
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();

    // AUTO-HIDE after 3s (use the toast object itself to avoid stale closure)
    timeoutRef.current = setTimeout(() => {
      hide(false, newToast);
    }, 3000);
  };

  const hide = (instant = false, targetToast = toast) => {
    if (!targetToast) return;

    clearTimeout(timeoutRef.current);

    if (instant) {
      setToast(null);
      return;
    }

    // Animate OUT
    Animated.parallel([
      Animated.timing(targetToast.fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(targetToast.slideAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Only clear if the current toast is the one animating out
      setToast((current: ToastItem | null) =>
        current === targetToast ? null : current
      );
    });
  };

  const iconForType = (type: string) => {
    switch (type) {
      case "success":
        return <Ionicons name="checkmark-circle" size={22} color="#fff" />;
      case "error":
        return <Ionicons name="close-circle" size={22} color="#fff" />;
      default:
        return <Ionicons name="information-circle" size={22} color="#fff" />;
    }
  };

  return (
    <ToastContext.Provider
      value={{
        show,
        success: (msg: string) => show(msg, "success"),
        error: (msg: string) => show(msg, "error"),
        info: (msg: string) => show(msg, "info"),
      }}
    >
      {children}

      {toast && (
        <View style={styles.toastContainer}>
          <Animated.View
            style={[
              styles.toast,
              {
                opacity: toast.fadeAnim,
                transform: [{ translateY: toast.slideAnim }],
                backgroundColor:
                  toast.type === "success"
                    ? "#22c55e"
                    : toast.type === "error"
                    ? "#ef4444"
                    : "#3b82f6",
              },
            ]}
          >
            <Pressable
              onPress={() => hide(false, toast)}
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              {iconForType(toast.type)}
              <Text style={styles.toastText}>{toast.message}</Text>
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999,
  },
  toast: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  toastText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
