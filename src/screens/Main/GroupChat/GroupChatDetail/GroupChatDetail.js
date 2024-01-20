import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import SendMessage from '../../../../components/SendMessage';
import ChatHeader from '../../../../components/ChatHeader';
import GroupChatHeader from './Molecules/GroupChatHeader';
import {
  createGroupRequest,
  getSpecificGroupRequest,
  sendGroupMessage,
  updateGroupIndividualMessage,
} from '../../../services/MessagesServices';
import {GroupChatBody} from '../../../../components/GroupChatBody';
import {uploadImage} from '../../../services/StorageServics';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import ImageView from '../../../../components/ImageView';
import LeaveChatSheet from './Molecules/LeaveChatSheet';
import {useIsFocused} from '@react-navigation/native';
import SimpleLoader from '../../../../utils/SimpleLoader';
import loaderAnimation from '../../../../assets/Loaders';
import CustomCamera from '../../../../components/CustomCamera';

const GroupChatDetail = ({navigation, route}) => {
  const [showTyping, setShowTyping] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [imageObject, setImageObject] = useState({});
  const isFocused = useIsFocused();
  const [imageModal, setImageModal] = useState(false);
  const [groupDetail, setGroupDetail] = useState({});
  const authData = useSelector(state => state.auth.currentUser);
  const [leaveChatModal, setLeaveChatModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [imageFile, setImageFile] = useState('');
  const [VideoFile, setVideoFile] = useState('');

  const toggleOptionModal = () => {
    setLeaveChatModal(!leaveChatModal);
  };

  const groupData = route?.params?.groupData;
  // const otherId = route?.params?.userId;
  // const dataFromSingle = route?.params?.group;
  // console.log('UserEvent', otherId);
  // console.log('ImageObject', imageObject?.senderDetail.id,authData.uid);

  useEffect(() => {
    grtGroupData();
  }, [isFocused]);

  const grtGroupData = async () => {
    const res = await getSpecificGroupRequest(groupData?.groupId);
    setGroupDetail(res);
  };

  const SendMessageData = async imageFile => {
    setTextMessage('');
    // const RequestStatus = await checkIndividualRequest(otherId, authData?.uid);
    // if (!RequestStatus) {
    //   const requestData = {
    //     from: authData?.uid,
    //     to: otherId,
    //     relationStatus: 0,
    //     lastMessage: {},
    //   };
    //   await createIndividualRequest(requestData);
    // }
    const senderDetail = {
      id: authData.uid,
      img: authData.profileImage,
    };
    const mediaFiles = {
      uri: '',
      type: '',
      thumbnail: '',
      upLoadedBy: authData.name,
    };

    if (imageFile) {
      setImageLoading(true);
      console.log('ImageFile');

      if (imageFile.thumbnail) {
        const linkData = await uploadImage(imageFile.thumbnail, authData?.uid);
        mediaFiles['thumbnail'] = linkData;
      }

      const linkData = await uploadImage(imageFile.uri, authData?.uid);
      mediaFiles['uri'] = linkData;
      mediaFiles['type'] = imageFile.type;
      setImageLoading(false);
    }

    const messageData = await sendGroupMessage(
      groupData.groupId,
      senderDetail,
      textMessage
        ? textMessage
        : mediaFiles.thumbnail
        ? '🎥 Video'
        : '📷 Photo',
      mediaFiles,
    );

    updateGroupIndividualMessage(groupData.groupId, messageData);
  };

  const onLeave = async () => {
    // route?.params?.groupData

    const participantsData = groupData.participantsData.filter(
      del => del.participantId != authData.uid,
    );
    const requestData = {
      participantsData,

      groupId: groupData.groupId,
    };
    // console.log("FilterData",requestData,authData.uid)

    await createGroupRequest(requestData?.groupId, requestData);
    setLeaveChatModal(false);
    navigation.goBack();
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
          <GroupChatHeader
            navigation={navigation}
            groupData={groupDetail}
            setLeaveChatModal={setLeaveChatModal}
          />

          {/* {dataFromSingle ? (
          <ChatHeader navigation={navigation} />
        ) : (
          <ChatHeader otherId={otherId} SingleUser navigation={navigation} />
        )}
        <Text
          style={{
            fontSize: verticalScale(10),
            color: colors.black,
            fontWeight: '500',
            textAlign: 'center',
            marginTop: verticalScale(10),
          }}>
          Today
          <Spacer width={6} />
          <Text
            style={{
              fontSize: verticalScale(10),
              color: colors.black,
              fontWeight: '500',
              textAlign: 'center',
              marginTop: verticalScale(10),
            }}>
            3:01 am
          </Text>
        </Text>*/}
          <GroupChatBody
            groupData={groupData}
            authId={authData?.uid}
            groupId={groupData.groupId}
            showTyping={showTyping}
            setImageObject={setImageObject}
            setImageModal={setImageModal}
            navigation={navigation}
          />
          <PH10>
            <SendMessage
              setShowTyping={setShowTyping}
              SendMessageData={SendMessageData}
              setIsCameraActive={setIsCameraActive}
              onSendMessage={() => {
                if (textMessage) {
                  SendMessageData();

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
        uploadedBy={imageObject?.senderDetail?.id==authData?.uid?"You":   imageObject?.mediaFiles?.upLoadedBy}
        setImage={setImageObject}
        image={imageObject}
      />

      <LeaveChatSheet
        modalVisible={leaveChatModal}
        onCloseModal={toggleOptionModal}
        onDel={onLeave}
        navigation={navigation}
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

export default GroupChatDetail;

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
