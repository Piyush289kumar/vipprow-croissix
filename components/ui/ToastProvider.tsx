// components/ui/ToastProvider.tsx

import React, { createContext, useCallback, useContext, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const ToastContext = createContext<any>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<{ message: string; type: string } | null>(
    null
  );
  const fade = new Animated.Value(0);

  const show = useCallback(
    (message: string, type: "success" | "error" = "error") => {
      setToast({ message, type });

      Animated.timing(fade, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fade, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }).start(() => setToast(null));
        }, 1800);
      });
    },
    []
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      {toast && (
        <Animated.View style={[styles.toast, { opacity: fade }]}>
          <View
            style={[
              styles.toastContent,
              toast.type === "error" ? styles.error : styles.success,
            ]}
          >
            <Text style={styles.toastText}>{toast.message}</Text>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999,
  },
  toastContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  toastText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  error: {
    backgroundColor: "#e53935",
  },
  success: {
    backgroundColor: "#43a047",
  },
});
