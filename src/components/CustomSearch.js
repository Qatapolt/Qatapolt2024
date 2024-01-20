import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {colors} from '../utils/Colors';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';

const CustomSearch = props => {
  return (
    <View
      style={{
        ...styles.searchBody,
        backgroundColor: props.backgroundColor || '#dee2e6',
      }}>
      <Octicons name="search" color={colors.black} size={moderateScale(20)} />
      <TextInput
        value={props.search}
        style={{
          width: '86%',
          padding: 0,
          height:"100%",
          paddingRight: scale(10),
          paddingLeft: scale(7),
        }}
        onChangeText={props.onSearchFilter}
        placeholder="Search..."
        placeholderTextColor={'#6c757d'}
      />
    </View>
  );
};

export default CustomSearch;

const styles = ScaledSheet.create({
  searchBody: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: verticalScale(30),
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
