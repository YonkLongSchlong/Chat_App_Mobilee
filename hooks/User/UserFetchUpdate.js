export default userFetchUpdate = async (type, user, token, data) => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_BASE_URL + `/user/${user._id}/${type}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    return response;
  } catch (error) {
    console.log({ Error: `Fail updating ${type}`, msg: error.message });
  }
};
