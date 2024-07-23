import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Colors from "../../constants/Colors";
import AddFriendIntoGroup from "../Chat/AddFriendIntoGroup";
import Chat1to1 from "../Chat/Chat1to1";
import { ChatGroup } from "../Chat/ChatGroup";
import { ImageView } from "../Chat/ImageView";
import ListMembers from "../Chat/ListMembers";
import Option from "../Chat/Option";
import SelectChatGroup from "../Chat/SelectedChatGroup";
import { ShareMessage } from "../Chat/ShareMessage";
import { VideoView } from "../Chat/VideoView";
import Contact from "../Peoples/Contact";
import FriendRequest from "../Peoples/FriendRequest";
import FriendRequestSent from "../Peoples/FriendRequestSent";
import UserFind from "../Peoples/UserFind";
import AvatarSetting from "../Settings/Profile/AvatarSetting";
import BioSetting from "../Settings/Profile/BioSetting";
import PasswordSettings from "../Settings/Profile/PasswordSettings";
import PhoneSetting from "../Settings/Profile/PhoneSetting";
import ProfileSetting from "../Settings/Profile/ProfileSetting";
import UserSettings from "../Settings/Profile/UserSettings";
import Settings from "../Settings/Settings";
import BottomTab from "./BottomTab";

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
                    headerTitle: "Find User",
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
                name="ShareMessage"
                component={ShareMessage}
                options={({ navigation }) => ({
                    headerShown: false,
                    headerTransparent: true,
                    presentation: "modal",
                })}
            />
            <Stack.Screen
                name="AddFriendIntoGroup"
                component={AddFriendIntoGroup}
                options={{
                    headerShown: true,
                    headerTitle: "Thêm thành viên",
                    headerTransparent: true,
                    headerTitleStyle: {
                        fontFamily: "semiBold",
                        fontSize: FontSize.medium,
                    },
                }}
            />

            <Stack.Screen
                name="ListMembers"
                component={ListMembers}
                options={{
                    headerShown: true,
                    headerTitle: "Members",
                    headerTransparent: true,
                    headerTitleStyle: {
                        fontFamily: "semiBold",
                        fontSize: FontSize.medium,
                    },
                }}
            />

            <Stack.Screen
                name="ImageView"
                component={ImageView}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="VideoView"
                component={VideoView}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
}
