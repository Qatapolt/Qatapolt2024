import {Linking, Platform} from 'react-native';
import {
  PERMISSIONS,
  request,
  check,
  openSettings,
} from 'react-native-permissions';
const requestCameraPermission = async setCameraPermission => {
  if (Platform.OS == 'ios') {
    return (permissionResult = await request(PERMISSIONS.IOS.CAMERA));
  } else {
    return (permissionResult = await request(PERMISSIONS.ANDROID.CAMERA));
  }

  // if (Platform.OS === 'android') {
  //     request(PERMISSIONS.ANDROID.CAMERA).then(result => {
  //       if (result == 'blocked') {
  //         Linking.openSettings();
  //       } else if (result == "granted") {

  //         cameraPer  =true

  //       } else {
  //         permissionResult= false
  //         // setHasPermission(true);
  //       }
  //     });
  //   }
  //    else
};

const requestGalleryPermission = async setValue=> {

      if (Platform.OS == 'ios') {
    return (permissionResult = await request(PERMISSIONS.IOS.CAMERA));
  } else {
    return (permissionResult = await request(PERMISSIONS.ANDROID.CAMERA));
  }
//   let permissionResult;

//   if (Platform.OS === 'android') {
//     request(PERMISSIONS.ANDROID.MEDIA_LIBRARY).then(result => {
//       if (result == 'blocked') {
//         Linking.openSettings();
//       } else if (result == 'denied') {
//         permissionResult = false;
//       } else {
//         permissionResult = true;

//         // setHasPermission(true);
//       }
//     });
//   } else if (Platform.OS === 'ios') {
//     request(PERMISSIONS.IOS.MEDIA_LIBRARY).then(result => {
//       console.log('cdkcndkcdnckd', result);

//       if (result === 'blocked') {
//         openSettings();
//       } else if (result == 'denied') {
//         permissionResult = false;
//       } else {
//         permissionResult = true;
//       }
//     });
//   }

//   return permissionResult;
};

export {requestCameraPermission, requestGalleryPermission};
