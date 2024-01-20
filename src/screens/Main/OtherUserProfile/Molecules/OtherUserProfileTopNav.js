import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors} from '../../../../utils/Colors';
import CustomText from '../../../../components/CustomText';
import Commentary from './OtherUserCommentary';
import Highlights from './OtherUserHighlights';
import Stats from './OtherUserStats';
import {scale, verticalScale} from 'react-native-size-matters';
import {InterFont} from '../../../../utils/Fonts';
import UserCommentary from './OtherUserCommentary';
import UserHighlights from './OtherUserHighlights';
import UserStats from './OtherUserStats';
import OtherUserCommentary from './OtherUserCommentary';
import OtherUserHighlights from './OtherUserHighlights';
import OtherUserStats from './OtherUserStats';
const Tab = createMaterialTopTabNavigator();

const OtherUserProfileTopNav = ({userData}) => {
  return (
    <Tab.Navigator

    screenOptions={{
      swipeEnabled: true,
    }}
    tabBar={props => {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection:"row",alignItems:"center",paddingLeft:scale(20)}}>
            {props.state.routes.map((item, index) => {
              const isFocused = props.state.index === index;

              let screenName = '';
          if (item.name === 'UserCommentary') {
            screenName = 'Commentary';
          } else if (item.name === 'UserHighlights') {
            screenName = 'Highlights';
          } else if (item.name === 'UserStats') {
            screenName = 'Stats';
          }

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    props.navigation.navigate(item.name);
                  }}
                  style={{
                    alignItems: 'center',
                    paddingVertical: scale(12),
                    justifyContent: 'center',
                    marginHorizontal: scale(15),
                    width: scale(90),
                    // backgroundColor:"red"
                  }}>
                  <CustomText
                    label={screenName}
                    color={isFocused ? colors.green : colors.inputGray}
                    fontSize={12}
                    fontFamily={InterFont.bold}
                  />
                  <View style={{height: verticalScale(10), width: index==2?scale(70): scale(90)}}>
                    {isFocused ? (
                      <View
                        style={{
                          height: 2,
                          backgroundColor: colors.green,
                          width:  index==2?scale(70): scale(90),
                          marginTop: verticalScale(2),
                         
                        }}></View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    }}
      // screenOptions={({route}) => ({
      //   headerShown: false,

      //   tabBarStyle: {
      //     height: verticalScale(32),
      //     alignItems: 'center',
      //     justifyContent: 'space-around',
      //     // marginHorizontal: scale(20),
      //     borderRadius: 10,
      //     elevation: 0,
      //   },
      //   tabBarAllowFontScaling: true,
      //   tabBarLabel: ({focused, size, color}) => {
      //     let screenName = '';
      //     if (route.name === 'UserCommentary') {
      //       screenName = 'Commentary';
      //       color = focused ? colors.green : colors.inputGray;
      //     } else if (route.name === 'UserHighlights') {
      //       screenName = 'Highlights';
      //       color = focused ? colors.green : colors.inputGray;
      //     } else if (route.name === 'UserStats') {
      //       screenName = 'Stats';
      //       color = focused ? colors.green : colors.inputGray;
      //     }
      //     return (
      //       <CustomText
      //         label={screenName}
      //         color={color}
      //         fontSize={12}
      //         fontFamily={InterFont.bold}
      //       />
      //     );
      //   },
      //   tabBarLabelStyle: {fontSize: 12},
      //   tabBarItemStyle: {width: 140},

      //   // tabBarItemStyle: {width: 130},
      //   tabBarScrollEnabled: true,
      //   tabBarIndicatorStyle: {
      //     width: 140,
      //     backgroundColor: colors.green,
      //   },
      // })}
      >
      <Tab.Screen
        name="UserCommentary"
        component={OtherUserCommentary}
        initialParams={userData}
      />
      <Tab.Screen
        name="UserHighlights"
        initialParams={userData}
        component={OtherUserHighlights}
      />
      <Tab.Screen
        name="UserStats"
        initialParams={userData}
        component={OtherUserStats}
      />
    </Tab.Navigator>
  );
};

export default OtherUserProfileTopNav;

const styles = StyleSheet.create({});
