import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale, verticalScale} from 'react-native-size-matters';
import {Spacer} from '../../components/Spacer';

const UserNameLayout = () => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          padding: 10,
        }}>
        <SkeletonPlaceholder>
          <View style={{width: 100, height: 20, borderRadius: 30}} />
        </SkeletonPlaceholder>
        <Spacer height={10} />
      </View>
    </>
  );
};

export default UserNameLayout;

const styles = StyleSheet.create({});
