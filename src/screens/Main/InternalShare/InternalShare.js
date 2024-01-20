import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {verticalScale} from 'react-native-size-matters';
import {getAllUSers, getSpecificUser} from '../../services/UserServices';
import AddChatContainer from '../ChatScreen/AddChat/Molecules/AddChatContainer';
import commonStyles, {PH20} from '../../../utils/CommonStyles';
import AddChatTop from '../ChatScreen/AddChat/Molecules/AddChatTop';
import InternalHeader from './Molecules/InternalHeader';
import {
  checkIndividualRequest,
  createIndividualRequest,
  sendMessage,
  updateLastIndividualMessage,
} from '../../services/MessagesServices';
// import loaderAnimation from '../../../../assets/Loaders';
import loaderAnimation from '../../../assets/Loaders';
import SimpleLoader from '../../../utils/SimpleLoader';
import Toast from 'react-native-root-toast';
import {updateInternalShareCount} from '../../services/PostServices';
import CustomAlert from '../../../components/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sendNotification} from '../../services/NotificationServices';

const InternalShare = ({navigation, route}) => {
  const CurrentUser = useSelector(state => state.auth?.currentUser);
  const [check, setCheck] = useState(-1);
  const postId = route.params?.postId;
  const internalShareIds = route.params?.internalShareIds;
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [stateError, setStateError] = useState({
    errorHeader: '',
    errorBody: '',
  });

  const focused = useIsFocused();

  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  useEffect(() => {
    getUsersData();
  }, []);


  const getUsersData = () => {
    try {
      getAllUSers(setUserData, CurrentUser?.uid);
    } catch (error) {
      console.log('user not get', error);
    }
  };
  const searchUser = txt => {
    // console.log('cdc', txt);
    setSearch(txt);
    if (txt.length == 0) {
      try {
        getAllUSers(setUserData, CurrentUser?.uid);
      } catch (error) {
        console.log('VAlue', error);
      }

      return;
    }
    const filterUserData = userData.filter(item => {
      return `${item.name} ${item.username}`
        .toLowerCase()
        .trim()
        .includes(txt.toLowerCase().trim());
    });

    setUserData(filterUserData);
  };
  const sendChat = async () => {
    if (!selectedId) {
      setStateError({
        ...stateError,
        errorHeader: 'Missing Something',
        errorBody: 'Please Select People to Share Post',
      });
      setModalVisible(true);
      return;
    }
    if (internalShareIds?.includes(selectedId)) {
      Toast.show('Post Already Share his User');

      return;
    }
    setLoading(true);
    const userData = await getSpecificUser(selectedId);
    const RequestStatus = await checkIndividualRequest(
      selectedId,
      CurrentUser?.uid,
    );
    const mediaFiles = {
      uri: '',
      type: '',
      thumbnail: '',
    };
    const internalShare = {
      senderId: CurrentUser?.uid,
      internalFile: {
        type: '',
        postId: postId,
      },
    };
    if (!RequestStatus) {
      const requestData = {
        from: CurrentUser?.uid,
        to: selectedId,
        relationStatus: 0,
        lastMessage: {},
      };
      await createIndividualRequest(requestData);
    }
    const messageData = await sendMessage(
      CurrentUser?.uid,
      selectedId,
      'send post',
      mediaFiles,
      internalShare,
    );
    updateInternalShareCount(postId, selectedId);
    updateLastIndividualMessage(CurrentUser?.uid, selectedId, messageData);
    setLoading(false);
    console.log('userData===>', userData);
    sendNotification(
      CurrentUser,
      userData,
      mediaFiles,
      'Qatapolt',
      'Share Your Post',
      'SHARE_POST',
    );
    Toast.show('Post Share Successfully');
    let myObj = {
      success: true,
      postId: route.params?.postId,
    };
    await AsyncStorage.setItem('UPADTED_SHARE', JSON.stringify(myObj));
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={commonStyles.main}>
        <PH20>
          <InternalHeader
            navigation={navigation}
            search={search}
            onSendChat={sendChat}
            onSearch={searchUser}
          />
          <FlatList
            data={userData}
            style={{marginBottom: verticalScale(60)}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <AddChatContainer
                  userObject={selectedId}
                  setUserObject={setSelectedId}
                  check={check}
                  setCheck={setCheck}
                  item={item}
                  index={index}
                />
              );
            }}
          />

          {/* </View> */}
        </PH20>
      </SafeAreaView>

      {loading && <SimpleLoader file={loaderAnimation} />}

      <CustomAlert
        stateError={stateError}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default InternalShare;

const styles = StyleSheet.create({});
