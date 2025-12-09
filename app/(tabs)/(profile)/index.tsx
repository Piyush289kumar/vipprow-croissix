// app/(tabs)/(profile)/index.tsx

import { IconDemo } from "@/components/demo/icon/icon";
import { SearchBarSuggestions } from "@/components/search/searchbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { BORDER_RADIUS, CORNERS, PADDING_HORIZONTAL, PRIMARY_COLOR } from "@/theme/globals";
import { Code, Eye, Palette, QrCode, Settings } from "lucide-react-native";

export default function ProfileScreen() {
  const card = useColor("card");
  const border = useColor("border");
  const primary = useColor("primary");

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flex: 1,
        gap: 18,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
      }}
    >
      <View style={{ width: "100%" }}>
        <SearchBarSuggestions />
      </View>
      <View
        style={{
          width: "100%",
          marginBottom: 40,
        }}
      >
        <Card>
          <CardContent>
            <View 
            style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <Avatar
                size={64}
                style={{
                  borderWidth: 1,
                  borderColor: PRIMARY_COLOR,
                  shadowColor: "#3b82f6",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <AvatarImage
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/99088394?v=4",
                  }}
                />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>

               <View 
            style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
              <Text variant="subtitle">Piyush Kumar Raikwar</Text>
                <Badge>★ Elite Plan</Badge>
            </View>
            <View style={{backgroundColor:"#000", borderRadius: CORNERS, padding:6}}>
            <Icon name={QrCode} size={32}/>
            </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
