import { CardWithImage } from "@/components/cards/card-with-image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker, DateRange } from "@/components/ui/date-picker";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useState } from "react";

export default function ProfileScreen() {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        gap: 16,
        paddingHorizontal: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <DatePicker
          mode="range"
          label="Select Range"
          value={selectedRange}
          onChange={setSelectedRange}
          placeholder="Choose a range"
        />
      </View>
      <View
        style={{
          gap: 16,
          paddingHorizontal: 10,
        }}
      >
        <CardWithImage />
        <CardWithImage />
        <CardWithImage />
        <CardWithImage />
      </View>
    </ScrollView>
  );
}
