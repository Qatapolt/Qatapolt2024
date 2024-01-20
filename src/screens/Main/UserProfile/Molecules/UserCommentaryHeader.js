import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Divider, Image, ListItem} from 'react-native-elements';
import {icons} from '../../../../assets/icons';
import {PH10, PH20} from '../../../../utils/CommonStyles';
import CustomText from '../../../../components/CustomText';
import {Spacer} from '../../../../components/Spacer';
import {InterFont} from '../../../../utils/Fonts';
import CustomImage from '../../../../components/CustomImage';
import {verticalScale} from 'react-native-size-matters';
import moment from 'moment';
import PostOptionsSheet from '../../ArenaScreen/Molecules/PostOptionsSheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteImage,
  deletePost,
  generateLink,
} from '../../../services/PostServices';
import {SaveUser} from '../../../services/UserServices';
import {authData} from '../../../../redux/reducers/authReducer';
import {useNavigation} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
const UserCommentaryHeader = props => {
  const navigation = useNavigation();
  const CurrentUser = useSelector(state => state.auth?.currentUser);
  const dispatch = useDispatch();
  const [userProfileData, setUserProfileData] = useState({});
  const [showPostPotions, setShowPostPotions] = useState(false);
  const [selectPost, setSelectPost] = useState({});
  const onCloseModal = () => {
    setShowPostPotions(!showPostPotions);
  };
  const onCopyPostLink = async () => {
    const postLink = await generateLink(selectPost?.postId);
    Clipboard.setString(postLink);
    setShowPostPotions(false);
  };
  useEffect(() => {
    setUserProfileData(props?.userData);
    setSelectPost(props.postData);
  }, [props]);
  // console.log('props.postData[0]', props.postData[0]);
  const PostCreateAt = moment(new Date(props.postData?.createAt?.toDate()));

  let dateFormat = '';

  if (moment(PostCreateAt).isSame(moment(), 'day')) {
    dateFormat = 'Today';
  } else {
    dateFormat = 'not';
  }
  const delPost = () => {
    Alert.alert('Delete Post', 'Are you sure you want to delete?', [
      {
        text: 'Yes',
        onPress: async () => {
          if (selectPost.uriData.uri) {
            deleteImage(selectPost?.uriData.uri);
          }

          deletePost(selectPost?.postId);

          let filterDeletePost = CurrentUser?.PostIds.filter(
            data => data.postId != selectPost?.postId,
          );
          await SaveUser(CurrentUser.uid, {
            PostIds: filterDeletePost,
          });
          const data = await getSpecificUser(CurrentUser.uid);
          dispatch(authData(data));
          onCloseModal();
        },

        // getMedia();
      },
      {
        text: 'No',
        onPress: () => {
          onCloseModal();
          // getMedia();
        },
      },
    ]);
  };
  return (
    <View>
      <ListItem>
        <CustomImage
          width={50}
          height={50}
          imageUrl={userProfileData?.profileImage}
        />

        <ListItem.Content>
          <ListItem.Title style={{fontFamily: InterFont.semiBold}}>
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
            {props?.postData?.createAt
              ? dateFormat === 'Today'
                ? moment(props.postData.createAt.toDate()).fromNow()
                : moment(props.postData.createAt.toDate()).format(
                    'DD MMM h:mm:A',
                  )
              : ''}
          </ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity
          onPress={() => {
            setShowPostPotions(true);
            const singleObject = props.postData[0];

            setSelectPost(singleObject);
          }}>
          <Avatar source={icons.menu} />
        </TouchableOpacity>
      </ListItem>
      {props.postData?.description ? (
        <PH20>
          <CustomText label={props.postData.description} />
        </PH20>
      ) : null}
      <PostOptionsSheet
        modalVisible={showPostPotions}
        onCloseModal={onCloseModal}
        selectPost={selectPost}
        selectedId={selectPost?.userId}
        authData={CurrentUser}
        onDelPost={delPost}
        onCopyLink={onCopyPostLink}
        navigation={navigation}
      />
    </View>
  );
};

export default UserCommentaryHeader;

const styles = StyleSheet.create({});
