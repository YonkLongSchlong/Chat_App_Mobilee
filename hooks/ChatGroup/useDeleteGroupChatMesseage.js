import { ToastAndroid } from "react-native";

export const useDeleteGroupChatMessage = async (
    token,
    conversationId,
    messageId
) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL + "/group/messages/revoke",
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
        if (data.error || response.status === 404 || response.satus === 400) {
            throw new Error(data);
        }
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
};
