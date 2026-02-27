import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

export default function ProfileScreen() {
  return (

     <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flex: 1,
            gap: 10,
            paddingLeft: 10,
            paddingRight: 10,
            alignItems: "center",
          }}
        >

    <View
      
      >
      <Card>
        <Text variant="title">Welcome back 👋</Text>
      </Card>
    </View>
      </ScrollView>
  );
}
