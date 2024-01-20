import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {scale, verticalScale} from 'react-native-size-matters';
// import CustomText from "../CustomText";
import CustomText from './CustomText';
import {colors} from '../utils/Colors';
// import { color } from "@rneui/base";
// import colors from "../../util/colors";
import {InterFont} from '../utils/Fonts';
import {icons} from '../assets/icons';
import {Avatar} from 'react-native-elements';
import {images} from '../assets/images';
import {Spacer} from './Spacer';
import LottieView from 'lottie-react-native';
import lottieTyping from '../assets/Animate';
import {getIndividualMessages} from '../screens/services/MessagesServices';
import moment from 'moment';
import {dateFormat, timeFormat} from '../utils/Commons';
import SenderMessageComponent from './IndividualChat/SenderMessageComponent';
import ReceiverMessageComponents from './IndividualChat/ReceiverMessageComponents';
import InternalShareComponent from './IndividualChat/InternalShareComponent';
import {responsiveHeight} from 'react-native-responsive-dimensions';

// import { getMessages } from "../Services/chats";
export const ChatBody = ({
  authId,
  formId,
  otherId,
  setImageObject,
  setImageModal,
  imageLoading,
}) => {
  const [messages, setMessages] = useState([]);

  const isAuthId = formId == authId;
  // console.log('MessageChat', isAuthId);

  useEffect(() => {
    const messageSubscriber = getIndividualMessages(
      authId,
      otherId,
      setMessages,
    );

    return () => messageSubscriber();
  }, [authId, otherId]);
  const renderMessages = ({item: message, index}) => {
    console.log('MessageData', message);
    const isUser = message?.from == authId;
    const ChatTime = timeFormat(message?.date, 'hh:mm a');

    const messageDate = moment(new Date(message.date.toDate()));
    let LestMessageDate = dateFormat(messageDate);

    let showDateLabel = false;
    if (index === messages.length - 1) {
      showDateLabel = true;
    } else {
      const nextMessage = messages[index + 1];
      const currentDate = new Date(message.date.toDate());
      const nextDate = new Date(nextMessage.date.toDate());

      if (currentDate.getDate() !== nextDate.getDate()) {
        showDateLabel = true;
      }
    }
    return (
      <View style={{flex: 1}}>
        <View>
          {showDateLabel && (
            <Text
              style={{
                fontSize: verticalScale(10),
                color: colors.black,
                fontWeight: '500',
                textAlign: 'center',
                marginVertical: verticalScale(10),
              }}>
              {LestMessageDate}
              <Spacer width={6} />
              <Text
                style={{
                  fontSize: verticalScale(10),
                  color: colors.black,
                  fontWeight: '500',
                  textAlign: 'center',
                  marginVertical: verticalScale(10),
                }}>
                {ChatTime}
              </Text>
            </Text>
          )}
          {message?.interShare?.internalFile?.postId ? (
            <InternalShareComponent message={message?.interShare} />
          ) : (
            <>
              {!isUser ? (
                <SenderMessageComponent
                  setImageObject={setImageObject}
                  setImageModal={setImageModal}
                  message={message}
                />
              ) : (
                <ReceiverMessageComponents
                  setImageObject={setImageObject}
                  setImageModal={setImageModal}
                  imageLoading={imageLoading}
                  message={message}
                />
              )}
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    //   <TouchableWithoutFeedback
    //   onPress={Keyboard.dismiss}
    //   style={{flex: 1,}}

    //   // keyboardVerticalOffset={
    //   //   Platform.OS === 'ios' ?-10 : 12
    //   // }
    // >

    <View style={styles.chatContainer}>
      <FlatList
        data={messages}
        //   style={{height:"100%",backgroundColor:"green",

        //   // justifyContent: 'flex-start',
        // }}
        // contentContainerStyle={{flex:1,
        //   // justifyContent: 'flex-start',
        //   // alignItems: 'flex-start',
        // }}
        inverted={true}
        renderItem={renderMessages}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>

    // </TouchableWithoutFeedback>
  );
};

// const styles = StyleSheet.create({
//   chat: {
//     padding: 15,
//     height: "75%",
//   },

//   message: {
//     backgroundColor: "#F3F3F3",
//     borderTopRightRadius: 20,
//     borderTopLeftRadius: 20,
//     padding: 20,
//     minHeight: 100,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   messageSpoil: {
//     height: 30,
//     width: 30,
//     alignSelf: "flex-end",
//     top: -30,
//     right: -15,
//   },
//   message1: {
//     backgroundColor: colors.primary,
//     alignSelf: "flex-end",
//     paddingHorizontal: verticalScale(15),
//     paddingVertical: verticalScale(5),
//     borderBottomLeftRadius: verticalScale(5),
//     borderBottomRightRadius: verticalScale(5),
//     borderTopLeftRadius: verticalScale(5),
//   },
//   timerText: {
//     fontSize: verticalScale(9),
//     color: colors.lightGray,
//     alignSelf: "flex-end",
//     marginTop: verticalScale(10),
//   },
//   timerText1: {
//     fontSize: verticalScale(10),
//     color: colors.lightGray,
//     alignSelf: "flex-start",
//     marginTop: verticalScale(10),
//   },
//   message2: {
//     backgroundColor:colors.inputBorder,
//     alignSelf: "flex-start",
//     paddingHorizontal: verticalScale(15),
//     paddingVertical: verticalScale(5),
//     borderBottomLeftRadius: verticalScale(5),
//     borderBottomRightRadius: verticalScale(5),
//     borderTopLeftRadius: verticalScale(5),

//   },
//   messageText: {
//     fontSize: verticalScale(10),
//     color: colors.lightBlack,
//   },
// });

const styles = StyleSheet.create({
  chatContainer: {
    flex: 5,
    marginHorizontal: scale(15),
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  message: {
    backgroundColor: '#F3F3F3',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageSpoil: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    top: -30,
    right: -15,
  },
  message1: {
    backgroundColor: colors.green,
    alignSelf: 'flex-end',
    paddingHorizontal: verticalScale(5),
    paddingVertical: verticalScale(10),
    borderBottomLeftRadius: verticalScale(10),
    borderTopLeftRadius: verticalScale(7),
    borderTopRightRadius: verticalScale(7),
    marginTop: verticalScale(10),
    // shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
    // shadowRadius: 5,
    // elevation: 4,
    // shadowOpacity: 0.3,

    // shadowOffset: {width: 1, height: 1},
  },
  timerText: {
    fontSize: verticalScale(10),
    color: colors.black,
    alignSelf: 'flex-end',
    fontWeight: '500',
    marginTop: verticalScale(10),
  },
  timerText1: {
    fontSize: verticalScale(10),
    color: colors.black,
    alignSelf: 'flex-start',
    marginTop: verticalScale(10),
    fontFamily: InterFont.regular,
    fontWeight: '500',
  },
  message2: {
    backgroundColor: colors.superLightGray,
    alignSelf: 'flex-start',
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
    fontWeight: '600',
  },
  messageText2: {
    fontSize: verticalScale(10),
    color: colors.black,
    fontFamily: InterFont.regular,
    fontWeight: '600',
  },
  imgSender: {
    width: '100%',
    backgroundColor: colors.green,
    overflow: 'hidden',
    padding: 5,

    borderRadius: scale(10),
  },
  imgReceiver: {
    width: '100%',
    backgroundColor: colors.superLightGray,
    overflow: 'hidden',
    padding: 5,

    borderRadius: scale(10),
  },
  imConatiner: {
    width: '100%',
    height: '100%',
    borderRadius: scale(10),
  },
  leftImageContainer1: {
    // flexDirection: 'row',
    width: '100%',
    height: verticalScale(180),
    marginVertical: verticalScale(5),
    alignItems: 'center',
  },
  leftImageContainer2: {
    width: scale(120),
    height: verticalScale(180),
    padding: verticalScale(5),
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    // marginVertical:verticalScale(10),
  },
});

{
  /* {showTyping && isAuthId && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            alignItems: 'center',
            width: '20%',
            paddingLeft: scale(10),
          }}>
          <Avatar
            activeOpacity={0.9}
           
            rounded
            source={images.profile2}
            size={30}
          />
          <LottieView
            style={{height: 40}}
            source={lottieTyping}
            autoPlay
            speed={1.5}
          />

        </View>
      )} */
}
