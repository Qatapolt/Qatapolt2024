import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../utils/Colors";
import { InterFont } from "../../utils/Fonts";
import CustomText from "../CustomText";
import VideoPlayer from "react-native-video-player";
import { icons } from "../../assets/icons";
import CustomImage from "../CustomImage";
import { Avatar, Divider, ListItem } from "react-native-elements";
import { getSpecificUser } from "../../screens/services/UserServices";
import { getSpecificPost } from "../../screens/services/PostServices";
import moment from "moment";
import { Spacer } from "../Spacer";
import { PH10, PH20 } from "../../utils/CommonStyles";
import { images } from "../../assets/images";
import UserCommentaryBottom from "../../screens/Main/UserProfile/Molecules/UserCommentaryBottom";
import FastImage from "react-native-fast-image";
import PostBottomItem from "../PostBottomItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const InternalShareComponent = (props) => {
  const [userProfileData, setUserProfileData] = useState({});
  const [postData, setPostData] = useState({});
  const authData = useSelector((state) => state?.auth?.currentUser);

  const navigation = useNavigation();
  useEffect(() => {
    getPostData();
    getUserData();
  }, [props?.message]);
  // console.log('postDatapostData', props?.message?.senderId);

  const getUserData = async () => {
    const data = await getSpecificUser(props?.message?.senderId);
    setUserProfileData(data);
  };
  const getPostData = async () => {
    const data = await getSpecificPost(props?.message?.internalFile?.postId);
    setPostData(data);
  };

  const PostCreateAt = moment(new Date(postData?.createAt?.toDate()));

  let dateFormat = "";

  if (moment(PostCreateAt).isSame(moment(), "day")) {
    dateFormat = "Today";
  } else {
    dateFormat = "not";
  }

  return (
    <View
      style={{
        alignItems: "center",

        marginTop: verticalScale(10),
        borderRadius: scale(5),
        overflow: "hidden",
        backgroundColor:
          props?.message?.senderId == authData?.uid
            ? colors.green
            : colors.superLightGray,
        justifyContent: "center",
        width: "65%",
        padding: 1,
      }}
    >
      <View
        style={{
          margin: scale(5),
          backgroundColor: colors.white,
          borderRadius: scale(5),
          padding: 5,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            backgroundColor: colors.white,
          }}
        >
          <View
            style={{
              backgroundColor: colors.white,
              flexDirection: "row",
              justifyContent: "space-around",

              alignItems: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: colors.white,
                left: -8,
              }}
            >
              <View
                style={{
                  marginLeft: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomImage
                  onImagePress={() => {
                    let BlockExist = authData?.BlockUsers?.map(
                      (item) => item
                    ).includes(userProfileData?.uid);
                    if (BlockExist) {
                      navigation.navigate("BlockScreen");

                      return;
                    }

                    if (userProfileData.uid == authData.uid) {
                      navigation.navigate("Profile", {
                        event: userProfileData?.uid,
                      });
                      return;
                    }
                    navigation.navigate("UserProfile", {
                      event: userProfileData?.uid,
                    });
                  }}
                  width={25}
                  height={25}
                  imageUrl={userProfileData?.profileImage}
                />
              </View>
              <View
                style={{
                  marginLeft: 5,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CustomText
                  label={userProfileData?.name}
                  fontFamily={InterFont.semiBold}
                  fontSize={verticalScale(8)}
                  margin={scale(5)}
                />
                {userProfileData?.trophy == "verified" && (
                  <Image
                    resizeMode="contain"
                    style={{ width: 15, height: 15 }}
                    source={icons.trophyIcon}
                  />
                )}
              </View>
            </View>

            <CustomText
              label={
                dateFormat == "Today"
                  ? moment(new Date(postData?.createAt?.toDate())).fromNow()
                  : moment(new Date(postData?.createAt?.toDate())).format(
                      "DD/MMM/h:mm:A"
                    )
              }
              fontSize={verticalScale(7)}
            />
          </View>

          {postData?.description ? (
            <View style={{ margin: scale(5) }}>
              <CustomText label={postData?.description} />
            </View>
          ) : (
            <View
              style={{
                margin: scale(5),
              }}
            >
              <TouchableOpacity activeOpacity={1}>
                {!postData?.uriData?.type ? (
                  <></>
                ) : (
                  <>
                    {!postData?.uriData?.type?.includes("image") ? (
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
                            video={{ uri: postData?.uriData?.uri }}
                            thumbnail={{ uri: postData?.uriData?.thumbnail }}
                          />
                        </View>
                      </>
                    ) : (
                      <>
                        <FastImage
                          source={
                            !postData?.uriData?.uri == ""
                              ? { uri: postData?.uriData.uri }
                              : images.postPic
                          }
                          style={styles.postContainer}
                        />
                      </>
                    )}
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}

          <Spacer height={5} />
        </View>
      </View>
    </View>
  );
};

export default InternalShareComponent;

const styles = StyleSheet.create({
  postContainer: {
    width: "100%",
    height: verticalScale(100),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
