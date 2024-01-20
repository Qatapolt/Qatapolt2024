import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import commonStyles, {PH10, PH20} from '../../../../utils/CommonStyles';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';
import {Spacer} from '../../../../components/Spacer';
import {Avatar, Badge, Image, ListItem} from 'react-native-elements';
import {colors} from '../../../../utils/Colors';
import {icons} from '../../../../assets/icons';
import {images} from '../../../../assets/images';
import AddUser from '../../../../components/AddUser';
import AddContactModel from './Molecules/AddContactModel';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAuthGroupRequest,
  getGroupRequest,
  getIndividualRequest,
} from '../../../services/MessagesServices';
import TopChatContainer from './Molecules/TopChatContainer';
import {verticalScale} from 'react-native-size-matters';
import axios from 'axios';
import GroupChatContainer from '../../GroupChat/Molecules/GroupChatContainer';
import moment from 'moment';
import {dateFormat, timeFormat} from '../../../../utils/Commons';
import {getOrganizations} from '../../../services/PostServices';
import {
  setMessages,
  setMessagesTab,
} from '../../../../redux/reducers/GroupChatReduser';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const TopChats = ({navigation}) => {
  const dataFromSingle = 'dataFromSingle';
  const [modalVisible, setModalVisible] = useState(false);

  const currentUser = useSelector(state => state.auth.currentUser);
  const messageData = useSelector(state => state.groupChat.messagesTabData);
  const [requestData, setRequestData] = useState([]);
  const [groupRequest, setGroupRequest] = useState([]);
  const [mergeAllRequest, setMergeAllRequest] = useState([]);

  useEffect(() => {
    getRequest();
  }, []);

  useEffect(() => {
    if (requestData || groupRequest) {
      MergeAllData();
    }
  }, [requestData, groupRequest]);

  const getRequest = () => {
    getIndividualRequest(currentUser.uid, setRequestData);
    getAuthGroupRequest(currentUser.uid, setGroupRequest);
  };
  const MergeAllData = () => {
    let reqSingleData = [];

    groupRequest?.request?.forEach(data => {
      return reqSingleData.push(data);
    });
    requestData?.request?.forEach(data => {
      return reqSingleData?.push(data);
    });

    const sortedDesc = reqSingleData.sort(
      (objA, objB) => Number(objB.date) - Number(objA.date),
    );
    // dispatch(setMessagesTab(sortedDesc))

    setMergeAllRequest(sortedDesc);
  };

  const toggleOptionModal = () => {
    setModalVisible(!modalVisible);
  };

  const RenderRequestData = ({item, index}) => {
    const ChatDateTime = moment(new Date(item?.date?.toDate()));
    const ChatTime = timeFormat(item?.date, 'hh:mm a');
    const date = dateFormat(ChatDateTime);

    // console.log("kcndkc",item)

    return (
      <>
        {item.createdMessage ? (
          <GroupChatContainer
            item={item}
            index={index}
            navigation={navigation}
            ChatTime={ChatTime}
            date={date}
          />
        ) : (
          <TopChatContainer
            item={item}
            index={index}
            userId={item.from == currentUser.uid ? item.to : item.from}
            navigation={navigation}
            ChatTime={ChatTime}
            date={date}
          />
        )}
      </>
    );
  };

  return (
    <View style={commonStyles.main}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <PH10>
          {/* <Spacer height={20} /> */}
          {/* 
          <CustomText
            label={'Messages'}
            fontSize={15}
            fontFamily={InterFont.bold}
          /> */}
          {/* <Spacer height={10} /> */}

          {/* {chatList2.map(
            ({
              name,
              lastMsg,
              badgeValue,
              missedCall,
              deliveryTime,
              seen,
              img,
            }) => (
              <ChatListItem
                name={name}
                lastMsg={lastMsg}
                badgeValue={badgeValue}
                missedCall={missedCall}
                img={img}
                deliveryTime={deliveryTime}
                seen={seen}
              />
            ),
          )} */}

          <FlatList
            data={mergeAllRequest}
            contentContainerStyle={{
              paddingBottom: verticalScale(50),
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={RenderRequestData}
          />

          {/* <Spacer height={20} />

          <CustomText
            label={'Groups'}
            fontSize={15}
            fontFamily={InterFont.bold}
          />
          <Spacer height={10} /> */}

          {/* {chatList.map(
            ({name, lastMsg, badgeValue, missedCall, deliveryTime, seen,img}) => (
              <ChatListItem
                name={name}
                lastMsg={lastMsg}
                badgeValue={badgeValue}
                missedCall={missedCall}
                img={img}
                deliveryTime={deliveryTime}
                seen={seen}
              />
            ),
          )} */}
        </PH10>
      </KeyboardAwareScrollView>

      <AddUser onPress={() => setModalVisible(!modalVisible)} icon="user-alt" />
      <AddContactModel
        navigation={navigation}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        toggleModal={toggleOptionModal}
      />
    </View>
  );
};

export default TopChats;

const styles = StyleSheet.create({});
