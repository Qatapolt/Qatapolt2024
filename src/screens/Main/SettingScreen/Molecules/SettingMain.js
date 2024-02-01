import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Share,
  StatusBar,
} from "react-native";
import Toast from "react-native-root-toast";
import CustomText from "../../../../components/CustomText";
import { InterFont } from "../../../../utils/Fonts";
import { colors } from "../../../../utils/Colors";
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from "react-native-size-matters";
import { Spacer } from "../../../../components/Spacer";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SwitchToggle from "react-native-switch-toggle";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { icons } from "../../../../assets/icons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  authData,
  setIsBioVerified,
  setLogOut,
} from "../../../../redux/reducers/authReducer";
import {
  getSpecificUser,
  SaveUser,
  UpdateFollower,
  UpdateFollowing,
} from "../../../services/UserServices";
import ImagePicker from "react-native-image-crop-picker";
import { uploadImage } from "../../../services/StorageServics";
import { deleteImage } from "../../../services/PostServices";
import { requestNotifications } from "react-native-permissions";
import { requestNotificationPermission } from "../../../../utils/Commons";
import { deleteRequestNotification } from "../../../services/NotificationServices";
import SimpleLoader from "../../../../utils/SimpleLoader";
import loaderAnimation from "../../../../assets/Loaders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../../utils/Loader";

const SettingMain = (props) => {
  const [on, setOn] = useState(on);
  const [isBioMetric, setIsBioMetric] = useState(false);
  const [isUserIFollow, setIsUserIFollow] = useState(false);
  const [isFreeAgent, setIsFreeAgent] = useState(false);
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.authUser?.isBioMetric) {
      setIsBioMetric(true);
    }
    if (props.authUser?.userIFollow) {
      setIsUserIFollow(true);
    }
    if (props.authUser?.freeAgent) {
      setIsFreeAgent(true);
    }
    if (props.authUser?.privateProfile) {
      setIsPrivateProfile(true);
    }
    if (props.authUser?.isNotification) {
      setIsNotification(true);
    }
  }, [props]);

  const deleteUserAndData = async () => {
    setIsLoading(true);
    try {
      const user = auth().currentUser;

      if (!user) {
        console.error("No authenticated user found.");
        setIsLoading(true);
        return;
      }

      const uid = user.uid;

      // Delete user data from the GroupRequest collection
      const groupRequestQuerySnapshot = await firestore()
        .collection("GroupRequest")
        .where("participantsData.participantId", "==", uid)
        .get();

      const groupRequestBatch = firestore().batch();
      groupRequestQuerySnapshot.forEach((doc) => {
        groupRequestBatch.delete(doc.ref);
      });

      await groupRequestBatch.commit();

      // Delete user posts
      const postsQuerySnapshot = await firestore()
        .collection("Posts")
        .where("userId", "==", uid)
        .get();

      const postsBatch = firestore().batch();
      postsQuerySnapshot.forEach((doc) => {
        postsBatch.delete(doc.ref);
      });

      await postsBatch.commit();

      // Delete user news
      // const newsQuerySnapshot = await firestore()
      //   .collection('News')
      //   .where('user.id', '==', uid)
      //   .get();

      // const newsBatch = firestore().batch();
      // newsQuerySnapshot.forEach(doc => {
      //   newsBatch.delete(doc.ref);
      // });

      // await newsBatch.commit();

      // Delete user notifications
      const notificationsQuerySnapshot = firestore()
        .collection("notifications")
        .where("receiverId", "==", uid || "senderId", "==", uid)
        .get();

      const notificationsBatch = firestore().batch();
      notificationsQuerySnapshot.forEach((doc) => {
        notificationsBatch.delete(doc.ref);
      });

      await notificationsBatch.commit();

      // Delete user from the Users collection
      await firestore().collection("users").doc(uid).delete();

      // Finally, delete the user account
      await user.delete();
      // await SaveUser(props.authUser?.uid, {isLogin: false});
      // await auth().signOut();

      dispatch(setLogOut());
      setIsLoading(true);
      console.log("User data deleted successfully.");
    } catch (error) {
      console.error("Error deleting user data:", error.message || error);
    }
  };
  const handelBioMetric = async () => {
    setIsLoading(true);
    try {
      setIsBioMetric(!isBioMetric);
      await SaveUser(props.authUser?.uid, { isBioMetric: !isBioMetric });
      await AsyncStorage.setItem("isBioMetric", JSON.stringify(!isBioMetric));
      // dispatch(setIsBioVerified(true));

      const getAuthUser = await getSpecificUser(props.authUser?.uid);

      if (getAuthUser) {
        dispatch(authData(getAuthUser));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error: " + error);
    }
  };

  const handelFreeAgent = async () => {
    setIsFreeAgent(!isFreeAgent);
    await SaveUser(props.authUser?.uid, { freeAgent: !isFreeAgent });
    const getAuthUser = await getSpecificUser(props.authUser?.uid);

    if (getAuthUser) {
      dispatch(authData(getAuthUser));
    }
  };

  const handelPrivateProfile = async () => {
    setIsPrivateProfile(!isPrivateProfile);
    await SaveUser(props.authUser?.uid, { privateProfile: !isPrivateProfile });
    const getAuthUser = await getSpecificUser(props.authUser?.uid);

    if (getAuthUser) {
      dispatch(authData(getAuthUser));
    }
    if (isPrivateProfile) {
      for (let index = 0; index < props.authUser?.RequestIds.length; index++) {
        const element = props.authUser?.RequestIds[index];
        // console.log('Elementid', element);
        await UpdateFollower(props.authUser?.uid, element);
        await UpdateFollowing(element, props.authUser?.uid);
      }
      await deleteRequestNotification(props.authUser?.RequestNotifiedIds);
      await SaveUser(props.authUser?.uid, {
        RequestIds: [],
        RequestNotifiedIds: [],
      });
    }
  };

  const handelNotification = async () => {
    // console.log('isNotification', isNotification);
    setIsNotification(!isNotification);
    requestNotificationPermission();
    await SaveUser(props.authUser?.uid, { isNotification: !isNotification });
    const getAuthUser = await getSpecificUser(props.authUser?.uid);
    if (getAuthUser) {
      dispatch(authData(getAuthUser));
    }
  };

  const handelUserIFollow = async () => {
    setIsUserIFollow(!isUserIFollow);
    await SaveUser(props.authUser?.uid, { userIFollow: !isUserIFollow });
    const getAuthUser = await getSpecificUser(props.authUser?.uid);

    if (getAuthUser) {
      dispatch(authData(getAuthUser));
    }
  };

  const handelLogout = async () => {
    setIsLoading(true);
    try {
      await auth().signOut();
      dispatch(setLogOut());

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Logout Error", error);
    }
  };

  // const onPickImage = async () => {
  //   try {
  //     const result = await ImagePicker.openPicker({
  //       width: 300,
  //       height: 400,
  //       cropping: true,
  //       mediaType: 'photo',
  //       multiple: false,
  //     });

  //     if (!result.cancelled) {
  //       const file = {
  //         uri: result.path,
  //         fileName: result.path,
  //         type: result.mime,
  //         // duration: res.assets[0]?.duration,
  //       };
  //       props.setIsLoading(true);
  //       if (props?.authUser?.profileBackground) {
  //         const response = deleteImage(props?.authUser?.profileBackground);
  //         // console.log('resImage', response);
  //       }

  //       const linkData = await uploadImage(file.uri, props.authUser?.uid);

  //       await SaveUser(props.authUser?.uid, {profileBackground: linkData});

  //       const userRes = await getSpecificUser(props.authUser?.uid);

  //       dispatch(authData(userRes));
  //       props.setIsLoading(false);

  //       props.navigation.goBack();
  //       // setImageFile(file);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onShare = async () => {
    // console.log('calling share app');
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
        Alert.alert("cancelled");
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const Loading = () => {
    return (
      <View
        style={{
          backgroundColor: "transparent",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999999999999,
          height: "100%",
          width: "100%",
        }}
      >
        <Loader file={loaderAnimation} />
      </View>
    );
  };
  return isLoading ? (
    <Loading />
  ) : (
    <View>
      <CustomText
        label={"SHARE"}
        fontSize={13}
        textAlign="center"
        fontFamily={InterFont.semiBold}
        color={colors.green}
      />
      <Spacer height={10} />
      <TouchableOpacity style={styles.box} onPress={() => onShare()}>
        <View style={styles.innerView}>
          <Entypo name="share" size={moderateScale(27)} color={colors.green} />
          <CustomText
            label={"Share App"}
            fontSize={13}
            marginLeft={15}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />
        </View>
      </TouchableOpacity>
      <Spacer height={10} />
      <CustomText
        label={"Accounts"}
        fontSize={13}
        textAlign="center"
        fontFamily={InterFont.semiBold}
        color={colors.green}
      />
      <Spacer height={10} />
      <TouchableOpacity
        onPress={() => props.navigation.navigate("BlockedAccounts")}
        style={styles.box}
      >
        <View style={styles.innerView}>
          <Entypo name="block" size={moderateScale(27)} color={colors.green} />
          <CustomText
            label={"Blocked Accounts"}
            fontSize={13}
            marginLeft={15}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />
        </View>
      </TouchableOpacity>
      {/* <Spacer height={10} /> */}
      {/* <CustomText
        label={'Accounts'}
        fontSize={13}
        textAlign="center"
        fontFamily={InterFont.semiBold}
        color={colors.green}
      />
      <Spacer height={10} />
      <TouchableOpacity onPress={() => onPickImage()} style={styles.box}>
        <View style={styles.innerView}>
          <Image
            resizeMode="contain"
            source={icons.background}
            style={{
              width: scale(25),
              height: scale(24),
              tintColor: colors.green,
            }}
          />
          <CustomText
            label={'Change Profile Background'}
            fontSize={13}
            marginLeft={15}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />
        </View>
      </TouchableOpacity> */}
      {/* <Spacer height={30} />

      <CustomText
        label={'CHANGE'}
        fontSize={13}
        textAlign="center"
        fontFamily={InterFont.semiBold}
        color={colors.green}
      />
      <Spacer height={10} /> */}
      {/* <TouchableOpacity style={styles.box}>
        <View style={styles.innerView}>
          <MaterialCommunityIcons
            name="email-edit-outline"
            size={moderateScale(27)}
            color={colors.green}
          />
          <CustomText
            label={'Change Email Address'}
            fontSize={13}
            marginLeft={15}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />
        </View>
      </TouchableOpacity> */}
      <Spacer height={10} />

      {/* Free Agent */}

      <CustomText
        label={"Free Agent"}
        fontSize={13}
        textAlign="center"
        fontFamily={InterFont.semiBold}
        color={colors.green}
      />
      <Spacer height={10} />
      <TouchableOpacity style={styles.box}>
        <View style={styles.innerView}>
          {/* <MaterialIcons
            name="notifications"
            size={moderateScale(27)}
            color={colors.green}
          /> */}
          <Image
            style={{
              width: 25,
              height: 25,
              tintColor: colors.green,
            }}
            source={icons.team}
          />
          <CustomText
            label={"Free Agent"}
            fontSize={13}
            marginLeft={15}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />
        </View>

        <SwitchToggle
          switchOn={isFreeAgent}
          onPress={handelFreeAgent}
          circleColorOn="white"
          backgroundColorOn={colors.green}
          containerStyle={{
            width: scale(50),
            height: scale(28),
            borderRadius: 25,
            padding: 5,
          }}
          circleStyle={{
            width: 24,
            height: 24,
            borderRadius: 12,
          }}
        />
      </TouchableOpacity>

      <Spacer height={10} />

      <CustomText
        label={"WHO CAN ADD ME TO GROUPS"}
        fontSize={13}
        textAlign="center"
        fontFamily={InterFont.semiBold}
        color={colors.green}
      />
      <Spacer height={10} />
      <TouchableOpacity style={styles.box}>
        <View style={styles.innerView}>
          <SimpleLineIcons
            name="user-follow"
            size={moderateScale(25)}
            color={colors.green}
          />
          {/* <MaterialIcons
            name="notifications"
            size={moderateScale(27)}
            color={colors.green}
          /> */}
          <CustomText
            label={"Users I Follow"}
            fontSize={13}
            marginLeft={15}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />
        </View>

        <SwitchToggle
          switchOn={isUserIFollow}
          onPress={handelUserIFollow}
          circleColorOn="white"
          backgroundColorOn={colors.green}
          containerStyle={{
            width: scale(50),
            height: scale(28),
            borderRadius: 25,
            padding: 5,
          }}
          circleStyle={{
            width: 24,
            height: 24,
            borderRadius: 12,
          }}
        />
      </TouchableOpacity>

      <Spacer height={10} />

      <CustomText
        label={"NOTIFICATIONS"}
        fontSize={13}
        textAlign="center"
        fontFamily={InterFont.semiBold}
        color={colors.green}
      />
      <Spacer height={10} />
      <TouchableOpacity style={styles.box}>
        <View style={styles.innerView}>
          <MaterialIcons
            name="notifications"
            size={moderateScale(27)}
            color={colors.green}
          />
          <CustomText
            label={"Notifications"}
            fontSize={13}
            marginLeft={15}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />
        </View>

        <SwitchToggle
          switchOn={isNotification}
          onPress={handelNotification}
          circleColorOn="white"
          backgroundColorOn={colors.green}
          containerStyle={{
            width: scale(50),
            height: scale(28),
            borderRadius: 25,
            padding: 5,
          }}
          circleStyle={{
            width: 24,
            height: 24,
            borderRadius: 12,
          }}
        />
      </TouchableOpacity>

      <Spacer height={10} />

      <CustomText
        label={"PROFILE"}
        fontSize={13}
        textAlign="center"
        fontFamily={InterFont.semiBold}
        color={colors.green}
      />
      <Spacer height={10} />
      <TouchableOpacity style={styles.box}>
        <View style={styles.innerView}>
          <Image
            resizeMode="contain"
            source={icons.settinguser}
            style={{ width: scale(25), height: scale(24) }}
          />
          <CustomText
            label={"Private Profile"}
            fontSize={13}
            marginLeft={15}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />
        </View>

        <SwitchToggle
          switchOn={isPrivateProfile}
          onPress={handelPrivateProfile}
          circleColorOn="white"
          backgroundColorOn={colors.green}
          containerStyle={{
            width: scale(50),
            height: scale(28),
            borderRadius: 25,
            padding: 5,
          }}
          circleStyle={{
            width: 24,
            height: 24,
            borderRadius: 12,
          }}
        />
      </TouchableOpacity>

      {/* <Spacer height={30} />

      <CustomText
        label={'MODE'}
        fontSize={13}
        textAlign="center"
        fontFamily={InterFont.semiBold}
        color={colors.green}
      />
      <Spacer height={10} />
      <TouchableOpacity style={styles.box}>
        <View style={styles.innerView}>
          <Image
            source={icons.mode}
            style={{width: scale(25), height: scale(24)}}
          />

          <CustomText
            label={'Enable Dark Mode'}
            fontSize={13}
            marginLeft={15}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />
        </View>

        <SwitchToggle
            switchOn={on}
            onPress={() => setOn(!on)}
         
          circleColorOn="white"
          backgroundColorOn={colors.green}
          containerStyle={{
            width: scale(50),
            height: scale(28),
            borderRadius: 25,
            padding: 5,
          }}
          circleStyle={{
            width: 24,
            height: 24,
            borderRadius: 12,
          }}
        />
      </TouchableOpacity> */}

      <Spacer height={10} />

      <CustomText
        label={Platform.OS === "android" ? "TOUCH ID" : "FACE ID"}
        fontSize={13}
        textAlign="center"
        fontFamily={InterFont.semiBold}
        color={colors.green}
      />
      <Spacer height={10} />
      <TouchableOpacity style={styles.box}>
        <View style={styles.innerView}>
          <MaterialCommunityIcons
            name="face-recognition"
            size={moderateScale(27)}
            color={colors.green}
          />

          <CustomText
            label={
              Platform.OS == "ios"
                ? "Lock App with Face ID"
                : " Lock App with Touch ID"
            }
            fontSize={13}
            marginLeft={15}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />
        </View>

        <SwitchToggle
          switchOn={isBioMetric}
          onPress={handelBioMetric}
          circleColorOn="white"
          backgroundColorOn={colors.green}
          containerStyle={{
            width: scale(50),
            height: scale(28),
            borderRadius: 25,
            padding: 5,
          }}
          circleStyle={{
            width: 24,
            height: 24,
            borderRadius: 12,
          }}
        />
      </TouchableOpacity>

      <Spacer height={10} />

      <CustomText
        label={"LOGOUT"}
        fontSize={13}
        textAlign="center"
        fontFamily={InterFont.semiBold}
        color={colors.green}
      />
      <Spacer height={10} />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handelLogout}
        style={styles.box}
      >
        <View style={styles.innerView}>
          <Feather
            name="log-out"
            size={moderateScale(27)}
            color={colors.green}
          />
          <CustomText
            label={"Logout"}
            fontSize={13}
            marginLeft={15}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />
        </View>
      </TouchableOpacity>

      <Spacer height={10} />

      <CustomText
        label={"CONTACT"}
        fontSize={13}
        textAlign="center"
        fontFamily={InterFont.semiBold}
        color={colors.green}
      />
      <Spacer height={10} />
      <TouchableOpacity
        onPress={() => props.navigation.navigate("ContactUS")}
        style={styles.box}
      >
        <View style={styles.innerView}>
          <MaterialIcons
            name="contacts"
            size={moderateScale(27)}
            color={colors.green}
          />
          <CustomText
            label={"Contact Us"}
            fontSize={13}
            marginLeft={15}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />
        </View>
      </TouchableOpacity>

      <Spacer height={10} />

      <CustomText
        label={"DELETE ACCOUNT"}
        fontSize={13}
        textAlign="center"
        fontFamily={InterFont.semiBold}
        color={colors.green}
      />

      <Spacer height={10} />
      <TouchableOpacity onPress={deleteUserAndData} style={styles.box}>
        <View style={styles.innerView}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={moderateScale(27)}
            color={colors.green}
          />
          <CustomText
            label={"Delete Account"}
            fontSize={13}
            marginLeft={15}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />
        </View>
      </TouchableOpacity>
      <Spacer height={30} />
      {/* {isLoading && (
        <View style={[styles.popupContainer, {zIndex: 99999}]}>
          <SimpleLoader file={loaderAnimation} />
        </View>
      )} */}
    </View>
  );
};

export default SettingMain;

const styles = ScaledSheet.create({
  box: {
    width: "100%",
    height: verticalScale(38),
    backgroundColor: "#F5F9F8",
    borderRadius: scale(12),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(10),
    justifyContent: "space-between",
    shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
    shadowRadius: 2,
    elevation: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: -1, height: 2 },
  },
  innerView: {
    flexDirection: "row",
    alignItems: "center",
  },
  popupContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 9999,
  },
});
