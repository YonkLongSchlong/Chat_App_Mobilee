import React, { useEffect } from "react";
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
import SelectChatGroup from "../../components/Chat/SelectChatGroup";
import Option from "../../components/Chat/Option";
import { ChatGroup } from "../Chat/ChatGroup";

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
        name="ChatGroup"
        component={ChatGroup}
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

      <Stack.Screen
        name="ChatGroup"
        component={ChatGroup}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: route.params.groupName,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "semiBold",
            fontSize: FontSize.medium,
          },
        })}
      />

      <Stack.Screen
        name="SelectChatGroup"
        component={SelectChatGroup}
        options={{
          headerShown: true,
          headerTitle: "Tạo nhóm",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "semiBold",
            fontSize: FontSize.medium,
          },
        }}
      />


      <Stack.Screen
        name="Option"
        component={Option}
        options={{
          headerShown: true,
          headerTitle: "Tùy chọn",
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "semiBold",
            fontSize: FontSize.medium,
          },
        }}
      />
      <Stack.Screen
        name="ShareMessage"
        component={ShareMessage}
        options={({ navigation }) => ({
          headerShown: false,
          headerTransparent: true,
          presentation: "modal",
        })}
      />
    </Stack.Navigator>


  );
}
