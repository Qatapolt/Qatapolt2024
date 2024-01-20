import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  Alert,
  Linking,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {icons} from '../assets/icons';
import {colors} from '../utils/Colors';
import {
  moderateScale,
  ScaledSheet,
  verticalScale,
  scale,
} from 'react-native-size-matters';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import {Spacer} from './Spacer';
import {Avatar, Divider, ListItem} from 'react-native-elements';
import {images} from '../assets/images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {cameraPermissionError} from '../utils/Permissions';
import {createThumbnail} from 'react-native-create-thumbnail';
import {
  PERMISSIONS,
  request,
  check,
  openSettings,
} from 'react-native-permissions';

import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import {
  requestCameraPermission,
  requestGalleryPermission,
} from '../screens/services/Permissions';
const SendMessage = props => {
  const actionSheetRef = useRef();
  const actionSheetRef1 = useRef();

  const handleOpenActionSheet = () => {
    actionSheetRef.current?.show();
  };
  const handleOpenActionSheet1 = () => {
    actionSheetRef1.current?.show();
  };
  const [image, setImage] = useState(null);
  const onPickPhoto = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'photo',
        // multiple: false,
      });

      if (!result.cancelled) {
        const file = {
          uri: result.path,
          fileName: result.path,
          type: result.mime,
        };
        props.SendMessageData(file);

        setImage(result.path);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onPickVideo = async () => {
    const cameraPermission = await requestGalleryPermission();
    if (cameraPermission == 'granted') {
      try {
        const res = await ImagePicker.openPicker({
          width: 300,
          height: 400,
          // cropping: true,
          mediaType: 'any',
        });

        if (res) {
          const file = {
            uri: res.path,
            fileName: res.path,
            type: res.mime,
            thumbnail: '',
          };

          let videDuration = Number(res.duration);
          console.log('DurationData', videDuration);
          if (file.type?.includes('video')) {
            if (videDuration >= 60000) {
              Alert.alert('Video length must be smaller than 60 seconds');
            } else {
              createThumbnail({
                url: file.uri,
                timeStamp: 10000,
              })
                .then(response => {
                  file['thumbnail'] = response.path;
                  setImage(file.path);
                  props.SendMessageData(file);
                })
                .catch(err => console.log({err}));
            }
          } else {
            console.log('exitData');
            setImage(file.path);
            props.SendMessageData(file);
          }

          // console.log('ResDur', res?.duration / 1000);
        }
      } catch (error) {
        cameraPermissionError(error);
        console.log(
          '🚀 ~ file: index.tsx:496 ~ onImagePickFromCamera ~ error:',
          error,
        );
      }
    } else if (cameraPermission == 'blocked') {
      if (Platform.OS == 'android') {
        Linking.openSettings();
      } else {
        openSettings();
      }
    }
  };

  const onOpenCamera = async () => {
    const cameraPermission = await requestCameraPermission();
    if (cameraPermission == 'granted') {
      // let options = {
      //   height: 1920,
      //   width: 1080,
      //   mediaType: 'mixed',
      //   quality: 1,
      //   videoQuality: 'high',
      // };
      // try {
      //   const result = await launchCamera(options);
      //   if (!result.cancelled) {
      //     const file = {
      //       uri: result.assets[0].uri,
      //       fileName: result.assets[0].fileName,
      //       type: result.assets[0].type,
      //     };
      //     props.SendMessageData(file);
      //     setImage(result.path);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    } else if (cameraPermission == 'blocked') {
      if (Platform.OS == 'android') {
        Linking.openSettings();
      } else {
        openSettings();
      }
    }
  };

  const onPickGallery = async () => {
    try {
      let options = {
        height: 1920,
        width: 1080,
        mediaType: 'mixed',
        quality: 1,
        videoQuality: 'high',
      };

      const res = await launchImageLibrary(options);

      if (res) {
        const file = {
          uri: res.assets[0].uri,
          fileName: res.assets[0].fileName,
          type: res.assets[0].type,
          thumbnail: '',
        };

        let videDuration = Number(res?.assets[0].duration);

        if (file.type?.includes('video')) {
          if (videDuration >= 60) {
            Alert.alert('Video length must be smaller than 60 seconds');
          } else {
            console.log('enterData', file.type);

            createThumbnail({
              url: file.uri,
              timeStamp: 10000,
            })
              .then(response => {
                file['thumbnail'] = response.path;
                setImage(file.path);
                props.SendMessageData(file);
              })
              .catch(err => console.log({err}));
          }
        } else {
          console.log('exitData');
          setImage(file.path);
          props.SendMessageData(file);
        }
      }
    } catch (error) {
      cameraPermissionError(error);
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: Platform.OS == 'ios' ? verticalScale(10) : 0,
        }}>
        {props.photo ? (
          <>
            <Avatar
              activeOpacity={0.9}
              onPress={() => {
                props.navigation.navigate('Profile', {user: true});
              }}
              rounded
              source={images.profile1}
              size={45}
            />
          </>
        ) : (
          <>
            {/* <TouchableOpacity onPress={props.onPlus} style={styles.add}>
              <Entypo
                name="plus"
                size={moderateScale(27)}
                color={colors.white}
              />
            </TouchableOpacity> */}
          </>
        )}

        <View
          style={{
            ...styles.footer,
            width: props.photo ? '72%' : '96%',
          }}>
          <TouchableOpacity
            style={{marginTop: scale(5.5), marginLeft: scale(7)}}
            onPress={() => props.setIsCameraActive(true)}
            activeOpacity={0.6}>
            <Entypo
              name="camera"
              size={moderateScale(27)}
              color={colors.green}
            />
          </TouchableOpacity>
          <TextInput
            onFocus={() => props.setShowTyping(!props?.showTyping)}
            // onBlur={()=>props.setShowTyping(!props?.showTyping)}
            value={props.textMessage}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder={'Type message'}
            multiline={true}
            onChangeText={props.onChangeText}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={props.onSendMessage}
            style={[
              styles.send,
              {marginRight: scale(7), marginTop: scale(5.5)},
            ]}
            //  onPress={() => SendMsg()}
          >
            <Image
              source={icons.send}
              style={{
                width: scale(16),
                height: scale(16),
                tintColor: colors.white,
                marginLeft: scale(2),
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPickVideo()}
            // onPress={props.onPlus}
            style={[
              styles.add,
              {marginTop: scale(5.5), marginRight: scale(5)},
            ]}>
            <FontAwesome5
              name="image"
              color={colors.white}
              size={moderateScale(20)}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            // onPress={props.onPlus}
            style={[
              styles.add,
              {marginTop: scale(5.5), marginRight: scale(5)},
            ]}>
            <MaterialCommunityIcons
              name="sticker-emoji"
              size={moderateScale(20)}
              color={colors.white}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        title={'Add Image'}
        options={[
          'Choose Image from gallery',
          'Choose Video from gallery',
          'Cancel',
        ]}
        cancelButtonIndex={2}
        onPress={index => {
          if (index == 0) {
            onPickGallery(false);
          }
          if (index == 1) {
            onPickVideo(true);
          }
        }}
      />

      <ActionSheet
        ref={actionSheetRef1}
        title={'Add Image'}
        options={['Capture', 'Capture Video', 'Cancel']}
        cancelButtonIndex={2}
        onPress={index => {
          if (index == 0) {
            onOpenCamera();
          }
          if (index == 1) {
            onOpenCamera(true);
          }
        }}
      />
    </>
  );
};

export default SendMessage;

const styles = ScaledSheet.create({
  textInputContainer: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: '20@s',
    borderTopRightRadius: '20@s',
    minHeight: verticalScale(60),
    maxHeight: verticalScale(100),
    // paddingTop: verticalScale(20),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: verticalScale(5),
  },
  inPutContainer: {
    backgroundColor: colors.white,
    // height: verticalScale(35),
    fontSize: verticalScale(14),
    width: '75%',
    color: colors.black,
    fontWeight: '600',
    paddingHorizontal: verticalScale(10),
  },

  sendContainer: {
    width: '20@s',
    height: '25@vs',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: scale(8),
    backgroundColor: colors.superLightGray,
    margin: 8,
    minHeight: verticalScale(35),
    maxHeight: verticalScale(110),
    paddingRight: scale(5),
    paddingLeft: scale(3),
    borderRadius: scale(20),
    shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
    shadowRadius: 5,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
  },
  send: {
    width: scale(27),
    height: scale(27),
    borderRadius: 30,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 20,
    fontSize: verticalScale(12),
    flex: 1,
    marginBottom: Platform.OS == 'ios' ? scale(5) : scale(-4),
    justifyContent: 'center',
    textAlignVertical: 'top',
    color: colors.black,
  },
  add: {
    width: scale(27),
    height: scale(27),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
    shadowRadius: 5,
    elevation: 3,
    shadowOpacity: 0.3,

    shadowOffset: {width: 1, height: 1},
  },
});
