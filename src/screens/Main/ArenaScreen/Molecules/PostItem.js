import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import commonStyles, {PH10} from '../../../../utils/CommonStyles';
import {Spacer} from '../../../../components/Spacer';
import CustomText from '../../../../components/CustomText';
import {images} from '../../../../assets/images';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';
import {colors} from '../../../../utils/Colors';
import {Avatar, Divider, ListItem} from 'react-native-elements';
import PostItemBottom from './PostItemBottom';
import PostHeader from './PostHeader';
import PostComment from '../../PostComment/PostComment';
import VideoPlayer from 'react-native-video-player';
import {useSelector} from 'react-redux';
import {incrementViewCount} from '../../../services/PostServices';
import FastImage from 'react-native-fast-image';
import {firebase} from '@react-native-firebase/firestore';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import moment from 'moment';
import CustomImage from '../../../../components/CustomImage';
import {icons} from '../../../../assets/icons';
import {InterFont} from '../../../../utils/Fonts';
import {
  getSpecificUser,
  SaveUser,
  getAllUSers,
} from '../../../services/UserServices';
import Octicons from 'react-native-vector-icons/Octicons';
import {handlePress} from '../../../services/PostServices';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-root-toast';
import UserNameLayout from '../../../../utils/Layouts/UserNameLayout';
const PostItem = props => {
  const currentUser = useSelector(state => state?.auth?.currentUser);
  const videoRef = useRef(null);
  const [isPaused, setPaused] = useState(true);
  const [likePost, setLikePost] = useState(false);
  const [likeComment, setLikeComment] = useState(false);
  const [heartPost, setHeartPost] = useState(false);
  const [viewComments, setViewComments] = useState(false);
  const [viewCount, setViewCount] = useState(props?.item?.views || 0);
  const [userProfileData, setUserProfileData] = useState({});
  const image =
    currentUser?.profileImage == undefined ? null : currentUser?.profileImage;
  const [commentCount, setCommentCount] = useState(props.commentCounts);
  const [newCommentAdd, setNewCommentAdd] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [postID, setPostID] = useState('');
  const [userAllData, setUserAllData] = useState([]);
  const [repostCount, setRepostCount] = useState(props?.item?.rePostCount);
  const [repostIds, setRepostIds] = useState(props?.item?.rePostIds);
  const [internalShareCount, setInternalShareCount] = useState(
    props?.item?.internalShare,
  );
  const [likeCount, setLikeCount] = useState(props?.item?.medals);
  const [imageSource, setImageSource] = useState(() => {
    const medalsIdArray = props?.item?.medalsId || [];
    const defaultImageSource = medalsIdArray.includes(currentUser?.uid)
      ? icons.likemadel
      : icons.unFilledMedal;
    return defaultImageSource;
  });
  useEffect(() => {
    if (newCommentAdd === true && postID !== '') {
      firebase
        .firestore()
        .collection('Posts')
        .doc(postID)
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            const postData = snapshot.data();
            const commentsData = postData.comments || [];
            setCommentCount(commentsData.length);
            setNewCommentAdd(false);
          }
        });
    }
  }, [newCommentAdd]);
  useEffect(() => {
    if (props?.repost === true && props.item?.postId !== '') {
      firebase
        .firestore()
        .collection('Posts')
        .doc(props.postData?.postId)
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            const postData = snapshot.data();
            setRepostCount(postData?.rePostCount);
            setRepostIds(postData?.rePostIds);
            props.setRepost(false);
          }
        });
    }
  }, [props?.repost]);

  useEffect(() => {
    // getUserData();
    getFilterUser();
    renderPostDescription();
  }, [props]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const userData = await getSpecificUser(props?.item?.userId);
        if (isMounted) {
          setUserProfileData(userData);
        }
      } catch (error) {
        console.log('error userData:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Set to false when the component is unmounted
    };
  }, [props]);

  const handleSingleTap = () => {
    if (videoRef?.current) {
      if (isPaused) {
        videoRef?.current?.resume();
      } else {
        videoRef?.current?.pause();
      }
      setPaused(!isPaused);
    }
  };
  const handleDoubleTap = ({nativeEvent}) => {
    if (nativeEvent.state === State.ACTIVE) {
      console.log('handleDoubleTap');
      props.setViewPostModal(true);
      props.setPostObject(props?.item);
      props.setPostIndex(props?.index);
      incrementViewCount(props?.item?.postId, currentUser, setViewCount);
    }
  };
  const getFilterUser = () => {
    getAllUSers(setUserAllData, currentUser?.uid);
  };
  const getUserData = async () => {
    try {
      const userData = await getSpecificUser(props?.item?.userId);
      setUserProfileData(userData);
    } catch (error) {
      console.log('error userData:', error);
    }
  };

  const PostCreateAt = moment(new Date(props?.item?.createAt.toDate()));

  let dateFormat = '';

  if (moment(PostCreateAt).isSame(moment(), 'day')) {
    dateFormat = 'Today';
  } else {
    dateFormat = 'not';
  }

  const onNavigate = () => {
    if (currentUser?.BlockUsers?.includes(userProfileData?.uid)) {
      props.navigation.navigate('BlockScreen');

      return;
    }

    if (userProfileData?.uid === currentUser?.uid) {
      props.navigation.navigate('Profile', {
        event: userProfileData?.uid,
      });
      return;
    }

    props.navigation.navigate('UserProfile', {
      event: userProfileData?.uid,
    });
  };

  const onRepostedNavigate = () => {
    if (currentUser?.BlockUsers?.includes(props?.item?.repostedBy?.uid)) {
      props.navigation.navigate('BlockScreen');
      return;
    }
    if (props?.item?.repostedBy?.uid === currentUser?.uid) {
      props.navigation.navigate('Profile', {
        event: props?.item?.repostedBy?.uid,
      });
      return;
    }
    props.navigation.navigate('UserProfile', {
      event: props?.item?.repostedBy?.uid,
    });
  };

  const renderPostDescription = () => {
    let mentiondUser;
    const mentionedUsers = props?.item?.mentionedUsers || [];
    const mentionRegex = /@(\w+)/g;
    const parts = (props?.item?.description ?? '').split(mentionRegex);

    const processedParts = parts.map((part, index) => {
      if (index % 2 === 1) {
        const username = part.trim();
        for (let i = 0; i < mentionedUsers.length; i++) {
          const mentiondUserID = mentionedUsers[i];
          if (mentiondUserID !== undefined) {
            mentiondUser = userAllData.find(user => {
              return user?.uid === mentiondUserID;
            });
          }
        }

        return (
          <TouchableOpacity
            // onLongPress={() => {
            //   let userNameWith = `@${username}`;
            //   copyToClipboard(userNameWith);
            // }}
            key={index}
            onPress={() => handleUsernamePress(mentiondUser)}>
            <Text
              selectable={true}
              style={{
                color: colors.green,
              }}>
              @{username}
            </Text>
          </TouchableOpacity>
        );
      } else {
        return (
          // <TouchableWithoutFeedback
          // onLongPress={() => copyToClipboard(part)}
          // >
          <Text selectable={true} style={{color: colors.black}} key={index}>
            {part}
          </Text>
          // </TouchableWithoutFeedback>
        );
      }
    });

    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {processedParts}
      </View>
    );
  };
  const copyToClipboard = text => {
    Clipboard.setString(text);
    console.log(`Copied ${text}`);
    Toast.show('Text Copied!');
  };
  const handleUsernamePress = mentiondUser => {
    console.log('User with ID', mentiondUser?.uid, 'was pressed.');
    if (currentUser?.BlockUsers?.includes(mentiondUser?.uid)) {
      props.navigation.navigate('BlockScreen');
      return;
    }
    if (mentiondUser?.uid === currentUser?.uid) {
      props?.navigation.navigate('Profile', {
        event: mentiondUser?.uid,
      });
      return;
    }
    props?.navigation.navigate('UserProfile', {
      event: mentiondUser?.uid,
    });
  };

  return (
    <View>
      {props?.item?.repostedBy ? (
        <TouchableOpacity
          onPress={onRepostedNavigate}
          style={{
            ...commonStyles.rowContainer,
            paddingHorizontal: scale(30),
            paddingVertical: scale(7),
          }}>
          <Image
            source={icons.fillShare}
            style={{
              width: scale(16),
              height: scale(16),
            }}
          />
          <Spacer width={15} />
          <CustomText
            label={
              props?.item?.repostedBy?.uid == currentUser?.uid
                ? 'You'
                : props?.item?.repostedBy?.name
            }
            fontFamily={InterFont.semiBold}
          />
          <Spacer width={2} />
          <CustomText label={'reposted'} fontFamily={InterFont.semiBold} />
        </TouchableOpacity>
      ) : (
        <></>
      )}

      <View
        style={
          props?.item?.repostedBy ? styles.existHeader : styles.defaultHeader
        }>
        <View style={{...commonStyles.rowContainer}}>
          <CustomImage
            onImagePress={onNavigate}
            width={45}
            height={45}
            imageUrl={userProfileData?.profileImage}
          />

          <TouchableOpacity
            style={{marginLeft: scale(7), width: '70%'}}
            activeOpacity={0.6}
            onPress={() => {
              onNavigate();
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ListItem.Title
                textTransform={'capitalize'}
                numberOfLines={1}
                style={{fontFamily: InterFont.bold}}>
                {userProfileData?.name ? (
                  userProfileData.name
                ) : (
                  <UserNameLayout />
                )}
              </ListItem.Title>
            </View>

            <Spacer height={3} />
            <View style={{...commonStyles.rowContainer, width: '60%'}}>
              <CustomText
                label={
                  userProfileData?.username !== undefined ? (
                    `${userProfileData?.username}`
                  ) : (
                    <UserNameLayout />
                  )
                }
                fontSize={10}
                numberOfLines={1}
              />
              {userProfileData?.trophy == 'verified' && (
                <Image
                  resizeMode="contain"
                  style={{width: 15, height: 15}}
                  source={icons.trophyIcon}
                />
              )}
              <CustomText label={'-'} marginLeft={5} fontSize={10} />

              <CustomText
                label={
                  dateFormat === 'Today'
                    ? moment(props.item?.createAt.toDate()).fromNow()
                    : moment(props.item?.createAt.toDate()).format(
                        'DD MMM h:mm A',
                      )
                }
                fontSize={10}
                marginLeft={5}
              />
            </View>
            {props?.item?.location ? (
              <>
                <Spacer height={3} />

                <View style={{...commonStyles.rowContainer, width: '60%'}}>
                  <Octicons
                    name="location"
                    size={moderateScale(10)}
                    // color={colors.inputGray}
                  />
                  <CustomText
                    label={`${props.item?.location}`}
                    fontSize={10}
                    marginLeft={3}
                    numberOfLines={1}

                    // fontFamily={InterFont.medium}
                  />
                </View>
              </>
            ) : null}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          style={{width: scale(50), alignItems: 'flex-end'}}
          onPress={() => {
            props.setSelectPost(props?.item);
            props.setShowPostPotions(!props.showPostPotions);
            // onDeletePost(props.postData?.postId);
          }}>
          <Avatar source={icons.menu} />
        </TouchableOpacity>
      </View>
      {props.item?.description ? (
        <PH10>
          <View>{renderPostDescription()}</View>
        </PH10>
      ) : (
        <></>
      )}

      {/* <PostHeader
        authData={props?.currentUser}
        postData={props.item}
        setUserProfileData={setUserProfileData}
        userProfileData={userProfileData}
        setShowPostPotions={props?.setShowPostPotions}
       showPostPotions={props.showPostPotions}
        setSelectPost={props?.setSelectPost}
        getAllPost={props.getAllPost}
        navigation={props.navigation}
      /> */}
      <Spacer height={10} />

      <View>
        <TouchableOpacity
          activeOpacity={
            props.item?.uriData?.type?.includes('image')
              ? // ||props.item?.uriData?.type?.includes('video')
                0.6
              : 1
          }
          onPress={() => {
            props.setPostObject(props?.item);
            props.setPostIndex(props?.index);
            incrementViewCount(props?.item?.postId, currentUser, setViewCount);
            props.setViewPostModal(true);
          }}>
          {!props.item?.uriData.type ? (
            <></>
          ) : (
            <>
              {!props.item?.uriData?.type?.includes('image') ? (
                <>
                  <TapGestureHandler
                    onHandlerStateChange={handleDoubleTap}
                    numberOfTaps={2}>
                    <View style={styles.postContainer}>
                      <VideoPlayer
                        ref={videoRef}
                        onPlayPress={handleSingleTap}
                        autoplay={false}
                        defaultMuted={true}
                        resizeMode="cover"
                        playButton={true}
                        pauseOnPress={true}
                        videoWidth={1400}
                        videoHeight={1500}
                        video={{uri: props.item?.uriData?.uri}}
                        thumbnail={{uri: props.item?.uriData?.thumbnail}}
                      />
                    </View>
                  </TapGestureHandler>
                </>
              ) : (
                <>
                  <FastImage
                    source={
                      props.item.uriData.uri !== ''
                        ? {uri: props?.item?.uriData?.uri}
                        : images.postPic
                    }
                    style={styles.postContainer}
                  />
                </>
              )}
            </>
          )}
        </TouchableOpacity>
        <Spacer height={5} />
        <PH10>
          {/* <PostItemBottom
            postData={props.item}
            internalShare={props?.internalShare}
            repost={props?.repost}
            setRepost={props?.setRepost}
            likePost={likePost}
            heartPost={heartPost}
            sendMedalNotification={onSendNotification}
            userProfileData={userProfileData}
            setHeartPost={setHeartPost}
            setSelectPost={props?.setSelectPost}
            viewComments={viewComments}
            setShowReportPotions={props.setShowReportPotions}
            setViewComments={setViewComments}
            commentCount={commentCount}
            setCommentCount={setCommentCount}
            setIsCommentsOpen={setIsCommentsOpen}
            setLikePost={setLikePost}
            navigation={props.navigation}
            onInternalShare={() => {
              props.navigation.navigate('InternalShare', {
                postId: props?.item?.postId,
                internalShareIds: props?.item?.internalShareIds,
              });
            }}
            viewCount={viewCount}
          /> */}

          <View style={{...commonStyles.rowJustify, paddingVertical: 10}}>
            <TouchableOpacity
              onLongPress={() => {
                props.navigation.navigate('AllViewBy', {
                  eventBy: 'Liked by',
                  postID: props.item?.postId,
                });
              }}
              onPress={() => {
                handlePress(
                  props.item,
                  currentUser,
                  setLikeCount,
                  setImageSource,
                  props.likePost,
                  icons,
                  userProfileData,
                );
              }}
              style={{flexDirection: 'row', width: 33, alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                source={imageSource}
                style={{
                  width: scale(16),
                  height: scale(14),
                  // backgroundColor:"red"
                }}
              />
              <CustomText
                label={likeCount}
                fontSize={12}
                marginTop={5}
                // marginLeft={-1}
                color={colors.black}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setViewComments(!props.viewComments),
                  setIsCommentsOpen(!props.isCommentsOpen);
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={icons.comment}
                style={{
                  ...styles.postFooterIcon,
                }}
              />

              <CustomText
                label={commentCount}
                fontSize={12}
                marginTop={3}
                marginLeft={2}
                color={colors.black}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onLongPress={() => {
                // dispatch(setAllViewIds(props.postData?.rePostIds));
                props.navigation.navigate('AllViewBy', {
                  eventBy: 'Reposted by',
                  postID: props.item?.postId,
                });
              }}
              onPress={() => {
                props?.setSelectPost(props.item);
                props.setShowReportPotions(true);
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={
                  repostIds && repostIds.length > 0
                    ? icons.fillShare
                    : icons.unfillShare
                }
                style={{
                  ...styles.postFooterIcon,
                  tintColor:
                    repostIds && repostIds.length > 0
                      ? // && repostIds.includes(currentUser.uid)
                        colors.green
                      : colors.black,
                }}
              />
              <Spacer width={5} />
              <CustomText
                label={
                  props.item?.rePostCount > repostCount
                    ? props.item?.rePostCount
                    : repostCount
                }
                fontSize={12}
                marginTop={3}
                color={colors.black}
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Image
                  source={icons.view}
                  style={{
                    width: scale(14),
                    height: scale(16),
                  }}
                />
              </View>

              <Spacer width={5} />
              <View>
                <CustomText
                  label={viewCount}
                  fontSize={12}
                  marginTop={5}
                  color={colors.black}
                />
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.6}
              onLongPress={() => {
                props.navigation.navigate('AllViewBy', {
                  eventBy: 'Send by',
                  postID: props.item?.postId,
                });
              }}
              onPress={() =>
                props.navigation.navigate('InternalShare', {
                  postId: props?.item?.postId,
                  internalShareIds: props?.item?.internalShareIds,
                })
              }
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={icons.share}
                style={{
                  ...styles.postFooterIcon,
                }}
              />

              <Spacer width={5} />
              <CustomText
                label={
                  props?.internalShare > internalShareCount
                    ? props?.internalShare
                    : internalShareCount
                }
                fontSize={12}
                marginTop={3}
                marginLeft={-2}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
        </PH10>
      </View>

      <Divider width={5} color={colors.divider} />
      {viewComments ? (
        <>
          <View>
            <PostComment
              postData={props.comments}
              setViewComments={setViewComments}
              postId={props?.item?.postId}
              senderId={props?.authId}
              commentCount={commentCount}
              setLikeComment={setLikeComment}
              likeComment={likeComment}
              navigation={props.navigation}
              image={image}
              setNewCommentAdd={setNewCommentAdd}
              setPostID={setPostID}
              isCommentsOpen={isCommentsOpen}
              setIsCommentsOpen={setIsCommentsOpen}
            />
            <Divider width={5} color={colors.divider} />
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    height: verticalScale(350),
    overflow: 'hidden',
  },
  postFooterIcon: {
    width: 24,
    height: 26,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(10),
  },
  existHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingBottom: scale(10),
  },
  postFooterIcon: {
    width: scale(16),
    height: scale(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
