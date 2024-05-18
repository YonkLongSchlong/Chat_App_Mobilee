import { ToastAndroid } from "react-native";

export const useLeaveGroupChat = async (token, conversationId) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL + "/group/leave",
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
        if (
            data.error ||
            response.status === 400 ||
            response.status === 404 ||
            response.status === 500
        ) {
            throw new Error(data);
        }
        return response;
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
};
