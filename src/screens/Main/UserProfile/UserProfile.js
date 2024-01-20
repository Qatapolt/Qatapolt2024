import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import moment from 'moment';
import React, {useState, useEffect, useRef} from 'react';
import commonStyles, {PH10, PH20} from '../../../utils/CommonStyles';
import {Spacer} from '../../../components/Spacer';
import {images} from '../../../assets/images';
import {colors} from '../../../utils/Colors';
import {scale, verticalScale} from 'react-native-size-matters';
import UserProfileMainTop from './Molecules/UserProfileMainTop';
import UserProfileMainBody from './Molecules/UserProfileMainBody';
import UserProfileTop from './Molecules/UserProfileTop';
import {useDispatch, useSelector} from 'react-redux';
import CustomImage from '../../../components/CustomImage';
import {
  getSpecificUser,
  UpdateBlockUsers,
  UpdateUser,
  UpdateBlockUsersOthers,
  SaveUser,
} from '../../services/UserServices';
import {useIsFocused} from '@react-navigation/native';
import {authData} from '../../../redux/reducers/authReducer';
import Toast from 'react-native-root-toast';
import loaderAnimation from '../../../assets/Loaders';

import Loader from '../../../utils/Loader';
import {setUserData} from '../../../redux/reducers/userReducer';
import {setReportUserId} from '../../../redux/reducers/ReportUserReducer';
import ProfileBottomActionSheet from '../../../components/ProfileBottomActionSheet';
import ProfileImageView from '../../../components/ProfileImageView';
import ProfileTabs from '../../../components/ProfileTabs';
import {deleteImage, deletePost, getPosts} from '../../services/PostServices';
import CustomText from '../../../components/CustomText';
import SepratorLine from '../../../components/SepratorLine';
import _ from 'lodash';
import {InterFont} from '../../../utils/Fonts';
import PostItem from '../ArenaScreen/Molecules/PostItem';
import UserHightLightContainer from './Molecules/UserHightLightContainer';
import {useFocusEffect} from '@react-navigation/native';
import MediaView from '../../../components/MediaView';
import ReportSheet from '../ArenaScreen/Molecules/ReportSheet';
import PostOptionsSheet from '../ArenaScreen/Molecules/PostOptionsSheet';
import ViewPost from '../ArenaScreen/Molecules/ViewPost';
import Clipboard from '@react-native-clipboard/clipboard';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/firestore';
const UserProfile = ({navigation, route}) => {
  const CurrentUser = useSelector(state => state.auth?.currentUser);
  const userData = useSelector(state => state.user?.userData);

  const [showActionPotions, setShowActionPotions] = useState(false);
  const [imageViewModal, setImageViewModal] = useState(false);
  const [imageObject, setImageObject] = useState('');
  const [userEvent, setUserEvent] = useState({});
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [followerState, setFollowerState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [watchListState, setWatchListState] = useState(false);
  const [isAppTour, setIsAppTour] = useState(false);
  const [isbackgroundSheet, setIsbackgroundSheet] = useState(false);
  const [tabIndex, SetTabIndex] = useState(0);

  const [commentaryData, setCommentaryData] = useState([]);
  const [likePost, setLikePost] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [heartPost, setHeartPost] = useState(false);
  const postOptionRef = useRef();
  const [viewPostModal, setViewPostModal] = useState(false);
  const [postIndex, setPostIndex] = useState(-1);
  const [postData, setPostData] = useState([]);
  const [postObject, setPostObject] = useState({});
  const [showPostPotions, setShowPostPotions] = useState(false);
  const [showReportPotions, setShowReportPotions] = useState(false);
  const [selectPost, setSelectPost] = useState({});
  const [squadData, setSquadData] = useState({});
  const [comments, setComments] = useState(0);
  const [commentCounts, setCommentCounts] = useState(0);
  const [newComment, setNewComment] = useState(false);
  const [repost, setRepost] = useState(false);
  const [internalShare, setInternalShare] = useState(false);
  const [hightLightData, setHightLightData] = useState([]);
  const [viewMedia, setViewMedia] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const statsArray = [
    {id: 1, name: 'Sport', value: userData?.selectSport},
    {id: 2, name: 'Account Type', value: userData?.accountType},
    {id: 3, name: 'Country', value: userData?.country},
    {id: 4, name: 'City', value: userData?.city},
    {id: 5, name: 'Skill #1', value: userData?.skill1},
    {id: 6, name: 'Skill #2', value: userData?.skill2},
    {id: 7, name: 'Skill #3', value: userData?.skill3},
    {
      id: 8,
      name: 'Age',
      value: userData?.age ? userData?.age + ' ' + 'years' : '',
    },

    {
      id: 9,
      name: 'Email',
      value: userData?.email ? userData?.email : '____________',
    },
    {id: 10, name: 'Height', value: userData?.height},
    {id: 11, name: 'Strong Hand', value: userData?.strongHand},
    {id: 12, name: 'Strong Foot', value: userData?.strongFoot},
  ];

  const [numColumns, setNumColumns] = useState(3);
  const handleNumColumnsChange = newNumColumns => {
    // Change the key to force a fresh render when the number of columns changes
    setNumColumns(newNumColumns + 1);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        console.log('running focus userProfile', isLoading);
        setIsLoading(true);
        try {
          await getUserData();
          SetTabIndex(0);
          await Promise.all([fetchUserPosts(), fetchHighlights()]);
          setTimeout(() => {
            fetchSquad();
          }, 500);
        } catch (error) {
          console.error('Error during focus effect:', error);
        } finally {
          setIsLoading(false);
        }
        setUserEvent(route?.params?.event);
      };

      fetchData();

      return () => {
        setUserEvent(route?.params?.event);
      };
    }, [
      getUserData,
      SetTabIndex,
      getAllPost,
      fetchUserPosts,
      fetchHighlights,
      fetchSquad,
      setUserEvent,
      route?.params?.event,
    ]),
  );

  const delPost = () => {
    Alert.alert('Delete Post', 'Are you sure you want to delete?', [
      {
        text: 'Yes',
        onPress: async () => {
          if (selectPost.uriData.uri) {
            deleteImage(selectPost?.uriData?.uri);
          }
          deletePost(selectPost?.postId);
          let filterDeletePost = CurrentUser?.PostIds.filter(
            data => data.postId != selectPost?.postId,
          );
          await SaveUser(CurrentUser.uid, {
            PostIds: filterDeletePost,
          });
          const data = await getSpecificUser(CurrentUser?.uid);
          dispatch(CurrentUser(data));
          onCloseModal();
          setRepost(true);
        },
      },
      {
        text: 'No',
        onPress: () => {
          onCloseModal();
        },
      },
    ]);
  };
  const onCopyPostLink = async () => {
    const postLink = await generateLink(selectPost?.postId);
    if (postLink) {
      Clipboard.setString(postLink);
      setShowPostPotions(false);
      Toast.show('Link Copied!');
    }
  };
  const onCloseModal = () => {
    setShowActionPotions(!showActionPotions);
  };
  const onReportModal = () => {
    setShowReportPotions(!showReportPotions);
  };
  const getUserData = async () => {
    const user = await getSpecificUser(route?.params?.event);

    dispatch(setUserData(user));
  };
  const BlockUser = async () => {
    try {
      await UpdateBlockUsers(CurrentUser?.uid, userData?.uid);
      // await UpdateBlockUsersOthers(userData?.uid, CurrentUser.uid);
      const user = await getSpecificUser(CurrentUser?.uid);
      Toast.show('Account Blocked Successfully');
      setShowActionPotions(false);
      dispatch(authData(user));
      navigation.navigate('Arena');
    } catch (error) {
      console.log('Usernot block', error);
    }
  };
  const reportUser = () => {
    dispatch(setReportUserId(userData?.uid));
    setShowActionPotions(false);
    navigation.navigate('ReportPost', {event: 'UserProfile'});
  };

  const getAllPost = () => {
    getPosts(setPostData);
  };

  const fetchSquad = async () => {
    const userAllFollowers = userData.AllFollowers;
    console.log('userAllFollowers', userAllFollowers);
    const squadData = [];

    try {
      if (Array.isArray(userAllFollowers) && userAllFollowers.length > 0) {
        userAllFollowers.map(async element => {
          const data = await getSpecificUser(element);
          if (data !== undefined) {
            squadData.push(data);
          }
        });
      }

      setSquadData(squadData);
    } catch (error) {
      console.error('fetchSquad error', error);
    }
  };
  const fetchUserPosts = async () => {
    const userAllPosts = userData?.PostIds;
    console.log('userAllPosts', userAllPosts);
    const allPostData = [];
    const allPostByUser = [];

    try {
      // Use await with the Firestore query
      const datingSnapshot = await firestore()
        .collection('Posts')
        .orderBy('createAt', 'desc')
        .get();

      // Iterate through the results using forEach
      datingSnapshot.forEach(da => {
        allPostData.push(da.data());
      });

      if (Array.isArray(userAllPosts) && userAllPosts?.length > 0) {
        // Use forEach with async when iterating through userData?.PostIds

        userAllPosts.map(async element => {
          const userPosts = allPostData.find(
            post => post?.postId === element?.postId,
          );
          if (userPosts !== undefined) {
            allPostByUser.push(userPosts);
          }
        });

        const sortedArray = [...allPostByUser].sort((a, b) => {
          const createdAtA = a.createAt.seconds + a.createAt.nanoseconds / 1e9;
          const createdAtB = b.createAt.seconds + b.createAt.nanoseconds / 1e9;
          return createdAtB - createdAtA;
        });
        console.log('🚀sortedArray:', sortedArray);
        setCommentaryData(sortedArray);
      }
    } catch (error) {
      console.error('fetchUserPosts error', error);
    }
  };

  const fetchHighlights = () => {
    const userAllPosts = userData.PostIds;
    console.log('userAllPosts', userAllPosts);
    try {
      if (Array.isArray(userAllPosts) && userAllPosts.length > 0) {
        const filterIds = userAllPosts?.filter(item => item.type != '');
        const sortedByDate = _.orderBy(filterIds, item => item?.createAt, [
          'desc',
        ]);
        setHightLightData(sortedByDate);
      }
    } catch (error) {
      console.log('fetchHighlights error', error);
    }
  };
  const RenderPostData = ({item, index}) => {
    return (
      <View>
        <PostItem
          navigation={navigation}
          index={index}
          item={item}
          getAllPost={getAllPost}
          authData={authData}
          setShowPostPotions={setShowPostPotions}
          authId={authData?.uid}
          setSelectPost={setSelectPost}
          setPostObject={setPostObject}
          setShowReportPotions={setShowReportPotions}
          setPostIndex={setPostIndex}
          showPost={showPost}
          setShowPost={setShowPost}
          setViewPostModal={setViewPostModal}
          heartPost={heartPost}
          setHeartPost={setHeartPost}
          likePost={likePost}
          setLikePost={setLikePost}
          comments={item.comments.length > 0 ? item.comments : []}
          setComments={setComments}
          commentCounts={
            item?.comment_Count === undefined || item?.comment_Count === 0
              ? 0
              : item.comment_Count
          }
          setCommentCounts={setCommentCounts}
          setNewComment={setNewComment}
          repost={repost}
          setRepost={setRepost}
          internalShare={
            item?.internalShare === internalShare
              ? internalShare
              : item?.internalShare
          }
          rePostIds={item?.rePostIds ? item.rePostIds : null}
        />
      </View>
    );
  };
  const renderHightLightData = ({item, index}) => {
    return (
      <UserHightLightContainer
        index={index}
        setViewMedia={setViewMedia}
        setImageIndex={setImageIndex}
        postId={item.postId}
      />
    );
  };
  const renderStats = ({item}) => {
    return (
      <>
        <View
          style={{
            marginVertical: verticalScale(15),
            width: '100%',
            flexDirection: 'row',
            marginHorizontal: 30,
          }}>
          <View style={{width: '30%'}}>
            <CustomText
              label={`${item.name}:`}
              fontSize={11}
              marginLeft={5}
              textAlign="center"
              color={colors.inputGray}
              fontFamily={InterFont.semiBold}
            />
          </View>
          <View style={{width: '70%'}}>
            <CustomText
              label={item.value}
              fontSize={11}
              alignSelf="center"
              marginLeft={5}
              textAlign="center"
              color={colors.black}
              fontFamily={InterFont.semiBold}
            />
          </View>

          <Spacer height={10} />
        </View>
      </>
    );
  };
  const getHeader = () => {
    return (
      <>
        <View>
          <ImageBackground
            style={{width: '100%', height: 250}}
            resizeMode={'cover'}
            source={
              userData?.profileBackground
                ? {uri: userData?.profileBackground}
                : images.background
            }>
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={!userData?.profileBackground ? true : false}
              style={{width: '100%', height: 250}}
              onPress={() => {
                setImageObject(
                  userData?.profileBackground
                    ? userData?.profileBackground
                    : userData?.profileImage,
                );
                setImageViewModal(true);
              }}>
              <View
                style={{
                  borderRadius: 10,
                  opacity: 0.1,
                  backgroundColor: '#454545',
                  width: '100%',
                  height: '100%',
                }}
              />

              <Spacer height={Platform.OS == 'ios' ? 50 : 20} />
              <View style={{position: 'absolute', top: 50, width: '100%'}}>
                <UserProfileTop
                  onBlockUser={BlockUser}
                  setSheetVisible={setShowActionPotions}
                  onReportUser={reportUser}
                  CurrentUser={userData}
                  userEvent={userEvent}
                  navigation={navigation}
                />
              </View>
            </TouchableOpacity>
          </ImageBackground>

          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
              borderTopLeftRadius: scale(20),
              borderTopRightRadius: scale(20),
              marginTop: -20,
            }}>
            <View
              style={{
                position: 'absolute',
                top: verticalScale(-50),
                alignSelf: 'center',
              }}>
              <CustomImage
                isVerified={userData?.trophy == 'verified' ? true : false}
                disabled={!userData?.profileImage ? true : false}
                onImagePress={() => {
                  setImageObject(userData?.profileImage);
                  setImageViewModal(true);
                }}
                imageUrl={userData?.profileImage}
                mainStyle={{
                  shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
                  shadowRadius: 2,
                  elevation: 5,
                  shadowOpacity: 0.4,
                  // inputMarginTop:-20,
                  shadowOffset: {width: -1, height: 3},
                }}
              />
            </View>

            <UserProfileMainTop
              navigation={navigation}
              CurrentUser={userData}
              authId={CurrentUser.uid}
              authUser={CurrentUser}
              userEvent={userEvent}
              setFollowerState={setFollowerState}
              setWatchListState={setWatchListState}
              watchListState={watchListState}
              followerState={followerState}
            />
            <Spacer height={20} />
            <View style={{width: '100%'}}>
              <SepratorLine height={8} />
              <Spacer height={20} />

              {Array.isArray(squadData) && squadData.length > 0 && (
                <>
                  <PH20>
                    <View style={commonStyles.rowJustify}>
                      <CustomText
                        label="Squad"
                        fontSize={12}
                        textAlign="center"
                        color={colors.black}
                        fontFamily={InterFont.semiBold}
                      />
                    </View>
                  </PH20>

                  <Spacer height={20} />

                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        paddingLeft: scale(10),
                      }}>
                      {Array.isArray(squadData) &&
                        squadData.length > 0 &&
                        squadData?.map(item => {
                          return (
                            <>
                              <RenderPeople item={item} />
                            </>
                          );
                        })}
                    </View>
                  </ScrollView>
                  <Spacer height={20} />
                  <SepratorLine height={8} />
                </>
              )}

              <Spacer height={20} />

              <ProfileTabs tabIndex={tabIndex} SetTabIndex={SetTabIndex} />
              <Spacer height={20} />
            </View>
          </View>
        </View>
      </>
    );
  };
  const emptyListComponent = () => {
    return (
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <CustomText
            label={isLoading ? 'Fetching Posts' : 'no Recods Found'}
            fontSize={12}
            textAlign="center"
            color={colors.black}
            fontFamily={InterFont.semiBold}
          />
        </View>
      </>
    );
  };

  const onNavigate = item => {
    if (userData?.BlockUsers?.includes(item?.uid)) {
      navigation.navigate('BlockScreen');

      return;
    }

    if (item.uid == userData?.uid) {
      navigation.navigate('Profile', {
        event: item.uid,
      });
      return;
    }
    if (item?.isOther === undefined) {
      navigation.navigate('UserProfile', {
        event: item.uid,
      });

      return;
    }
    navigation.navigate('OtherUserProfile', {
      event: item.uid,
    });
  };
  const RenderPeople = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => onNavigate(item)}
        style={{marginHorizontal: scale(10)}}>
        <CustomImage
          onImagePress={() => onNavigate(item)}
          imageUrl={item?.profileImage}
          width={50}
          height={50}
        />
        <View style={{width: scale(55), alignItems: 'center'}}>
          <CustomText
            label={item?.name}
            numberOfLines={1}
            marginTop={5}
            fontSize={9}
            textAlign="center"
            color={colors.black}
            fontFamily={InterFont.bold}
            onPress={() => onNavigate(item)}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const Loading = () => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999999999999,
          height: '100%',
          width: '100%',
        }}>
        <Loader file={loaderAnimation} />
      </View>
    );
  };

  return (
    <>
      {tabIndex === 0 ? (
        <>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
            }}>
            {isLoading ? (
              <Loading />
            ) : (
              <FlatList
                data={commentaryData}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item?.postId?.toString()}
                renderItem={RenderPostData}
                nestedScrollEnabled
                ListHeaderComponent={getHeader}
                ListEmptyComponent={emptyListComponent}
                // refreshControl={
                //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                // }
              />
            )}
          </View>
        </>
      ) : tabIndex === 1 ? (
        <>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
            }}>
            {isLoading ? (
              <Loading />
            ) : (
              <FlatList
                data={hightLightData}
                showsHorizontalScrollIndicator={false}
                numColumns={numColumns}
                key={`${numColumns}`} // Change the key when the number of columns changes
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderHightLightData}
                ListHeaderComponent={getHeader}
                ListEmptyComponent={emptyListComponent}
                // refreshControl={
                //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                // }
              />
            )}
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
            }}>
            {isLoading ? (
              <Loading />
            ) : (
              <FlatList
                data={statsArray}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderStats}
                ListHeaderComponent={getHeader}
                ListEmptyComponent={emptyListComponent}
              />
            )}
          </View>
        </>
      )}
      <ProfileBottomActionSheet
        modalVisible={showActionPotions}
        onCloseModal={onCloseModal}
        onBlockUser={BlockUser}
        onReportUser={reportUser}
        navigation={navigation}
      />
      <ViewPost
        viewPostModal={viewPostModal}
        postIndex={postIndex}
        postObject={postObject}
        setViewPostModal={setViewPostModal}
        setSelectPost={setSelectPost}
        ikePost={likePost}
        setLikePost={setLikePost}
        navigation={navigation}
        setShowPost={setShowPost}
        showPost={showPost}
        showPostPotions={showPostPotions}
        setShowPostPotions={setShowPostPotions}
      />
      {/* <PostOptionsSheet
        modalVisible={showPostPotions}
        onCloseModal={onCloseModal}
        selectPost={selectPost}
        postOptionRef={postOptionRef}
        selectedId={selectPost?.userId}
        authData={CurrentUser}
        onDelPost={delPost}
        onCopyLink={onCopyPostLink}
        navigation={navigation}
      /> */}
      {/* <ReportSheet
        modalVisible={showReportPotions}
        onCloseModal={onReportModal}
        selectPost={selectPost}
        selectedId={selectPost?.userId}
        authUser={CurrentUser}
        dispatch={dispatch}
        onDelPost={delPost}
        navigation={navigation}
        setRepost={setRepost}
      /> */}
      <MediaView
        setViewMedia={setViewMedia}
        viewMedia={viewMedia}
        imageIndex={imageIndex}
        userData={userData}
        hightLightData={hightLightData}
        setShowPostPotions={setShowPostPotions}
      />
      <ProfileImageView
        modalVisible={imageViewModal}
        image={imageObject}
        setModalVisible={setImageViewModal}
      />
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  alignContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtWidth: {
    width: scale(170),
    // backgroundColor: 'red',
  },
});
