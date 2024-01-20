import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors} from '../../../../utils/Colors';
import CustomText from '../../../../components/CustomText';
import Commentary from './Commentary';
import Highlights from './Highlights';
import Stats from './Stats';
import {scale, verticalScale} from 'react-native-size-matters';
import {InterFont} from '../../../../utils/Fonts';
const Tab = createMaterialTopTabNavigator();

const ProfileTopNav = ({userData}) => {
  // console.log('paramsUser', userData);
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
          if (item.name === 'Commentary') {
            screenName = 'Commentary';
          } else if (item.name === 'Highlights') {
            screenName = 'Highlights';
          } else if (item.name === 'Stats') {
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
      <Tab.Screen name="Commentary" component={Commentary} />
      <Tab.Screen name="Highlights" component={Highlights} />
      <Tab.Screen name="Stats" component={Stats} />
    </Tab.Navigator>
  );
};

export default ProfileTopNav;

const styles = StyleSheet.create({});
