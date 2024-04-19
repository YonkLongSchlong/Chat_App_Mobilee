import { useState } from 'react';

const useDeleteMemberOutGroup = () => {
  const deleteMember = async (token, conversationId, participantId) => {
    try {
      console.log("Delete member out group with id:", participantId);
      const response = await fetch(
        process.env.EXPO_PUBLIC_BASE_URL + "/group/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            conversationId,
            participantId,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { deleteMember };
};

export default useDeleteMemberOutGroup;



// const useDeleteMemberOutGroup = async (token, conversationId, participantId) => {
//     try {
//         console.log("Delete member out group with id:", participantId);
//       const response = await fetch(
//         process.env.EXPO_PUBLIC_BASE_URL + "/group/delete",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             conversationId,
//             participantId,
//           }),
//         }
//       );
//       const data = await response.json();
//       if (data.error) {
//         throw new Error(data.error);
//       }
//       return data;
//     } catch (error) {
//       ToastAndroid.show(error.message, ToastAndroid.SHORT);
//       throw error;
//     }
//   };
  
//   export default useDeleteMemberOutGroup;