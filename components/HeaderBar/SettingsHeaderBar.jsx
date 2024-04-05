import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Search } from "lucide-react-native";
import Colors from "../../constants/Colors";

export default function SettingsHeaderBar() {
  return (
    <View style={styles.wrapContainer}>
      <View style={styles.container}>
        <Search size={24} color={"black"} />
        <TextInput style={styles.textInput} placeholder="Search" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapContainer: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    marginBottom: 5,
    alignItems: "center",
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Colors.backgounrd_gray,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  textInput: {
    fontFamily: "regular",
    width: "80%",
  },
});
