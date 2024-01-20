import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale, verticalScale} from 'react-native-size-matters';
import {Spacer} from '../../components/Spacer';

const QatapoltNewsLayout = () => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          padding: scale(10),
        }}>
        <Spacer height={10} />
      </View>

      <SkeletonPlaceholder>
        <View
          style={{
            width: scale(320),
            height: verticalScale(450),
            borderRadius: scale(10),
            marginLeft: scale(15),
          }}
        />
      </SkeletonPlaceholder>

      <Spacer height={10} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          padding: scale(10),
        }}>
        <Spacer height={10} />
      </View>

      <SkeletonPlaceholder>
        <View
          style={{
            width: scale(320),
            height: verticalScale(200),
            borderRadius: scale(10),
            marginLeft: scale(15),
          }}
        />
      </SkeletonPlaceholder>
    </>
  );
};

export default QatapoltNewsLayout;

const styles = StyleSheet.create({});
