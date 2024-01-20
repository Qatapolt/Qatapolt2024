import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React from 'react';
import {colors} from '../../../../utils/Colors';
import commonStyles from '../../../../utils/CommonStyles';
import CustomText from '../../../../components/CustomText';
import {icons} from '../../../../assets/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Spacer} from '../../../../components/Spacer';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {firebase} from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {handlePress} from '../../../services/PostServices';
import {
  setAllViewIds,
  setMedalIds,
} from '../../../../redux/reducers/authReducer';
import {TourGuideZoneByPosition} from 'rn-tourguide';

const PostItemBottom = props => {
  const currentUser = useSelector(state => state.auth?.currentUser);
  const dispatch = useDispatch();
  const [repostCount, setRepostCount] = useState(props.postData?.rePostCount);
  const [repostIds, setRepostIds] = useState(props?.postData?.rePostIds);
  const [internalShareCount, setInternalShareCount] = useState(
    props.postData?.internalShare,
  );
  const [likeCount, setLikeCount] = useState(props.postData?.medals);
  const [imageSource, setImageSource] = useState(() => {
    const medalsIdArray = props?.postData?.medalsId || [];
    const defaultImageSource = medalsIdArray.includes(currentUser.uid)
      ? icons.likemadel
      : icons.unFilledMedal;
    return defaultImageSource;
  });
  useEffect(() => {
    if (props?.repost === true && props.postData?.postId !== '') {
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
  return (
    <View style={{...commonStyles.rowJustify, paddingVertical: 10}}>
      <TouchableOpacity
        onLongPress={() => {
          props.navigation.navigate('AllViewBy', {
            eventBy: 'Liked by',
            postID: props.postData?.postId,
          });
        }}
        onPress={() => {
          handlePress(
            props.postData,
            currentUser,
            setLikeCount,
            setImageSource,
            props.likePost,
            icons,
            props?.userProfileData,
          );
        }}
        style={{flexDirection: 'row', width: 33}}>
        <Image
          resizeMode="contain"
          source={imageSource}
          style={{
            width: scale(20),
            height: scale(20),
          }}
        />
        <CustomText
          label={likeCount}
          fontSize={12}
          marginTop={5}
          color={colors.black}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.setViewComments(!props.viewComments),
            props.setIsCommentsOpen(!props.isCommentsOpen);
        }}
        style={{flexDirection: 'row'}}>
        <Image
          source={icons.comment}
          style={{
            ...styles.postFooterIcon,
          }}
        />

        <CustomText
          label={props.commentCount}
          fontSize={12}
          marginTop={3}
          marginLeft={2}
          color={colors.black}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onLongPress={() => {
          props.navigation.navigate('AllViewBy', {
            eventBy: 'Reposted by',
            postID: props.postData?.postId,
          });
        }}
        onPress={() => {
          props?.setSelectPost(props.postData);
          props.setShowReportPotions(true);
        }}
        style={{flexDirection: 'row'}}>
        <Image
          source={
            repostIds && repostIds.length > 0
              ? icons.fillShare
              : icons.unfillShare
          }
          style={{
            ...styles.postFooterIcon,
            tintColor:
              repostIds && repostIds.length > 0 ? colors.green : colors.black,
          }}
        />
        <Spacer width={5} />
        <CustomText
          label={
            props.postData?.rePostCount > repostCount
              ? props.postData?.rePostCount
              : repostCount
          }
          fontSize={12}
          marginTop={3}
          color={colors.black}
        />
      </TouchableOpacity>
      {/* {props.postData?.uriData?.type !== '' &&
      props.postData?.uriData?.uri !== '' ? ( */}
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View>
          <Image
            source={icons.view}
            style={{
              ...styles.postFooterIcon,
            }}
          />
        </View>
        <Spacer width={5} />
        <View>
          <CustomText
            label={props.viewCount}
            fontSize={12}
            marginTop={5}
            color={colors.black}
          />
        </View>
      </View>
      {/* ) : (
        <></>
      )} */}

      <TouchableOpacity
        activeOpacity={0.6}
        onLongPress={() => {
          props.navigation.navigate('AllViewBy', {
            eventBy: 'Send by',
            postID: props.postData?.postId,
          });
        }}
        onPress={props.onInternalShare}
        style={{flexDirection: 'row'}}>
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
          color={colors.black}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PostItemBottom;

const styles = StyleSheet.create({
  postFooterIcon: {
    width: scale(16),
    height: scale(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
