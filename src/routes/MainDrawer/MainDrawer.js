import { View, Text, Image } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { colors } from "../../utils/Colors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ArenaScreen from "../../screens/Main/ArenaScreen/ArenaScreen";
import HomeStack from "../HomeStack/HomeStack";
import CustomDrawer from "./CustomDrawer";
import { verticalScale } from "react-native-size-matters";
import { icons } from "../../assets/icons";
import LiveScores from "../../screens/Main/LiveScores/LiveScores";
import { images } from "../../assets/images";
import SportsNews from "../../screens/Main/SportesNews/SportsNews";
import QatalPoltNews from "../../screens/Main/QatalPoltNews/QatalPoltNews";
import Releasedplayers from "../../screens/Main/Releasedplayers/Releasedplayers";

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,

        drawerActiveTintColor: colors.white,
        drawerActiveBackgroundColor: colors.green,
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: verticalScale(15),
        },
      }}
      initialRouteName={"Arena"}
    >
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Image
              style={{ width: 22, height: 22, tintColor: "#3f3f3f" }}
              source={icons.stadium}
            />
            // <FontAwesome5 name="home" size={22} color={color} />
          ),
        }}
        name="Arena"
        initialParams={{ freeAgent: false }}
        component={HomeStack}
      />

      <Drawer.Screen
        options={{
          drawerIcon: ({ color, focused }) => (
            <Image
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? colors.white : "#3f3f3f",
                marginRight: -5,
                marginLeft: -5,
                resizeMode: "contain",
              }}
              source={images.blackAppIcon}
            />
            // <FontAwesome5 name="home" size={22} color={color} />
          ),
        }}
        name="Qatapolt News"
        component={QatalPoltNews}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, focused }) => (
            <Image
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? colors.white : "#3f3f3f",
              }}
              source={icons.news}
            />
            // <FontAwesome5 name="home" size={22} color={color} />
          ),
        }}
        name="Sports News"
        component={SportsNews}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, focused }) => (
            <Image
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? colors.white : "#3f3f3f",
              }}
              source={icons.football1}
            />
            // <FontAwesome5 name="home" size={22} color={color} />
          ),
        }}
        name="Live Scores"
        component={LiveScores}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, focused }) => (
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? colors.white : "#3f3f3f",
              }}
              source={icons.team}
            />
          ),
        }}
        name="Free Agents"
        component={HomeStack}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
