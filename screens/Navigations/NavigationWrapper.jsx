import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { AuthContext } from "../../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function NavigationWrapper() {
  const { isLoading, token } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
