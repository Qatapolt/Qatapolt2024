// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from "../../screens/Main/ArenaScreen/ArenaScreen";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { colors } from "../../utils/Colors";
import { icons } from "../../assets/icons";
import { Image, Platform, Text } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomText from "../../components/CustomText";
import StadiumScreen from "../../screens/Main/ArenaScreen/ArenaScreen";
import ChatScreen from "../../screens/Main/ChatScreen/ChatScreen";
import PostScreen from "../../screens/Main/PostScreen/PostScreen";
import WatchListScreen from "../../screens/Main/WatchListScreen/WatchListScreen";
import ArenaScreen from "../../screens/Main/ArenaScreen/ArenaScreen";
import TopNav from "../TopNav/TopNav";
import HomeChat from "../../screens/Main/HomeChat/HomeChat";
import ProfileScreen from "../../screens/Main/ProfileScreen/ProfileScreen";
import FollowScreen from "../../screens/Main/FollowScreen/FollowScreen";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSpecificUser } from "../../screens/services/UserServices";
import CustomImage from "../../components/CustomImage";
import { TourGuideZoneByPosition } from "rn-tourguide";
import PostStack from "../PostStack/PostStack";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
const Tab = createBottomTabNavigator();
import { useRoute } from "@react-navigation/native";
const HomeStack = ({ route }) => {
  useEffect(() => {
    getUserAllData();
  }, [1]);
  const CurrentUser = useSelector((state) => state.auth?.currentUser);
  const [userData, setUserData] = useState({});

  const getUserAllData = async () => {
    const user = await getSpecificUser(
      route?.params?.event ? route?.params?.event : CurrentUser?.uid
    );
    setUserData(user);
  };
  // FreeAgent
  const freeAgent = route?.params?.freeAgent;

  return (
    <>
      <TourGuideZoneByPosition
        containerStyle={{
          top: Platform.OS == "android" ? "100%" : "90%",
        }}
        zone={1}
        shape={"rectangle"}
        text="Explore and customise your timeline to enjoy the Qatapolt experience."
        isTourGuide={true}
      />

      <TourGuideZoneByPosition
        containerStyle={{
          top: Platform.OS == "android" ? "100%" : "90%",
        }}
        zone={2}
        shape={"rectangle"}
        text="Why not ‘Create Your Own Luck’ and publish your first post?"
        isTourGuide={true}
      />
      <TourGuideZoneByPosition
        containerStyle={{
          top: Platform.OS == "android" ? "100%" : "90%",
        }}
        zone={3}
        shape={"rectangle"}
        text="Press the star button on someone’s profile to add them to your watchlist. This is a private list, so no one will be able to see your watchlist except you."
        isTourGuide={true}
      />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          // tabBarColor: ({focused, size, color}) => {},
          // tabBarStyle:()=>{innerHeight:1000},
          tabBarStyle: {
            height: verticalScale(65),
            paddingTop: 5,
            backgroundColor: colors.white,
            display: route.name === "NewPost" ? "none" : "flex",
            paddingBottom: Platform.OS == "ios" ? 20 : 12,
          },
          headerShown: false,
          tabBarLabel: ({ focused, size, color }) => {
            let label = "";
            if (route.name === "Arena") {
              label = "Arena";
              color = focused ? colors.black : colors.lightGray;
            } else if (route.name === "HomeChat") {
              label = "Messeges";
              color = focused ? colors.black : colors.lightGray;
            } else if (route.name === "NewPost") {
              label = "";
              color = focused ? colors.black : colors.lightGray;
            } else if (route.name === "WatchList") {
              label = "Watchlist";
              color = focused ? colors.black : colors.lightGray;
            } else if (route.name === "Profile") {
              label = "Profile";
              color = focused ? colors.black : colors.lightGray;
            }
            return <CustomText marginTop={10} label={label} color={color} />;
          },

          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === "Arena") {
              iconName = focused ? icons.stadiumActive : icons.stadium;
              // size = focused ? 35 : 30;
              color = focused ? null : colors.lightGray;
            } else if (route.name === "HomeChat") {
              iconName = focused ? icons.chatActive : icons.chat;
              // size = focused ? 35 : 30;
              color = focused ? null : colors.lightGray;
            } else if (route.name === "NewPost") {
              iconName = icons.plus;
              // size = focused ? 35 : 30;
              return (
                <Image
                  resizeMode="contain"
                  source={iconName}
                  style={{
                    height: scale(40),
                    width: scale(40),
                    marginTop: 30,
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                />
              );
              // color = focused ? colors.green : colors.lightGray;
            } else if (route.name === "WatchList") {
              iconName = focused ? icons.watchlistActive : icons.star;
              // size = focused ? 35 : 30;
              color = focused ? null : colors.lightGray;
            } else if (route.name === "Profile") {
              iconName = icons.profile;
              // size = focused ? 35 : 30;
              return (
                <View style={{ top: 5 }}>
                  <FastImage
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 100,
                      borderColor:
                        !userData?.profileImage == "" && colors.yellow,
                      borderWidth: !userData?.profileImage == "" ? 2 : 0,
                    }}
                    source={
                      !userData?.profileImage == ""
                        ? { uri: userData?.profileImage }
                        : icons.followProfile
                    }
                  />
                </View>
              );
            }
            return (
              <Image
                source={iconName}
                style={{
                  tintColor: color,
                  height: 30,
                  width: 30,
                }}
              />
            );
          },
        })}

        //   tabBarOptions={{
        //     activeTintColor: '#f0f',
        //     inactiveTintColor: '#555',
        //     activeBackgroundColor: '#fff',
        //     inactiveBackgroundColor: '#999',
        //     showLabel: true,
        //     labelStyle: {fontSize: 14},
        //     showIcon: true,
        //   }}
        //   activeColor="#fff"
        //   inactiveColor="#3e2465"

        //   shifting={true}
        // barStyle={{
        //   // backgroundColor: colors.white,
        //   // height: verticalScale(700),
        // }}
      >
        <Tab.Screen
          name="Arena"
          initialParams={{ freeAgent: freeAgent }}
          component={PostStack}
        />
        <Tab.Screen name="HomeChat" component={HomeChat} />
        <Tab.Screen name="NewPost" component={PostScreen} />
        <Tab.Screen name="WatchList" component={WatchListScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};

export default HomeStack;
