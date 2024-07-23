import { ToastAndroid } from "react-native";

export const useSendGroupChatMessage = async (
    token,
    conversationId,
    message
) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL + "/group/messages/send",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    conversationId,
                    message,
                }),
            }
        );
        const data = await response.json();
        if (data.error || response.status === 400 || response.status === 404) {
            throw new Error(data);
        }
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
};
