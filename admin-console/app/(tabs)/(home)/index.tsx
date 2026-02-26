import { View } from "@/components/ui/view";
import { ScrollView } from "@/components/ui/scroll-view";
import "@/global.css";
import { ImageSlider } from "@/components/custom-ui/image-slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";

export default function HomeScreen() {
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
        style={{
          marginTop: 70,
        }}
      >
        <ImageSlider />

        <Tabs defaultValue="available" style={{marginTop:50}}>
          <TabsList>
            <TabsTrigger value="available">Google</TabsTrigger>
            <TabsTrigger value="premium" disabled>
              Instagram
            </TabsTrigger>
            <TabsTrigger value="enterprise" disabled>
              Facebook
            </TabsTrigger>
          </TabsList>
          <TabsContent value="available">
            <View style={{ padding: 16 }}>
              <Text variant="title" style={{ marginBottom: 8 }}>
                Available Features
              </Text>
              <Text variant="body">
                These features are currently available to you.
              </Text>
            </View>
          </TabsContent>
          <TabsContent value="pending">
            <View style={{ padding: 16 }}>
              <Text variant="title" style={{ marginBottom: 8 }}>
                Pending Features
              </Text>
              <Text variant="body">
                These features are being processed and will be available soon.
              </Text>
            </View>
          </TabsContent>
          <TabsContent value="premium">
            <View style={{ padding: 16 }}>
              <Text variant="title" style={{ marginBottom: 8 }}>
                Premium Features
              </Text>
              <Text variant="body">Upgrade to access premium features.</Text>
            </View>
          </TabsContent>
          <TabsContent value="enterprise">
            <View style={{ padding: 16 }}>
              <Text variant="title" style={{ marginBottom: 8 }}>
                Enterprise Features
              </Text>
              <Text variant="body">Contact sales for enterprise features.</Text>
            </View>
          </TabsContent>
        </Tabs>
      </View>
    </ScrollView>
  );
}
