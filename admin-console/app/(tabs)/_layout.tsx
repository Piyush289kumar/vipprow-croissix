// app/(tabs)/_layout.tsx

import { Platform } from "react-native";
import { useColor } from "@/hooks/useColor";
import MaterialIcons from "@expo/vector-icons/Feather";
import {
  Badge,
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  const red = useColor("red");
  const primary = useColor("primary");
  const foreground = useColor("foreground");

  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      labelStyle={{
        default: { color: primary },
        selected: { color: foreground },
      }}
      iconColor={{
        default: primary,
        selected: foreground,
      }}
      badgeBackgroundColor={red}
      labelVisibilityMode="labeled"
      disableTransparentOnScrollEdge={true}
    >
      <NativeTabs.Trigger name="(home)">
        {Platform.select({
          ios: <Icon sf="house.fill" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="home" />} />
          ),
        })}
        <Label>Dashboard</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(post)">
        {Platform.select({
          ios: <Icon sf="square.3.layers.3d.down.forward" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="power" />} />
          ),
        })}
        <Label>Posts</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(insides)">
        {Platform.select({
          ios: <Icon sf="chart.xyaxis.line" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="power" />} />
          ),
        })}
        <Badge>9+</Badge>
        <Label>Insides</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        {Platform.select({
          ios: <Icon sf="book.pages" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="settings" />} />
          ),
        })}
        <Label>Docs</Label>
        <Badge>1</Badge>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="(profile)">
        {Platform.select({
          ios: <Icon sf="person.crop.circle" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="power" />} />
          ),
        })}
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
