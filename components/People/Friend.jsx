import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import FontSize from "../../constants/FontSize";
import { Phone, Video } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function Friend({friend}) {
  const navigate = useNavigation();

  const handleNavigation = () => {
    navigate.navigate('Chat1to1');
  }
  return (
    <Pressable onPress={handleNavigation}>
        <View style={styles.container}>
      <View style={styles.usernameContainer}>
        <Image
          source={require("../../assets/96YOG1ej_200x200.jpg")}
          style={styles.image}
        />
        <Text style={styles.usernameText}>{friend.username}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Pressable>
          <Phone size={20} color={"black"} />
        </Pressable>
        <Pressable>
          <Video size={20} color={"black"} />
        </Pressable>
      </View>
    </View>
    </Pressable>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 70,
  },
  usernameText: {
    fontFamily: "medium",
    fontSize: FontSize.regular,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
});
