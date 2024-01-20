import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale, verticalScale} from 'react-native-size-matters';
import {Spacer} from '../../components/Spacer';

const MatchesLayout = () => {
  return (
    <>
      <Spacer height={30} />
      <SkeletonPlaceholder>
        <View style={{width: '100%', height: verticalScale(50)}} />
      </SkeletonPlaceholder>
      <Spacer height={30} />
      <SkeletonPlaceholder>
        <View style={{width: '100%', height: verticalScale(50)}} />
      </SkeletonPlaceholder>
      <Spacer height={30} />
      <SkeletonPlaceholder>
        <View style={{width: '100%', height: verticalScale(50)}} />
      </SkeletonPlaceholder>
      <Spacer height={30} />
      <SkeletonPlaceholder>
        <View style={{width: '100%', height: verticalScale(50)}} />
      </SkeletonPlaceholder>
      <Spacer height={30} />
      <SkeletonPlaceholder>
        <View style={{width: '100%', height: verticalScale(50)}} />
      </SkeletonPlaceholder>
      <Spacer height={30} />
      <SkeletonPlaceholder>
        <View style={{width: '100%', height: verticalScale(50)}} />
      </SkeletonPlaceholder>
      <Spacer height={30} />
      <SkeletonPlaceholder>
        <View style={{width: '100%', height: verticalScale(50)}} />
      </SkeletonPlaceholder>
      <Spacer height={30} />
      <SkeletonPlaceholder>
        <View style={{width: '100%', height: verticalScale(50)}} />
      </SkeletonPlaceholder>
      <Spacer height={30} />
    </>
  );
};

export default MatchesLayout;
