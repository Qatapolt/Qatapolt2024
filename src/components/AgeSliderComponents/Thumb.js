import React, {memo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';

const THUMB_RADIUS = 10;

const Thumb = () => {
  return (
    <View style={styles.root}>
      <View
        style={{
          width: scale(1.5),
          height: scale(7),
          backgroundColor: 'black',
        }}
      />
      <View style={{width: scale(3)}} />
      <View
        style={{
          width: scale(1.5),
          height: scale(7),
          backgroundColor: 'black',
        }}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: scale(1.5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Thumb);
