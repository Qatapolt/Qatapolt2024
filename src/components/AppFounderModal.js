import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { colors } from "../utils/Colors";
import { scale, verticalScale } from "react-native-size-matters";
import CustomText from "./CustomText";
import { InterFont } from "../utils/Fonts";
import { Spacer } from "./Spacer";
import SepratorLine from "./SepratorLine";
import { Avatar, Divider, Image, ListItem } from "react-native-elements";
import { icons } from "../assets/icons";
import { PH10 } from "../utils/CommonStyles";
import CustomButton from "./CustomButton";
import CustomImage from "./CustomImage";
import {
  getSpecificUser,
  NotificationSender,
  SaveUser,
  UpdateFollower,
  UpdateFollowing,
  UpdateFollowRequest,
} from "../screens/services/UserServices";
import { authData } from "../redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import uuid from "react-native-uuid";
import { postNotification } from "../screens/services/NotificationServices";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const AppFounderModal = ({
  modalVisible,
  setModalVisible,
  handelModal,
  appFounderData,
  authUser,
  dispatch,
  setIsWelcomeModal,
}) => {
  const onUserFollower = async () => {
    if (appFounderData?.AllFollowers?.includes(authUser.uid)) {
      let filterUserFollowerList = appFounderData?.AllFollowers.filter(
        (data) => data != authUser?.uid
      );
      await SaveUser(appFounderData?.uid, {
        AllFollowers: filterUserFollowerList,
      });

      if (appFounderData?.AllFollowers?.includes(authUser.uid)) {
        let filterFollowingList = authUser?.AllFollowing.filter(
          (data) => data != appFounderData?.uid
        );
        await SaveUser(authUser?.uid, {
          AllFollowing: filterFollowingList,
          firstLogin: 1,
        });
      }

      const data = await getSpecificUser(authUser?.uid);
      dispatch(authData(data));
      setModalVisible(false);

      setTimeout(() => {
        setIsWelcomeModal(true);
      }, 1000);

      return;
    }
    if (appFounderData?.privateProfile) {
      if (appFounderData?.RequestIds?.includes(authUser?.uid)) {
        // console.log('lvnlcnvln');

        // filter user followers
        let filterUserFollowRequest = appFounderData?.RequestIds.filter(
          (data) => data != authUser?.uid
        );
        await SaveUser(appFounderData?.uid, {
          RequestIds: filterUserFollowRequest,
        });
      } else {
        const id = uuid.v4();
        await UpdateFollowRequest(appFounderData.uid, authUser?.uid, id);
        sendFollowerNotification("Follow Request", "FOLLOW__REQUEST", id);
        setModalVisible(false);
      }
      return;
    }
    try {
      // update user followers
      await UpdateFollower(appFounderData.uid, authUser?.uid);
      //  update auth following
      await UpdateFollowing(authUser?.uid, appFounderData?.uid);

      const data = await getSpecificUser(authUser?.uid);
      await SaveUser(authUser?.uid, {
        firstLogin: 1,
      });
      dispatch(authData(data));

      setModalVisible(false);

      setTimeout(() => {
        setIsWelcomeModal(true);
      }, 1000);

      // sendNotification(authUser,  CurrentUser, authUser?.profileImage?authUser?.profileImage:undefined, "Follow You", "Follow You")

      sendFollowerNotification(
        "Follow You",
        "FOLLOW",
        uuid.v4(),
        appFounderData
      );
    } catch (error) {
      console.log("ErrorHai", error);
    }
  };

  const sendFollowerNotification = async (message, type, id) => {
    const senderName = `${authUser?.name} ${message}`;

    NotificationSender(appFounderData?.fcmToken, message, senderName);

    const senderData = {
      message: message,
      thumbnail: appFounderData?.profileImage
        ? appFounderData?.profileImage
        : "",
      senderName: authUser?.name,
      senderId: authUser?.uid,
      senderUsername: authUser?.username,
      notificationType: type,
      id: id,
      receiverId: appFounderData?.uid,
      createdAt: new Date(),
      senderImage: authUser?.profileImage ? authUser?.profileImage : "",
    };

    await postNotification(senderData);
  };

  return (
    <Modal isVisible={modalVisible} onBackdropPress={handelModal}>
      <View
        style={{
          height: height / 7,
          width: width / 1.5,
          alignSelf: "center",
          backgroundColor: colors.white,
          borderRadius: scale(7),
        }}
      >
        <Spacer height={5} />

        <CustomText
          label={"Recommended Follow"}
          fontSize={14}
          alignSelf="center"
          fontFamily={InterFont.semiBold}
          color={colors.black}
          // fontFamily={InterFont.bold}
        />
        <Spacer height={5} />

        <SepratorLine height={2} />
        <ListItem>
          <CustomImage
            // onImagePress={onNavigate}
            width={45}
            height={45}
            imageUrl={appFounderData?.profileImage}
          />
          {/* <Avatar
          activeOpacity={0.9}
          onPress={() => {
           props.navigation.navigate('Profile', {user: true});
          }}
          rounded
          source={icons.profile}
          size={50}
        /> */}
          <ListItem.Content>
            <ListItem.Title
              style={{ fontWeight: "bold", fontSize: verticalScale(10) }}
            >
              {"The Founder of Qatapolt"}
            </ListItem.Title>
            <Spacer height={3} />
            <ListItem.Subtitle
              style={{ color: colors.primary }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {`${appFounderData?.username}`}
            </ListItem.Subtitle>
          </ListItem.Content>

          <CustomButton
            height={25}
            onPress={() => onUserFollower()}
            borderRadius={7}
            backgroundColor={colors.green}
            color={colors.white}
            fontSize={10}
            title={"Follow"}
            width={"27%"}
          />
        </ListItem>
        {/* <Avatar
            activeOpacity={0.9}
            //   onPress={() => {
            //    props.navigation.navigate('Profile', {user: true});
            //   }}
            rounded
            source={icons.profile}
            size={50}
          /> */}
      </View>
    </Modal>
  );
};

export default AppFounderModal;

const styles = StyleSheet.create({});
