import { ToastAndroid } from "react-native";

export const useSendGroupChatImages = async (token, formData) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL + "/group/messages/send/images",
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const data = await response.json();
    if (data.error) {
      throw new Error(data, error);
    }
    return data;
  } catch (error) {
    ToastAndroid.show(error.message, ToastAndroid.SHORT);
  }
};
