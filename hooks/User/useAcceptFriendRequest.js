export const useAcceptFriendRequest = async (user, token, requesterId) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL +
        `/friends/${user._id}/${requesterId}/accept`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log({ Error: "Accept friend request failed", msg: error.message });
  }
};
