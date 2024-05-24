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
        if (response.status === 400 || response.status === 404) {
            throw new Error(data);
        }
        return response;
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
};
