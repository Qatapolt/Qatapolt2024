import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors} from '../../../../utils/Colors';
import CustomText from '../../../../components/CustomText';
import Commentary from './UserCommentary';
import Highlights from './UserHighlights';
import Stats from './UserStats';
import {scale, verticalScale} from 'react-native-size-matters';
import {InterFont} from '../../../../utils/Fonts';
import UserCommentary from './UserCommentary';
import UserHighlights from './UserHighlights';
import UserStats from './UserStats';
const Tab = createMaterialTopTabNavigator();

const UserProfileTopNav = ({userData}) => {
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
      >
      <Tab.Screen
        name="UserCommentary"
        component={UserCommentary}
        initialParams={userData}
      />
      <Tab.Screen
        name="UserHighlights"
        initialParams={userData}
        component={UserHighlights}
      />
      <Tab.Screen
        name="UserStats"
        initialParams={userData}
        component={UserStats}
      />
    </Tab.Navigator>
  );
};

export default UserProfileTopNav;

const styles = StyleSheet.create({});
