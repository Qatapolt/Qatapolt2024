import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../utils/Colors';
import CustomText from '../../components/CustomText';
import {InterFont} from '../../utils/Fonts';
import ChatScreen from '../../screens/Main/ChatScreen/ChatScreen';
import GroupChat from '../../screens/Main/GroupChat/GroupChat';
import TopChats from '../../screens/Main/ChatScreen/TopChats/TopChats';
import {View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setActiveMessageTab,
  setActiveTab,
  setMessagesTab,
} from '../../redux/reducers/GroupChatReduser';
import {
  getAuthGroupRequest,
  getIndividualRequest,
} from '../../screens/services/MessagesServices';
const Tab = createMaterialTopTabNavigator();
const TopNav = () => {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
      tabBar={props => {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View flexDirection={'row'}>
              {props.state.routes.map((item, index) => {
                const isFocused = props.state.index === index;

                let screenName = '';
                if (item.name === 'TopsChats') {
                  screenName = 'Messages';
                } else if (item.name === 'Chat') {
                  screenName = 'Individual';
                } else if (item.name === 'GroupChat') {
                  screenName = 'Groups';
                }

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      dispatch(setActiveTab(index));
                      props.navigation.navigate(item.name);
                    }}
                    style={{
                      alignItems: 'center',
                      paddingVertical: scale(12),
                      justifyContent: 'center',
                      marginHorizontal: scale(27),
                      width: scale(70),
                    }}>
                    <CustomText
                      label={screenName}
                      color={colors.green}
                      fontSize={12}
                      fontFamily={InterFont.bold}
                    />
                    <View style={{height: verticalScale(10), width: scale(70)}}>
                      {isFocused ? (
                        <View
                          style={{
                            height: 2,
                            backgroundColor: colors.green,
                            width: index == 2 ? scale(50) : scale(70),
                            marginTop: verticalScale(2),
                            marginLeft: index == 2 ? scale(11) : 0,
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
      // headerShown: false,

      // tabBarStyle: {
      //   height: verticalScale(32),
      //   alignItems: 'center',
      //   justifyContent: 'space-around',
      //   // marginHorizontal: scale(20),
      //   borderRadius: 10,
      //   elevation: 0,
      // },
      // tabBarAllowFontScaling: true,
      // tabBarLabel: ({focused, size, color}) => {
      //   let screenName = '';
      //   if (route.name === 'TopsChats') {
      //     screenName = 'Messages';
      //     color = focused ? colors.green : colors.inputGray;
      //   }
      //  else if (route.name === 'Chat') {
      //     screenName = 'Individual';
      //     color = focused ? colors.green : colors.inputGray;
      //   } else if (route.name === 'GroupChat') {
      //     screenName = 'Groups';
      //     color = focused ? colors.green : colors.inputGray;
      //   }
      //   return (
      //     <CustomText
      //       label={screenName}
      //       color={color}
      //       fontSize={12}
      //       fontFamily={InterFont.bold}
      //     />
      //   );
      // },
      // tabBarLabelStyle: { fontSize: 12 },
      // tabBarItemStyle: { width: 140 },

      // // tabBarItemStyle: {width: 130},
      // tabBarScrollEnabled: true,
      // tabBarIndicatorStyle: {
      //   width:140,
      //   backgroundColor: colors.green,
      // },
      // })}
    >
      <Tab.Screen name="TopsChats" component={TopChats} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="GroupChat" component={GroupChat} />
    </Tab.Navigator>
  );
};

export default TopNav;
