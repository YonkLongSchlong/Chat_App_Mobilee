export const useFetchFriendRequest = async (user, token) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL + `/friends/${user._id}/requests`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log({ Error: "Fail fetching friend requests", msg: error.message });
  }
};
