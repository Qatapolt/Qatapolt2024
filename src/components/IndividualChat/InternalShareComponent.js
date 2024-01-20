import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../utils/Colors';
import {InterFont} from '../../utils/Fonts';
import CustomText from '../CustomText';
import VideoPlayer from 'react-native-video-player';
import {icons} from '../../assets/icons';
import CustomImage from '../CustomImage';
import {Avatar, Divider, ListItem} from 'react-native-elements';
import {getSpecificUser} from '../../screens/services/UserServices';
import {getSpecificPost} from '../../screens/services/PostServices';
import moment from 'moment';
import {Spacer} from '../Spacer';
import {PH10, PH20} from '../../utils/CommonStyles';
import {images} from '../../assets/images';
import UserCommentaryBottom from '../../screens/Main/UserProfile/Molecules/UserCommentaryBottom';
import FastImage from 'react-native-fast-image';
import PostBottomItem from '../PostBottomItem';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const InternalShareComponent = props => {
  const [userProfileData, setUserProfileData] = useState({});
  const [postData, setPostData] = useState({});
  const authData = useSelector(state => state?.auth?.currentUser);

  const navigation = useNavigation();
  useEffect(() => {
    getPostData();
    getUserData();
  }, [props?.message]);
  // console.log('postDatapostData', props?.message?.senderId);

  const getUserData = async () => {
    const data = await getSpecificUser(props?.message?.senderId);
    setUserProfileData(data);
  };
  const getPostData = async () => {
    const data = await getSpecificPost(props?.message?.internalFile?.postId);
    setPostData(data);
  };

  const PostCreateAt = moment(new Date(postData?.createAt?.toDate()));

  let dateFormat = '';

  if (moment(PostCreateAt).isSame(moment(), 'day')) {
    dateFormat = 'Today';
  } else {
    dateFormat = 'not';
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: verticalScale(10),
        borderRadius: scale(5),
        overflow: 'hidden',
        backgroundColor:
          props?.message?.senderId == authData?.uid
            ? colors.green
            : colors.superLightGray,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          margin: scale(5),
          backgroundColor: colors.white,
          borderRadius: scale(5),
        }}>
        <View style={{width: '100%'}}>
          <ListItem>
            <CustomImage
              onImagePress={() => {
                let BlockExist = authData?.BlockUsers?.map(
                  item => item,
                ).includes(userProfileData?.uid);
                if (BlockExist) {
                  navigation.navigate('BlockScreen');

                  return;
                }

                if (userProfileData.uid == authData.uid) {
                  navigation.navigate('Profile', {
                    event: userProfileData?.uid,
                  });
                  return;
                }
                navigation.navigate('UserProfile', {
                  event: userProfileData?.uid,
                });
              }}
              width={40}
              height={40}
              imageUrl={userProfileData?.profileImage}
            />

            <ListItem.Content>
              <ListItem.Title
                textTransform={'capitalize'}
                style={{fontFamily: InterFont.semiBold}}>
                {userProfileData?.name}
              </ListItem.Title>
              <Spacer height={3} />
              <ListItem.Subtitle
                style={{
                  fontFamily: InterFont.regular,
                  fontSize: verticalScale(8),
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {}
                {dateFormat == 'Today'
                  ? moment(new Date(postData?.createAt?.toDate())).fromNow()
                  : moment(new Date(postData?.createAt?.toDate())).format(
                      'DD MMM h:mm:A',
                    )}
              </ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                // onDeletePost(props.postData?.postId)
              }}>
              <Avatar source={icons.menu} size={scale(25)} />
            </TouchableOpacity>
          </ListItem>
          {postData?.description ? (
            <PH20>
              <CustomText label={postData?.description} />
            </PH20>
          ) : (
            <></>
          )}
          <Spacer height={10} />

          <View>
            <TouchableOpacity activeOpacity={1}>
              {!postData?.uriData?.type ? (
                <></>
              ) : (
                <>
                  {!postData?.uriData?.type?.includes('image') ? (
                    <>
                      <View style={styles.postContainer}>
                        <VideoPlayer
                          autoplay={false}
                          defaultMuted={true}
                          resizeMode="cover"
                          playButton={true}
                          pauseOnPress={true}
                          videoWidth={1400}
                          videoHeight={1150}
                          video={{uri: postData?.uriData?.uri}}
                          thumbnail={{uri: postData?.uriData?.thumbnail}}
                        />
                      </View>
                    </>
                  ) : (
                    <>
                      <FastImage
                        source={
                          !postData?.uriData?.uri == ''
                            ? {uri: postData?.uriData.uri}
                            : images.postPic
                        }
                        style={styles.postContainer}
                      />
                    </>
                  )}
                </>
              )}
            </TouchableOpacity>

            <PH10>
              <PostBottomItem postData={postData} activeColor={true} />
              {/* <UserCommentaryBottom
                postData={postData}
                // likePost={likePost}
                navigation={props.navigation}
              /> */}
            </PH10>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InternalShareComponent;

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    height: verticalScale(250),
    overflow: 'hidden',
  },
});
