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
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import commonStyles, {PH10, PH20} from '../../../utils/CommonStyles';
import {Spacer} from '../../../components/Spacer';
import {images} from '../../../assets/images';
import ProfileTop from './Molecules/ProfileTop';
import {colors} from '../../../utils/Colors';
import {scale, verticalScale} from 'react-native-size-matters';
import ProfilePhoto from '../../../components/ProfilePhoto';
import ProfileMainTop from './Molecules/ProfileMainTop';
import ProfileMainBody from './Molecules/ProfileMainBody';
import {useFocusEffect} from '@react-navigation/native';
import CustomText from '../../../components/CustomText';
import {useDispatch, useSelector} from 'react-redux';
import CustomImage from '../../../components/CustomImage';
import {getSpecificUser} from '../../services/UserServices';
import {useIsFocused} from '@react-navigation/native';
import {TourGuideZoneByPosition, useTourGuideController} from 'rn-tourguide';
import AppTour from '../../../components/AppTour';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileImageView from '../../../components/ProfileImageView';
import SetBackgroundSheet from './Molecules/SetBackgroundSheet';
import SepratorLine from '../../../components/SepratorLine';
import {InterFont} from '../../../utils/Fonts';
import ProfileTabs from '../../../components/ProfileTabs';
import {deletePost, getPosts} from '../../services/PostServices';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-root-toast';
import ReportSheet from '../ArenaScreen/Molecules/ReportSheet';
import PostOptionsSheet from '../ArenaScreen/Molecules/PostOptionsSheet';
import ViewPost from '../ArenaScreen/Molecules/ViewPost';
import PostItem from '../ArenaScreen/Molecules/PostItem';
import UserHightLightContainer from '../UserProfile/Molecules/UserHightLightContainer';
import MediaView from '../../../components/MediaView';
import SimpleLoader from '../../../utils/SimpleLoader';
import loaderAnimation from '../../../assets/Loaders';
import _ from 'lodash';
import Loader from '../../../utils/Loader';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';
const ProfileScreen = ({navigation, route}) => {
  const CurrentUser = useSelector(state => state.auth?.currentUser);

  const dispatch = useDispatch();
  const [imageViewModal, setImageViewModal] = useState(false);
  const [imageObject, setImageObject] = useState('');
  const [userEvent, setUserEvent] = useState({});
  const [userData, setUserData] = useState({});
  const [isAppTour, setIsAppTour] = useState(false);
  const [isbackgroundSheet, setIsbackgroundSheet] = useState(false);
  const [tabIndex, SetTabIndex] = useState(0);
  const [followerState, setFollowerState] = useState(false);
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
  const [isLoading, setIsLoading] = useState(false);
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
  const [refreshing, setRefreshing] = useState(false);

  const statsArray = [
    {id: 1, name: 'Sport', value: CurrentUser?.selectSport},
    {id: 2, name: 'Account Type', value: CurrentUser?.accountType},
    {id: 3, name: 'Country', value: CurrentUser?.country},
    {id: 4, name: 'City', value: CurrentUser?.city},
    {id: 5, name: 'Skill #1', value: CurrentUser?.skill1},
    {id: 6, name: 'Skill #2', value: CurrentUser?.skill2},
    {id: 7, name: 'Skill #3', value: CurrentUser?.skill3},
    {
      id: 8,
      name: 'Age',
      value: CurrentUser?.age ? CurrentUser?.age + ' ' + 'years' : '',
    },

    {
      id: 9,
      name: 'Email',
      value: CurrentUser?.email ? CurrentUser?.email : '____________',
    },
    {id: 10, name: 'Height', value: CurrentUser.height},
    {id: 11, name: 'Strong Hand', value: CurrentUser?.strongHand},
    {id: 12, name: 'Strong Foot', value: CurrentUser?.strongFoot},
  ];

  const [numColumns, setNumColumns] = useState(3);
  const handleNumColumnsChange = newNumColumns => {
    // Change the key to force a fresh render when the number of columns changes
    setNumColumns(newNumColumns + 1);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        console.log('running focus profile', isLoading);
        setIsLoading(true);
        await getUserAllData();
        SetTabIndex(0);
        setTimeout(() => {
          checkAppTour();
        }, 2000);

        try {
          setTimeout(() => {
            fetchUserPosts(),
              fetchHighlights(),
              fetchSquad(),
              setIsLoading(false);
          }, 500);
        } catch (error) {
          console.error('Error during focus effect:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();

      // Return the cleanup function
      return () => {
        // Additional cleanup if needed
        setUserEvent(route?.params?.event);
      };
    }, [
      getUserAllData,
      checkAppTour,
      SetTabIndex,
      fetchUserPosts,
      fetchHighlights,
      fetchSquad,
      setUserEvent,
      route?.params?.event,
    ]),
  );

  const getAllPost = () => {
    try {
      getPosts(setPostData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSquad = async () => {
    const CurrentUserAllFollowers = CurrentUser.AllFollowers;
    // console.log('CurrentUserPosts', CurrentUserAllFollowers);
    const squadData = [];

    try {
      if (
        Array.isArray(CurrentUserAllFollowers) &&
        CurrentUserAllFollowers.length > 0
      ) {
        CurrentUserAllFollowers.map(async element => {
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
    const CurrentUserPosts = CurrentUser.PostIds;
    // console.log('CurrentUserPosts', CurrentUserPosts);
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

      if (Array.isArray(CurrentUserPosts) && CurrentUserPosts?.length > 0) {
        // Use forEach with async when iterating through userData?.PostIds

        CurrentUserPosts.map(async element => {
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
        // console.log('🚀sortedArray:', sortedArray);
        setCommentaryData(sortedArray);
      }
    } catch (error) {
      console.error('fetchUserPosts error', error);
    }
  };

  const fetchHighlights = () => {
    const CurrentUserPosts = CurrentUser.PostIds;
    // console.log('CurrentUserPosts', CurrentUserPosts);
    try {
      if (Array.isArray(CurrentUserPosts) && CurrentUserPosts.length > 0) {
        const filterIds = CurrentUserPosts?.filter(item => item.type != '');
        const sortedByDate = _.orderBy(filterIds, item => item?.createAt, [
          'desc',
        ]);
        setHightLightData(sortedByDate);
      }
    } catch (error) {
      console.log('fetchHighlights error', error);
    }
  };

  const onCloseModal = () => {
    setShowPostPotions(!showPostPotions);
  };
  const onReportModal = () => {
    setShowReportPotions(false);
  };
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

  const toggleModal = async () => {
    try {
      await AsyncStorage.removeItem('contactUsTour');
    } catch (error) {}

    setIsAppTour(!isAppTour);
  };
  const getUserAllData = async () => {
    const userData = await getSpecificUser(CurrentUser?.uid);
    dispatch({type: 'UPDATE_CURRENT_USER', payload: userData});
    setUserData(userData);
  };

  const checkAppTour = async () => {
    try {
      const value = await AsyncStorage.getItem('contactUsTour');
      if (value) {
        setIsAppTour(true);
      }
    } catch (error) {}
  };
  const RenderPostData = ({item, index}) => {
    return (
      <View>
        <PostItem
          navigation={navigation}
          index={index}
          item={item}
          getAllPost={getAllPost}
          authData={CurrentUser}
          setShowPostPotions={setShowPostPotions}
          authId={CurrentUser?.uid}
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
              onLongPress={() => setIsbackgroundSheet(true)}
              activeOpacity={0.7}
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
                <ProfileTop
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

            <ProfileMainTop
              navigation={navigation}
              CurrentUser={userData}
              authId={userData.uid}
              userEvent={userEvent}
              setFollowerState={setFollowerState}
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
                // ListEmptyComponent={emptyListComponent}
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
                // ListEmptyComponent={emptyListComponent}
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
                // ListEmptyComponent={emptyListComponent}
              />
            )}
          </View>
        </>
      )}
      <AppTour
        title="Help / Support"
        emoji="👩‍💻"
        description={
          'If you encounter any issues while using the app please press the Contact Us button.'
        }
        toggleModal={toggleModal}
        isModalVisible={isAppTour}
      />
      <ProfileImageView
        modalVisible={imageViewModal}
        image={imageObject}
        setModalVisible={setImageViewModal}
      />

      <SetBackgroundSheet
        modalVisible={isbackgroundSheet}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        navigation={navigation}
        onCloseModal={() => setIsbackgroundSheet(false)}
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
      <PostOptionsSheet
        modalVisible={showPostPotions}
        onCloseModal={onCloseModal}
        selectPost={selectPost}
        postOptionRef={postOptionRef}
        selectedId={selectPost?.userId}
        authData={CurrentUser}
        onDelPost={delPost}
        onCopyLink={onCopyPostLink}
        navigation={navigation}
      />
      <ReportSheet
        modalVisible={showReportPotions}
        onCloseModal={onReportModal}
        selectPost={selectPost}
        selectedId={selectPost?.userId}
        authUser={CurrentUser}
        dispatch={dispatch}
        onDelPost={delPost}
        navigation={navigation}
        setRepost={setRepost}
      />
      <MediaView
        setViewMedia={setViewMedia}
        viewMedia={viewMedia}
        imageIndex={imageIndex}
        userData={userData}
        hightLightData={hightLightData}
        setShowPostPotions={setShowPostPotions}
      />
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  alignContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtWidth: {
    width: scale(100),
    backgroundColor: 'red',
  },
});
