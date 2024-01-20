import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Divider, Image, ListItem} from 'react-native-elements';
import {icons} from '../../../../assets/icons';
import commonStyles, {PH10, PH20} from '../../../../utils/CommonStyles';
import CustomText from '../../../../components/CustomText';
import {Spacer} from '../../../../components/Spacer';
import {InterFont} from '../../../../utils/Fonts';
import CustomImage from '../../../../components/CustomImage';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import moment from 'moment';
import {
  getSpecificUser,
  SaveUser,
  getAllUSers,
} from '../../../services/UserServices';
import auth from '@react-native-firebase/auth';
import {deleteImage, deletePost} from '../../../services/PostServices';
import {useDispatch, useSelector} from 'react-redux';
import {authData} from '../../../../redux/reducers/authReducer';
import {colors} from '../../../../utils/Colors';
import Octicons from 'react-native-vector-icons/Octicons';

const PostHeader = props => {
  const authState = useSelector(state => state.auth.currentUser);
  const [userAllData, setUserAllData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserData();
    getFilterUser();
    renderPostDescription();
  }, []);

  const getFilterUser = () => {
    getAllUSers(setUserAllData, authState.uid);
  };
  const getUserData = async () => {
    const userData = await getSpecificUser(props?.postData?.userId);
    props.setUserProfileData(userData);
  };

  const PostCreateAt = moment(new Date(props.postData?.createAt.toDate()));

  let dateFormat = '';

  if (moment(PostCreateAt).isSame(moment(), 'day')) {
    dateFormat = 'Today';
  } else {
    dateFormat = 'not';
  }
  const onNavigate = () => {
    if (props?.authData?.BlockUsers?.includes(props?.userProfileData?.uid)) {
      // console.log('BlockedUsercdcdcd');

      props.navigation.navigate('BlockScreen');

      return;
    }

    if (props?.userProfileData?.uid == props?.authData?.uid) {
      props.navigation.navigate('Profile', {
        event: props?.userProfileData?.uid,
      });
      return;
    }
    props.navigation.navigate('UserProfile', {
      event: props?.userProfileData?.uid,
    });
  };

  const onRepostedNavigate = () => {
    if (
      props?.authData?.BlockUsers?.includes(props?.postData?.repostedBy?.uid)
    ) {
      props.navigation.navigate('BlockScreen');
      return;
    }

    if (props?.postData?.repostedBy?.uid == props?.authData.uid) {
      props.navigation.navigate('Profile', {
        event: props?.postData?.repostedBy?.uid,
      });
      return;
    }
    props.navigation.navigate('UserProfile', {
      event: props?.postData?.repostedBy?.uid,
    });
  };

  const renderPostDescription = () => {
    let mentiondUser;
    const mentionedUsers = props?.postData?.mentionedUsers || [];
    const mentionRegex = /@(\w+)/g;
    const parts = props?.postData?.description.split(mentionRegex);
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
            key={index}
            onPress={() => handleUsernamePress(mentiondUser)}>
            <Text
              style={{
                color: colors.green,
              }}>
              @{username}
            </Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <Text style={{color: colors.black}} key={index}>
            {part}
          </Text>
        );
      }
    });

    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {processedParts}
      </View>
    );
  };
  const handleUsernamePress = mentiondUser => {
    console.log('User with ID', mentiondUser?.uid, 'was pressed.');
    if (props?.authData?.BlockUsers?.includes(mentiondUser?.uid)) {
      props.navigation.navigate('BlockScreen');
      return;
    }
    if (mentiondUser?.uid == props?.authData.uid) {
      props.navigation.navigate('Profile', {
        event: mentiondUser?.uid,
      });
      return;
    }
    props.navigation.navigate('UserProfile', {
      event: mentiondUser?.uid,
    });
  };

  return (
    <View>
      {props?.postData?.repostedBy ? (
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
              props?.postData?.repostedBy?.uid == props?.authData.uid
                ? 'You'
                : props?.postData?.repostedBy?.name
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
          props?.postData?.repostedBy
            ? styles.existHeader
            : styles.defaultHeader
        }>
        <View style={{...commonStyles.rowContainer}}>
          <CustomImage
            onImagePress={onNavigate}
            width={45}
            height={45}
            imageUrl={props?.userProfileData?.profileImage}
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
                {props?.userProfileData?.name}
              </ListItem.Title>
              {props.userProfileData?.trophy == 'verified' && (
                <CustomText label="🏆" fontSize={8} marginLeft={5} />
              )}
            </View>

            <Spacer height={3} />
            <View style={{...commonStyles.rowContainer, width: '60%'}}>
              <CustomText
                label={`${props.userProfileData?.username}`}
                fontSize={10}
                numberOfLines={1}

                // fontFamily={InterFont.medium}
              />
              <CustomText
                label={'-'}
                marginLeft={5}
                fontSize={10}
                // fontFamily={InterFont.medium}
              />

              <CustomText
                label={
                  dateFormat == 'Today'
                    ? moment(
                        new Date(props.postData?.createAt.toDate()),
                      ).fromNow()
                    : moment(
                        new Date(props.postData?.createAt.toDate()),
                      ).format('DD MMM h:mm:A')
                }
                fontSize={10}
                marginLeft={5}
                // fontFamily={InterFont.medium}
              />
            </View>
            {props?.postData?.location ? (
              <>
                <Spacer height={3} />

                <View style={{...commonStyles.rowContainer, width: '60%'}}>
                  <Octicons
                    name="location"
                    size={moderateScale(10)}
                    // color={colors.inputGray}
                  />
                  <CustomText
                    label={`${props.postData?.location}`}
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
            props.setSelectPost(props?.postData);
            props.setShowPostPotions(!props.showPostPotions);
            // onDeletePost(props.postData?.postId);
          }}>
          <Avatar source={icons.menu} />
        </TouchableOpacity>
      </View>
      {props.postData?.description ? (
        <PH10>
          <View>{renderPostDescription()}</View>
        </PH10>
      ) : (
        <></>
      )}
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
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
});
