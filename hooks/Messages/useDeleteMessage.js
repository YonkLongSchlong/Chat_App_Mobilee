import { ToastAndroid } from "react-native";

export default useDeleteMessages = async (
  messages,
  user,
  participantId,
  token,
  messageId
) => {
  console.log(messageId);
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL +
        `/messages/delete/${user._id}/${participantId}/${messageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
      }
    );
    const data = await response.json();
    if (data.error) throw new Error(data, error);
    console.log(data);
    const newMessages = messages.filter((message) => message._id !== data._id);
    return newMessages;
  } catch (error) {
    ToastAndroid.show(error.message, ToastAndroid.SHORT);
  }
};
