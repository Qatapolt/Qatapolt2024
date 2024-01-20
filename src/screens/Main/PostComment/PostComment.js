import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import commonStyles, {PH20} from '../../../utils/CommonStyles';
import CommentsHeader from './Molecules/CommentsHeader';
import {Spacer} from '../../../components/Spacer';
import CommentsMessage from './Molecules/CommentsMessage';
import {images} from '../../../assets/images';
import SendMessage from '../../../components/SendMessage';
import {verticalScale} from 'react-native-size-matters';
import {colors} from '../../../utils/Colors';
import SendMessageContainer from './Molecules/SendMessageContainer';
import {InterFont} from '../../../utils/Fonts';
import CustomText from '../../../components/CustomText';
import {firebase} from '@react-native-firebase/firestore';

const PostComment = ({
  navigation,
  setViewComments,
  postId,
  senderId,
  postData,
  setLikeComment,
  likeComment,
  commentCount,
  image,
  setNewCommentAdd,
  setPostID,
  isCommentsOpen,
  setIsCommentsOpen,
}) => {
  const [comments, setComments] = useState(postData);
  const [commentCounts, setCommentCounts] = useState(commentCount);
  const [newComment, setNewComment] = useState(false);
  useEffect(() => {
    if (newComment === true || isCommentsOpen === true) {
      firebase
        .firestore()
        .collection('Posts')
        .doc(postId)
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            const postData = snapshot.data();
            const commentsData = postData.comments || [];
            // console.log('new commentsData fetch === > ', commentsData);
            setComments(commentsData);
            setPostID(postId);
            setNewCommentAdd(true);
            setCommentCounts(commentsData.length);
            setNewComment(false);
            setIsCommentsOpen(false);
          }
        });
    }
  }, [newComment, isCommentsOpen]);
  return (
    <View
      style={{
        width: '100%',
        height: verticalScale(270),
        backgroundColor: colors.white,
      }}>
      <CommentsHeader navigation={navigation} />
      {commentCounts === 0 || commentCounts === undefined ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <CustomText
            fontSize={16}
            fontFamily={InterFont.bold}
            label="No comments yet"
          />
          <CustomText
            fontSize={11}
            marginTop={5}
            color={colors.inputGray}
            label="Start the conversation"
          />
        </View>
      ) : (
        <CommentsMessage
          comments={comments}
          setViewComments={setViewComments}
          navigation={navigation}
          postId={postId}
          setLikeComment={setLikeComment}
          likeComment={likeComment}
          setComments={setComments}
        />
      )}
      <View>
        <SendMessageContainer
          postId={postId}
          senderId={senderId}
          photo={image}
          navigation={navigation}
          newComment={newComment}
          setNewComment={setNewComment}
        />
      </View>
    </View>
  );
};

export default PostComment;

const styles = StyleSheet.create({});
