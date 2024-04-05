import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

export default function GetStarted({ navigation }) {
  return (
    <LinearGradient colors={Colors.gradient} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.appText}>Pandalo</Text>
        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Start Connecting 💘</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appText: {
    fontFamily: "fontTitle",
    color: "white",
    fontSize: 60,
  },
  button: {
    marginTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "regular",
  },
});
