import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Peoples, User } from "..";
import { Contact, MessageCircleMore, UserRound } from "lucide-react-native";
import Colors from "../../constants/Colors";
import Dashboard from "../Chat/Dashboard";

export default function BottomTab() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { color: Colors.primary },
                tabBarLabel: ({ focused }) => {},
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MessageCircleMore
                            size={24}
                            color={focused ? Colors.primary : "black"}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Peoples"
                component={Peoples}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Contact
                            size={24}
                            color={focused ? Colors.primary : "black"}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="User"
                component={User}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <UserRound
                            size={24}
                            color={focused ? Colors.primary : "black"}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
