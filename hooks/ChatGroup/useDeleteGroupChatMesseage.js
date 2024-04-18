import { ToastAndroid } from "react-native";

export const useDeleteGroupChatMessage = async (
  messages,
  token,
  conversationId,
  messageId
) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL + "/group/messages/delete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conversationId,
          messageId,
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      throw new Error(data, error);
    }
    const newMessages = messages.filter((message) => {
      return message._id !== data._id;
    });
    return newMessages;
  } catch (error) {
    ToastAndroid.show(error.message, ToastAndroid.SHORT);
  }
};
