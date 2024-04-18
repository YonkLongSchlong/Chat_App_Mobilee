import { ToastAndroid } from "react-native";

export const useCloseGroupChat = async (token, conversationId) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL + "/group/close",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conversationId,
        }),
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
