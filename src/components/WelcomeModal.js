import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {scale, verticalScale} from 'react-native-size-matters';
import {images} from '../assets/images';
import CustomButton from './CustomButton';
import {colors} from '../utils/Colors';
import CustomText from './CustomText';
import {InterFont} from '../utils/Fonts';
import {PH10} from '../utils/CommonStyles';
import {Spacer} from './Spacer';

const WelcomeModal = ({toggleModal, isModalVisible, onPressStart}) => {
  return (
    <Modal
      style={{
        backgroundColor: 'transparent',
        margin: 0,
        alignItems: 'center',
        flex: 1,
      }}
      onBackButtonPress={() => {
        toggleModal();
      }}
      onBackdropPress={toggleModal}
      isVisible={isModalVisible}>
      <View
        style={{
          borderRadius: verticalScale(20),
          width: '90%',
          // height: '53%',

          backgroundColor: 'white',
        }}>
        <View style={{alignItems: 'center', marginTop: verticalScale(5)}}>
          <Image
            style={{height: scale(100), width: scale(130)}}
            resizeMode="contain"
            source={images.blackAppIcon}
          />
          <Spacer height={15} />

          <CustomText
            label="Welcome Qatapolt"
            fontSize={20}
            marginTop={5}
            fontFamily={InterFont.bold}
          />
          <Spacer height={15} />
          <View>
            <CustomText
              label="• Connect with others"
              fontFamily={InterFont.semiBold}
              fontSize={12}
            />
            <Spacer height={7} />

            <CustomText
              label="• Get discovered"
              fontFamily={InterFont.semiBold}
              fontSize={12}
            />
            <Spacer height={7} />

            <CustomText
              label="• Find new players"
              fontFamily={InterFont.semiBold}
              fontSize={12}
            />
            <Spacer height={7} />

            <CustomText
              label="• Show your talent"
              fontFamily={InterFont.semiBold}
              fontSize={12}
            />
            <Spacer height={7} />
            <CustomText
              label="• Talk about sport"
              color={colors.black}
              fontFamily={InterFont.semiBold}
              fontSize={12}
            />
            {/* <Spacer height={15} /> */}
          </View>
        </View>

        <View style={{alignItems: 'center', margin: verticalScale(20)}}>
          <CustomButton
            backgroundColor={colors.green}
            onPress={() => {
              toggleModal();
              onPressStart();
            }}
            title="Take a tour"
            width={'100%'}
            height={40}
            color={colors.white}
            borderRadius={30}
          />
          <Spacer height={10} />
          <View style={{padding: 10}}>
            <CustomText
              label="No, thanks"
              onPress={() => toggleModal()}
              color={colors.black}
              fontFamily={InterFont.semiBold}
              fontSize={11}
            />
          </View>
          <Spacer height={10} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    top: '20%',
    start: '13%',
  },
  textContainer: {
    position: 'absolute',
    top: '55%',
    start: '20%',
  },
  proBtn: {
    alignItems: 'center',
    width: '100%',
  },
});

export default WelcomeModal;
