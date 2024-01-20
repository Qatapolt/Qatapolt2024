// import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
// import React, {useState, useEffect} from 'react';
// import commonStyles from '../../../../utils/CommonStyles';
// import PostItem from '../../ArenaScreen/Molecules/PostItem';
// import {verticalScale} from 'react-native-size-matters';
// import UserCommentryConatiner from './UserCommentryConatiner';
// import _ from 'lodash';

// const UserCommentary = ({navigation, route}) => {
//   const [likePost, setLikePost] = useState(false);
//   const [showPost, setShowPost] = useState(false);
//   const [heartPost, setHeartPost] = useState(false);

//   const [commentaryData, setCommentaryData] = useState([]);

//   useEffect(() => {
//     const sortedByDate = _.orderBy(
//       route.params?.PostIds,
//       item => item?.createAt,
//       ['desc'],
//     );

//     setCommentaryData(sortedByDate);
//   }, [route.params]);
//   console.log('route.params', route.params);
//   const RenderPostData = ({item, index}) => {
//     return (
//       <View>
//         <UserCommentryConatiner userData={route.params} postId={item?.postId} />
//         {/* <PostItem
//           navigation={navigation}
//           index={index}
//           item={item}
//           authId={CurrentUser?.uid}
//           setPostObject={setPostObject}
//           setPostIndex={setPostIndex}
//           showPost={showPost}
//           setViewPostModal={setViewPostModal}
//           setShowPost={setShowPost}
//           heartPost={heartPost}
//           setHeartPost={setHeartPost}
//           likePost={likePost}
//           setLikePost={setLikePost}
//         /> */}
//       </View>
//     );
//   };

//   return (
//     <View style={commonStyles.main}>
//       <FlatList
//         scrollEnabled={true}
//         nestedScrollEnabled={true}
//         data={commentaryData}
//         contentContainerStyle={{
//           paddingBottom: verticalScale(50),
//         }}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={RenderPostData}
//       />
//     </View>
//   );
// };

// export default UserCommentary;

// const styles = StyleSheet.create({});
import React, {useState, useEffect, useRef} from 'react';
import {Alert, FlatList, ScrollView, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import UserCommentryConatiner from '../../UserProfile/Molecules/UserCommentryConatiner';
import commonStyles from '../../../../utils/CommonStyles';
import _ from 'lodash';
import moment from 'moment';
import {colors} from '../../../../utils/Colors';
import PostItem from '../../ArenaScreen/Molecules/PostItem';
import {
  deleteImage,
  deletePost,
  generateLink,
  getFeeAgentPosts,
  getPosts,
} from '../../../services/PostServices';
import ReportSheet from '../../ArenaScreen/Molecules/ReportSheet';
import PostOptionsSheet from '../../ArenaScreen/Molecules/PostOptionsSheet';
import ViewPost from '../../ArenaScreen/Molecules/ViewPost';
import {useDispatch, useSelector} from 'react-redux';
import {SaveUser} from '../../../services/UserServices';
import {authData} from '../../../../redux/reducers/authReducer';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-root-toast';
import SimpleLoader from '../../../../utils/SimpleLoader';
import loaderAnimation from '../../../../assets/Loaders';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
const UserCommentary = ({navigation, route}) => {
  const authData = useSelector(state => state.auth?.currentUser);
  const [commentaryData, setCommentaryData] = useState([]);
  const [likePost, setLikePost] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const dispatch = useDispatch();
  const [heartPost, setHeartPost] = useState(false);
  const CurrentUser = useSelector(state => state.auth?.currentUser);
  const postOptionRef = useRef();
  const [viewPostModal, setViewPostModal] = useState(false);
  const [postIndex, setPostIndex] = useState(-1);
  const [postData, setPostData] = useState([]);
  const [postObject, setPostObject] = useState({});
  const [showPostPotions, setShowPostPotions] = useState(false);
  const [showReportPotions, setShowReportPotions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectPost, setSelectPost] = useState({});

  const [comments, setComments] = useState(0);
  const [commentCounts, setCommentCounts] = useState(0);
  const [newComment, setNewComment] = useState(false);
  const [repost, setRepost] = useState(false);
  const [internalShare, setInternalShare] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserPosts = async () => {
        setIsLoading(true);
        let allPostByUser = [];
        getAllPost();
        if (route.params?.PostIds !== undefined) {
          route.params?.PostIds.forEach(element => {
            const userPosts = postData.find(
              post => post?.postId === element?.postId,
            );
            if (userPosts !== undefined) {
              allPostByUser.push(userPosts);
            }
          });
          const sortedArray = [...allPostByUser].sort((a, b) => {
            const createdAtA =
              a.createAt.seconds + a.createAt.nanoseconds / 1e9;
            const createdAtB =
              b.createAt.seconds + b.createAt.nanoseconds / 1e9;
            return createdAtB - createdAtA;
          });
          setCommentaryData(sortedArray);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      };
      fetchUserPosts();
      return () => {};
    }, [getAllPost, CurrentUser, postData]),
  );
  const getAllPost = () => {
    getPosts(setPostData);
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
          // setIsLoading(true);
          setRepost(true);
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

  const onCopyPostLink = async () => {
    const postLink = await generateLink(selectPost?.postId);
    if (postLink) {
      Clipboard.setString(postLink);
      setShowPostPotions(false);
      Toast.show('Link Copied!');
    }
  };
  return (
    <View
      style={{
        backgroundColor: colors.white,
        flex: 1,
        bottom: 5,
      }}>
      <FlatList
        data={commentaryData}
        keyExtractor={(item, index) => item?.postId?.toString()}
        renderItem={RenderPostData}
        style={{
          width: '100%',
          height: '100%',
        }}
        nestedScrollEnabled
      />
      <ViewPost
        viewPostModal={viewPostModal}
        postIndex={postIndex}
        postObject={postObject}
        setViewPostModal={setViewPostModal}
        setSelectPost={setSelectPost}
        setShowPostPotions={setShowPostPotions}
        ikePost={likePost}
        setLikePost={setLikePost}
        navigation={navigation}
        setShowPost={setShowPost}
        showPost={showPost}
        showPostPotions={showPostPotions}
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
      {isLoading && (
        // <View
        //   style={{
        //     backgroundColor: 'red',
        //     flex: 1,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     zIndex: 100000000,
        //   }}>
        <SimpleLoader file={loaderAnimation} />
        // </View>
      )}
    </View>
  );
};

export default UserCommentary;
