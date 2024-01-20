import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {InterFont} from '../../../../utils/Fonts';
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
import FollowedContainer from './FollowedContainer';
import {SaveUser, UpdateUser} from '../../../services/UserServices';
import {icons} from '../../../../assets/icons';
import UserNameLayout from '../../../../utils/Layouts/UserNameLayout';

const ProfileMainTop = ({
  CurrentUser,
  userEvent,
  authId,
  setFollowerState,
  followerState,
}) => {
  const navigation = useNavigation();
  const [watchList, setWatchList] = useState(false);
  const onNavigate = item => {
    // console.log('ItemFollower', authId);
    if (item?.following == 'Followers') {
      navigation.navigate('FollowScreen', {
        authId: authId,
        AllFollowers: CurrentUser?.AllFollowers,
      });

      return;
    }

    if (item?.following == 'Following') {
      navigation.navigate('FollowingScreen', {
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
        label={CurrentUser.accountType}
        color={colors.black}
        fontFamily={InterFont.medium}
        fontSize={12}
      />
    </TouchableOpacity>
  );
  const FollowUser = ({onFollowUser}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity activeOpacity={0.6} style={styles.followContainer}>
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
          color={colors.white}
          title="Follow"
          width={'40%'}
          marginHorizontal={20}
          btnStyle={{
            shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
            shadowRadius: 2,
            elevation: 5,
            shadowOpacity: 0.4,
            shadowOffset: {width: -1, height: 3},
          }}
          backgroundColor={colors.green}
        />

        <TouchableOpacity
          onPress={() => setWatchList(!watchList)}
          activeOpacity={0.6}
          style={styles.followContainer}>
          <AntDesign
            name={watchList ? 'star' : 'staro'}
            size={moderateScale(25)}
            color={colors.green}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const FollowContainer = ({follow, length, onNavigate}) => {
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
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 200,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <CustomText
            label={
              CurrentUser?.username !== undefined ? (
                `${CurrentUser?.username}`
              ) : (
                <UserNameLayout />
              )
            }
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
              style={{width: 17, height: 17, marginTop: 25}}
              source={icons.trophyIcon}
            />
          )}
        </View>

        {CurrentUser?.bio ? (
          <>
            <Spacer height={5} />

            <CustomText
              label={CurrentUser?.bio}
              fontSize={11}
              width={scale(300)}
              numberOfLines={2}
              alignSelf="center"
              marginLeft={5}
              textAlign="center"
              color={colors.inputGray}
              fontFamily={InterFont.semiBold}
            />
          </>
        ) : null}

        <Spacer height={10} />
      </View>

      <Tab />

      <Spacer height={10} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <CustomText
          label={CurrentUser.sportEmoji}
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
          label={CurrentUser.selectSport}
          fontSize={11}
          alignSelf="center"
          marginLeft={5}
          textAlign="center"
          color={colors.inputGray}
          fontFamily={InterFont.semiBold}
        />
      </View>

      <Spacer height={30} />
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
              navigation.navigate('FollowScreen', {
                authId: authId,
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
              navigation.navigate('FollowingScreen', {
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
        </View>
      </PH10>
    </View>
  );
};

export default ProfileMainTop;

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
