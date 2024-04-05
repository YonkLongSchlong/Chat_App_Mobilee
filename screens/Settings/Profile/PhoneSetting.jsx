import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../../context/AuthContext";
import UserFetchUpdate from "../../../hooks/User/UserFetchUpdate";
import * as SecureStore from "expo-secure-store";

export default function PhoneSetting({ navigation }) {
  const { user, token, setUser } = useContext(AuthContext);
  const [phone, setPhone] = useState("");

  const handleUpdatePhone = async () => {
    const data = { phone: phone };
    const response = await UserFetchUpdate("phone", user, token, data);
    const responseData = await response.json();

    if (response.status === 200) {
      setUser(responseData);
      await SecureStore.setItemAsync("User", JSON.stringify(responseData));
      Alert.alert("Notices update", "Phone updated successfully");
      navigation.navigate("UserSettings");
    } else {
      Alert.alert("Notices update", "Something went wrong. Please try again");
    }
  };

  return (
    <LinearGradient colors={Colors.gradient} style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Edit Phone</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone number"
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => handleUpdatePhone()}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  wrapContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontFamily: "semiBold",
    fontSize: FontSize.large,
    color: Colors.white,
  },
  textInputContainer: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  textInput: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontFamily: "regular",
    fontSize: FontSize.regular,
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "regular",
    fontSize: FontSize.regular,
  },
});
