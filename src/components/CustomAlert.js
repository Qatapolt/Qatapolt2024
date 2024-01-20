import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {InterFont} from '../utils/Fonts';
import {colors} from '../utils/Colors';
import {Spacer} from './Spacer';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import SepratorLine from './SepratorLine';
import {Avatar, ListItem} from 'react-native-elements';
import CustomButton from './CustomButton';
import Modal from 'react-native-modal';
import {icons} from '../assets/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import commonStyles, {PH10, PH20} from '../utils/CommonStyles';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const CustomAlert = ({...props}) => {
  return (
    <Modal
      isVisible={props.modalVisible}
      // onBackButtonPress={()=>setModalVisible(false)}
      // onBackdropPress={() => setModalVisible(false)}
      onBackdropPress={() => props.setModalVisible(false)}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            height: height / 6.3,
            width: width / 1.3,
            backgroundColor: colors.white,
            borderRadius: scale(7),
          }}>
          {/* errorHeader: '',
    errorBody: */}

          <Spacer height={5} />
          <View style={{...commonStyles.rowContainer, padding: scale(10)}}>
            <Ionicons
              name="ios-alert-circle"
              color={colors.black}
              size={moderateScale(23)}
            />
            <Spacer width={5} />

            <CustomText
              label={props.stateError.errorHeader}
              fontSize={14}
              alignSelf="center"
              fontFamily={InterFont.bold}
              color={colors.black}
              // fontFamily={InterFont.bold}
            />
          </View>
          {/* <PH10> */}
          <CustomText
            label={props.stateError.errorBody}
            fontSize={10}
            marginLeft={15}
            marginRight={15}
            height={verticalScale(25)}
            // alignSelf="center"
            // fontFamily={InterFont.}
            color={colors.black}
            // fontFamily={InterFont.bold}
          />

          {/* </PH10> */}
          {/* <Spacer height={5} /> */}
          <PH20>
            <CustomButton
              title="Close"
              onPress={() => props.setModalVisible(false)}
              width={'22%'}
              backgroundColor={colors.green}
              color={colors.white}
              height={25}
              borderRadius={5}
              alignSelf="flex-end"
              fontSize={11}
            />
          </PH20>

          {/* <Avatar
          activeOpacity={0.9}
          //   onPress={() => {
          //    props.navigation.navigate('Profile', {user: true});
          //   }}
          rounded
          source={icons.profile}
          size={50}
        /> */}
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({});
