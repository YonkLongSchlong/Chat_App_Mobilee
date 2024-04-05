import { View, StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import FontSize from "../../../constants/FontSize";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronRight } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileSettings({ navigation }) {
  const handleNavigation = (props) => {
    if (props.label == "Profile") {
      navigation.navigate("ProfileSetting");
    } else if (props.label == "Password") {
      navigation.navigate("PasswordSetting");
    } else if (props.label == "Bio") {
      navigation.navigate("BioSetting");
    } else if (props.label == "Phone") {
      navigation.navigate("PhoneSetting");
    } else if (props.label == "Avatar") {
      navigation.navigate("AvatarSetting");
    }
  };

  return (
    <LinearGradient colors={Colors.gradient} style={styles.container}>
      <SafeAreaView>
        <View style={styles.settingOptionsContainer}>
          <SettingOption label="Profile" handleNavigation={handleNavigation} />
          <SettingOption label="Password" handleNavigation={handleNavigation} />
          <SettingOption label="Bio" handleNavigation={handleNavigation} />
          <SettingOption label="Avatar" handleNavigation={handleNavigation} />
          <SettingOption label="Phone" handleNavigation={handleNavigation} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const SettingOption = (props) => {
  return (
    <Pressable
      style={styles.settingOptionContainer}
      onPress={() => props.handleNavigation(props)}
    >
      <Text style={styles.labelText}>{props.label}</Text>
      <ChevronRight size={24} color={Colors.black} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgounrd_gray,
    paddingTop: 60,
  },
  settingOptionsContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    gap: 5,
    paddingVertical: 10,
  },
  settingOptionContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelText: {
    fontFamily: "medium",
    fontSize: FontSize.regular,
  },
});
