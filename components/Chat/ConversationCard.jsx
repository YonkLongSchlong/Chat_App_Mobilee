import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function ConversationCard() {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate('Chat1to1');
  };
  return (
    <Pressable style={styles.container} onPress={handleNavigation}>
      <View style={styles.conversationContainer}>
        {/* ---------- AVARTA ---------- */}
        <View style={styles.avartaContainer}>
          <Image
            style={{ height: 65, width: 65, resizeMode: "cover" }}
            source={require("../../assets/96YOG1ej_200x200.jpg")}
          />
        </View>

        {/* ---------- MESSAGE BOX ---------- */}
        <View style={styles.messageContainer}>
          {/* USERNAME */}
          <View>
            <Text style={styles.usernameText}>The Wock</Text>
          </View>

          {/* ---------- LASTEST MESSAGE ---------- */}
          <View>
            <Text style={styles.messageText} numberOfLines={1}>
              Hey how you doing ?
            </Text>
          </View>
        </View>

        {/* ---------- TIME OF LAST MESSAGE ---------- */}
        <View>
          <Text style={styles.timeText}>3 giờ</Text>
        </View>
      </View>

      {/* ---------- SEPARATOR ---------- */}
      <View
        style={{
          paddingLeft: 105,
          height: 1,
          width: StyleSheet.hairlineWidth,
          backgroundColor: "white",
        }}
      ></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  conversationContainer: {
    flex: 1,
    backgroundColor: "white",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  avartaContainer: {
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  messageContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    gap: 5,
  },
  usernameText: {
    fontFamily: "medium",
    fontSize: FontSize.regular,
    color: Colors.black,
  },
  messageText: {
    fontFamily: "regular",
    fontSize: FontSize.regular,
    color: Colors.dark_gray,
  },
  timeText: {
    fontFamily: "regular",
    fontSize: FontSize.small,
    color: Colors.dark_gray,
  },
});
