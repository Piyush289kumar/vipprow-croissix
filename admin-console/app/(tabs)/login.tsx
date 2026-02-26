// app/(tabs)/login.tsx

import { Redirect } from "expo-router";

export default function LoginProxy() {
  return <Redirect href="/(auth)/login" />;
}