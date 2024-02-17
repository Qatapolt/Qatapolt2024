import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Animated,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { colors } from "../../../../utils/Colors";
import CustomHeader from "../../../../components/CustomHeader";
import { InterFont } from "../../../../utils/Fonts";
import CustomText from "../../../../components/CustomText";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Spacer } from "../../../../components/Spacer";
import { Avatar } from "react-native-elements";
import { icons } from "../../../../assets/icons";
import Entypo from "react-native-vector-icons/Entypo";
import commonStyles, { PH10, PH20 } from "../../../../utils/CommonStyles";
import { images } from "../../../../assets/images";
import PostHeader from "./PostHeader";
import PostItemBottom from "./PostItemBottom";
import Modal from "react-native-modal";
import { getSpecificUser } from "../../../services/UserServices";
import CustomImage from "../../../../components/CustomImage";
import moment from "moment";
import FastImage from "react-native-fast-image";
import PostBottomItem from "../../../../components/PostBottomItem";
import VideoPlayer from "react-native-video-player";
import CustomPostOption from "../../../../components/CustomPostOption";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useRoute, useNavigation } from "@react-navigation/native";
const ViewPost = (props) => {
  const isFocused = useIsFocused();
  const [hideImage, setShowImage] = useState(true);
  const [potionSheet, setPotionSheet] = useState(false);
  const authData = useSelector((state) => state?.auth?.currentUser);
  // console.log('AllLikePost', props?.likePost);

  const [userProfileData, setUserProfileData] = useState({});
  // console.log('PostUserData', userProfileData);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    getUserData();
  }, [props?.postObject]);

  const getUserData = async () => {
    const userData = await getSpecificUser(props?.postObject?.userId);
    setUserProfileData(userData);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const HandlePress = () => {
    if (hideImage) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
      setShowImage(false);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
      setShowImage(true);
    }
  };
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [props.showPost]);

  const PostCreateAt = moment(new Date(props?.postObject?.createAt?.toDate()));

  let dateFormat = "";

  if (moment(PostCreateAt).isSame(moment(), "day")) {
    dateFormat = "Today";
  } else {
    dateFormat = "not";
  }
  function truncateText(text, maxWords) {
    const words = text.split(" ");

    if (words.length > maxWords) {
      const truncatedText = words.slice(0, maxWords).join(" ") + "......";

      return truncatedText;
    } else {
      return text;
    }
  }
  return (
    props.viewPostModal === true && (
      <View
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            HandlePress();
          }}
          style={{
            flex: 1,
            // width: '100%',
            // height: '100%',
            backgroundColor: "black",
          }}
        >
          <Spacer height={Platform.OS == "ios" ? 50 : 10} />
          <PH10>
            <CustomHeader
              LeftSide={() => (
                <Animated.View style={{ opacity: fadeAnim }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.setViewPostModal(false),
                        props.setOptionSheet(false);
                    }}
                  >
                    <Ionicons
                      name="chevron-back"
                      color={colors.white}
                      size={moderateScale(30)}
                    />
                  </TouchableOpacity>
                </Animated.View>
              )}
              RightSide={() => (
                <Animated.View
                  style={{ opacity: fadeAnim, zIndex: 999999999999 }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      console.log("press");
                      // props.setViewPostModal(false);
                      props.setSelectPost(props?.postObject);
                      props.onOpen();
                    }}
                    style={{ width: scale(40), alignItems: "flex-end" }}
                  >
                    <Entypo
                      name="dots-three-horizontal"
                      color={colors.white}
                      size={moderateScale(25)}
                    />
                  </TouchableOpacity>
                </Animated.View>
              )}
            />
          </PH10>
          <Spacer height={10} />
          <View style={{ alignSelf: "center", height: "65%", width: "100%" }}>
            <>
              {!props?.postObject?.uriData?.type?.includes("image") ? (
                <>
                  <View
                    style={{
                      height: "100%",
                      // position: 'absolute',
                      justifyContent: "center",
                      // alignItems: 'center',
                    }}
                  >
                    <VideoPlayer
                      autoplay={true}
                      // defaultMuted={true}
                      resizeMode="cover"
                      playButton={true}
                      pauseOnPress={true}
                      videoWidth={1400}
                      videoHeight={1100}
                      video={{ uri: props?.postObject?.uriData?.uri }}
                      thumbnail={{ uri: props?.postObject?.uriData?.thumbnail }}
                    />
                  </View>
                </>
              ) : (
                <>
                  <FastImage
                    style={commonStyles.img}
                    source={{ uri: props?.postObject.uriData?.uri }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </>
              )}
            </>
          </View>

          <Animated.View
            style={{
              alignSelf: "center",
              opacity: fadeAnim,

              height: "25%",
              width: "100%",
              position: "absolute",
              bottom: 0,
              backgroundColor: "#00000090",
            }}
          >
            <View style={{ padding: verticalScale(10) }}>
              <View style={commonStyles.rowContainer}>
                <CustomImage
                  width={50}
                  height={50}
                  imageUrl={userProfileData?.profileImage}
                />
                <View style={{ paddingLeft: scale(10) }}>
                  <CustomText
                    label={userProfileData?.name}
                    fontSize={14}
                    fontFamily={InterFont.bold}
                    color={colors.white}
                  />
                  <View style={commonStyles.rowContainer}>
                    <CustomText
                      label={`${userProfileData?.username}`}
                      fontSize={11}
                      fontFamily={InterFont.medium}
                      color={colors.superLightGray}
                    />
                    <CustomText
                      label={"-"}
                      marginLeft={5}
                      fontSize={11}
                      fontFamily={InterFont.medium}
                      color={colors.superLightGray}
                    />

                    <CustomText
                      label={
                        dateFormat == "Today"
                          ? moment(
                              new Date(props?.postObject?.createAt?.toDate())
                            ).fromNow()
                          : moment(
                              new Date(props?.postObject?.createAt?.toDate())
                            ).format("DD MMM h:mm:A")
                      }
                      fontSize={11}
                      marginLeft={5}
                      fontFamily={InterFont.medium}
                      color={colors.superLightGray}
                    />
                  </View>
                </View>
              </View>
              <Spacer height={10} />

              <CustomText
                numberOfLines={2}
                label={truncateText(props?.postObject?.description, 30)}
                fontSize={14}
                fontFamily={InterFont.medium}
                color={colors.white}
              />
            </View>
            <View style={{ top: 10 }}>
              <PH10>
                <PostBottomItem postData={props?.postObject} />
                {/* <PostItemBottom
                postData={props?.postObject}
                allColor
                likePost={props.likePost}
                setLikePost={props.setLikePost}
                navigation={props.navigation}
              /> */}
              </PH10>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
    // <Modal
    //   isVisible={props.viewPostModal}
    //   onBackdropPress={() => props.setViewPostModal(false)}
    //   style={{
    //     flex: 1,
    //     margin: 0,
    //     // overflow: "hidden",
    //   }}
    // >

    // </Modal>
  );
};

export default ViewPost;

const styles = StyleSheet.create({});
