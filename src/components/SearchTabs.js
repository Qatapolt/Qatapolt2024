import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import CustomText from './CustomText';
import {colors} from '../utils/Colors';
const {height, width} = Dimensions.get('window');
export default function SearchTabs({
  filterIndex,
  setFilterIndex,
  filter,
  setFilter,
}) {
  const Tabs = [
    {
      label: 'Posts',
      key: '1',
      onPress: i => {
        setFilterIndex(i);
        setFilter('Posts');
      },
    },
    {
      label: 'Users',
      key: '2',
      onPress: i => {
        setFilterIndex(i);
        setFilter('Users');
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
          index === filterIndex ? colors.green : colors.superLightGray,
        height: height / 25,
        marginHorizontal: 10,
      }}>
      <CustomText
        label={props.label}
        color={index === filterIndex ? colors.white : colors.black}
        fontSize={12}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
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
