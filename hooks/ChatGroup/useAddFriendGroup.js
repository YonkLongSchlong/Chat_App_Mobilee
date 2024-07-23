import { ToastAndroid } from "react-native";

const useAddFriendToGroup = async (token, conversationId, participantsId) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL + "/group/add",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    conversationId,
                    participantsId,
                }),
            }
        );
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        throw error;
    }
};

export default useAddFriendToGroup;
