import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {InterFont} from '../../../../utils/Fonts';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BottomSheet} from 'react-native-btr';
import {Spacer} from '../../../../components/Spacer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {setReportUserId} from '../../../../redux/reducers/ReportUserReducer';
import FastImage from 'react-native-fast-image';
import {icons} from '../../../../assets/icons';
import ImagePicker from 'react-native-image-crop-picker';
import {deleteImage} from '../../../services/PostServices';
import {uploadImage} from '../../../services/StorageServics';
import {SaveUser, getSpecificUser} from '../../../services/UserServices';
import {authData} from '../../../../redux/reducers/authReducer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';
const SetBackgroundSheet = props => {
  const dispatch = useDispatch();

  const CurrentUser = useSelector(state => state.auth?.currentUser);
  const onPickImage = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'photo',
        multiple: false,
      });

      if (!result.cancelled) {
        props.onCloseModal();
        const file = {
          uri: result.path,
          fileName: result.path,
          type: result.mime,
          // duration: res.assets[0]?.duration,
        };
        props.setIsLoading(true);
        if (CurrentUser?.profileBackground) {
          const response = deleteImage(props?.authUser?.profileBackground);
          // console.log('resImage', response);
        }

        const linkData = await uploadImage(file.uri, CurrentUser?.uid);

        await SaveUser(CurrentUser?.uid, {profileBackground: linkData});

        const userRes = await getSpecificUser(CurrentUser?.uid);

        dispatch(authData(userRes));
        Toast.show('Profile Background updated');
        props.setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BottomSheet
      visible={props.modalVisible}
      onBackButtonPress={props.onCloseModal}
      onBackdropPress={props.onCloseModal}>
      <View
        flexDirection={'column'}
        backgroundColor={'white'}
        alignSelf="center"
        paddingHorizontal={scale(15)}
        height={'20%'}
        width={'100%'}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden">
        <Spacer height={5} />

        <View style={styles.topLine}></View>
        <Spacer height={10} />
        <View
          style={{
            backgroundColor: 'row',
            flexDirection: 'row',
            width: '100%',
            marginHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              label="Change Profile Background"
              marginLeft={7}
              fontSize={13}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              props.onCloseModal();
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons
              name="close-outline"
              color={colors.black}
              size={moderateScale(30)}
            />
          </TouchableOpacity>
        </View>

        <Spacer height={10} />
        <TouchableOpacity onPress={() => onPickImage()} style={styles.box}>
          <View style={styles.innerView}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={icons.background}
              style={{
                width: scale(25),
                height: scale(24),
                tintColor: colors.green,
              }}
            />
            <CustomText
              label={'Change Profile Background'}
              fontSize={13}
              marginLeft={15}
              textAlign="center"
              fontFamily={InterFont.semiBold}
              color={colors.black}
            />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          activeOpacity={0.6}
          onPress={props?.onCopyLink}
          style={styles.optionContainer}>
          <AntDesign
            name="copy1"
            size={moderateScale(20)}
            color={colors.black}
          />

          <CustomText label="Copy Link" marginLeft={7} fontSize={13} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            props.onCloseModal();

            dispatch(setReportUserId(props?.selectedId));
            props?.navigation.navigate('ReportPost');
          }}
          style={styles.optionContainer}>
          <MaterialIcons
            name="report"
            size={moderateScale(20)}
            color={colors.black}
          />

          <CustomText label="Report Post" marginLeft={7} fontSize={13} />
        </TouchableOpacity> */}
      </View>
    </BottomSheet>
  );
};

export default SetBackgroundSheet;

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
  box: {
    width: '100%',
    height: verticalScale(38),
    backgroundColor: '#F5F9F8',
    borderRadius: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    justifyContent: 'space-between',
    shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
    shadowRadius: 2,
    elevation: 5,
    shadowOpacity: 0.2,
    shadowOffset: {width: -1, height: 2},
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popupContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 9999,
  },
});
