import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../utils/Colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Spacer} from './Spacer';
import {icons} from '../assets/icons';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import {deleteImage} from '../screens/services/PostServices';
import { launchImageLibrary } from 'react-native-image-picker';
const ProfilePhotoEdit = props => {
  useEffect(() => {
    // console.log('profilepic', props.profilePic);
  }, []);

  const actionSheetRef = useRef();
  const handleOpenActionSheet = () => {
    actionSheetRef.current?.show();
  };
  // if(props.profilePic){
  //   const response = deleteImage(props?.profilePic);
  // }
  const onImagePick = async () => {
    try {

      let options = {
        width: 300,
        height: 400,
        mediaType:"photo",
        quality: 1,
      };

      const res = await launchImageLibrary(options);

      if(res.assets){
        const imageFile = res.assets[0];

        console.log("ResPAth",res.uri)

        props.setImageUrl(imageFile.uri)        ;


        

      }



     
    } catch (error) {
      console.log(error);
    }
  };
  const height = Dimensions.get('screen').height;
  return (
    <View>
      <View
        style={[
          {
            width: props.width || scale(110),
            height: props.height || scale(110),
            borderRadius: 100,
            borderColor: colors.yellow,
            borderWidth: 2,
            backgroundColor: colors.green,
            alignSelf: 'center',
            // justifyContent:"center",
            // position: 'absolute',
            alignItems: 'center',
            // marginTop: height/ 7.7
          },
          props.mainStyle,
        ]}>
        {props.multiUser ? (
          <Image
            source={
              props.imageUrl
                ? {uri: props.imageUrl}
                : props.image
                ? icons.multiUser
                : icons.multiUser
            }
            style={{
              width: props.imageUrl ? '100%' : '62%',
              height: props.imageUrl ? '100%' : '60%',
              marginTop: props.imageUrl ? 0 : scale(12),
              borderRadius: props.imageUrl ? 100 : 0,
            }}
          />
        ) : (
          <Image
            source={
              props.imageUrl
                ? {uri: props.imageUrl}
                : props.image
                ? icons.profile
                : icons.person
            }
            style={
              props.imageUrl || props.image
                ? styles.imageStyle
                : styles.uploadImage
            }
          />
        )}
        {props.addPhoto && (
          <View
            style={{
              width: scale(30),
              height: scale(30),
              borderRadius: 30,
              backgroundColor: colors.white,
              position: 'absolute',
              alignSelf: 'flex-end',
              marginTop: verticalScale(5),
              bottom:10,
              right: -17,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              shadowColor:
              Platform.OS == 'ios' ? '#343a40' : colors.black,
            shadowRadius: 2,
            elevation: 5,
            shadowOpacity: 0.4,
            // inputMarginTop:-20,
            shadowOffset: {width: -1, height: 3},
            }}>
            <Pressable onPress={() => onImagePick()}>
              <SimpleLineIcons
                name="camera"
                color={colors.black}
                size={moderateScale(19)}
              />
            </Pressable>
          </View>
        )}
      </View>
      <ActionSheet
        ref={actionSheetRef}
        title={'Add Image'}
        options={['Choose Image from gallery', 'Cancel']}
        cancelButtonIndex={1}
        onPress={index => {
          if (index == 0) {
            onImagePick();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 100,
    overflow: 'hidden',
  },
  uploadImage: {
    width: '55%',
    height: '55%',
    marginTop: scale(12),
    tintColor: colors.white,
  },
});

export default ProfilePhotoEdit;
