export default useFetchConversations = async (token) => {
    const response = await fetch(
        process.env.EXPO_PUBLIC_BASE_URL + `/messages/conversations/get`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;
};
