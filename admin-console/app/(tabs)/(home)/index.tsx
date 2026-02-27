import { View } from "@/components/ui/view";
import { ScrollView } from "@/components/ui/scroll-view";
import "@/global.css";
import { ImageSlider } from "@/components/custom-ui/image-slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { ProfileHealth } from "@/components/custom-ui/profile-health";
import { DatePicker, DateRange } from "@/components/ui/date-picker";
import React, { useState } from "react";
import { RecentPosts } from "@/components/custom-ui/recent-posts";
import { AppFooter } from "@/components/custom-ui/AppFooter";

export default function HomeScreen() {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        gap: 16,
        paddingHorizontal: 10,
        paddingBottom: 0, // important for bottom safe area
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          marginTop: 0,
        }}
      >
        <ImageSlider />
      </View>

      <View>
        <ProfileHealth />
      </View>

      <View>
        <DatePicker
          mode="range"
          label="Select Range"
          value={selectedRange}
          onChange={setSelectedRange}
          placeholder="Choose a range"
        />
      </View>

      <View style={{ width: "100%" }}>
        <RecentPosts />
      </View>

      <AppFooter />
    </ScrollView>
  );
}
