import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Spacer} from '../components/Spacer';

const Lab = () => {
  return (
    <>
      <Spacer height={120} />

      <View style={styles.chevron}>
        <View style={styles.chevronMain} />
        <View style={[styles.chevronTriangle, styles.chevronTopLeft]} />
        <View style={[styles.chevronTriangle, styles.chevronTopRight]} />
        <View style={[styles.chevronTriangle, styles.chevronBottomLeft]} />
        <View style={[styles.chevronTriangle, styles.chevronBottomRight]} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  chevron: {
    width: 150,
    height: 50,
    marginLeft: 120,
  },
  chevronMain: {
    width: 150,
    height: 50,
    // backgroundColor: 'red',
  },
  chevronTriangle: {
    backgroundColor: 'transparent',
    borderTopWidth: 20,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 75,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'red',
  },
  chevronTopLeft: {
    position: 'absolute',
    top: -20,
    left: 0,
  },
  chevronTopRight: {
    position: 'absolute',
    top: -20,
    right: 0,
    transform: [{scaleX: -1}],
  },
  chevronBottomLeft: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    transform: [{scale: -1}],
  },
  chevronBottomRight: {
    position: 'absolute',
    bottom: -20,
    right: 0,
    transform: [{scaleY: -1}],
  },
});

export default Lab;
