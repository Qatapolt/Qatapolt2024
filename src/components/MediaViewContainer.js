import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Animated,
  Image,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {colors} from '../utils/Colors';
import {InterFont} from '../utils/Fonts';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Spacer} from './Spacer';
import commonStyles, {PH10, PH20} from '../utils/CommonStyles';
import {Avatar} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomText from '../components/CustomText';
import Modal from 'react-native-modal';
import moment from 'moment';
import {getSpecificPost} from '../screens/services/PostServices';
import CustomHeader from '../components/CustomHeader';
import CustomImage from './CustomImage';
import UserCommentaryBottom from '../screens/Main/UserProfile/Molecules/UserCommentaryBottom';
import VideoPlayer from 'react-native-video-player';
import FastImage from 'react-native-fast-image';
import PostBottomItem from './PostBottomItem';

const MediaViewContainer = props => {
  const [hideImage, setShowImage] = useState(true);
  // console.log('AllLikePost', props?.likePost);
  const [hightLightData, setHightLightData] = useState({});

  const [userProfileData, setUserProfileData] = useState({});
  // console.log('PostUserData',hightLightData);

  useEffect(() => {
    getPostData();
  }, [props]);

  const getPostData = async () => {
    const data = await getSpecificPost(props?.item?.postId);

    setHightLightData(data);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

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
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [props.showPost]);

  const PostCreateAt = moment(new Date(hightLightData?.createAt?.toDate()));

  let dateFormat = '';

  if (moment(PostCreateAt).isSame(moment(), 'day')) {
    dateFormat = 'Today';
  } else {
    dateFormat = 'not';
  }

  return (
    // viewPostModal={viewPostModal}
    // setViewPostModal={setViewPostModal}

    <View style={{flex: 1}}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          HandlePress();
        }}
        style={{
          flex: 1,
          // width: '100%',
          // height: '100%',
          backgroundColor: 'black',
        }}>
        <Spacer height={Platform.OS == 'ios' ? 50 : 10} />
        <PH10>
          <CustomHeader
            LeftSide={() => (
              <Animated.View style={{opacity: fadeAnim}}>
                <TouchableOpacity onPress={() => props.setViewMedia(false)}>
                  <Ionicons
                    name="chevron-back"
                    color={colors.white}
                    size={moderateScale(30)}
                  />
                </TouchableOpacity>
              </Animated.View>
            )}
            RightSide={() => (
              <Animated.View style={{opacity: fadeAnim}}>
                <TouchableOpacity
                  onPress={() => props.setShowPostPotions(true)}>
                  <Entypo
                    name="dots-three-horizontal"
                    color={colors.white}
                    size={moderateScale(25)}
                  />
                </TouchableOpacity>
              </Animated.View>
            )}
          />
        </PH10>
        <Spacer height={30} />
        {/* <View style={{alignSelf: 'center', height: '65%', width: '100%'}}> */}

        {!hightLightData?.uriData?.type?.includes('image') ? (
          <>
            <View style={{alignSelf: 'center', height: '65%', width: '100%'}}>
              <VideoPlayer
                autoplay={false}
                defaultMuted={true}
                resizeMode="cover"
                playButton={true}
                pauseOnPress={true}
                // onPress={() => props.setViewPostModal(true)}
                videoWidth={100}
                videoHeight={130}
                video={{uri: hightLightData?.uriData?.uri}}
                thumbnail={{uri: hightLightData?.uriData?.thumbnail}}
              />
            </View>
          </>
        ) : (
          <>
            <FastImage
              // onLoadEnd={() => setIsPhotoLoading(false)}
              // onLoad={() => setIsPhotoLoading(false)}
              // onLoad={() => setIsPhotoLoading(false)}

              source={{uri: hightLightData?.uriData?.uri}}
              style={{alignSelf: 'center', height: '65%', width: '100%'}}
            />
          </>
        )}

        {/* </View> */}

        <Animated.View
          style={{
            alignSelf: 'center',
            opacity: fadeAnim,

            height: '25%',
            width: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#00000090',
          }}>
          <View style={{padding: verticalScale(10)}}>
            <View style={commonStyles.rowContainer}>
              <CustomImage
                width={50}
                height={50}
                imageUrl={props?.userData?.profileImage}
              />
              {/* <Avatar
              activeOpacity={0.9}
              onPress={() => {
                props.navigation.navigate('Profile', {user: true});
              }}
              rounded
              source={icons.profile}
              size={60}
            /> */}
              <View style={{paddingLeft: scale(10)}}>
                <CustomText
                  label={props?.userData?.name}
                  fontSize={14}
                  fontFamily={InterFont.bold}
                  color={colors.white}
                />
                <View style={commonStyles.rowContainer}>
                  <CustomText
                    label={`@${props?.userData?.name}`}
                    fontSize={11}
                    fontFamily={InterFont.medium}
                    color={colors.superLightGray}
                  />
                  <CustomText
                    label={'-'}
                    marginLeft={5}
                    fontSize={11}
                    fontFamily={InterFont.medium}
                    color={colors.superLightGray}
                  />

                  <CustomText
                    label={
                      dateFormat == 'Today'
                        ? moment(
                            new Date(hightLightData?.createAt?.toDate()),
                          ).fromNow()
                        : moment(
                            new Date(hightLightData?.createAt?.toDate()),
                          ).format('DD MMM h:mm:A')
                    }
                    fontSize={11}
                    marginLeft={5}
                    fontFamily={InterFont.medium}
                    color={colors.superLightGray}
                  />
                </View>
              </View>
            </View>
            <Spacer height={8} />

            <CustomText
              numberOfLines={2}
              label={hightLightData?.description}
              fontSize={13}
              fontFamily={InterFont.medium}
              color={colors.white}
            />
          </View>
          <PH10>
            <PH10>
              <PostBottomItem postData={hightLightData} />
              {/* <UserCommentaryBottom
              postData={hightLightData}
              likePost={true}
              allColor={true}
              navigation={props.navigation}
            //   viewCount={viewCount}
            /> */}
            </PH10>
          </PH10>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default MediaViewContainer;

const styles = StyleSheet.create({});
