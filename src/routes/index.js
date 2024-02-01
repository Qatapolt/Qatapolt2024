import React, { useEffect, useState, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import AuthStack from "./AuthStack/AuthStack";
import { Alert, PanResponder, SafeAreaView, View } from "react-native";
import { colors } from "../utils/Colors";
import MainDrawer from "./MainDrawer/MainDrawer";
import IndividualChatDetail from "../screens/Main/ChatScreen/ChatDetail/IndividualChatDetail";
import AddChat from "../screens/Main/ChatScreen/AddChat/AddChat";
import AddGroupChat from "../screens/Main/GroupChat/AddGroupChat/AddGroupChat";
import AddGroupChatDetail from "../screens/Main/GroupChat/AddGroupChatDetail/AddGroupChatDetail";
import SettingScreen from "../screens/Main/SettingScreen/SettingScreen";
import ContactUs from "../screens/Main/ContactUs/ContactUs";
import BlockedAccounts from "../screens/Main/BlockedAccounts/BlockedAccounts";
import ChatSettings from "../screens/Main/ChatSettings/ChatSettings";
import FollowScreen from "../screens/Main/FollowScreen/FollowScreen";
import SearchScreen from "../screens/Auth/SearchScreen/SearchScreen";
import Notifications from "../screens/Auth/Notification/NotificationScreen";
import SportsNewsDetail from "../screens/Main/SportsNewsDetail/SportsNewsDetail";
import FollowedScreen from "../screens/Main/FollowedScreen/FollowedScreen";
import AdvanceSearch from "../screens/Auth/AdvanceSearch/AdvanceSearch";
import UserProfile from "../screens/Main/UserProfile/UserProfile";
import auth from "@react-native-firebase/auth";
import { getSpecificUser, SaveUser } from "../screens/services/UserServices";
import { useDispatch, useSelector } from "react-redux";
import {
  authData,
  setIsBioVerified,
  setLogOut,
  setNotificationAlert,
} from "../redux/reducers/authReducer";
import Loader from "../utils/Loader";
import loaderAnimation from "../assets/Loaders";
import MainStack from "./MainStack";
import { Biometric } from "../screens/Main/Biometric/Biometric";
import messaging from "@react-native-firebase/messaging";
import { images } from "../assets/images";
import { showMessage } from "react-native-flash-message";
import EmailVerification from "../screens/Auth/Signup/EmailVerification";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { setDeepLinkPostId } from "../redux/reducers/userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FastImage from "react-native-fast-image";
const RootNavigator = () => {
  const dispatch = useDispatch();
  const currentAuth = useSelector((state) => state.auth?.currentUser);
  const authBioVerified = useSelector((state) => state.auth?.isBioVerified);
  const [loading, setLoading] = useState(true);
  const Stack = createStackNavigator();

  // console.log('currentAuth', currentAuth);

  useEffect(() => {
    if (!auth().currentUser) {
      getCurrentUser(false);
    } else {
      getCurrentUser(true);
    }
  }, []);

  useEffect(() => {
    messaging().onMessage(async (data) => {
      const { notification } = data;
      dispatch(setNotificationAlert(true));
      showMessage({
        message: "Notification",
        description: notification?.body,
        type: "info",
        backgroundColor: "#000",
        duration: 5000,
        floating: true,
        icon: (props) => <FastImage source={images.appIcon} {...props} />,
      });
    });
    messaging().onNotificationOpenedApp((data) => {
      dispatch(setNotificationAlert(true));
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      dispatch(setNotificationAlert(true));
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          dispatch(setNotificationAlert(true));
        }
      });
  }, []);

  const notificationServices = async () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
      // nav here ...
    });
    // ForeGround
    messaging().onMessage(async (remoteMessage) => {
      // console.log(' new ForeGround message arrived!', JSON.stringify(remoteMessage));
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });
  };

  const getCurrentUser = async (status) => {
    if (status) {
      const fcmToken = await messaging().getToken();
      await SaveUser(auth().currentUser.uid, { fcmToken: fcmToken });

      const authUser = await getSpecificUser(auth().currentUser.uid);
      dispatch(authData(authUser));
    }

    const res = await AsyncStorage.getItem("isBioMetric");
    if (res == "true") {
      dispatch(setIsBioVerified(true));
    } else {
      dispatch(setIsBioVerified(false));
    }

    // console.log('CurrentIdUser', authUser);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return <Loader file={loaderAnimation} />;
  }

  if (authBioVerified != false) {
    console.log("IsVerifeddds", typeof authBioVerified);
    // if (currentAuth?.isBioMetric) {
    // console.log('kbkbkbk');

    return <Biometric />;
    // }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"AuthStack"}
      >
        {currentAuth?.isLogin ? (
          <>
            <Stack.Screen
              name="MainStack"
              component={MainStack}
              // colorModes={colorModes}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              // colorModes={colorModes}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
