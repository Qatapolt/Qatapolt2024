import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  Text,
  Keyboard,
  TouchableWithoutFeedback
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
import {
  getGroupMessages,
  getIndividualMessages,
} from '../screens/services/MessagesServices';
import GroupSenderMessage from './GroupChat/GroupSenderMessage';
import GroupReceiverMessage from './GroupChat/GroupReceiverMessage';
import { dateFormat, timeFormat } from '../utils/Commons';
import moment from 'moment';

// import { getMessages } from "../Services/chats";
export const GroupChatBody = ({
  authId,
  groupId,
  setImageObject,
  setImageModal,

  navigation,
  showTyping,
}) => {
  const [messages, setMessages] = useState([]);

  // console.log('MessageChat', messages);
  useEffect(() => {
    const messageSubscriber = getGroupMessages(groupId, setMessages);

    return () => messageSubscriber();
  }, [groupId, authId]);
  const renderMessages = ({item: message, index}) => {
    const isUser = message?.senderDetail.id == authId;

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
        {/* {message?.interShare?.internalFile?.postId?(
          <InternalShareComponent
           message={message?.interShare}
          />

        ):(
          <> */}
           {!isUser ? (
          <GroupSenderMessage
          setImageObject={setImageObject}
          setImageModal={setImageModal}
          navigation={navigation}

           message={message} />
        ) : (
          <GroupReceiverMessage
          setImageObject={setImageObject}
          setImageModal={setImageModal}
          navigation={navigation}
          message={message} />
        )}
          {/* </>
        )


        } */}


       
      </View>
    </View>
     
    );
  };

  //   <View key={index} style={{ padding: 5 }}>
  //         <View style={isUser ? styles.message1 : styles.message2}>
  //           <CustomText label={message.text} textStyle={styles.messageText} />
  //         </View>
  //         <CustomText
  //           label={message.createdAt}
  //           textStyle={isUser ? styles.timerText : styles.timerText1}
  //         />
  //       </View>
  return (


    <View style={styles.chatContainer}>
      <FlatList
        data={messages}
      
        // style={{backgroundColor:"red",flex:1}}
        // contentContainerStyle={{flex:1}}
        inverted={true}
        renderItem={renderMessages}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
          </View>



  );
};
const styles = StyleSheet.create({
  chat: {
    padding: scale(10),
    height: '75%',
  },
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
    maxWidth: '95%',
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
  imgReciver: {
    width: '70%',
    // height: verticalScale(170),
    backgroundColor: colors.superLightGray,
    overflow: 'hidden',
    padding: 5,
    // shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
    // shadowRadius: 5,
    // elevation: 3,
    // shadowOpacity: 0.5,
    // shadowOffset: {width: 1, height: 1},

    borderRadius: scale(10),
  },
  imConatiner: {
    width: '100%',
    height: '100%',
    borderRadius: scale(10),
  },
  leftImageContainer1: {
    width: scale(150),
    height: verticalScale(180),
    padding: verticalScale(5),
    alignItems:"flex-start",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    flexDirection: 'row',
  },
  leftImageContainer2: {
    width: scale(150),
    height: verticalScale(180),
    padding: verticalScale(5),
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    // marginVertical:verticalScale(10),
  },
  imgReceiver: {
    width: '100%',
    backgroundColor: colors.superLightGray,
    overflow: 'hidden',
    overflow: 'hidden',
    padding: 5,

  },
  imgSender: {
    width:"100%",
    backgroundColor: colors.green,
    overflow: 'hidden',
    padding: 5,
   

    borderRadius: scale(10),
  },
});
// {!isUser ? (
//   <TouchableOpacity
//   style={{
//     width: scale(30),
//     height: scale(30),
//     borderRadius: 100,
//     alignSelf: 'center',
//     marginTop: verticalScale(10),
//     overflow:"hidden"
//   }}
//   activeOpacity={0.6}
//   onPress={()=>{
//     navigation.navigate('UserProfile', {
//       event: message?.senderDetail?.id,
//     });

//   }}
//   >

//   <Image
//     style={{
//       width: "100%",
//       height: "100%",

//     }}
//     source={
//       message.senderDetail.img
//         ? {uri: message.senderDetail.img}
//         : icons.followProfile
//     }
//   />
//                 </TouchableOpacity>

// ) : (
//   // <Avatar
//   //   activeOpacity={0.9}
//   //   onPress={() => {
//   //     navigation.navigate('Profile', {user: true});
//   //   }}
//   //   rounded
//   //   source={images.profile2}
//   //   size={30}
//   // />
//   <></>
// )}