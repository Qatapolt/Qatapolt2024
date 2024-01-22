import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import commonStyles, {PH10} from '../utils/CommonStyles';
import {colors} from '../utils/Colors';
import CustomHeader from './CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Spacer} from './Spacer';

import FastImage from 'react-native-fast-image';

export default function ProfileImageView({
  modalVisible,
  setModalVisible,
  image,
}) {
  return (
    <Modal
      visible={modalVisible}
      style={{
        flex: 1,
        margin: 0,
        backgroundColor: 'black',
      }}
      onBackdropPress={() => setModalVisible(false)}>
      <TouchableOpacity activeOpacity={1} style={{flex: 1}}>
        <PH10>
          <Spacer height={Platform.OS == 'ios' ? 50 : 10} />

          <CustomHeader
            LeftSide={() => (
              <View
                style={{
                  flexDirection: 'row',
                  width: scale(150),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // setImage();

                    setModalVisible(false);
                  }}>
                  <Ionicons
                    name="chevron-back"
                    color={colors.white}
                    size={moderateScale(30)}
                  />
                </TouchableOpacity>
                <Spacer width={10} />
              </View>
            )}
          />
        </PH10>

        <Spacer height={40} />

        <View style={{height: '60%', width: '100%'}}>
          <FastImage
            style={commonStyles.img}
            resizeMode="cover"
            source={{uri: image}}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({});
