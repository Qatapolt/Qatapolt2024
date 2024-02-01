import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { colors } from "../utils/Colors";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfilePhoto from "./ProfilePhoto";
import { Spacer } from "./Spacer";
import CustomText from "./CustomText";
import { InterFont } from "../utils/Fonts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileOptions from "./ProfileOptions";
import { getSpecificUser } from "../screens/services/UserServices";
import CustomImage from "./CustomImage";
import commonStyles from "../utils/CommonStyles";
import { icons } from "../assets/icons";

const ChatHeader = (props) => {
  const [isModalVisibleOption, setIsModalVisibleOption] = useState(false);
  const toggleOptionModal = () => {
    setIsModalVisibleOption(!isModalVisibleOption);
  };

  useEffect(() => {
    getUserData();
  }, [props?.otherId]);

  const getUserData = async () => {
    try {
      const user = await getSpecificUser(props?.otherId);
      props.setUserData(user);
    } catch (error) {
      console.log("UserDatatNhihai", error);
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        paddingBottom: scale(10),
        height: verticalScale(105),
        justifyContent: "space-between",
        backgroundColor: colors.green,
      }}
    >
      <View
        style={{ flexDirection: "row", width: "70%", alignItems: "center" }}
      >
        <TouchableOpacity
          onPress={() => {
            // console.log('knknkln');
            props.navigation.navigate("HomeChat");
          }}
        >
          <Ionicons
            name="arrow-back"
            size={moderateScale(30)}
            color={colors.white}
          />
        </TouchableOpacity>
        <Spacer width={10} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("UserProfile", {
              event: props.userData.uid,
            });
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <CustomImage
            onImagePress={() => {
              props.navigation.navigate("UserProfile", {
                event: props.userData.uid,
              });
            }}
            width={50}
            height={50}
            imageUrl={props.userData?.profileImage}
          />

          <View style={{ paddingLeft: scale(10), maxWidth: "70%" }}>
            <View style={commonStyles.rowContainer}>
              <CustomText
                label={props.userData?.name}
                numberOfLines={1}
                fontSize={12}
                fontFamily={InterFont.semiBold}
                color={colors.black}
              />
              <Spacer width={5} />

              {props?.userData?.trophy == "verified" && (
                <Image
                  resizeMode="contain"
                  style={{ width: 15, height: 15 }}
                  source={icons.trophyIcon}
                />
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CustomText
                label={props.userData?.sportEmoji}
                fontSize={11}
                fontFamily={InterFont.semiBold}
                color={colors.white}
              />
              <CustomText
                label={props.userData?.selectSport}
                fontSize={11}
                numberOfLines={1}
                fontFamily={InterFont.semiBold}
                color={colors.white}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        // onPress={() => toggleOptionModal()}
        activeOpacity={0.6}
        style={{ paddingRight: scale(10), paddingBottom: scale(11) }}
      >
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={moderateScale(25)}
          color={colors.white}
        />
      </TouchableOpacity>
      {props.SingleUser ? (
        <ProfileOptions
          delChat={props?.delChat}
          toggleModal={toggleOptionModal}
          isModalVisible={isModalVisibleOption}
        />
      ) : (
        <ProfileOptions
          groupChat
          toggleModal={toggleOptionModal}
          isModalVisible={isModalVisibleOption}
        />
      )}
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({});
