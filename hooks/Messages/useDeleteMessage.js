import { ToastAndroid } from "react-native";

export default useDeleteMessages = async (
    messages,
    participantId,
    token,
    messageId
) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL +
                `/messages/revoke/${participantId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify({
                    messageId,
                }),
            }
        );
        const data = await response.json();
        if (data.error || response.status === 400 || response.status === 404) {
            throw new Error(data);
        } else {
            const newMessages = messages.filter(
                (message) => message._id !== data._id
            );
            return newMessages;
        }
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
};
