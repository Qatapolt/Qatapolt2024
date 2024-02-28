import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import {
  moderateScale,
  ScaledSheet,
  verticalScale,
  scale,
} from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Foundation from "react-native-vector-icons/Foundation";
import Entypo from "react-native-vector-icons/Entypo";
import { Avatar, Divider, ListItem } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import { icons } from "../../../../assets/icons";
import { images } from "../../../../assets/images";
import { colors } from "../../../../utils/Colors";
import { sendComment } from "../../../services/MessagesServices";
import { firebase } from "@react-native-firebase/firestore";
import { useSelector } from "react-redux";
import CustomImage from "../../../../components/CustomImage";
const SendMessageContainer = ({
  photo,
  navigation,
  senderId,
  postId,
  newComment,
  setNewComment,
}) => {
  const currentUser = useSelector((state) => state.auth?.currentUser);

  const [comment, setComment] = useState("");
  // console.log('value of newComment', newComment);
  const sendComment = () => {
    if (comment) {
      const commentId = firebase.firestore().collection("Posts").doc().id;

      const newComment = {
        id: commentId,
        postId: postId,
        senderId: senderId,
        content: comment,
        name: currentUser.name,
        img: currentUser.profileImage || "",
        createAt: new Date(),
        verified: currentUser.trophy || "",
        medals: 0,
        medalsId: [],
      };

      try {
        firebase
          .firestore()
          .collection("Posts")
          .doc(postId)
          .update({
            comments: firebase.firestore.FieldValue.arrayUnion(newComment),
            comment_Count: firebase.firestore.FieldValue.increment(1),
          })
          .then(() => {
            // console.log('Comment saved successfully!');
            setNewComment(true);
            setComment("");
          })
          .catch((error) => {
            console.error("Error saving comment:", error);
          });
        setComment("");
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    // <KeyboardAwareScrollView
    //   automaticallyAdjustKeyboardInsets={true}
    //   keyboardShouldPersistTaps={"always"}
    //   behavior={Platform.OS == "ios" ? "padding" : "height"}
    //   style={{ paddingHorizontal: 16, paddingTop: 16 }}
    // >
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      {photo == null ? (
        <CustomImage
          width={35}
          height={35}
          imageUrl={""}
          onImagePress={() => {
            navigation.navigate("Profile", { user: true });
          }}
        />
      ) : (
        <CustomImage
          width={35}
          height={35}
          imageUrl={photo}
          onImagePress={() => {
            navigation.navigate("Profile", { user: true });
          }}
        />
      )}
      <View
        style={{
          ...styles.footer,
          width: photo == null ? "96%" : "80%",
        }}
      >
        <TextInput
          value={comment}
          style={styles.input}
          onChangeText={(text) => setComment(text)}
          underlineColorAndroid="transparent"
          placeholder={"Type Comment"}
          multiline={true}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.send, { marginRight: scale(7) }]}
          onPress={() => sendComment()}
        >
          <Image
            source={icons.send}
            style={{
              width: scale(12),
              height: scale(12),
              tintColor: colors.white,
              marginLeft: scale(2),
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
    // </KeyboardAwareScrollView>
  );
};

export default SendMessageContainer;

const styles = ScaledSheet.create({
  textInputContainer: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: "20@s",
    borderTopRightRadius: "20@s",
    minHeight: verticalScale(60),
    maxHeight: verticalScale(100),
    // paddingTop: verticalScale(20),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: verticalScale(5),
  },
  inPutContainer: {
    backgroundColor: colors.white,
    // height: verticalScale(35),
    fontSize: verticalScale(14),
    width: "75%",
    color: colors.black,
    fontWeight: "600",
    paddingHorizontal: verticalScale(10),
  },

  sendContainer: {
    width: "20@s",
    height: "25@vs",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    //   alignItems: 'flex-end',

    //   paddingBottom: scale(10),
    backgroundColor: colors.superLightGray,
    margin: 8,
    minHeight: verticalScale(33),
    maxHeight: verticalScale(110),
    paddingRight: scale(5),
    paddingLeft: scale(3),
    borderRadius: scale(20),
    //   shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
    //   shadowRadius: 5,
    //   elevation: 3,
    //   shadowOpacity: 0.3,
    //   shadowOffset: {width: 1, height: 1},
  },
  send: {
    width: scale(24),
    height: scale(24),
    borderRadius: 30,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    paddingHorizontal: 10,
    fontSize: verticalScale(10),
    flex: 1,
    marginBottom: scale(4),
    color: colors.black,
  },
  add: {
    width: scale(27),
    height: scale(27),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    shadowColor: Platform.OS == "ios" ? colors.inputGray : colors.black,
    shadowRadius: 5,
    elevation: 3,
    shadowOpacity: 0.3,

    shadowOffset: { width: 1, height: 1 },
  },
});
