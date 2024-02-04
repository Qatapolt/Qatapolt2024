import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import commonStyles from "../../../../utils/CommonStyles";
import { scale, verticalScale } from "react-native-size-matters";
import CustomImage from "../../../../components/CustomImage";
import CustomText from "../../../../components/CustomText";
import { colors } from "../../../../utils/Colors";
import { InterFont } from "../../../../utils/Fonts";
import moment from "moment";
import { Spacer } from "../../../../components/Spacer";
import { useSelector } from "react-redux";
import { icons } from "../../../../assets/icons";
import { handleCommentLikePress } from "../../../services/PostServices";
import firestore from "@react-native-firebase/firestore";
const CommentMessageContainer = ({
  item,
  likeComment,
  setNewComment,
  postCompleteData,
  setPostID,
}) => {
  console.log("postCompleteData", postCompleteData);
  const [likeCount, setLikeCount] = useState(item.medals);
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const [imageSource, setImageSource] = useState(
    item.medalsId.includes(currentUser.uid)
      ? icons.likemadel
      : icons.unFilledMedal
  );
  const deleteCommentAndUpdatePost = async () => {
    try {
      // Reference to the post document
      const postRef = firestore().collection("Posts").doc(item.postId);

      // Fetch the current post data
      const postDoc = await postRef.get();

      if (postDoc.exists) {
        // Get the current post data
        const postData = postDoc.data();

        // Filter out the comment to be deleted
        const updatedComments = postData.comments.filter(
          (comment) => comment.id !== item.id
        );

        // Update the post data with the modified comments array
        await postRef.update({
          comments: updatedComments,
          comments_Count: updatedComments.length,
        });

        // Now, delete the comment document
        const commentRef = firestore().collection("comments").doc(item.id);
        await commentRef.delete();

        console.log("Comment deleted and post updated successfully.");
        setPostID(item.postId);
        setNewComment(true);
      } else {
        console.error("Post not found.");
      }
    } catch (error) {
      console.error("Error deleting comment and updating post:", error);
    }
  };
  const deleteComment = () => {
    Alert.alert("Qatapolt Instruction", "Do you want to delete this comment?", [
      { text: "YES", onPress: () => deleteCommentAndUpdatePost() },
      {
        text: "NO",
        onPress: () => console.log("no Pressed"),
        style: "no",
      },
    ]);
  };
  return (
    <TouchableOpacity
      onLongPress={deleteComment}
      style={{
        ...commonStyles.rowContainer,
        // marginLeft: scale(10),
        marginVertical: verticalScale(10),
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "95%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: 'space-around',
            marginHorizontal: 10,
            width: "100%",
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CustomImage width={30} height={30} imageUrl={item?.img} />
          </View>
          <Spacer width={10} />

          <View style={styles.commentContainer}>
            <View style={{ ...commonStyles.rowContainer, width: "70%" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CustomText
                  label={item.name}
                  numberOfLines={1}
                  fontSize={9}
                  color={colors.black}
                  fontFamily={InterFont.semiBold}
                />
                <Spacer width={2} />
                {item?.verified == "verified" && (
                  <Image
                    resizeMode="contain"
                    style={{ width: 12, height: 12 }}
                    source={icons.trophyIcon}
                  />
                )}
              </View>

              <CustomText
                label="-"
                fontSize={7}
                color={colors.inputGray}
                marginLeft={5}
                marginRight={5}
                fontFamily={InterFont.medium}
              />
              <CustomText
                label={moment(new Date(item.createAt.toDate())).fromNow()}
                fontSize={8}
                color={colors.inputGray}
                fontFamily={InterFont.medium}
              />
            </View>
            <Spacer height={3} />

            <CustomText
              label={item.content}
              fontSize={9}
              color={colors.inputGray}
              fontFamily={InterFont.regular}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            marginRight: scale(40),
            alignItems: "center",
            marginTop: verticalScale(5),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleCommentLikePress(
                item,
                currentUser,
                setLikeCount,
                setImageSource,
                icons,
                likeComment
              );
              // // likeComments
            }}
          >
            <Image
              resizeMode="contain"
              source={imageSource}
              style={{
                width: 15,
                height: 15,
              }}
            />
          </TouchableOpacity>
          <CustomText
            marginTop={5}
            label={likeCount}
            fontSize={8}
            color={colors.inputGray}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CommentMessageContainer;

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: colors.superLightGray,
    paddingHorizontal: verticalScale(10),
    borderRadius: scale(10),
    paddingVertical: verticalScale(5),
    marginRight: scale(30),
    // marginTop: verticalScale(5),
    // shadowColor: Platform.OS == 'ios' ? colors.superDuperLightGray : colors.black,
    // shadowRadius: 5,
    // elevation: 3,
    // shadowOpacity: 1,

    // shadowOffset: {width: 1, height: 4},
  },
});
