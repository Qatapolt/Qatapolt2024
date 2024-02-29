import axios from "axios";
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/firestore";
import uuid from "react-native-uuid";
// export const NotificationSender = (fcmToken, title, message) => {
//   // console.log('userIdfcmToken', fcmToken);
//   const NotificationData = {
//     method: "POST",
//     url: "https://fcm.googleapis.com/fcm/send",
//     headers: {
//       Authorization:
//         "key=AAAAIgAoddI:APA91bH7CeM1lHY3mq_4KoWaWHH-1okwjHFg6sUV0f3joouDy-yvpIl3scHonC2cdMNNBBE55PNiA178i_OT4VAmT8HIHovkoaYt_4j6_tQwWxmC0GELbQRulNIUeVlO2ozjnvgerrDk",
//       "Content-Type": "application/json",
//     },
//     data: {
//       registration_ids: [fcmToken],
//       notification: { body: message, title: title },
//     },
//   };

//   try {
//     axios
//       .request(NotificationData)
//       .then(function (response) {
//         console.log("response", response?.data);
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   } catch (error) {
//     console.log("NotificationError", error);
//   }
// };
export const NotificationSender = (fcmToken, title, message) => {
  // Construct the request body
  const requestBody = JSON.stringify({
    registration_ids: [fcmToken],
    notification: { body: message, title: title },
  });

  // Define the request options
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization:
        "key=AAAAIgAoddI:APA91bH7CeM1lHY3mq_4KoWaWHH-1okwjHFg6sUV0f3joouDy-yvpIl3scHonC2cdMNNBBE55PNiA178i_OT4VAmT8HIHovkoaYt_4j6_tQwWxmC0GELbQRulNIUeVlO2ozjnvgerrDk",
      "Content-Type": "application/json",
    },
    body: requestBody,
  };

  // Make the fetch request
  fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
    .then((response) => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the JSON response
      return response.json();
    })
    .then((data) => {
      // Handle the response data
      console.log("response", data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
};

export const postNotification = async (data) => {
  // console.log('NotiData', data);
  try {
    const response = await firestore()
      .collection("notifications")
      .doc(data?.id)
      .set(data, { merge: true });

    return response;
  } catch (error) {
    console.log("ErrorNoti", error);
  }
};

export const getNotifications = async (id, setData) => {
  // console.log('ReceiverId', id);
  const notificationData = [];

  try {
    const response = await firestore()
      .collection("notifications")
      .where("notificationType", "!=", "FOLLOW__REQUEST")
      .get()
      .then((snapshot) => {
        snapshot.forEach((da) => {
          if (da.data().receiverId == id) {
            notificationData.push(da.data());
          }
        });

        setData(notificationData);
      });

    return response;
  } catch (error) {}
};

export const getFollowRequestNotiCount = async (id, setRequestCount) => {
  try {
    firestore()
      .collection("notifications")
      .where("notificationType", "==", "FOLLOW__REQUEST")
      .where("receiverId", "==", id)

      .get()
      .then((querySnapshot) => {
        const TotalUsers = querySnapshot.size;

        setRequestCount(TotalUsers);
      });
  } catch (error) {}
};

export const deleteRequestNotification = async (id) => {
  // console.log("knxkn",id)
  try {
    firestore()
      .collection("notifications")
      .where("id", "in", id)

      // data.delete()
      // console.log("DataColl",data)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
  } catch (error) {}
};

export const getRequestWithLimit = async (id, setData) => {
  const notificationData = [];

  try {
    const response = await firestore()
      .collection("notifications")
      .where("notificationType", "==", "FOLLOW__REQUEST")
      .limit(1)
      .get()
      .then((snapshot) => {
        snapshot.forEach((da) => {
          if (da.data().receiverId == id) {
            notificationData.push(da.data());
          }

          // notificationData.push(da.data());
        });
        setData(notificationData);
      });
    return response;
  } catch (error) {}
};

export const getRequestNotification = async (id, setData) => {
  const notificationData = [];

  try {
    const response = await firestore()
      .collection("notifications")
      .where("notificationType", "==", "FOLLOW__REQUEST")
      .get()
      .then((snapshot) => {
        snapshot.forEach((da) => {
          if (da.data().receiverId == id) {
            notificationData.push(da.data());
          }
        });
        setData(notificationData);
      });
    return response;
  } catch (error) {}
};

export const sendNotification = async (
  currentUser,
  data,
  thumbnail,
  title,
  message,
  type
) => {
  const senderName = `${currentUser?.name} ${message}`;
  console.log("FcmLike", data?.fcmToken);

  // like your post 'Like Post'
  NotificationSender(data?.fcmToken, title, senderName);

  const senderData = {
    message: message,
    thumbnail: thumbnail == undefined ? "" : thumbnail,
    notificationType: type,
    senderName: currentUser?.name,
    senderUsername: currentUser?.name,
    id: uuid.v4(),
    senderId: currentUser?.uid,
    receiverId: data?.uid,
    createdAt: new Date(),
    senderImage: currentUser?.profileImage ? currentUser?.profileImage : "",
  };

  await postNotification(senderData);
};

export const sendFollowerNotification = async (
  authUser,
  CurrentUser,
  message,
  type,
  id
) => {
  const senderName = `${authUser?.name} ${message}`;

  NotificationSender(CurrentUser?.fcmToken, message, senderName);

  const senderData = {
    message: message,
    thumbnail: CurrentUser?.profileImage ? CurrentUser?.profileImage : "",
    senderName: authUser?.name,
    senderId: authUser?.uid,
    senderUsername: authUser?.username,
    notificationType: type,
    id: id,
    receiverId: CurrentUser?.uid,
    createdAt: new Date(),
    senderImage: authUser?.profileImage ? authUser?.profileImage : "",
  };

  console.log("SenderDataAll", senderData);

  await postNotification(senderData);
};
