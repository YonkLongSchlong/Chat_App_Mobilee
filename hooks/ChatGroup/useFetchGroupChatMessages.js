import { ToastAndroid } from "react-native";

export const useFetchGroupChatMessages = async (token, conversationId) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL +
        `/group/messages/get/${conversationId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
