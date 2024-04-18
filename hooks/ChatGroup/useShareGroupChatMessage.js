import { ToastAndroid } from "react-native";

export default useShareGroupChatMessages = async (
  token,
  conversationId,
  messageId
) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL + "/group/messages/share",
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
    if (data.error) throw new Error(data, error);
    return data;
  } catch (error) {
    ToastAndroid.show(error.message, ToastAndroid.SHORT);
  }
};
