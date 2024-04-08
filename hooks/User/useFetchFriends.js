export const useFetchFriends = async (user, token) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL +
        `/friends/${user._id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch friends');
    }
    return response;
  } catch (error) {
    console.log({ Error: "Fetch friends failed", msg: error.message });
    return null; 
  }
};
