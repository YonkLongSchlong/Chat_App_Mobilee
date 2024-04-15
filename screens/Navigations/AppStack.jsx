import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import Settings from "../Settings/Settings";
import UserSettings from "../Settings/Profile/UserSettings";
import ProfileSetting from "../Settings/Profile/ProfileSetting";
import PasswordSettings from "../Settings/Profile/PasswordSettings";
import BioSetting from "../Settings/Profile/BioSetting";
import PhoneSetting from "../Settings/Profile/PhoneSetting";
import FriendRequest from "../Peoples/FriendRequest";
import Contact from "../Peoples/Contact";
import Birthday from "../Peoples/Birthday";
import Colors from "../../constants/Colors";
import AvatarSetting from "../Settings/Profile/AvatarSetting";
import Chat1to1 from "../Chat/Chat1to1";
import FriendRequestSent from "../Peoples/FriendRequestSent";
import UserFind from "../Peoples/UserFind";
import { NewConversationChat } from "../Chat/NewConversationChat";

export default function AppStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          headerTitle: "Settings and privacy",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "semiBold",
            fontSize: FontSize.medium,
          },
        }}
      />
      <Stack.Screen
        name="UserSettings"
        component={UserSettings}
        options={{
          headerShown: true,
          headerTitle: "User",
          headerTitleStyle: {
            fontFamily: "semiBold",
            fontSize: FontSize.medium,
            color: Colors.white,
          },
          headerTintColor: Colors.white,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ProfileSetting"
        component={ProfileSetting}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTintColor: Colors.white,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="PasswordSetting"
        component={PasswordSettings}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTintColor: Colors.white,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="BioSetting"
        component={BioSetting}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTintColor: Colors.white,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="PhoneSetting"
        component={PhoneSetting}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTintColor: Colors.white,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="AvatarSetting"
        component={AvatarSetting}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTintColor: Colors.white,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="FriendRequest"
        component={FriendRequest}
        options={{
          headerShown: true,
          headerTitle: "Friend Request",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "semiBold",
            fontSize: FontSize.medium,
          },
        }}
      />
      <Stack.Screen
        name="FriendRequestSent"
        component={FriendRequestSent}
        options={{
          headerShown: true,
          headerTitle: "Friend Request Sent",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "semiBold",
            fontSize: FontSize.medium,
          },
        }}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          headerShown: true,
          headerTitle: "Contact",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "semiBold",
            fontSize: FontSize.medium,
          },
        }}
      />
      <Stack.Screen
        name="Birthday"
        component={Birthday}
        options={{
          headerShown: true,
          headerTitle: "Birthday",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "semiBold",
            fontSize: FontSize.medium,
          },
        }}
      />
      <Stack.Screen
        name="Chat1to1"
        component={Chat1to1}
        options={({ navigation }) => ({
          headerShown: false,
          headerTransparent: true,
        })}
      />

      <Stack.Screen
        name="UserFind"
        component={UserFind}
        options={{
          headerShown: true,
          headerTitle: "UserFind",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "semiBold",
            fontSize: FontSize.medium,
          },
        }}
      />

      <Stack.Screen
        name="NewConversationChat"
        component={NewConversationChat}
        options={({ navigation }) => ({
          headerShown: false,
          headerTransparent: true,
        })}
      />
    </Stack.Navigator>
  );
}
