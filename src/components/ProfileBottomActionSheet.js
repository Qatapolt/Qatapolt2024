import {StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BottomSheet} from 'react-native-btr';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {Spacer} from './Spacer';
import {setReportUserId} from '../redux/reducers/ReportUserReducer';
import CustomText from './CustomText';
import {colors} from '../utils/Colors';
import { images } from '../assets/images';
import CustomButton from './CustomButton';

const ProfileBottomActionSheet = props => {
  const dispatch = useDispatch();
  // props?.postData.userId == props?.authData.uid
  return (
    <BottomSheet
      visible={props.modalVisible}
      onBackButtonPress={props.onCloseModal}
      onBackdropPress={props.onCloseModal}>
      <View
        style={{
          paddingHorizontal: scale(15),
          height: '25%',
          width: '100%',
          borderTopLeftRadius: scale(15),
          borderTopRightRadius:scale(15),
          overflow:"hidden",
          backgroundColor:colors.white,
          alignItems:"center",
        }}
       >
        <Spacer height={5} />

        <View style={styles.topLine}></View>
        <Spacer height={20} />

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={props.onBlockUser}
          style={styles.optionContainer}>
                <Image
        style={{width: scale(20), height: verticalScale(20)}}
        resizeMode="contain"
        source={images.blockUser}
      />
          <CustomText label="Block" marginLeft={7} fontSize={13} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={props.onReportUser}
          style={styles.optionContainer}>
          <MaterialIcons
            name="report"
            size={moderateScale(20)}
            color={colors.black}
          />

          <CustomText label="Report" marginLeft={7} fontSize={13} />
        </TouchableOpacity>

        <Spacer height={5} />

        <CustomButton
          backgroundColor={colors.white}
          title={'Cancel'}
          borderWidth={1}
          onPress={props.onCloseModal}
          height={40}
          borderRadius={30}
        />
      </View>
    </BottomSheet>
  );
};

export default ProfileBottomActionSheet;

const styles = StyleSheet.create({
  topLine: {
    width: scale(80),
    height: 5,
    backgroundColor: '#dee2e6',
    alignSelf: 'center',
    borderRadius: 10,
  },
  optionContainer: {
    width: '100%',
    padding: scale(10),
    // borderBottomWidth:0.5,
    // borderColor:"#dee2e6",
    flexDirection: 'row',
    alignItems: 'center',
  },
});
