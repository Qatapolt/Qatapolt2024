import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale, verticalScale} from 'react-native-size-matters';
import {Spacer} from '../../components/Spacer';

const SportsNewsLayout = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 55,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          //   padding: scale(10),
        }}>
        <Spacer height={10} />
      </View>

      <SkeletonPlaceholder>
        <View
          style={{
            height: 550,
            width: 380,
            borderRadius: scale(10),
            // marginLeft: scale(15),
          }}
        />
      </SkeletonPlaceholder>

      <Spacer height={10} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          //   padding: scale(10),
        }}>
        <Spacer height={10} />
      </View>

      <SkeletonPlaceholder>
        <View
          style={{
            height: 450,
            width: 380,
            borderRadius: scale(10),
            // marginLeft: scale(15),
          }}
        />
      </SkeletonPlaceholder>
    </View>
  );
};

export default SportsNewsLayout;

const styles = StyleSheet.create({});
