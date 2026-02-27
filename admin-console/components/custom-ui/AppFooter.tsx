import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";
import { LinearGradient } from "expo-linear-gradient";

export function AppFooter() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/footer-bg.png")}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Soft overlay */}
        <LinearGradient
          colors={["rgba(255,255,255,0.92)", "rgba(255,255,255,0.96)"]}
          style={styles.overlay}
        />

        <View style={styles.content}>
          <Text style={styles.hashtag}>#croissixAi</Text>

          <View style={styles.row}>
            <Text style={styles.emoji}>🇮🇳</Text>
            <Text style={styles.subText}>Made for India</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.emoji}>❤️</Text>
            <Text style={styles.subText}>Crafted in Jabalpur</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 280,
    marginTop: 40,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  hashtag: {
    fontSize: 40,
    fontWeight: "700",
    color: "#9AA0A6",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  emoji: {
    fontSize: 22,
    marginRight: 10,
  },
  subText: {
    fontSize: 18,
    color: "#7B8794",
  },
});