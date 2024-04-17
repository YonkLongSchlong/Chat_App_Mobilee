import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { useFindUserByPhone } from "../../hooks/User/useFindUserByPhone";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Search, QrCode, Plus } from "lucide-react-native";

export default function UserHeaderBar() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user, token } = useContext(AuthContext);


  const handlePlus = async () => {
    navigation.navigate("SelectChatGroup")
  };
  return (
    <View style={styles.wrapContainer}>
      <View style={styles.container}>
        <TouchableOpacity >
          <Search size={24} color={"black"} />
        </TouchableOpacity>
        {/* <Search size={24} color={"black"}/> */}
        <TextInput style={styles.textInput} placeholder="Search" />
        <TouchableOpacity onPress={handlePlus}>
          <Plus size={24} color={"black"} />
        </TouchableOpacity>
        <QrCode size={24} color={"black"} />
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
