import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";
import uuid from "react-native-uuid";
export const SaveUser = async (authId, data) => {
  try {
    const response = await firestore()
      .collection("users")
      .doc(authId)
      .set(data, { merge: true });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAppFounder = async () => {
  try {
    let data;
    await firestore()
      .collection("users")
      .where("appFounder", "==", true)
      .get()
      .then((dataSnap) => {
        dataSnap?.forEach((snap) => {
          data = snap?.data();
        });
      });

    return data;
  } catch (error) {
    throw error;
  }
};

export const saveReportUser = async (data) => {
  try {
    const response = await firestore()
      .collection("reportUsers")
      .doc(uuid.v4())
      .set(data, { merge: true });

    // console.log('ResData', response);

    return response;
  } catch (error) {
    throw error;
  }
};

export const checkUsername = async (username) => {
  console.log("UserBAme", username);
  let TotalUsers = false;
  await firestore()
    .collection("users")
    .where("username", "==", username)
    .limit(1)
    .get()
    .then((dataSnap) => {
      dataSnap?.forEach((snap) => {
        TotalUsers = snap?.exists;
      });
    });

  return TotalUsers;
};

export const getAllUSers = (setData, id) => {
  const postData = [];

  try {
    firestore()
      .collection("users")
      .where("uid", "!=", id)
      .get()
      .then((Snapshot) => {
        Snapshot.forEach((da) => {
          postData.push(da.data());
        });
        setData(postData);
      });
  } catch (error) {
    throw error;
  }
};
export const getAllFollowers = (setData, id) => {
  const postData = [];
  // console.log('IdDay', id);

  try {
    firestore()
      .collection("users")
      .where("uid", "in", id)
      .get()
      .then((Snapshot) => {
        Snapshot.forEach((da) => {
          postData.push(da.data());
        });
        setData(postData);
      });
  } catch (error) {
    throw error;
  }
};

export const getAllFollowRequest = (setData, id) => {
  const postData = [];
  // console.log('IdDay', id);

  try {
    firestore()
      .collection("users")
      .where("uid", "in", id)
      .get()
      .then((Snapshot) => {
        Snapshot.forEach((da) => {
          postData.push(da.data());
        });
        setData(postData);
      });
  } catch (error) {
    throw error;
  }
};

export const getAllViewBy = (setData, id) => {
  const postData = [];
  // console.log('IdDay', id);

  try {
    firestore()
      .collection("users")
      .where("uid", "in", id)
      .get()
      .then((Snapshot) => {
        Snapshot.forEach((da) => {
          postData?.push(da.data());
        });
        setData(postData);
      });
  } catch (error) {
    throw error;
  }
};
export const filterCustomTimeLine = (setCustomTimeLineIds, values) => {
  const postData = [];

  try {
    const collectionRef = firestore().collection("users");
    let query = collectionRef;

    if (values?.accountType) {
      query = query.where("accountType", "==", values.accountType);
    }
    if (values?.position) {
      query = query.where("position", "==", values.position);
    }
    if (values?.country) {
      query = query.where("country", "==", values.country);
    }
    if (values?.age) {
      query = query.where("age", "==", values.age);
    }
    if (values?.city) {
      query = query.where("city", "==", values.city);
    }
    if (values?.height) {
      query = query.where("height", "==", values.height);
    }
    if (values?.selectSport) {
      query = query.where("selectSport", "==", values.selectSport);
    }
    if (values?.strongHand) {
      query = query.where("strongHand", "==", values.strongHand);
    }
    if (values?.strongFoot) {
      query = query.where("strongFoot", "==", values.strongFoot);
    }
    if (values?.skill1) {
      query = query.where("skill1", "==", values.skill1);
    }
    if (values?.skill2) {
      query = query.where("skill2", "==", values.skill2);
    }
    if (values?.skill3) {
      query = query.where("skill3", "==", values.skill3);
    }
    if (values?.freeAgent) {
      query = query.where("skill3", "==", values.freeAgent);
    }
    try {
      query.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          postData.push(doc.data().uid);
        });
        setCustomTimeLineIds(postData);
      });
    } catch (error) {
      console.log("inner catch error:", error);
    }
  } catch (error) {
    console.log("filterCustomTimeLine ~ error:", error);
    throw error;
  }
};

// export const filterCustomTimeLine = (setCustomTimeLineIds, signupValues) => {

//   const postData = [];

//   try {
//     firestore()
//       .collection('users')
//       .where('accountType', '==', signupValues?.accountType)
//       .where('position', '==', signupValues?.position)
//       .where('country', '==', signupValues?.country)
//       .where('age', '==', signupValues?.age)
//       .where('city', '==', signupValues?.city)
//       .where('height', '==', signupValues?.height)
//       .where('selectSport', '==', signupValues?.selectSport)
//       .where('strongHand', '==', signupValues?.strongHand)
//       .where('strongFoot', '==', signupValues?.strongFoot)
//       .where('skill1', '==', signupValues?.skill1)
//       .where('skill2', '==', signupValues?.skill2)
//       .where('skill3', '==', signupValues?.skill3)
//       .get()
//       .then(snapshot => {
//         snapshot.forEach(doc => {
//           postData.push(doc.data().uid);
//         });
//         setCustomTimeLineIds(postData);
//       });
//   } catch (error) {
//     throw error;
//   }
// };

export const searchAllUser = (setData, txt) => {
  const postData = [];
  try {
    firestore()
      .collection("users")
      .get()
      .then((Snapshot) => {
        Snapshot.forEach((da) => {
          if (da?.data().name === txt) {
            // console.log('nameDataDatat', da?.data().name);

            postData.push(da.data());
          }
        });
        setData(postData);

        // setData(postData);
      });
  } catch (error) {
    throw error;
  }
};

export const FilterAdvanceSearchUser = (
  setData,
  signupValues,
  dispatch,
  setAdvanceSearch
) => {
  const postData = [];
  try {
    firestore()
      .collection("users")
      .get()
      .then((Snapshot) => {
        Snapshot.forEach((da) => {
          if (
            da?.data().accountType === signupValues?.accountType ||
            da?.data().freeAgent === signupValues?.freeAgent ||
            da?.data().position === signupValues?.position ||
            da?.data().country === signupValues?.country ||
            da?.data().age <= signupValues?.age ||
            da?.data().gender === signupValues?.gender ||
            da?.data().username === signupValues?.username ||
            da?.data().city === signupValues?.city ||
            da?.data().height <= signupValues?.height ||
            da?.data().selectSport === signupValues?.selectSport ||
            da?.data().strongHand === signupValues?.strongHand ||
            da?.data().strongFoot === signupValues?.strongFoot ||
            da?.data().skill1 === signupValues?.skill1 ||
            da?.data().skill2 === signupValues?.skill2 ||
            da?.data().skill3 === signupValues?.skill3
          )
            postData.push(da.data());
        });
        setData(postData);
        dispatch(setAdvanceSearch(postData));
      });
  } catch (error) {
    throw error;
  }
};

export const getSpecificUser = async (userId) => {
  try {
    const user = await firestore().collection("users").doc(userId).get();
    return user.data();
  } catch (error) {
    // console.log('getUser line 51', error);
    throw error;
  }
};

//   FollowedBy:FieldValue.arrayUnion({
//     followerId:userEvent.uid,

//   }),
// },

export const UpdateFollower = async (userId, data) => {
  await firestore()
    .collection("users")
    .doc(userId)
    .update({
      AllFollowers: firebase.firestore.FieldValue.arrayUnion(data),
    });
};

export const UpdateFollowRequest = async (userId, data, notifiedId) => {
  await firestore()
    .collection("users")
    .doc(userId)
    .update({
      RequestIds: firebase.firestore.FieldValue.arrayUnion(data),
      RequestNotifiedIds: firebase.firestore.FieldValue.arrayUnion(notifiedId),
    });
};

export const UpdateBlockUsers = async (userId, data) => {
  await firestore()
    .collection("users")
    .doc(userId)
    .update({
      BlockUsers: firebase.firestore.FieldValue.arrayUnion(data),
    });
};
export const UpdateBlockUsersOthers = async (userId, data) => {
  await firestore()
    .collection("users")
    .doc(userId)
    .update({
      BlockUsers: firebase.firestore.FieldValue.arrayUnion(data),
    });
};
export const UpdateFollowing = async (userId, data) => {
  await firestore()
    .collection("users")
    .doc(userId)
    .update({
      AllFollowing: firebase.firestore.FieldValue.arrayUnion(data),
    });
};

export const UpdateWatchList = async (authId, data) => {
  await firestore()
    .collection("users")
    .doc(authId)
    .update({
      WatchList: firebase.firestore.FieldValue.arrayUnion(data),
    });
};

export const userPostId = async (authId, data) => {
  await firestore()
    .collection("users")
    .doc(authId)
    .update({
      PostIds: firebase.firestore.FieldValue.arrayUnion(data),
    });
};

export const NotificationSender = (fcmToken, message, title) => {
  // console.log('FcmAohter', fcmToken, message, title);

  const NotificationData = {
    method: "POST",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      Authorization:
        "key=AAAAntfCcWI:APA91bGvB4v_-ERQEr5c9uAUbgB4OO5eqzGklQtRDSy0nuBCl488yFVTM0VqfjJKVfg21ABmip856AK_R9x8rYqvTq3AMowRdEqdYj9wrCDajnNUEkpeN0lpVo-lEptGSZ3WAqyIPLV_",
      "Content-Type": "application/json",
    },
    data: {
      registration_ids: [fcmToken],
      notification: { body: message, title: title },
    },
  };

  try {
    axios
      .request(NotificationData)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    console.log("NotificationError", error);
  }
};
