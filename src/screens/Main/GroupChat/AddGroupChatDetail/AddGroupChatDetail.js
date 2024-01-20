import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import commonStyles, {PH20} from '../../../../utils/CommonStyles';
import {images} from '../../../../assets/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {InterFont} from '../../../../utils/Fonts';
import CustomText from '../../../../components/CustomText';
import CustomHeader from '../../../../components/CustomHeader';
import {Spacer} from '../../../../components/Spacer';
import ProfilePhoto from '../../../../components/ProfilePhoto';
import InputesField from './Molecules/InputesField';
import AddGroupPeople from '../AddGroupChat/Molecules/AddGroupPeople';
import AddUser from '../../../../components/AddUser';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {
  emptyGroupMember,
  removeGroupMember,
} from '../../../../redux/reducers/GroupChatReduser';
import {createGroupRequest} from '../../../services/MessagesServices';
import CustomAlert from '../../../../components/CustomAlert';
import {uploadImage} from '../../../services/StorageServics';
import SimpleLoader from '../../../../utils/SimpleLoader';
import loaderAnimation from '../../../../assets/Loaders';

const AddGroupChatDetail = ({navigation}) => {
  const CurrentChatGroup = useSelector(state => state.groupChat?.groupMembers);
  const authUser = useSelector(state => state.auth.currentUser);
  // console.log('GrouprequestData', CurrentChatGroup);
  const [groupDes, setGroupDes] = useState('');
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [stateError, setStateError] = useState({
    errorHeader: '',
    errorBody: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();
  // console.log('CurrentChatGroup', CurrentChatGroup);

  const Header = props => {
    return (
      <>
        <CustomHeader
          LeftSide={() => (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                color={colors.white}
                size={moderateScale(27)}
              />
            </TouchableOpacity>
          )}
          Center={() => (
            <CustomText
              label="New Group"
              fontSize={15}
              textAlign="center"
              color={colors.white}
              fontFamily={InterFont.bold}
            />
          )}
        />
      </>
    );
  };

  const onAddGroupChat = item => {
    const groupData = CurrentChatGroup?.find(e => e.uid == item.uid);

    if (groupData) {
      dispatch(removeGroupMember(item));
    }
  };
  const onCreateGroup = async () => {
    if (CurrentChatGroup.length == 0) {
      return;
    }
    if (!groupName) {
      setStateError({
        ...stateError,
        errorHeader: 'Missing Group Name',
        errorBody: 'Please Enter Group Name To Proceed',
      });
      setModalVisible(true);

      return;
    }
    if (!groupDes) {
      setStateError({
        ...stateError,
        errorHeader: 'Missing Description',
        errorBody: 'Please Enter Group Description To Proceed',
      });
      setModalVisible(true);

      return;
    }
    participantsData = [];
    CurrentChatGroup.forEach(data => {
      participantsData.push({
        participantId: data.uid,
      });
    });

    participantsData.push({
      participantId: authUser.uid,
    });
    setLoading(true);

    const requestData = {
      participantsData,
      groupName: groupName,
      groupDes: groupDes,
      createdMessage: `Created New Group "${groupName}"`,
      groupImage: '',
      groupId: uuid.v4(),
      groupAdmin: authUser.uid,
      lastMessage: {},
    };

    if (imageUrl) {
      const imageData = await uploadImage(imageUrl, authUser?.uid);
      requestData['groupImage'] = imageData;
    }

    try {
      await createGroupRequest(requestData?.groupId, requestData);
      setLoading(false);
      dispatch(emptyGroupMember());

      navigation.navigate('groupChatDetail', {groupData: requestData});
    } catch (error) {
      console.log('groupChatError', error);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        // keyboardVerticalOffset={
        //   Platform.OS === 'ios' ?-10 : 12
        // }
        style={commonStyles.main}>
        <View style={{flex: 1, backgroundColor: colors.green}}>
          <>
            <PH20>
              <Spacer height={Platform.OS == 'ios' ? 60 : 20} />

              <Header navigation={navigation} />
              <View style={{height: '15%'}} />

              <ProfilePhoto
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
                addPhoto
                width={scale(80)}
                height={scale(80)}
              />
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <InputesField
                  placeholder="Group Name"
                  value={groupName}
                  onChangeText={txt => setGroupName(txt)}
                  fontFamily={InterFont.bold}
                  maxLength={30}
                  fontSize={verticalScale(15)}
                />
                {/* <Spacer height={10} /> */}

                <InputesField
                  placeholder="Enter Group Description"
                  fontFamily={InterFont.semiBold}
                  value={groupDes}
                  numberOfLines={2}
                  onChangeText={txt => setGroupDes(txt)}
                  color={colors.superLightGray}
                  maxLength={80}
                  multiline={true}
                  placeholderTextColor={colors.superLightGray}
                  fontSize={verticalScale(12)}
                />
              </View>
            </PH20>

            <View
              style={{
                flex: 1,
                backgroundColor: colors.white,
                borderTopLeftRadius: scale(20),
                borderTopRightRadius: scale(20),
                marginTop: verticalScale(-20),
              }}>
              <PH20>
                <Spacer height={30} />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CustomText
                    label={'Participnts'}
                    fontSize={17}
                    fontFamily={InterFont.bold}
                  />
                  <View
                    style={{
                      width: scale(23),
                      height: scale(23),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 100,
                      backgroundColor: colors.green,
                      marginLeft: scale(10),
                    }}>
                    <CustomText
                      label={CurrentChatGroup.length}
                      fontSize={12}
                      color={colors.white}
                      fontFamily={InterFont.semiBold}
                    />
                  </View>
                </View>

                <FlatList
                  data={CurrentChatGroup}
                  numColumns={3}
                  contentContainerStyle={{height: '100%'}}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    // let name = item.name.replace('null', '');
                    // console.log('index', index);

                    return (
                      <>
                        <View
                          style={{
                            marginVertical: verticalScale(10),
                            marginHorizontal: '4%',
                          }}>
                          <AddGroupPeople
                            // width={scale(50)}
                            // height={scale(50)}
                            // marginRight={10}
                            crossWidth={scale(22)}
                            crossHeight={scale(22)}
                            iconSize={20}
                            textWidth={50}
                            fontSize={10}
                            onPress={() => onAddGroupChat(item)}
                            item={item}
                          />
                        </View>
                      </>
                    );
                  }}
                />
              </PH20>
            </View>
          </>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => onCreateGroup()}
        style={{
          position: 'absolute',
          bottom: verticalScale(50),
          right: scale(30),
          alignSelf: 'flex-end',
          backgroundColor: colors.green,
          height: scale(50),
          width: scale(50),
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          // marginBottom:5,
          shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
          shadowRadius: 5,
          elevation: 5,
          shadowOpacity: 1,

          shadowOffset: {width: 1, height: 4},
        }}>
        <MaterialIcons
          name={'navigate-next'}
          color={colors.white}
          size={moderateScale(30)}
        />
      </TouchableOpacity>
      <CustomAlert
        stateError={stateError}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {loading && <SimpleLoader file={loaderAnimation} />}
    </>
  );
};

export default AddGroupChatDetail;

const styles = StyleSheet.create({});
