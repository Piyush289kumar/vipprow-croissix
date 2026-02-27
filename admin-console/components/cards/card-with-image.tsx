import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import React from "react";
import { Image } from "react-native";
import { ShareButton, useShare } from "@/components/ui/share";

export function CardWithImage() {
  return (
    <Card
      style={{
        borderRadius: 26,
        padding: 0,
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <View style={{ borderRadius: 26, overflow: "hidden", marginBottom: 16 }}>
        <Image
          source={{ uri: "https://picsum.photos/350/200" }}
          style={{ width: "100%", aspectRatio: 4 / 5 }}
          resizeMode="cover"
        />
      </View>

      <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
        <CardHeader>
          <Text variant="subtitle" style={{ marginBottom: 5 }}>
            Post Name
          </Text>
        </CardHeader>
        <CardContent>
          <Text>
            This image showcases the beauty of nature with its vibrant colors
            and serene atmosphere.
          </Text>
        </CardContent>
        <CardFooter>
          <Button size="sm">Download</Button>
          <ShareButton
            content={{
              message: "Croissix AI",
              url: "https://vipprow.com",
            }}
            variant="secondary"
            size="sm"
          >
            Share
          </ShareButton>
        </CardFooter>
      </View>
    </Card>
  );
}
