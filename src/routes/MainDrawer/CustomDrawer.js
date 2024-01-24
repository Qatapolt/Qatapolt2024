import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "../../assets/images";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { scale, verticalScale } from "react-native-size-matters";
import ProfilePhoto from "../../components/ProfilePhoto";
import CustomText from "../../components/CustomText";
import { Spacer } from "../../components/Spacer";
import { InterFont } from "../../utils/Fonts";
import { colors } from "../../utils/Colors";
import CustomImage from "../../components/CustomImage";

import { useSelector } from "react-redux";
import { icons } from "../../assets/icons";
const CustomDrawer = ({ ...props }) => {
  const CurrentUser = useSelector((state) => state.auth?.currentUser);
  // console.log('AllCurrentUser', CurrentUser);
  return (
    <>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView
          {...props}
          // contentContainerStyle={{backgroundColor: '#FD703B'}}
        >
          <View
            // source={images.background}
            style={{
              height: verticalScale(150),
              alignItems: "center",
              top: -10,
            }}
          >
            <Image
              resizeMode="cover"
              source={images.background1}
              style={{ position: "absolute", width: "105%", height: "100%" }}
            />
            <Spacer height={20} />
            <CustomImage
              onImagePress={() => props.navigation.navigate("Profile")}
              imageUrl={CurrentUser?.profileImage}
            />
            {/* <ProfilePhoto  drawer  image width={scale(80)} height={scale(80)} /> */}
            <Spacer height={5} />

            <CustomText
              onPress={() => props.navigation.navigate("Profile")}
              textTransform={"capitalize"}
              label={CurrentUser.name}
              color={colors.white}
              fontSize={12}
              fontWeight={"400"}
            />
            {/* <Spacer height={5}/> */}
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "70%",
                alignSelf: "center",
                justifyContent: "center",
              }}
              onPress={() => props.navigation.navigate("Profile")}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: verticalScale(14),
                  fontWeight: "700",
                  marginTop: verticalScale(5),
                  fontFamily: InterFont.regular,
                  alignSelf: "center",
                  textAlign: "center",
                  color: "#f3f3f3",
                }}
              >
                {`${CurrentUser.username}`}
              </Text>
              <Spacer width={5} />

              {CurrentUser?.trophy == "verified" && (
                <Image
                  resizeMode="contain"
                  style={{ width: 17, height: 17, marginTop: 5 }}
                  source={icons.trophyIcon}
                />
              )}
            </TouchableOpacity>

            {/* <CustomText label="umairabbas719@gmail.com"/> */}
            {/* <View style={{padding: 30}}>
            <Image
              source={images.appIcon}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
                // marginLeft: -10,
                top: 40,
                left: -20,
              }}
            />
            <Text
              style={{
                top: 40,
                left: -15,
                fontSize: 20,
                fontWeight: '700',
                color: '#f3f3f3',
              }}>
              {'UserName'}
            </Text>
            <Text
              style={{
                color: '#f3f3f3',
                justifyContent: 'center',
                top: 40,
                left: -15,
                fontSize:16
              }}>
              {"Email"}
            </Text>
          </View> */}
          </View>
          <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>

        {/* <View style={{marginBottom: 20}}>
        {status ? (
          <Button
            text="Logout"
            size={20}
            color={appColors.secondary}
            onPress={() => {
              CustomConfirmAlert(
                'Important',
                'Are Your Sure You Want To Logout',
                () => {
                  dispatch({
                    type: 'Logout',
                  });
                },
              );
              // console.log(res);
            }}
          />
        ) : (
          <></>
        )}
      </View> */}
      </View>
    </>
  );
};

export default CustomDrawer;
// const CustomConfirmAlert = (title, msg, onConfirm) => {
//   alert(title, msg, [
//     {
//       text: 'Cancel',
//       onPress: () => console.log('Cancel'),
//       style: 'cancel',
//     },
//     {
//       text: 'OK',
//       onPress: () => {
//         onConfirm();
//       },
//     },
//   ]);
// };
