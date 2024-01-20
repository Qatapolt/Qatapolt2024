import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';

export const saveContactUs = async data => {
  try {
    const response = await firestore()
      .collection("contactUs")
      .doc(uuid.v4())
      .set(data, {merge: true});

    return response;
  } catch (error) {}
};

export const saveTrophyRequest = async data => {
  console.log("DataTrpohy",data)
    try {
      const response = await firestore()
        .collection("TrophyRequest")
        .doc(uuid.v4())
        .set(data, {merge: true});
  
      return response;
    } catch (error) {}
  };
