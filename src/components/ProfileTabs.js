import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomText from './CustomText';
import {colors} from '../utils/Colors';
import {InterFont} from '../utils/Fonts';
const {height, width} = Dimensions.get('window');

export default function ProfileTabs({tabIndex, SetTabIndex}) {
  const Tabs = [
    {
      key: '1',
      screen: 'Profile',

      label: 'Commentary',
      color: colors.green,
      index: 0,
      onPress: index => {
        SetTabIndex(index);
      },
    },
    {
      key: '2',
      screen: 'Profile',
      label: 'Highlights',
      color: colors.green,
      index: 1,
      onPress: index => {
        SetTabIndex(index);
      },
    },
    {
      key: '3',
      screen: 'Profile',
      label: 'Stats',
      color: colors.green,
      index: 2,
      onPress: index => {
        SetTabIndex(index);
      },
    },
  ];

  const Tab = ({onPress, index, ...props}) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        paddingHorizontal: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: 100,
        backgroundColor: colors.white,
        height: height / 25,
        borderBottomWidth: index === tabIndex ? 2 : 0,
        borderBottomColor:
          index === tabIndex ? colors.green : colors.graySearch,
        width: '33.33%',
        // backgroundColor:"red",
        // paddingBottom:3,
      }}>
      <CustomText
        label={props.label}
        color={index === tabIndex ? colors.green : colors.black}
        fontSize={14}
        fontFamily={InterFont.semiBold}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        zIndex: 10,
      }}>
      {Tabs.map((item, i) => (
        <>
          <Tab
            name={item.name}
            color={item.color}
            size={item.size}
            screen={item.screen}
            label={item.label}
            onPress={() => {
              item.onPress(i);
            }}
            index={i}
          />
        </>
      ))}
    </View>
  );
}
