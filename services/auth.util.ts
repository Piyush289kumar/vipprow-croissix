// services/auth.util.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

// KEY NAME (consistent + easy to change)
const TOKEN_KEY = "authToken";

// Save JWT
export async function saveToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (err) {
    console.error("Error saving token:", err);
  }
}

// Get JWT
export async function getToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (err) {
    console.error("Error getting token:", err);
    return null;
  }
}

// Remove JWT
export async function clearToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.error("Error clearing token:", err);
  }
}

// Decode JWT (safe, no crash)
export function decodeToken(token: string) {
  try {
    const base64 = token.split(".")[1];
    if (!base64) return null;

    const decoded = JSON.parse(
      Buffer.from(base64, "base64").toString("utf8")
    );

    return decoded;
  } catch {
    return null;
  }
}

// Check Authentication
export async function isAuthenticated(): Promise<boolean> {
  const token = await getToken();
  if (!token) return false;

  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp > currentTime;
}
