import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Otp from "../Auth/Otp";
import GetStarted from "../Auth/GetStarted";

export default function AuthStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="GetStarted"
                component={GetStarted}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Otp"
                component={Otp}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
