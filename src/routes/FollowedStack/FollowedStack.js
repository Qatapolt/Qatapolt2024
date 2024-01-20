import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale, verticalScale} from 'react-native-size-matters';
import MainHeader from '../../components/MainHeader';
import FollowingContainer from '../../screens/Main/FollowedScreen/Molecules/FollowingContainer';
import CustomText from '../../components/CustomText';
import {colors} from '../../utils/Colors';
import {InterFont} from '../../utils/Fonts';
import FollowedContainer from '../../screens/Main/ProfileScreen/Molecules/FollowedContainer';
import MutualContainer from '../../screens/Main/FollowedScreen/Molecules/MutualContainer';
import FollowerContainer from '../../screens/Main/FollowedScreen/Molecules/FollowerContainer';
import {useSelector} from 'react-redux';
const Tab = createMaterialTopTabNavigator();

const FollowedStack = ({userData}) => {
  const username = useSelector(state => state.user.userData?.username);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <MainHeader txt={`${username}`} />

      <Tab.Navigator
        screenOptions={{
          swipeEnabled: true,
        }}
        tabBar={props => {
          return (
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                paddingVertical: 10,
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {props.state.routes.map((item, index) => {
                  const isFocused = props.state.index === index;

                  return (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      key={index}
                      onPress={() => {
                        props.navigation.navigate(item.name);
                      }}
                      style={{
                        paddingHorizontal: scale(10),
                        alignItems: 'center',

                        borderBottomWidth: 2,
                        borderColor: isFocused
                          ? colors.green
                          : colors.inputGray,

                        justifyContent: 'center',
                        marginHorizontal: scale(50),
                      }}>
                      <CustomText
                        label={item.name}
                        color={isFocused ? colors.green : colors.inputGray}
                        fontSize={12}
                        marginBottom={5}
                        fontFamily={InterFont.bold}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          );
        }}

        // screenOptions={({route}) => ({
        //   headerShown: false,

        //   tabBarStyle: {
        //     height: verticalScale(32),
        //     alignItems: 'center',
        //     width:"100%",
        //     justifyContent: 'space-around',
        //     // marginHorizontal: scale(20),
        //     elevation: 0,
        //   },
        //   tabBarAllowFontScaling: true,
        //   tabBarLabel: ({focused, size, color}) => {
        //     let screenName = '';
        //     // if (route.name === 'Mutual') {
        //     //   screenName = 'Mutual';
        //     //   color = focused ? colors.green : colors.inputGray;
        //     // }
        //      if (route.name === 'Followers') {
        //       screenName = 'Followers';
        //       color = focused ? colors.green : colors.inputGray;
        //     } else if (route.name === 'Following') {
        //       screenName = 'Following';
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
        // })
        // }
      >
        {/* <Tab.Screen
        name="Mutual"
        component={FollowerContainer}
        initialParams={userData}
      /> */}
        <Tab.Screen
          name="Followers"
          initialParams={userData}
          component={FollowerContainer}
        />
        <Tab.Screen
          name="Following"
          initialParams={userData}
          component={FollowingContainer}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default FollowedStack;

const styles = StyleSheet.create({});
