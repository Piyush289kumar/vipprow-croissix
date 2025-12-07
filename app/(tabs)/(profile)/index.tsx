import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

export default function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        gap: 16,
        padding: 24,
        justifyContent: "center",
      }}
    >
      <Card>
        <Text variant="title">Welcome back 👋</Text>
      </Card>
    </View>
  );
}
