import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginTextInput from "../../components/Inputs/LoginTextInput";
import Checkbox from "expo-checkbox";
import Colors from "../../constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LogBox } from "react-native";
import { useForm } from "react-hook-form";
import {
  passwordRegex,
  phoneRegex,
  usernameRegex,
} from "../../constants/Regex";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function Register({ navigation }) {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  const [isMale, setIsMale] = useState(true);
  const [isFemale, setIsFemale] = useState(false);
  const [gender, setGender] = useState("Male");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleRegister = async ({ phone, username, password }) => {
    console.log(phone, username, password);
    try {
      isFemale ? setGender("Female") : setGender("Male");
      await fetch(process.env.EXPO_PUBLIC_BASE_URL + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone,
        }),
      });
      navigation.navigate("Otp", {
        phone: phone,
        username: username,
        password: password,
        gender: gender,
        dob: date,
      });
    } catch (error) {
      console.log({ Error: error.message });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* ---------- HEADER ---------- */}
        <Text style={styles.appText}>Pandalo</Text>

        {/* ---------- INPUT FIELDS ---------- */}
        <View style={{ width: "70%" }}>
          <Text style={styles.headerText}>
            Please fill out the information:
          </Text>

          {/* ---------- USERNAME, PHONE NUMBER AND PASSWORD INPUTS ---------- */}
          <LoginTextInput
            name="username"
            control={control}
            placeholder="Enter your username"
            rules={{
              required: "Username is required",
              maxLength: {
                value: 24,
                message: "Username can't be longer than 24 characters",
              },
              pattern: {
                value: usernameRegex,
                message: "Username can't not contain special characters",
              },
            }}
          />
          <LoginTextInput
            name="phone"
            control={control}
            placeholder="Enter your phone number"
            rules={{
              required: "Phone is required",
              minLength: {
                value: 10,
                message: "Phone must be at least 10 numbers",
              },
              maxLength: {
                value: 10,
                message: "Phone can't be longer than 10 numbers",
              },
              pattern: { value: phoneRegex, message: "Invalid phone number" },
            }}
          />
          <LoginTextInput
            name="password"
            control={control}
            placeholder="Enter your password"
            rules={{
              required: "Password is required",
              // minLength: {
              //   value: 3,
              //   message: "Password must be at least 6 characters",
              // },
              maxLength: {
                value: 24,
                message: "Password can't be longer than 24 characters",
              },
              pattern: {
                value: passwordRegex,
                message:
                  "Password must contain at least 8 characters, an uppercase, a number and no special characters",
              },
            }}
            secure={true}
          />
          <LoginTextInput
            name="confirmPassword"
            control={control}
            placeholder="Enter confirm password"
            rules={{
              required: "Confirm password is required",
              validate: (value) =>
                value === pwd || "Confirm password does not match",
            }}
            secure={true}
          />

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
                color={isMale ? Colors.primary : undefined}
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
                color={isFemale ? Colors.primary : undefined}
              />
              <Text style={styles.paragraph}>Female</Text>
            </View>
          </View>

          {/* ---------- REGISTER BUTTON ---------- */}
          <Pressable
            onPress={handleSubmit(handleRegister)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  appText: {
    fontFamily: "fontTitle",
    fontSize: 50,
    marginBottom: 50,
  },
  headerText: {
    fontSize: FontSize.medium,
    marginBottom: 15,
    alignSelf: "flex-start",
    fontFamily: "regular",
  },
  checkboxContainer: {
    marginTop: 17,
    marginBottom: 15,
    marginHorizontal: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 60,
  },
  checkbox: {
    backgroundColor: Colors.light_gray,
    color: "red",
    borderRadius: 10,
    padding: 10,
    fontSize: FontSize.small,
    borderColor: Colors.light_gray,
  },
  section: {
    flexDirection: "row",
    gap: 10,
  },
  paragraph: {
    color: Colors.black,
    fontFamily: "regular",
    fontSize: FontSize.regular,
  },
  dobContainer: {
    marginTop: 15,
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontFamily: "regular",
    fontSize: FontSize.regular,
    borderWidth: 1,
    color: Colors.dark_gray,
  },
  button: {
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.medium,
    fontFamily: "regular",
  },
});
