import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../../utils/Colors';
import CustomText from '../../../../components/CustomText';
import {Spacer} from '../../../../components/Spacer';
import {images} from '../../../../assets/images';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import commonStyles from '../../../../utils/CommonStyles';
import CustomTextInput from '../../../../components/CustomTextInput';

const Accountverified = ({
  capturedImage,
  contactUsState,
  setContactUsState,
  navigation,
  setCaptureImage,
  uploadImage,
}) => {
  const verifiedArray = [
    {
      id: 1,
      withLabel: 'Full Name',
      placeholder: 'Enter Full Name',
      value: contactUsState.name,
      onChangeText: txt => {
        setContactUsState({...contactUsState, name: txt});
      },
      // value: contactUsState.name,
    },
    {
      id: 2,
      withLabel: 'Username',
      placeholder: 'Enter Your Username',
      value: contactUsState.username,
      onChangeText: txt => {
        setContactUsState({...contactUsState, username: txt});
      },
      // value: contactUsState.userName,
    },
    {
      id: 3,
      withLabel: 'Email',
      placeholder: 'Enter Your Email',
      value: contactUsState.email,
      onChangeText: txt => {
        setContactUsState({...contactUsState, email: txt});
      },
      // value: contactUsState.email,
    },
    {
      id: 4,
      withLabel: 'Phone Number',
      placeholder: 'Enter Your Phone Number',
      keyboardType: 'number-pad',

      // value: contactUsState.message,

      value: contactUsState.phoneNumber,
      onChangeText: txt => {
        setContactUsState({...contactUsState, phoneNumber: txt});
      },
    },
    {
      id: 5,
      withLabel: 'Supporting',
      placeholder: 'Supporting',
      value: contactUsState.supporting,
      onChangeText: txt => {
        setContactUsState({...contactUsState, supporting: txt});
      },
      
      // value: contactUsState.message,
    },
    {
      id: 4,
      withLabel: 'Descripation',
      placeholder: 'Enter Your Descripation',
      height:verticalScale(80),
      multiline:true,
      numberOfLines:3,
      maxLength:100,
      inputContainerHeight:60,
      value: contactUsState.descripation,
      onChangeText: txt => {
        setContactUsState({...contactUsState, descripation: txt});
      },
    },
  ];
  return (
    <View>
      {verifiedArray.map((item, index) => {
        return (
          <>
            <CustomTextInput
              withLabel={item.withLabel}
              value={item.value}
              keyboardType={item.keyboardType}
              onChangeText={item.onChangeText}
              height={item.height}
              numberOfLines={item?.numberOfLines}
              maxLength={item.maxLength}
              // inputContainerHeight={item.inputContainerHeight}
              iconHeight={verticalScale(15)}
              inputStyle={{
                shadowColor:
                  Platform.OS == 'ios' ? colors.inputGray : colors.black,
                shadowRadius: 5,
                elevation: 5,
                shadowOpacity: 0.5,
                shadowOffset: {width: 1, height: 1},
              }}
              // rigthIcon={showPassword ? icons.eye : icons.hidden}
              placeholder={item.placeholder}
            />
            <Spacer height={20} />
          </>
        );
      })}

      <View style={styles.photoResult}>
        {capturedImage ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              borderRadius: scale(10),
            }}>
            <Image
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{uri: capturedImage.uri}}
            />
            <TouchableOpacity
            activeOpacity={0.6}
            onPress={()=>setCaptureImage("")}
              style={{
                paddingRight: scale(20),
                position: 'absolute',
                zIndex: 10,
                marginTop: scale(10),
                alignSelf: 'flex-end',
              }}>
              <Entypo
                name="circle-with-cross"
                size={moderateScale(25)}
                color={colors.graySearch}
                //   onPress={cancelPhoto}
              />
            </TouchableOpacity>
            <Image
              source={{capturedImage}}
              style={commonStyles.img}
              resizeMode={'contain'}
            />
          </View>
        ) : (
          <TouchableOpacity onPress={uploadImage} activeOpacity={0.6}>
            <View
              style={{
                width: '80%',
                height: 140,
                backgroundColor: colors.white,
                borderRadius: 10,
                alignSelf: 'center',
              }}>
              <CustomText
                label={'Upload Government Issued Identification.'}
                alignSelf={'center'}
                textAlign={'center'}
                fontWeight={'500'}
                marginTop={10}
                color={colors.primary}
              />
              <Spacer height={15} />
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                onPress={uploadImage}
                activeOpacity={0.6}
                //   onPress={showActionSheet}
                >
                  <AntDesign
                    name="camerao"
                    size={70}
                    color={colors.inputGray}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Accountverified;

const styles = StyleSheet.create({
  photoResult: {
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: colors.lightGray,
    borderRadius: scale(10),
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    width: '80%',
    height: 150,
  },
});
