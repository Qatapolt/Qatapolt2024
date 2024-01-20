import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FollowScreen from '../../FollowScreen/FollowScreen';
import { colors } from '../../../../utils/Colors';
import CustomText from '../../../../components/CustomText';
import { InterFont } from '../../../../utils/Fonts';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { verticalScale } from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();

const FollowedTopNav = () => {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,

      tabBarStyle: {
        height: verticalScale(32),
        alignItems: 'center',
        justifyContent: 'space-around',
        // marginHorizontal: scale(20),
        borderRadius: 10,
        elevation: 0,
      },
      tabBarAllowFontScaling: true,
      tabBarLabel: ({focused, size, color}) => {
        let screenName = '';
        if (route.name === 'Mutual') {
          screenName = 'Mutuals';
          color = focused ? colors.black : colors.inputGray;
        } 
       else if (route.name === 'follower') {
          screenName = 'followers';
          color = focused ? colors.black : colors.inputGray;
        } else if (route.name === 'following') {
          screenName = 'following';
          color = focused ? colors.black : colors.inputGray;
        }
        return (
          <CustomText
            label={screenName}
            color={color}
            fontSize={12}
            fontFamily={InterFont.semiBold}
          />
        );
      },
      tabBarLabelStyle: { fontSize: 12 },
      tabBarItemStyle: { width: 140 },
     
      
      
      // tabBarItemStyle: {width: 130},
      tabBarScrollEnabled: true,
      tabBarIndicatorStyle: {
        width:140,
        backgroundColor: colors.green,
      },
    })}>
     <Tab.Screen name="Mutual" component={FollowScreen} />
    <Tab.Screen name="follower" component={FollowScreen} />
    <Tab.Screen name="following" component={FollowScreen} />

  </Tab.Navigator>
  )
}

export default FollowedTopNav

const styles = StyleSheet.create({})