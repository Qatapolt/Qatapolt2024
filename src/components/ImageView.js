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
import CustomText from './CustomText';
import {InterFont} from '../utils/Fonts';
import {dateFormat, timeFormat} from '../utils/Commons';
import VideoPlayer from 'react-native-video-player';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
export default function ImageView({
  modalVisible,
  setModalVisible,
  image,
  id,
  authId,
  setImage,
  uploadedBy,
  otherName,
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [hideImage, setShowImage] = useState(true);
  const [userData, setUserData] = useState({});
  const ChatTime = timeFormat(image?.date, 'hh:mm a');

  const messageDate = moment(new Date(image?.date?.toDate()));
  let LestMessageDate = dateFormat(messageDate);

  // console.log('userData', image);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [modalVisible]);

  const HandlePress = () => {
    if (hideImage) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
      setShowImage(false);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
      setShowImage(true);
    }
  };

  return (
    <Modal
      visible={modalVisible}
      style={{
        flex: 1,
        margin: 0,
        backgroundColor: colors.black,
      }}
      onBackdropPress={() => setModalVisible(false)}>
      <TouchableOpacity
        activeOpacity={1}
        style={{flex: 1}}
        onPress={() => {
          HandlePress();
        }}>
        <PH10>
          <Spacer height={Platform.OS == 'ios' ? 50 : 10} />

          <CustomHeader
            LeftSide={() => (
              <Animated.View style={{opacity: fadeAnim}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: scale(150),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setImage();

                      setModalVisible(false);
                    }}>
                    <Ionicons
                      name="chevron-back"
                      color={colors.white}
                      size={moderateScale(30)}
                    />
                  </TouchableOpacity>
                  <Spacer width={10} />

                  <View>
                    <CustomText
                      label={uploadedBy}
                      //  width={'70%'}
                      fontSize={15}
                      numberOfLines={1}
                      fontFamily={InterFont.semiBold}
                      color={colors.white}
                      // fontFamily={InterFont.bold}
                    />

                    <Text
                      style={{
                        fontSize: verticalScale(10),
                        color: colors.white,
                        fontWeight: '500',
                      }}>
                      {LestMessageDate}

                      <Spacer width={6} />
                      <Text
                        style={{
                          fontSize: verticalScale(10),
                          color: colors.white,
                          fontWeight: '500',
                        }}>
                        {ChatTime}
                      </Text>
                    </Text>
                  </View>
                </View>
              </Animated.View>
            )}
          />
        </PH10>

        <Spacer height={40} />

        <View style={{height: '60%', width: '100%'}}>
          {image?.mediaFiles?.type.includes('image') ? (
            <ReactNativeZoomableView
              maxZoom={2}
              minZoom={1}
              zoomStep={1}
              initialZoom={1}
              bindToBorders={true}
              contentHeight={undefined}
              contentWidth={undefined}
              style={
                {
                  // padding: 10,
                  // backgroundColor: 'red',
                }
              }>
              <FastImage
                style={commonStyles.img}
                resizeMode="cover"
                source={{uri: image?.mediaFiles?.uri}}
              />
            </ReactNativeZoomableView>
          ) : (
            <VideoPlayer
              autoplay={false}
              defaultMuted={true}
              resizeMode="cover"
              style={{...commonStyles.img}}
              playButton={true}
              pauseOnPress={true}
              // onPress={() => props.setViewPostModal(true)}
              //   videoWidth={100}
              //   videoHeight={150}
              video={{uri: image?.mediaFiles?.uri}}
              thumbnail={{uri: image?.mediaFiles?.thumbnail}}

              // controls={true}
              // onPause={true}
              // videoHeight={300}
              // defaultMuted={true}
              // styles={{window}}

              // containerStyle={styles.postContainer}
              // video={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
              // navigator={this.props.navigator}
            />
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({});
