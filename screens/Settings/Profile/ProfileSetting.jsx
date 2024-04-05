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
import Colors from "../../../constants/Colors";
import { AuthContext } from "../../../context/AuthContext";
import UserFetchUpdate from "../../../hooks/User/UserFetchUpdate";
import * as SecureStore from "expo-secure-store";
import Checkbox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function UsernameSetting({ navigation }) {
  const { user, token, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [isMale, setIsMale] = useState(true);
  const [isFemale, setIsFemale] = useState(false);
  const [gender, setGender] = useState("Male");
  const [date, setDate] = useState(new Date(user.dob));
  const [show, setShow] = useState(false);

  const handleUpdateUsername = async () => {
    isFemale ? setGender("Female") : setGender("Male");
    const data = { username: username, gender: gender, dob: date };
    const response = await UserFetchUpdate("profile", user, token, data);
    const responseData = await response.json();

    if (response.status === 200) {
      setUser(responseData);
      await SecureStore.setItemAsync("User", JSON.stringify(responseData));
      Alert.alert("Notices update", "Update profile successfully");
      navigation.navigate("UserSettings");
    } else {
      Alert.alert("Notices update", "Something went wrong, please try again");
    }
  };

  return (
    <LinearGradient colors={Colors.gradient} style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Edit Profile</Text>
        </View>

        {/* ---------- USERNAME INPUT ---------- */}
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your new username"
            onChangeText={(text) => setUsername(text)}
            defaultValue={user.username}
          />
        </View>

        {/* ---------- DOB PICKER ---------- */}
        <View style={styles.dobContainer}>
          <Pressable
            onPressIn={() => {
              setShow(true);
            }}
          >
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setUsername(text)}
              defaultValue={date.toLocaleDateString("it-IT")}
              editable={false}
            />
          </Pressable>
          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={(e, selected) => {
                setShow(!show);
                setDate(selected);
              }}
            />
          )}
        </View>

        {/* ---------- GENDER CHECKBOX ---------- */}
        <View style={styles.checkboxContainer}>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isMale}
              onValueChange={() => {
                setIsFemale(false);
                setIsMale(true);
              }}
              color={isMale ? Colors.light_gray : undefined}
            />
            <Text style={styles.paragraph}>Male</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isFemale}
              onValueChange={() => {
                setIsFemale(true);
                setIsMale(false);
              }}
              color={isFemale ? Colors.light_gray : undefined}
            />
            <Text style={styles.paragraph}>Female</Text>
          </View>
        </View>

        {/* ---------- SUBMIT BUTTON ---------- */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              handleUpdateUsername();
            }}
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
    marginTop: 10,
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
  checkboxContainer: {
    marginTop: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 100,
    // backgroundColor: "red",
  },
  checkbox: {
    backgroundColor: Colors.white,
    color: "red",
    borderRadius: 10,
    padding: 10,
    fontSize: FontSize.small,
    borderColor: Colors.white,
  },
  section: {
    flexDirection: "row",
    gap: 10,
  },
  paragraph: {
    color: Colors.white,
    fontFamily: "regular",
    fontSize: FontSize.regular,
  },
  dobContainer: {
    marginTop: 15,
    marginHorizontal: 20,
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
