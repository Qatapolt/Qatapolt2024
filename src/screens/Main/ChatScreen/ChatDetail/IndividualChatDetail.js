import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {colors} from '../../../../utils/Colors';
import commonStyles, {PH10} from '../../../../utils/CommonStyles';
import {icons} from '../../../../assets/icons';
import {Spacer} from '../../../../components/Spacer';
import {ChatBody} from '../../../../components/ChatBody';
import {images} from '../../../../assets/images';
import SendMessage from '../../../../components/SendMessage';
import ChatHeader from '../../../../components/ChatHeader';
import {responsiveHeight} from 'react-native-responsive-dimensions';

import {
  checkIndividualRequest,
  createIndividualRequest,
  deleteIndividualChat,
  sendMessage,
  updateLastIndividualMessage,
} from '../../../services/MessagesServices';
import {useSelector} from 'react-redux';
import {uploadImage} from '../../../services/StorageServics';
import ImageView from '../../../../components/ImageView';
import SimpleLoader from '../../../../utils/SimpleLoader';
import loaderAnimation from '../../../../assets/Loaders';
import CustomCamera from '../../../../components/CustomCamera';
import {sendNotification} from '../../../services/NotificationServices';
import {getSpecificUser} from '../../../services/UserServices';

const IndividualChatDetail = ({navigation, route}) => {
  const [showTyping, setShowTyping] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);

  const [imageObject, setImageObject] = useState({});
  const [imageModal, setImageModal] = useState(false);
  const [topHeaderData, setTopHeaderData] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const [imageFile, setImageFile] = useState('');
  const [VideoFile, setVideoFile] = useState('');

  const authData = useSelector(state => state.auth.currentUser);
  // console.log('AuthData', imageObject);

  const groupData = route?.params?.group;
  const formId = route?.params?.formId;
  const otherId = route?.params?.userId;
  const dataFromSingle = route?.params?.group;
  const individual = route?.params?.individual;
  // console.log('topHeaderData', imageObject);

  const SendMessageData = async imageFile => {
    setTextMessage('');
    const RequestStatus = await checkIndividualRequest(otherId, authData?.uid);
    console.log('RequestData', RequestStatus);
    const mediaFiles = {
      uri: '',
      type: '',
      thumbnail: '',
    };
    const internalShare = {
      senderId: '',
      internalFile: {
        type: '',
        postId: '',
      },
    };
    if (!RequestStatus) {
      const requestData = {
        from: authData?.uid,
        to: otherId,
        relationStatus: 0,
        lastMessage: {},
      };
      await createIndividualRequest(requestData);
    }
    if (imageFile) {
      setImageLoading(true);
      if (imageFile.thumbnail) {
        const linkData = await uploadImage(imageFile.thumbnail, authData?.uid);
        mediaFiles['thumbnail'] = linkData;
      }

      const linkData = await uploadImage(imageFile.uri, authData?.uid);
      mediaFiles['uri'] = linkData;
      mediaFiles['type'] = imageFile.type;

      setImageLoading(false);
    }

    const messageData = await sendMessage(
      authData?.uid,
      otherId,
      textMessage
        ? textMessage
        : mediaFiles.thumbnail
        ? '🎥 Video'
        : '📷 Photo',
      mediaFiles,
      internalShare,
    );
    const userData = await getSpecificUser(otherId);
    // console.log('MessageResponse', authData?.uid, otherId, textMessage?textMessage:mediaFiles?"📷 Photo":"" ,mediaFiles);
    console.log('userData===>', userData);
    sendNotification(
      authData,
      userData,
      textMessage
        ? textMessage
        : mediaFiles.thumbnail
        ? '🎥 Video'
        : '📷 Photo',
      'Qatapolt',
      'Send A Message',
      'SEND_MESSAGE',
    );
    updateLastIndividualMessage(authData?.uid, otherId, messageData);
    setShowTyping(!showTyping);
  };
  const onDeleteChat = async () => {
    // console.log("ChetDel")

    const isDel = await deleteIndividualChat(authData?.uid, otherId);
    updateLastIndividualMessage(authData?.uid, otherId, textMessage);

    if (isDel) {
      // console.log('ChetDel');
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? responsiveHeight(-1) : responsiveHeight(1)
        }
        // keyboardVerticalOffset={
        //   Platform.OS === 'ios' ?-10 : 12
        // }
      >
        <View style={{flex: 1, backgroundColor: colors.white}}>
          <ChatHeader
            otherId={otherId}
            delChat={onDeleteChat}
            individual={individual}
            SingleUser
            setUserData={setTopHeaderData}
            userData={topHeaderData}
            navigation={navigation}
          />

          <ChatBody
            groupData={groupData}
            authId={authData?.uid}
            otherId={otherId}
            setImageObject={setImageObject}
            setImageModal={setImageModal}
            imageLoading={imageLoading}
            formId={formId}
            showTyping={showTyping}
            navigation={navigation}
          />

          <PH10>
            <SendMessage
              setShowTyping={setShowTyping}
              showTyping={showTyping}
              setIsCameraActive={setIsCameraActive}
              SendMessageData={SendMessageData}
              onSendMessage={() => {
                if (textMessage) {
                  SendMessageData(false);

                  return;
                }
              }}
              onChangeText={txt => setTextMessage(txt)}
              textMessage={textMessage}
              setTextMessage={setTextMessage}
            />
          </PH10>
        </View>
      </KeyboardAvoidingView>
      <ImageView
        modalVisible={imageModal}
        setModalVisible={setImageModal}
        authId={authData?.uid}
        uploadedBy={
          imageObject?.form == authData?.uid ? topHeaderData?.name : 'You'
        }
        setImage={setImageObject}
        image={imageObject}
      />

      {imageLoading && <SimpleLoader file={loaderAnimation} />}

      <CustomCamera
        path={imageFile}
        setPath={setImageFile}
        setIsVisible={setIsCameraActive}
        isModalVisible={isCameraActive}
        setVideoFile={setVideoFile}
        SendMessageData={SendMessageData}
      />
    </>
  );
};

export default IndividualChatDetail;

const styles = ScaledSheet.create({
  textInputContainer: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: '20@s',
    borderTopRightRadius: '20@s',
    minHeight: verticalScale(60),
    maxHeight: verticalScale(100),
    // paddingTop: verticalScale(20),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: verticalScale(5),
  },
  inPutContainer: {
    backgroundColor: colors.white,
    // height: verticalScale(35),
    fontSize: verticalScale(14),
    width: '75%',
    color: colors.black,
    fontWeight: '600',
    paddingHorizontal: verticalScale(10),
  },

  sendContainer: {
    width: '20@s',
    height: '25@vs',
  },
  sendVideo: {
    width: 30,
    height: 30,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    width: '75%',
    margin: 10,
    minHeight: verticalScale(38),
    maxHeight: verticalScale(100),
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#BFBFBF',
    shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.5,

    shadowOffset: {width: 1, height: 1},
  },
  send: {
    width: 37,
    height: 37,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 20,
    fontSize: verticalScale(12),
    flex: 1,
  },
});
