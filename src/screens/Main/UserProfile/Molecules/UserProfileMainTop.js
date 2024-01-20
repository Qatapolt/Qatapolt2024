import {StyleSheet, Text, View, TouchableOpacity, Platform,Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {InterFont} from '../../../../utils/Fonts';
import uuid from 'react-native-uuid';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {Spacer} from '../../../../components/Spacer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles, {PH10, PH20} from '../../../../utils/CommonStyles';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../../../../components/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CheckBox, Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import FollowedContainer from './UserFollowedContainer';
import {
  getSpecificUser,
  SaveUser,
  UpdateFollower,
  UpdateFollowing,
  UpdateFollowRequest,
  UpdateUser,
  UpdateWatchList,
} from '../../../services/UserServices';
import {useDispatch} from 'react-redux';
import {authData} from '../../../../redux/reducers/authReducer';
import {
  NotificationSender,
  postNotification,
  sendNotification,
} from '../../../services/NotificationServices';
import { icons } from '../../../../assets/icons';

const UserProfileMainTop = ({
  CurrentUser,
  userEvent,
  authId,
  authUser,
  setFollowerState,
  followerState,
  setWatchListState,
  watchListState,
}) => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isFollow, setIsFollow] = useState(false);
  const [watchList, setWatchList] = useState(false);
  const dispatch = useDispatch();
  const [check1, setCheck1] = useState(false);
  const followArray = [
    {id: 1, follow: CurrentUser?.followers, following: 'Followers'},
    {id: 2, follow: CurrentUser?.following, following: 'Following'},
  ];
  let userFollowExist = CurrentUser?.AllFollowers?.includes(authId);
  let followRequestExist = CurrentUser?.RequestIds?.includes(authId);

  let authWatchListExist = authUser?.WatchList?.map(data => data)?.includes(
    CurrentUser?.uid,
  );
  const onUserFollower = async () => {
    if (userFollowExist) {
      // check auth following
      let authFollowingExist = authUser?.AllFollowing?.map(
        data => data,
      )?.includes(CurrentUser?.uid);
      // filter user followers
      let filterUserFollowerList = CurrentUser?.AllFollowers.filter(
        data => data != authId,
      );
      await SaveUser(CurrentUser?.uid, {
        followers: CurrentUser?.followers - 1,
        AllFollowers: filterUserFollowerList,
      });
      // check auth following
      if (authFollowingExist) {
        let filterFollowingList = authUser?.AllFollowing.filter(
          data => data != CurrentUser?.uid,
        );
        await SaveUser(authId, {
          following: authUser?.following - 1,
          AllFollowing: filterFollowingList,
        });
      }

      const data = await getSpecificUser(authId);
      dispatch(authData(data));
      setFollowerState(!followerState);

      return;
    }
    if (CurrentUser?.privateProfile) {
      if (followRequestExist) {
        // console.log('lvnlcnvln');

        // filter user followers
        let filterUserFollowRequest = CurrentUser?.RequestIds.filter(
          data => data != authId,
        );
        await SaveUser(CurrentUser?.uid, {
          RequestIds: filterUserFollowRequest,
        });

        setFollowerState(!followerState);
      } else {
        const id = uuid.v4();
        await UpdateFollowRequest(CurrentUser.uid, authUser?.uid, id);
        sendFollowerNotification('Follow Request', 'FOLLOW__REQUEST', id);
        setFollowerState(!followerState);
      }
      return;
    }
    try {
      // update user followers
      await UpdateFollower(CurrentUser.uid, authUser?.uid);
      await SaveUser(CurrentUser?.uid, {followers: CurrentUser?.followers + 1});
      //  update auth following
      await SaveUser(authId, {following: authUser?.following + 1});
      await UpdateFollowing(authId, CurrentUser?.uid);

      const data = await getSpecificUser(authId);
      dispatch(authData(data));

      setFollowerState(!followerState);

      // sendNotification(authUser,  CurrentUser, authUser?.profileImage?authUser?.profileImage:undefined, "Follow You", "Follow You")

      sendFollowerNotification('Follow You', 'FOLLOW', uuid.v4());
    } catch (error) {
      console.log('ErrorHai', error);
    }
  };

  const sendFollowerNotification = async (message, type, id) => {
    const senderName = `${authUser?.name} ${message}`;

    NotificationSender(CurrentUser?.fcmToken, message, senderName);

    const senderData = {
      message: message,
      thumbnail: CurrentUser?.profileImage ? CurrentUser?.profileImage : '',
      senderName: authUser?.name,
      senderId: authUser?.uid,
      senderUsername: authUser?.username,
      notificationType: type,
      id: id,
      receiverId: CurrentUser?.uid,
      createdAt: new Date(),
      senderImage: authUser?.profileImage ? authUser?.profileImage : '',
    };

    await postNotification(senderData);
  };

  const onWatchListUser = async () => {
    try {
      if (authWatchListExist) {
        let filterAuthWatchList = authUser?.WatchList.filter(
          data => data != CurrentUser?.uid,
        );
        await SaveUser(authId, {
          WatchList: filterAuthWatchList,
        });
        const data = await getSpecificUser(authId);
        dispatch(authData(data));
        setWatchListState(!watchListState);
        return;
      }
      await UpdateWatchList(authId, CurrentUser?.uid);
      const data = await getSpecificUser(authId);
      dispatch(authData(data));
      setWatchListState(!watchListState);
    } catch (error) {}
  };
  const onNavigate = item => {
    // console.log('ItemFollower', item);
    if (item?.following == 'Followers') {
      navigation.navigate('UserFollowers', {
        data: item,
        AllFollowers: CurrentUser?.AllFollowers,
      });

      return;
    }

    if (item?.following == 'Following') {
      navigation.navigate('UserFollowing', {
        data: item,
        AllFollowing: CurrentUser?.AllFollowing,
      });
      return;
    }
  };

  const Tab = ({onPress, index, ...props}) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignSelf: 'center',
        // flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: scale(80),
        maxWidth: scale(100),
        // borderWidth: index === indexMain ? 1 : 0,
        // borderColor: index === indexMain ? colors.primary : colors.grey3,
        borderRadius: 100,
        backgroundColor: colors.superLightGray,
        // padding:20
        height: verticalScale(30),
      }}>
      <CustomText
        label={CurrentUser?.accountType}
        color={colors.black}
        fontFamily={InterFont.medium}
        fontSize={12}
      />
    </TouchableOpacity>
  );
  const FollowUser = ({onFollowUser, onWatchList}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        {/* userId={item.from==currentUser.uid?item.to:item.from}
      formId={item.from} */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ChatDetail', {
              userId: CurrentUser.uid,
              formId: authId,
            })
          }
          activeOpacity={0.6}
          style={styles.followContainer}>
          <MaterialCommunityIcons
            name="message-text-outline"
            size={moderateScale(25)}
            color={colors.green}
          />
        </TouchableOpacity>
        <CustomButton
          height={verticalScale(30)}
          onPress={onFollowUser}
          borderRadius={scale(20)}
          //  color={userFollowExist  ? colors.white : colors.black}
          // title={userFollowExist?"Unfollow":"Follow"}
          color={
            followRequestExist
              ? colors.white
              : userFollowExist
              ? colors.white
              : colors.black
          }
          title={
            followRequestExist
              ? 'Requested'
              : userFollowExist
              ? 'Unfollow'
              : 'Follow'
          }
          width={'40%'}
          marginHorizontal={20}
          btnStyle={{
            shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
            shadowRadius: 2,
            elevation: 5,
            shadowOpacity: 0.4,
            shadowOffset: {width: -1, height: 1},
          }}
          // backgroundColor={ userFollowExist? colors.green : colors.divider}

          backgroundColor={
            followRequestExist
              ? colors.green
              : userFollowExist
              ? colors.green
              : colors.divider
          }
        />

        <TouchableOpacity
          onPress={onWatchList}
          activeOpacity={0.6}
          style={styles.followContainer}>
          <AntDesign
            name={authWatchListExist ? 'star' : 'staro'}
            size={moderateScale(25)}
            color={colors.green}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const FollowContainer = ({length, follow, onNavigate}) => {
    return (
      <TouchableOpacity
        onPress={onNavigate}
        style={{
          width: '28%',
          height: verticalScale(70),
          alignItems: 'center',
          justifyContent: 'space-evenly',
          borderRadius: scale(7),
          backgroundColor: colors.white,
          borderWidth: 0.3,
          borderColor: colors.inputGray,
          shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
          shadowRadius: 2,
          elevation: 5,
          shadowOpacity: 0.2,
          // inputMarginTop:-20,
          shadowOffset: {width: -1, height: 2},
        }}>
        {/* <View
        > */}
        <CustomText
          label={length}
          fontSize={15}
          alignSelf="center"
          textAlign="center"
          color={colors.green}
          fontFamily={InterFont.bold}
        />
        <CustomText
          label={follow}
          fontSize={12}
          alignSelf="center"
          textAlign="center"
          color={colors.inputGray}
          fontFamily={InterFont.semiBold}
        />
        {/* </View> */}
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Spacer height={10} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 200,
          alignSelf: 'center',
          justifyContent: 'center',

        }}>
        <CustomText
          label={`${CurrentUser?.username}`}
          // textTransform={'capitalize'}
          fontSize={16}
          marginTop={20}
          // width={scale(200)}
          numberOfLines={1}
          alignSelf="center"
          textAlign="center"
          color={colors.green}
          fontFamily={InterFont.semiBold}
        />
        <Spacer width={10} />
        {CurrentUser?.trophy == 'verified' && (
           <Image
           resizeMode="contain"
           style={{width:17,height:17,marginTop:25}}
           source={icons.trophyIcon}
           />
          
        )}
      </View>

      <Spacer height={10} />
      <Tab />

      <Spacer height={10} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <CustomText
          label={CurrentUser?.sportEmoji}
          fontSize={10}
          alignSelf="center"
          // marginLeft={5}
          textAlign="center"
          color={colors.inputGray}
          fontFamily={InterFont.semiBold}
        />
        {/* <MaterialCommunityIcons
          name="hockey-sticks"
          color={colors.black}
          size={moderateScale(20)}
        /> */}

        <CustomText
          label={CurrentUser?.selectSport}
          fontSize={11}
          alignSelf="center"
          marginLeft={5}
          textAlign="center"
          color={colors.inputGray}
          fontFamily={InterFont.semiBold}
        />
      </View>
      <Spacer height={20} />

      <PH10>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: '100%',
            justifyContent: 'center',
            justifyContent: 'space-around',
          }}>
          <FollowContainer
            onNavigate={() => {
              navigation.navigate('UserFollowers', {
                // authId: authId,
                AllFollowers: CurrentUser?.AllFollowers,
              });
            }}
            length={
              !CurrentUser?.AllFollowers
                ? 0
                : CurrentUser?.AllFollowers.length == 0
                ? 0
                : CurrentUser?.AllFollowers.length
            }
            follow={'Followers'}
          />

          <FollowContainer
            onNavigate={() => {
              navigation.navigate('UserFollowing', {
                AllFollowing: CurrentUser?.AllFollowing,
              });
            }}
            length={
              !CurrentUser?.AllFollowing
                ? 0
                : CurrentUser?.AllFollowing.length == 0
                ? 0
                : CurrentUser?.AllFollowing.length
            }
            follow={'Following'}
          />

          {/* {followArray.map((item, index) => {
            return (
              <>
                <FollowContainer item={item} index={index} />
              </>
            );
          })} */}
        </View>
      </PH10>

      <Spacer height={20} />

      <FollowUser
        onFollowUser={() => {
          onUserFollower();
        }}
        onWatchList={() => {
          onWatchListUser();
        }}
      />
      {CurrentUser?.AllFollowers?.length != 0 && CurrentUser?.AllFollowers && (
        <>
          <Spacer height={30} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {CurrentUser.AllFollowers.map(id => {
              return (
                <FollowedContainer
                  CurrentUser={id}
                  AllFollowers={CurrentUser.AllFollowers}
                  navigation={navigation}
                />
              );
            })}
          </View>
        </>
      )}
    </View>
  );
};

export default UserProfileMainTop;

const styles = ScaledSheet.create({
  followContainer: {
    width: scale(40),
    height: scale(40),

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: colors.white,
    borderWidth: 0.3,
    borderColor: colors.inputGray,
    shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
    shadowRadius: 2,
    elevation: 5,
    shadowOpacity: 0.2,
    shadowOffset: {width: -1, height: 2},
  },
});
