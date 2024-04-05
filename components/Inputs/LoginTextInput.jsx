import { View, TextInput, StyleSheet, Text } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";

export default function LoginTextInput(props) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={props.rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : Colors.dark_gray },
            ]}
          >
            <TextInput
              style={styles.textInput}
              value={value}
              onChangeText={onChange}
              placeholder={props.placeholder}
              secureTextEntry={props.secure}
            />
          </View>
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    color: Colors.dark_gray,
    fontFamily: "regular",
  },
  errorText: {
    color: "red",
    marginHorizontal: 2,
    marginTop: 5,
    fontFamily: "regular",
    fontSize: FontSize.small,
    textAlign: "right",
  },
});
