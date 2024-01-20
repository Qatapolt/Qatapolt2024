import storage from '@react-native-firebase/storage';

import uuid from 'react-native-uuid';
export const uploadImage = async (uri, path) => {
  // console.log('ImagrAndPath', uri, path);
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref(path + uuid.v4());
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        () => {},
        err => {
          reject(err);
        },
        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        },
      );
    });
  } catch (err) {
    console.log('uploadImage error: ' + err.message);
  }
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const ref = storage().ref().child(filename).put(blob);
    const link = await (await ref).ref.getDownloadURL();
    return link;
  } catch (error) {
    // console.log("upload error", error);
  }
};

export const uploadVideo = async (uri, path) => {
  // console.log("ImagrAndPath",uri,path)
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref(path + uuid.v4());
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        () => {},
        err => {
          reject(err);
        },
        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        },
      );
    });
  } catch (err) {
    console.log('uploadImage error: ' + err.message);
  }
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const ref = storage().ref().child(filename).put(blob);
    const link = await (await ref).ref.getDownloadURL();
    return link;
  } catch (error) {
    // console.log("upload error", error);
  }
};
