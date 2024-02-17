// import {SafeAreaView, PanResponder} from 'react-native';
import React, { useRef, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "../HomeStack/HomeStack";
import SportsNewsDetail from "../../screens/Main/SportsNewsDetail/SportsNewsDetail";
import SettingScreen from "../../screens/Main/SettingScreen/SettingScreen";
import IndividualChatDetail from "../../screens/Main/ChatScreen/ChatDetail/IndividualChatDetail";
import ContactUs from "../../screens/Main/ContactUs/ContactUs";
import AddChat from "../../screens/Main/ChatScreen/AddChat/AddChat";
import AddGroupChat from "../../screens/Main/GroupChat/AddGroupChat/AddGroupChat";
import FollowedScreen from "../../screens/Main/FollowedScreen/FollowedScreen";
import BlockedAccounts from "../../screens/Main/BlockedAccounts/BlockedAccounts";
import UserProfile from "../../screens/Main/UserProfile/UserProfile";
import SearchScreen from "../../screens/Auth/SearchScreen/SearchScreen";
import Notifications from "../../screens/Auth/Notification/NotificationScreen";
import AdvanceSearch from "../../screens/Auth/AdvanceSearch/AdvanceSearch";
import ChatSettings from "../../screens/Main/ChatSettings/ChatSettings";
import AddGroupChatDetail from "../../screens/Main/GroupChat/AddGroupChatDetail/AddGroupChatDetail";
import MainDrawer from "../MainDrawer/MainDrawer";
import FollowScreen from "../../screens/Main/FollowScreen/FollowScreen";
import FollowingScreen from "../../screens/Main/FollowingScreen/FollowingScreen";
import GroupChatDetail from "../../screens/Main/GroupChat/GroupChatDetail/GroupChatDetail";
import ArenaScreen from "../../screens/Main/ArenaScreen/ArenaScreen";
import BlockScreen from "../../screens/Main/BlockScreen/BlockScreen";
import SearchLocation from "../../screens/Main/SearchLocation/SearchLocation";
import FollowedStack from "../FollowedStack/FollowedStack";
import InternalShare from "../../screens/Main/InternalShare/InternalShare";
import UserFollowers from "../../screens/Main/UserFollowers/UserFollowers";
import UserFollowing from "../../screens/Main/UserFollowing/UserFollowing";
import AdvanceSearchUser from "../../screens/Main/AdvanceSearchUser/AdvanceSearchUser";
import EditProfile from "../../screens/Main/EditProfile/EditProfile";
import OtherUserProfile from "../../screens/Main/OtherUserProfile/OtherUserProfile";
import { useSelector } from "react-redux";
import ProfileDetail from "../../screens/Auth/ProfileDetail/ProfileDetail";
import EmailVerification from "../../screens/Auth/Signup/EmailVerification";
import ReportPost from "../../screens/Main/ReportPost/ReportPost";
import ReportReason from "../../screens/Main/ReportPost/ReportReason/ReportReason";
import AllViewBy from "../../screens/Main/AllViewBy/AllViewBy";
import GroupInfo from "../../screens/Main/GroupChat/GroupInfo/GroupInfo";
import NotificationRequest from "../../screens/Auth/Notification/NotificationRequest/NotificationRequest";
import QataPoltNewsDetail from "../../screens/Main/QatalPoltNews/QataPoltNewsDetail/QataPoltNewsDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainStack = () => {
  const authState = useSelector((state) => state.auth?.currentUser);
  const authBioVerified = useSelector((state) => state.auth?.isBioVerified);

  const [isBioVerified, setIsBioVerified] = useState(false);

  // const timerId = useRef(false);
  // const [timeForInactivityInSecond, setTimeForInactivityInSecond] =
  //   useState(10);

  useEffect(() => {
    getIsBioVerified();
  }, []);

  const getIsBioVerified = async () => {
    const res = await AsyncStorage.getItem("isBioMetric");
    // console.log("BioVer", res);
    setIsBioVerified(res);
  };
  // useEffect(() => {
  //   // Remove the timer when the component unmounts
  //   return () => {
  //     clearTimeout(timerId.current);
  //   };
  // }, []);
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onMoveShouldSetPanResponder: () => true,
  //     onStartShouldSetPanResponderCapture: () => {
  //       resetInactivityTimeout();
  //     },
  //   }),
  // )?.current;

  // const resetInactivityTimeout = () => {
  //   clearTimeout(timerId.current);
  //   timerId.current = setTimeout(() => {
  //     // console.log(`You are detected idle from 3 Hours Please Login Again`);
  //   }, timeForInactivityInSecond * 1000);
  // };
  // console.log('timeForInactivityInSecond', timeForInactivityInSecond);
  const Stack = createStackNavigator();
  return (
    // <SafeAreaView
    //   style={{flex: 1}}
    //   collapsable={false}
    //   {...panResponder.panHandlers}
    //   >

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!authState?.isProfileComplete ? (
        <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
      ) : null}

      {!authState?.isVerified ? (
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
      ) : null}
      <Stack.Screen
        name="MainStack"
        component={MainDrawer}
        // colorModes={colorModes}
      />

      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen
        name="NotificationRequest"
        component={NotificationRequest}
      />

      <Stack.Screen name="ReportReason" component={ReportReason} />
      <Stack.Screen name="AllViewBy" component={AllViewBy} />
      <Stack.Screen name="QataPoltNewsDetail" component={QataPoltNewsDetail} />

      <Stack.Screen name="FreeAgent" component={ArenaScreen} />
      <Stack.Screen name="BlockScreen" component={BlockScreen} />
      <Stack.Screen name="SearchLocation" component={SearchLocation} />
      <Stack.Screen name="FollowedStack" component={FollowedStack} />
      <Stack.Screen name="UserFollowers" component={UserFollowers} />
      <Stack.Screen name="UserFollowing" component={UserFollowing} />
      <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />
      <Stack.Screen name="ReportPost" component={ReportPost} />

      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="InternalShare" component={InternalShare} />
      <Stack.Screen name="AdvanceSearchUser" component={AdvanceSearchUser} />

      <Stack.Screen name="ChatDetail" component={IndividualChatDetail} />
      <Stack.Screen name="GroupInfo" component={GroupInfo} />

      <Stack.Screen name="ContactUS" component={ContactUs} />
      <Stack.Screen name="AddChat" component={AddChat} />

      <Stack.Screen name="AddGroupChat" component={AddGroupChat} />
      {/* New One Follow Screen */}
      <Stack.Screen name="FollowScreen" component={FollowScreen} />
      <Stack.Screen name="FollowingScreen" component={FollowingScreen} />
      <Stack.Screen name="groupChatDetail" component={GroupChatDetail} />

      <Stack.Screen name="AddGroupChatDetail" component={AddGroupChatDetail} />

      <Stack.Screen name="BlockedAccounts" component={BlockedAccounts} />
      <Stack.Screen name="UserProfile" component={UserProfile} />

      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="AdvanceSearch" component={AdvanceSearch} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="ChatSettings" component={ChatSettings} />
      <Stack.Screen name="FollowedScreen" component={FollowedScreen} />
      {/* Sports News */}
      <Stack.Screen name="SportsNewsDetail" component={SportsNewsDetail} />
    </Stack.Navigator>
    // </SafeAreaView>
  );
};

export default MainStack;
