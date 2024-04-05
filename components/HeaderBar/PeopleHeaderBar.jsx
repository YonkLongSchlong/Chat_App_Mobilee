import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Search, UserPlus2 } from "lucide-react-native";

export default function PeopleHeaderBar() {
  return (
    <View style={styles.wrapContainer}>
      <View style={styles.container}>
        <Search size={24} color={"black"} />
        <TextInput style={styles.textInput} placeholder="Search" />
        <UserPlus2 size={24} color={"black"} />
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
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "white",
    marginHorizontal: 15,
    borderRadius: 10,
  },
  textInput: {
    fontFamily: "regular",
    flex: 1,
  },
});
