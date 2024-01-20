import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Spacer} from '../../../../components/Spacer';
import CustomText from '../../../../components/CustomText';
import {images} from '../../../../assets/images';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../../utils/Colors';
import {Avatar, Divider, Image, ListItem} from 'react-native-elements';
import VideoPlayer from 'react-native-video-player';
import {getSpecificPost} from '../../../services/PostServices';
import {PH10} from '../../../../utils/CommonStyles';
import PostItemBottom from '../../ArenaScreen/Molecules/PostItemBottom';
import UserCommentaryBottom from './OtherUserCommentaryBottom';
import OtherUserCommentaryHeader from './OtherUserCommentaryHeader';
import OtherUserCommentaryBottom from './OtherUserCommentaryBottom';
const OtherUserCommentryConatiner = props => {
  const [likePost, setLikePost] = useState(false);
  const [likeComment, setLikeComment] = useState(false);

  const [viewComments, setViewComments] = useState(false);

  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [postData, setPostData] = useState({})
  // console.log('postData', postData?.description);

  useEffect(() => {
    getPostData();
  }, [props?.postId]);
  const getPostData = async () => {
    const data = await getSpecificPost(props?.postId,props?.postDate);
    // console.log('DataPosytCPj', data);
    setPostData(data)

    // setCommentryPost(data);
  };

  // const [viewCount, setViewCount] = useState(props.item?.views || 0);
  // const currentUser = useSelector(state => state.auth?.currentUser);

  // const incrementViewCount = async () => {
  //   const postRef = firebase
  //     .firestore()
  //     .collection('Posts')
  //     .doc(props.item.postId);

  //   try {
  //     const postSnapshot = await postRef.get();
  //     const postData = postSnapshot.data();
  //     const viewsIdArray = postData.viewsId || [];

  //     if (!viewsIdArray.includes(currentUser.uid)) {
  //       await postRef.update({
  //         views: postData.views + 1, // Increase the view count by 1
  //         viewsId: [...viewsIdArray, currentUser.uid], // Add the current user's ID to the viewsId array
  //       });
  //       console.log('View count updated successfully');
  //       setViewCount(prevCount => prevCount + 1); // Update the local state of view count
  //     } else {
  //       console.log('User already viewed the post');
  //     }
  //   } catch (error) {
  //     console.error('Error updating view count:', error);
  //   }
  // };

  return (
    <View>
      <OtherUserCommentaryHeader
        userData={props?.userData}
        postData={postData}
      />
      <Spacer height={10} />

      <View>
        <TouchableOpacity
          activeOpacity={0.6}
         
        >
           {/* {isPhotoLoading && (
            <ActivityIndicator
              style={{
                top: "40%",
                left:"45%",
                // start: scale(65),
                zIndex: 10,
                color:"red",
                position: 'absolute',
              }}
            />
          )} */}
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
                      thumbnail={{uri: postData?.uriData?.thumbnail}}
                      video={{uri: postData?.uriData?.uri}}
                    />
                  </View>
                </>
              ) : (
                <>
                  <Image
                    // onLoad={() => setIsPhotoLoading(false)}

                    source={
                      !postData?.uriData.uri == ''
                        ? {uri: postData?.uriData.uri}
                        : images?.postPic
                    }
                    containerStyle={styles.postContainer}
                   
                  />
                </>
              )}
            </>
          )}
        </TouchableOpacity>
        <Spacer height={5} />
        <PH10>
          <OtherUserCommentaryBottom
            postData={postData}
            likePost={likePost}
            navigation={props.navigation}
          />
        </PH10>
      </View> 

      <Divider width={5} color={colors.divider} />
    </View>
  );
};

export default OtherUserCommentryConatiner;

const styles = StyleSheet.create({
  postContainer: {
    // aspectRatio: 1,
    width: '100%',
    height: verticalScale(250),
    overflow: 'hidden',
    // flex: 1,
  },
  postFooterIcon: {
    width: 24,
    height: 26,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
