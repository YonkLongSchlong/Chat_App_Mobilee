export const useFindUserByPhone = async (token, phoneNumber) => {
    try {
        const response = await fetch(
            process.env.EXPO_PUBLIC_BASE_URL + `/user/find/phone?phoneNumber=${phoneNumber}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Find user by phone failed:", error.message);
        throw error;
    }
};
