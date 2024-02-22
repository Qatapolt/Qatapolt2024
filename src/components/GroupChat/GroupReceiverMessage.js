import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { colors } from "../../utils/Colors";
import { InterFont } from "../../utils/Fonts";
import CustomText from "../CustomText";
import VideoPlayer from "react-native-video-player";
import { icons } from "../../assets/icons";

const GroupReceiverMessage = (props) => {
  console.log("calling", props.message?.mediaFiles.upLoadedBy);
  return (
    <View style={{ flex: 1 }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
            }}
          >
            {props.message?.mediaFiles?.uri ? (
              <View style={styles.leftImageContainer2}>
                {props.message?.mediaFiles?.type.includes("image") ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      props.setImageObject(props?.message);
                      props.setImageModal(true);
                    }}
                    style={styles.imgSender}
                  >
                    <Image
                      style={styles.imConatiner}
                      resizeMode="cover"
                      source={{ uri: props.message?.mediaFiles?.uri }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      props.setImageObject(props?.message);
                      props.setImageModal(true);
                    }}
                    style={{
                      ...styles.imgSender,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={styles.imConatiner}
                      resizeMode="cover"
                      source={{ uri: props.message?.mediaFiles?.thumbnail }}
                    />
                    <View
                      style={{
                        width: scale(40),
                        height: scale(40),
                        position: "absolute",
                        top: "40%",
                        padding: scale(3),
                        borderRadius: scale(100),
                        backgroundColor: colors.black,
                        opacity: 0.4,
                        alignSelf: "center",
                      }}
                    ></View>

                    <Image
                      source={icons.pause}
                      style={{
                        width: scale(25),
                        height: scale(25),
                        position: "absolute",
                        left: "45%",
                        top: "44%",
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View style={styles.message1}>
                <CustomText
                  label={props.message.text}
                  textStyle={styles.messageText}
                />
              </View>
            )}
          </View>
        </View>

        {/* <View style={styles.leftImageContainer1}>
        {groupData ? (
          <Avatar
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('Profile', {user: true});
            }}
            rounded
            source={images.profile2}
            size={35}
          />
        ) : (
          <></>
        )}
        <Spacer width={10} />
        <View>
        

          <View style={styles.leftImageContainer2}>
            <TouchableOpacity
              activeOpacity={0.8}
              onLongPress={() => {
               
              }}
              style={styles.imgReciver}>
              <Image style={styles.imConatiner} source={images.postPic} />
            </TouchableOpacity>

          
          </View>
        </View>
      </View> */}
      </View>
    </View>
  );
};

export default GroupReceiverMessage;

const styles = StyleSheet.create({
  chat: {
    padding: 15,
    height: "75%",
  },

  message: {
    backgroundColor: "#F3F3F3",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  messageSpoil: {
    height: 30,
    width: 30,
    alignSelf: "flex-end",
    top: -30,
    right: -15,
  },
  message1: {
    backgroundColor: colors.green,
    alignSelf: "flex-end",
    paddingHorizontal: verticalScale(5),
    paddingVertical: verticalScale(10),
    borderBottomLeftRadius: verticalScale(10),
    borderTopLeftRadius: verticalScale(7),
    borderTopRightRadius: verticalScale(7),
    marginTop: verticalScale(10),
  },
  timerText: {
    fontSize: verticalScale(10),
    color: colors.black,
    alignSelf: "flex-end",
    fontWeight: "500",
    marginTop: verticalScale(10),
  },
  timerText1: {
    fontSize: verticalScale(10),
    color: colors.black,
    alignSelf: "flex-start",
    marginTop: verticalScale(10),
    fontFamily: InterFont.regular,
    fontWeight: "500",
  },
  message2: {
    backgroundColor: colors.superLightGray,
    alignSelf: "flex-start",
    paddingHorizontal: verticalScale(5),
    paddingVertical: verticalScale(10),
    borderTopRightRadius: verticalScale(7),
    borderTopLeftRadius: verticalScale(7),
    marginTop: verticalScale(10),
    marginLeft: scale(5),
    borderBottomRightRadius: verticalScale(10),
    // marginTop: verticalScale(5),
    // shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
    // shadowRadius: 5,
    // elevation: 3,
    // shadowOpacity: 0.5,
    // shadowOffset: {width: 1, height: 1},
  },
  messageText: {
    fontSize: verticalScale(10),
    color: colors.black,
    fontFamily: InterFont.regular,
    fontWeight: "600",
  },
  messageText2: {
    fontSize: verticalScale(10),
    color: colors.black,
    fontFamily: InterFont.regular,
    fontWeight: "600",
  },
  imgSender: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.green,
    overflow: "hidden",
    padding: 5,

    borderRadius: scale(10),
  },
  imgReceiver: {
    width: "100%",
    backgroundColor: colors.superLightGray,
    overflow: "hidden",
    padding: 5,

    borderRadius: scale(10),
  },
  imConatiner: {
    width: "100%",
    height: "100%",
    borderRadius: scale(10),
  },
  leftImageContainer1: {
    // flexDirection: 'row',
    width: "100%",
    height: verticalScale(180),
    marginVertical: verticalScale(5),
    alignItems: "center",
  },
  leftImageContainer2: {
    width: scale(150),
    height: verticalScale(180),
    padding: verticalScale(5),
    alignItems: "flex-end",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row",
    // marginVertical:verticalScale(10),
  },
});
