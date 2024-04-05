import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import FontSize from "../../../constants/FontSize";
import { AuthContext } from "../../../context/AuthContext";
import UserFetchUpdate from "../../../hooks/User/UserFetchUpdate";
import * as SecureStore from "expo-secure-store";

export default function PasswordSettings({ navigation }) {
  const { user, setUser, token } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = async () => {
    if (confirmPassword !== newPassword) {
      Alert.alert(
        "Notices update",
        "Your confirmation password is not the same as your new password"
      );
      return;
    }

    const data = { newPassword: newPassword, oldPassword: oldPassword };
    const response = await UserFetchUpdate("password", user, token, data);
    const responseData = await response.json();

    if (response.status == 200) {
      setUser(responseData);
      await SecureStore.setItemAsync("User", JSON.stringify(responseData));
      Alert.alert("Notices update", "Update password successfully");
      navigation.navigate("UserSettings");
    } else if (response.status == 403) {
      Alert.alert(
        "Notices update",
        "Your old password is wrong, please try again"
      );
    } else {
      Alert.alert("Notices update", "Something went wrong, please try again");
    }
  };

  return (
    <LinearGradient colors={Colors.gradient} style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Edit Password</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your old password"
            onChangeText={(text) => setOldPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your new password"
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm your new password"
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => handleUpdatePassword()}
          >
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
