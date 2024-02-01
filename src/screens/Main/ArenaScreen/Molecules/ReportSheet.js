import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import CustomText from "../../../../components/CustomText";
import { colors } from "../../../../utils/Colors";
import { InterFont } from "../../../../utils/Fonts";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { BottomSheet } from "react-native-btr";
import { Spacer } from "../../../../components/Spacer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { setReportUserId } from "../../../../redux/reducers/ReportUserReducer";
import { icons } from "../../../../assets/icons";
import {
  SavePost,
  deletePost,
  getPosts,
  getSpecificPost,
  updateRepostCount,
} from "../../../services/PostServices";
import uuid from "react-native-uuid";
import Toast from "react-native-root-toast";
import CustomButton from "../../../../components/CustomButton";
import { getSpecificUser, userPostId } from "../../../services/UserServices";
import { authData } from "../../../../redux/reducers/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "@react-native-firebase/firestore";
import firestore from "@react-native-firebase/firestore";
import { Modalize } from "react-native-modalize";
const ReportSheet = (props) => {
  const currentUser = useSelector((state) => state?.auth?.currentUser);
  const handlePostUnPost = () => {
    let check =
      props?.selectPost &&
      Array.isArray(props?.selectPost?.rePostIds) &&
      props?.selectPost?.rePostIds.length > 0 &&
      props?.selectPost.rePostIds.includes(currentUser.uid);
    console.log("checking", check);
    if (check === true) {
      unReport();
    } else {
      OnRepostPost();
    }
  };

  const OnRepostPost = async () => {
    try {
      Toast.show("Reposting...");
      const postData = {
        uriData: {
          uri: props?.selectPost.uriData?.uri
            ? props?.selectPost.uriData?.uri
            : "",
          type: props?.selectPost.uriData?.type
            ? props?.selectPost.uriData?.type
            : "",
          thumbnail: props?.selectPost?.uriData?.thumbnail
            ? props?.selectPost?.uriData?.thumbnail
            : "",
        },
        description: props?.selectPost?.description
          ? props?.selectPost?.description
          : "",

        freeAgent: props?.selectPost?.freeAgent
          ? props?.selectPost?.freeAgent
          : false,
        postId: uuid.v4(),
        medalsId: [],
        location: props?.selectPost?.location
          ? props?.selectPost?.location
          : "",
        userId: props?.selectPost?.userId,
        medals: 0,
        views: 0,
        ViewsId: [],
        createAt: new Date(),
        externalShare: 0,
        internalShare: 0,
        rePostCount: 0,
        rePostIds: [],
        comments: [],
        comments_Count: 0,
        repostedBy: {
          uid: props.authUser.uid,
          name: props.authUser?.name,
        },
        originalPostId: props?.selectPost.postId,
      };
      console.log("postData=====>", postData);

      const originalPost = props?.postData.find(
        (post) => post.postId === postData.originalPostId
      );

      if (originalPost) {
        const originalPostRef = firebase
          .firestore()
          .collection("Posts")
          .doc(postData.originalPostId);

        try {
          // Get the current data
          const originalPostSnapshot = await originalPostRef.get();

          if (originalPostSnapshot.exists) {
            const originalPostData = originalPostSnapshot.data();

            // Log initial values
            console.log(
              "Before update - rePostIds:",
              originalPostData.rePostIds
            );
            console.log(
              "Before update - rePostCount:",
              originalPostData.rePostCount
            );

            // Update the array manually
            const newRePostIds = [
              ...originalPostData.rePostIds,
              currentUser.uid,
            ];
            const newRePostCount = originalPostData.rePostCount + 1;

            // Log values before updating
            console.log("newRePostIds:", newRePostIds);
            console.log("newRePostCount:", newRePostCount);

            // Update the original post data in Firestore
            await originalPostRef.update({
              rePostIds: newRePostIds,
              rePostCount: newRePostCount,
            });

            console.log("Original post updated successfully");
          } else {
            console.error("Original post does not exist");
          }
        } catch (error) {
          console.error("Error fetching original post data:", error);
        }
      } else {
        console.error("Original post not found");
      }

      await SavePost(postData);

      const userPostIdsData = {
        postId: postData?.postId,
        createAt: postData?.createAt,
        type: postData?.uriData.type,
      };
      await userPostId(props?.authUser.uid, userPostIdsData);
      const data = await getSpecificUser(props?.authUser.uid);
      props.dispatch(authData(data));

      await updateRepostCount(props?.selectPost?.postId, props?.authUser?.uid);
      Toast.show("Reposted!");
      props?.setRepost(true);
      props?.onCloseModal();
    } catch (error) {
      console.log(error);
    }
  };
  const unReport = async () => {
    const data = props?.postData.find(
      (post) => post.originalPostId === props?.selectPost?.postId
    );

    if (data) {
      try {
        // Fetch the original post data before deletion
        const originalPostRef = firebase
          .firestore()
          .collection("Posts")
          .doc(data.originalPostId);
        const originalPostSnapshot = await originalPostRef.get();
        const originalPostData = originalPostSnapshot.data();

        // Delete the post from Firestore
        await firebase
          .firestore()
          .collection("Posts")
          .doc(data.postId)
          .delete();

        // Remove currentUser.uid from rePostIds
        const updatedRePostIds = props?.selectPost.rePostIds.filter(
          (uid) => uid !== currentUser.uid
        );

        console.log("updatedRePostIds", updatedRePostIds);

        // Update the post data in Firestore with the modified rePostIds
        await firebase
          .firestore()
          .collection("Posts")
          .doc(data.originalPostId)
          .update({
            rePostIds: updatedRePostIds,
            rePostCount: originalPostData.rePostCount - 1, // Decrease rePostCount by 1
          });

        console.log("Post is deleted and updated");
        Toast.show("Un-Posted!");
        props?.setRepost(true);
        props?.onCloseModal();
      } catch (error) {
        console.error("Error while un-posting:", error);
        // Handle the error accordingly
      }
    } else {
      console.error("Post not found");
    }
  };

  return (
    <Modalize
      ref={props?.modalizeRefReport}
      // onBackButtonPress={props.onCloseModal}
      // onBackdropPress={props.onCloseModal}
      modalStyle={{
        backgroundColor: "#FFFFFF",
        flex: 1,
        width: "100%",
      }}
      useNativeDriver
      modalHeight={150}
      handlePosition="inside"
      panGestureComponentProps={{ enabled: true }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: scale(15),
        }}
        // flexDirection={"column"}
        // backgroundColor={"white"}
        // alignSelf="center"
        // paddingHorizontal={scale(15)}
        // height={"20%"}
        // width={"100%"}
        // borderTopLeftRadius={scale(15)}
        // borderTopRightRadius={scale(15)}
        // overflow="hidden"
      >
        <Spacer height={5} />

        {/* <View style={styles.topLine}></View> */}
        <Spacer height={10} />
        <TouchableOpacity
          onPress={handlePostUnPost}
          activeOpacity={0.6}
          style={styles.optionContainer}
        >
          <Image
            source={icons.sharepost}
            style={{
              width: scale(16),
              height: scale(16),
            }}
            //   containerStyle={{width: scale(18), height: scale(18)}}
          />
          {/* <AntDesign  name='copy1' size={moderateScale(20)} color={colors.black} /> */}

          <CustomText
            label={
              props?.selectPost &&
              Array.isArray(props?.selectPost?.rePostIds) &&
              props?.selectPost?.rePostIds.length > 0 &&
              props?.selectPost.rePostIds.includes(currentUser.uid)
                ? "Un-Repost"
                : "Repost"
            }
            marginLeft={7}
            fontSize={13}
          />
        </TouchableOpacity>
        <Spacer height={20} />

        <CustomButton
          backgroundColor={colors.white}
          title={"Cancel"}
          borderWidth={1}
          onPress={props.onCloseModal}
          height={40}
          borderRadius={30}
        />

        {/* <TouchableOpacity
          activeOpacity={0.6}
          onPress={()=>{
           props.onCloseModal()

      

          }}

           style={styles.optionContainer}>
          <AntDesign  name='edit' size={moderateScale(20)} color={colors.black} />
  
          <CustomText label="Quote"  marginLeft={7} fontSize={13}/>
  
        </TouchableOpacity> */}
      </View>
    </Modalize>
  );
};

export default ReportSheet;

const styles = StyleSheet.create({
  topLine: {
    width: scale(80),
    height: 5,
    backgroundColor: "#dee2e6",
    alignSelf: "center",
    borderRadius: 10,
  },
  optionContainer: {
    width: "100%",
    padding: scale(10),
    flexDirection: "row",
    alignItems: "center",
  },
});
