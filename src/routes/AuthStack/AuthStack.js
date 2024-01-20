import {StatusBar} from 'react-native';

import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/Auth/Login/LoginScreen';
import LoginSignup from '../../screens/Auth/LoginSignup/LoginSignup';
import Signup from '../../screens/Auth/Signup/Signup';
import ForgetPassword from '../../screens/Auth/ForgetPassword/ForgetPassword';
import ProfileDetail from '../../screens/Auth/ProfileDetail/ProfileDetail';
import Notifications from '../../screens/Auth/Notification/NotificationScreen';
import SearchScreen from '../../screens/Auth/SearchScreen/SearchScreen';
import IndividualChatDetail from '../../screens/Main/ChatScreen/ChatDetail/IndividualChatDetail';
import ContactUs from '../../screens/Main/ContactUs/ContactUs';
import AddChat from '../../screens/Main/ChatScreen/AddChat/AddChat';
import AddGroupChat from '../../screens/Main/GroupChat/AddGroupChat/AddGroupChat';
import FollowScreen from '../../screens/Main/FollowScreen/FollowScreen';
import AddGroupChatDetail from '../../screens/Main/GroupChat/AddGroupChatDetail/AddGroupChatDetail';
import BlockedAccounts from '../../screens/Main/BlockedAccounts/BlockedAccounts';
import UserProfile from '../../screens/Main/UserProfile/UserProfile';
import AdvanceSearch from '../../screens/Auth/AdvanceSearch/AdvanceSearch';
import SettingScreen from '../../screens/Main/SettingScreen/SettingScreen';
import EditProfile from '../../screens/Main/EditProfile/EditProfile';
import ChatSettings from '../../screens/Main/ChatSettings/ChatSettings';
import FollowedScreen from '../../screens/Main/FollowedScreen/FollowedScreen';
import SportsNewsDetail from '../../screens/Main/SportsNewsDetail/SportsNewsDetail';
import MainDrawer from '../MainDrawer/MainDrawer';
import GroupChatDetail from '../../screens/Main/GroupChat/GroupChatDetail/GroupChatDetail';
import ConfirmUserName from '../../screens/Auth/Signup/ConfirmUserName';
import EmailVerification from '../../screens/Auth/Signup/EmailVerification';
import {useSelector} from 'react-redux';
import SearchLocation from '../../screens/Main/SearchLocation/SearchLocation';
import FollowedStack from '../FollowedStack/FollowedStack';
import InternalShare from '../../screens/Main/InternalShare/InternalShare';
import FollowingScreen from '../../screens/Main/FollowingScreen/FollowingScreen';
import UserFollowers from '../../screens/Main/UserFollowers/UserFollowers';
import UserFollowing from '../../screens/Main/UserFollowing/UserFollowing';
import AdvanceSearchUser from '../../screens/Main/AdvanceSearchUser/AdvanceSearchUser';
import BlockScreen from '../../screens/Main/BlockScreen/BlockScreen';
import OtherUserProfile from '../../screens/Main/OtherUserProfile/OtherUserProfile';
import HomeStack from '../HomeStack/HomeStack';
import ReportPost from '../../screens/Main/ReportPost/ReportPost';
import ReportReason from '../../screens/Main/ReportPost/ReportReason/ReportReason';
import AllViewBy from '../../screens/Main/AllViewBy/AllViewBy';
import GroupInfo from '../../screens/Main/GroupChat/GroupInfo/GroupInfo';
import NotificationRequest from '../../screens/Auth/Notification/NotificationRequest/NotificationRequest';
import QataPoltNewsDetail from '../../screens/Main/QatalPoltNews/QataPoltNewsDetail/QataPoltNewsDetail';

const AuthStack = ({navigation}) => {
  const Stack = createStackNavigator();
  const currentAuth = useSelector(state => state.auth?.currentUser);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginSignup" component={LoginSignup} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="AllViewBy" component={AllViewBy} />

      <Stack.Screen name="ConfirmUsername" component={ConfirmUserName} />
      <Stack.Screen name="InternalShare" component={InternalShare} />
      <Stack.Screen name="AdvanceSearchUser" component={AdvanceSearchUser} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="BlockScreen" component={BlockScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ReportPost" component={ReportPost} />

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

      <Stack.Screen name="ChatDetail" component={IndividualChatDetail} />
      <Stack.Screen name="ContactUS" component={ContactUs} />
      <Stack.Screen name="AddChat" component={AddChat} />
      <Stack.Screen name="ReportReason" component={ReportReason} />

      <Stack.Screen name="SearchLocation" component={SearchLocation} />

      <Stack.Screen name="groupChatDetail" component={GroupChatDetail} />

      <Stack.Screen name="AddGroupChat" component={AddGroupChat} />
      {/* New One Follow Screen */}
      <Stack.Screen name="FollowScreen" component={FollowScreen} />
      <Stack.Screen name="FollowingScreen" component={FollowingScreen} />
      <Stack.Screen name="UserFollowers" component={UserFollowers} />
      <Stack.Screen name="UserFollowing" component={UserFollowing} />

      <Stack.Screen name="AddGroupChatDetail" component={AddGroupChatDetail} />

      <Stack.Screen name="BlockedAccounts" component={BlockedAccounts} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="FollowedStack" component={FollowedStack} />

      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="AdvanceSearch" component={AdvanceSearch} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />
      <Stack.Screen name="GroupInfo" component={GroupInfo} />
      <Stack.Screen name="QataPoltNewsDetail" component={QataPoltNewsDetail} />

      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="ChatSettings" component={ChatSettings} />
      <Stack.Screen name="FollowedScreen" component={FollowedScreen} />
      {/* Sports News */}
      <Stack.Screen name="SportsNewsDetail" component={SportsNewsDetail} />
    </Stack.Navigator>
  );
};

export default AuthStack;
