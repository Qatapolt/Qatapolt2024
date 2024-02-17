import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getSpecificUser } from "../../services/UserServices";
import commonStyles from "../../../../utils/CommonStyles";
import CustomImage from "../../../../components/CustomImage";
import CustomText from "../../../../components/CustomText";
import CustomButton from "../../../../components/CustomButton";
import { colors } from "../../../../utils/Colors";
import { Spacer } from "../../../../components/Spacer";
import { icons } from "../../../../assets/icons";

const UserFollowerContainer = ({
  item,
  onFollower,
  authId,
  onNavigate,
  authStateFollowing,
  authState,
}) => {
  const [userData, setUserData] = useState({});
  // useEffect(() => {
  //   getFollowerUser()
  //     // getFollowerUser()
  // }, [item])
  // const getFollowerUser= async()=>{
  //   const users= await getSpecificUser(item)
  //   setUserData(users)
  // }
  return (
    <View style={{ width: "100%" }} activeOpacity={0.6}>
      <View style={commonStyles.rowJustify}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onNavigate}
          style={{ ...commonStyles.rowContainer, width: "70%" }}
        >
          <View>
            <CustomImage width={50} height={50} imageUrl={item?.profileImage} />
          </View>
          <Spacer width={15} />
          <View
            style={{ display: "flex", justifyContent: "center", width: "60%" }}
          >
            <View>
              <CustomText numberOfLines={1} label={item?.name} fontSize={13} />
              <Spacer height={2} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignItems: "center",
                }}
              >
                <CustomText
                  numberOfLines={1}
                  label={item?.username ? `${item?.username}` : ""}
                />
                <Spacer width={5} />
                {item.trophy == "verified" && (
                  <Image
                    resizeMode="contain"
                    style={{ width: 17, height: 17 }}
                    source={icons.trophyIcon}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {authId == item?.uid ? (
          <></>
        ) : (
          <CustomButton
            height={27}
            borderRadius={8}
            onPress={onFollower}
            backgroundColor={
              item?.RequestIds?.includes(authState.uid)
                ? colors.green
                : authStateFollowing?.includes(item.uid)
                ? colors.lightGray
                : colors.green
            }
            color={colors.white}
            fontSize={13}
            title={
              item?.RequestIds?.includes(authState.uid)
                ? "Requested"
                : authStateFollowing?.includes(item.uid)
                ? "Following"
                : "Follow"
            }
            width={"27%"}
          />
        )}
      </View>

      <Spacer height={15} />
    </View>
  );
};

export default UserFollowerContainer;

const styles = StyleSheet.create({});
