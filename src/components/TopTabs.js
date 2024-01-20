import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {colors} from '../../../../utils/Colors';
// import CustomText from '../../../../components/CustomText';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
// import {Spacer} from '../../../../components/Spacer';
// import {icons} from '../../../../assets/icons';
import CustomText from './CustomText';
import {icons} from '../assets/icons';
import {colors} from '../utils/Colors';
import {Spacer} from './Spacer';

const {height, width} = Dimensions.get('window');

export default function TopTabs({
  navigation,
  setCustomTimeLineIds,
  setShowFilter,
  showFilter,
  setIndexMain,
  indexMain,
  signupValues,
  setSignupValues,
}) {
  const Tabs = [
    {
      screen: 'SignOutScreen',
      label: 'All Posts',
      key: '0',
      onPress: i => {
        setIndexMain(i);
        setShowFilter(false);
        setCustomTimeLineIds([]);
        if (signupValues) {
          setSignupValues({});
        }
      },
    },
    {
      screen: 'SignOutScreen',
      label: 'Following',
      key: '1',
      onPress: i => {
        setIndexMain(i);
        setShowFilter(false);
        setCustomTimeLineIds([]);
        if (signupValues) {
          setSignupValues({});
        }
      },
    },
    {
      screen: 'SignOutScreen',
      label: 'Watchlist',
      key: '2',
      onPress: i => {
        setIndexMain(i);
        setShowFilter(false);
        setCustomTimeLineIds([]);
        if (signupValues) {
          setSignupValues({});
        }
      },
    },
    {
      screen: 'SignOutScreen',
      key: '3',
      label: (
        <Image
          source={icons.hammerScrew}
          style={{
            height: scale(20),
            width: scale(20),
            tintColor: showFilter ? colors.white : colors.black,
          }}
        />
      ),
      onPress: i => {
        setIndexMain(i);
        setShowFilter(true);
        // setCustomTimeLineIds([]);
        // setSignupValues({});
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
        borderRadius: 100,
        backgroundColor:
          index === indexMain ? colors.green : colors.superLightGray,
        height: height / 25,
      }}>
      <CustomText
        label={props.label}
        color={index === indexMain ? colors.white : colors.black}
        fontSize={12}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
