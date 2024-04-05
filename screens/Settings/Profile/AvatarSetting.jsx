import { View, Text, StyleSheet, Pressable, Image, Alert } from "react-native";
import React, { useContext, useState } from "react";
import FontSize from "../../../constants/FontSize";
import Colors from "../../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { Camera, ImageIcon } from "lucide-react-native";
import { AuthContext } from "../../../context/AuthContext";
import { useUpdateAvatar } from "../../../hooks/User/useUpdateAvatar";

export default function AvatarSetting() {
  const { user, token, setUser } = useContext(AuthContext);

  const handleUploadImage = async () => {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      handleImage(user, token, result);
    }
  };

  const handleImage = async (user, token, result) => {
    if (!result.canceled) {
      const fileMime = result.assets[0].type;
      const fileType = result.assets[0].uri.split(".").pop();

      const options = {
        uri: `${result.assets[0].uri}`,
        type: `${fileMime}/${fileType}`,
        name: `photo.${fileType}`,
      };
      const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("image", options);
      const response = await useUpdateAvatar(user, header, formData);
      const data = await response.json();
      if (response.status === 200) {
        setUser(data);
        Alert.alert("Update notice", "Update avatar successfully");
      }
    }
  };

  return (
    <LinearGradient colors={Colors.gradient} style={styles.container}>
      <SafeAreaView>
        {/* ---------- HEADER ---------- */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Edit avatar</Text>
        </View>

        {/* ---------- AVATAR CONTAINER ---------- */}
        <View style={styles.avatarSection}>
          <View style={styles.avartarContainer}>
            <Image
              style={styles.avarta}
              source={{
                uri: `${user.avatar}`,
              }}
            />
          </View>
        </View>

        {/* ---------- BUTTON CONTAINER ---------- */}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => handleUploadImage()}>
            <ImageIcon width={25} height={25} color={Colors.black} />
            <Text style={styles.text}>Upload image</Text>
          </Pressable>

          {/* ---------- SEPARATOR ---------- */}
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              width: "90%",
              backgroundColor: Colors.light_gray,
            }}
          ></View>

          <Pressable style={styles.button}>
            <Camera width={25} height={25} color={Colors.black} />
            <Text style={styles.text}>Take picture</Text>
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
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontFamily: "semiBold",
    fontSize: FontSize.large,
    color: Colors.white,
  },
  avatarSection: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  avartarContainer: {
    width: 250,
    height: 250,
    backgroundColor: "white",
    borderRadius: 175,
    borderWidth: 5,
    borderColor: "#ECECED",
    alignItems: "center",
  },
  avarta: {
    width: 240,
    height: 240,
    borderRadius: 175,
    resizeMode: "contain",
    borderWidth: 0,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  button: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    fontSize: FontSize.regular,
    fontFamily: "regular",
    color: Colors.black,
  },
});
