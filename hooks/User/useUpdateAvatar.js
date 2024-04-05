export const useUpdateAvatar = async (user, header, formData) => {
  const response = await fetch(
    process.env.EXPO_PUBLIC_BASE_URL + `/user/${user._id}/avatar`,
    {
      method: "PATCH",
      headers: header,
      body: formData,
    }
  );
  return response;
};
