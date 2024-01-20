import React from 'react';
import {View, Platform, TouchableOpacity, Alert} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import {colors} from '../utils/Colors';
import CustomText from './CustomText';
import {InterFont} from '../utils/Fonts';
import {Spacer} from './Spacer';
const ProfileOptions = ({toggleModal, isModalVisible, groupChat, delChat}) => {
  return (
    <Modal
      animationIn={'fadeInRight'}
      animationOut={'fadeOutRight'}
      backdropOpacity={0.3}
      onBackdropPress={() => toggleModal()}
      isVisible={isModalVisible}>
      {groupChat ? (
        <View
          style={{
            position: 'absolute',
            top: 75,
            width: scale(100),
            height: verticalScale(75),
            borderRadius: scale(5),
            backgroundColor: colors.white,
            right: -5,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
            shadowRadius: 5,
            elevation: 5,
            shadowOpacity: 1,
            shadowOffset: {width: 1, height: 4},
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '45%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText
              label="Clear chat"
              fontSize={11}
              textAlign="center"
              color={colors.green}
              fontFamily={InterFont.semiBold}
            />
            <Spacer height={18} />
            <CustomText
              label="Exit group"
              fontSize={11}
              textAlign="center"
              color={colors.red}
              fontFamily={InterFont.semiBold}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          // onPress={() => {
          //   Alert.alert(`Please confirm`, [
          //     {
          //       text: 'no',
          //       onPress: () => {
          //         delChat();
          //         toggleModal();
          //       },
          //     },
          //     {
          //       text: 'yes',
          //       onPress: () => toggleModal(),
          //     },
          //   ]);
          // }}
          onPress={() => {
            Alert.alert('Are you sure ', 'Do you want to clear chat?', [
              {
                text: 'Yes',
                onPress: () => {
                            delChat();
                  toggleModal();
                
                },
              },
              {
                text: 'No',
                onPress: () => {
                  // getMedia();
                },
              },
            ]);
          }}
          style={{
            position: 'absolute',
            top: 75,
            width: scale(100),
            height: verticalScale(35),
            borderRadius: scale(5),
            backgroundColor: colors.white,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
            shadowRadius: 5,
            elevation: 5,
            shadowOpacity: 1,
            shadowOffset: {width: 1, height: 4},
          }}>
          {/* <TouchableOpacity
            style={{
              width: '100%',
              height: '45%',
              alignItems: 'center',
              justifyContent: 'center',
            }}> */}
          <CustomText
            label="Clear chat"
            fontSize={13}
            textAlign="center"
            color={colors.green}
            fontFamily={InterFont.semiBold}
          />
          {/* </TouchableOpacity> */}
        </TouchableOpacity>
      )}
    </Modal>
  );
};

export default ProfileOptions;
