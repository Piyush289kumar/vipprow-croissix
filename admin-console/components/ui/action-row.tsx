// components/ui/action-row.tsx

// components/ui/action-row.tsx
import { Icon } from "@/components/ui/icon";
import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { ChevronRight } from "lucide-react-native";
import { LucideIcon } from "lucide-react-native";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { PRIMARY_COLOR } from "@/theme/globals";
import { SvgProps } from "react-native-svg";

interface ActionRowProp {
    LeadingIcon?: React.ComponentType<SvgProps>;
  heading: string;
  href?: string;
  isSwitch?: boolean;
  switchValue?: boolean;  // Add controlled value prop
  onSwitchChange?: (value: boolean) => void;
}

export default function ActionRow({
  LeadingIcon,
  heading,
  href,
  isSwitch = false,
  switchValue,
  onSwitchChange,
}: ActionRowProp) {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleSwitchChange = (value: boolean) => {
    setIsEnabled(value);
    onSwitchChange?.(value);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {LeadingIcon && (
          <LeadingIcon width={40} height={40} style={{ marginRight: 10 }}  />
        )}
        <Text variant="body">{heading}</Text>
      </View>
      
      {/* Right side: Conditional rendering */}
      {href ? (
        <Icon name={ChevronRight} />
      ) : isSwitch ? (
        <Switch
          label="Enable notifications"
          value={switchValue ?? isEnabled}
          onValueChange={handleSwitchChange}
        />
      ) : null}
    </View>
  );
}
