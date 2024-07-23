import { ToastAndroid } from "react-native";

export const useFetchFriends = async (user, token) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL + `/friends/${user._id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            console.log(response.status);
            throw new Error("Failed to fetch friends");
        }
        return response;
    } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
};
