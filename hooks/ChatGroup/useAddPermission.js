import { ToastAndroid } from "react-native";

export const useAddPermission = async (
    token,
    conversationId,
    participantId
) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL + "/group/admin",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    conversationId,
                    participantId,
                }),
            }
        );

        const data = await response.json();
        if (data.error || response.status == 404 || response.status == 400)
            throw new Error(data);
        return data;
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
};
