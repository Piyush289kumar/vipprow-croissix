// app/(tabs)/(profile)/index.tsx

import { SearchBarSuggestions } from "@/components/search/searchbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import ActionRow from "@/components/ui/action-row";
import { PRIMARY_COLOR } from "@/theme/globals";
import {
  ChevronRight,
  MessageCircleQuestionMark,
  UserPlus,
} from "lucide-react-native";
import FacebookIcon from "@/assets/images/logo/icons/facebook.svg";
import InstagramIcon from "@/assets/images/logo/icons/instagram.svg";
import GoogleIcon from "@/assets/images/logo/icons/google.svg";
import { Icon } from "@/components/ui/icon";
import { useState } from "react";

export default function ProfileScreen() {
  const [googleConnected, setGoogleConnected] = useState<boolean>(true);
  const [facebookConnected, setFacebookConnected] = useState<boolean>(true);
  const [instagramConnected, setInstagramConnected] = useState<boolean>(false);
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
      <View style={{ width: "100%" }}>
        <SearchBarSuggestions />
      </View>
      <View
        style={{
          width: "100%",
        }}
      >
        {/* Profile Section Start */}
        <Card>
          <CardContent>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
            >
              <Avatar
                size={64}
                style={{
                  borderWidth: 1,
                  borderColor: PRIMARY_COLOR,
                  shadowColor: PRIMARY_COLOR,
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
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <Text variant="subtitle">Piyush Kumar Raikwar</Text>
                <Badge>★ Elite Plan</Badge>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
                borderBottomWidth: 1,
                borderBottomColor: PRIMARY_COLOR,
                padding: 10,
              }}
            ></View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                marginTop: 12,
              }}
            >
              <Text variant="body">Manage subcription</Text>
              <Icon name={ChevronRight} />
            </View>
          </CardContent>
        </Card>
        {/* Profile Section End */}
      </View>

      {/* Connect App Card Start */}
      <View
        style={{
          width: "100%",
        }}
      >
        {/* Profile Section Start */}
        <Card>
          <CardContent>
            <View
              style={{
                flexDirection: "column",
                gap: 18,
              }}
            >
              <ActionRow
                LeadingIcon={GoogleIcon}
                heading="Link Google"
                isSwitch={true}
                switchValue={googleConnected}
                onSwitchChange={(value: boolean) => {
                  setGoogleConnected(value);
                  console.log("Google switch:", value);
                }}
              />

              <ActionRow
                LeadingIcon={FacebookIcon}
                heading="Link Facebook"
                isSwitch={true}
                switchValue={facebookConnected}
                onSwitchChange={(value: boolean) => {
                  setFacebookConnected(value);
                  console.log("Facebook switch:", value);
                }}
              />

              <ActionRow
                LeadingIcon={InstagramIcon}
                heading="Link Instagram"
                isSwitch={true}
                switchValue={instagramConnected}
                onSwitchChange={(value: boolean) => {
                  setInstagramConnected(value);
                  console.log("Instagram switch:", value);
                }}
              />
            </View>
          </CardContent>
        </Card>
        {/* Profile Section End */}
      </View>
      {/* Connect App Card End */}

      {/* Connect App Card Start */}
      <View
        style={{
          width: "100%",
        }}
      >
        {/* Profile Section Start */}
        <Card>
          <CardContent>
            <View
              style={{
                flexDirection: "column",
                gap: 18,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name={MessageCircleQuestionMark}
                    width={20}
                    height={20}
                    style={{ marginRight: 10 }}
                  />
                  <Text variant="body">Help and feedback</Text>
                </View>
                <Icon name={ChevronRight} />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: PRIMARY_COLOR,
                }}
              ></View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name={UserPlus}
                    width={20}
                    height={20}
                    style={{ marginRight: 10 }}
                  />
                  <Text variant="body">Invite a friend</Text>
                </View>
                <Icon name={ChevronRight} />
              </View>
            </View>
          </CardContent>
        </Card>
        {/* Profile Section End */}
      </View>
      {/* Connect App Card End */}
    </ScrollView>
  );
}
