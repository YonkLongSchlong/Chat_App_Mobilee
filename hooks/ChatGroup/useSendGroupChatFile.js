import { ToastAndroid } from "react-native";

export default useSendGrupChatFiles = async (
    token,
    conversationId,
    formData
) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL +
                `/group/messages/send/files/${conversationId}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: formData,
            }
        );
        if (!response.ok) throw new Error(response);
        return response;
    } catch (error) {
        ToastAndroid.show("Please try again", ToastAndroid.LONG);
        return null;
    }
};
