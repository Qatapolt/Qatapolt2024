import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import commonStyles, {PH20, PH10} from '../../../../utils/CommonStyles';
import {Spacer} from '../../../../components/Spacer';
import {images} from '../../../../assets/images';
import GropChatTop from './Molecules/GropChatTop';
import AddGroupContainer from './Molecules/AddGroupContainer';
import AddGroupPeople from './Molecules/AddGroupPeople';
import {InterFont} from '../../../../utils/Fonts';
import CustomText from '../../../../components/CustomText';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  removeGroupMember,
  setGroupMember,
} from '../../../../redux/reducers/GroupChatReduser';
import {getAllUSers} from '../../../services/UserServices';
const AddGroupChat = ({navigation}) => {
  const [check, setCheck] = useState(-1);
  const [gropChat, setGropChat] = useState([]);
  const dispatch = useDispatch();
  const [filterGroup, setFilterGroup] = useState([]);
  const CurrentUser = useSelector(state => state.auth?.currentUser);
  const CurrentChatGroup = useSelector(state => state.groupChat?.groupMembers);

  // const [currentUserFollower, setCurrentUserFollower] = useState([]);
  const [getUsersData, setGetUsersData] = useState([]);
  // console.log('IFOLLOWUSER',CurrentChatGroup);

  useEffect(() => {
    if (CurrentUser?.userIFollow) {
      setGetUsersData(CurrentUser?.AllFollowing);
    } else {
      getUsers();
    }
  }, []);

  const getUsers = () => {
    try {
      getAllUSers(setGetUsersData, CurrentUser?.uid);
    } catch (error) {
      console.log('user not get', error);
    }
  };

  const onAddGroupChat = item => {
    const groupData = CurrentChatGroup?.find(e => e.uid == item.uid);

    if (groupData) {
      dispatch(removeGroupMember(item));
    } else {
      dispatch(setGroupMember(item));
    }
  };

  return (
    <SafeAreaView style={commonStyles.main}>
      <PH20>
        <GropChatTop
        CurrentChatGroup={CurrentChatGroup}
         navigation={navigation} />
        <Spacer height={CurrentChatGroup.length > 0 ? 30 : 0} />
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
          <ScrollView horizontal>
            {CurrentChatGroup.map(item => {
              return (
                <AddGroupPeople
                  onPress={() => onAddGroupChat(item)}
                  item={item}
                />
              );
            })}
          </ScrollView>
        </View>

        <Spacer height={20} />
        <CustomText
          label={'Add Profile'}
          fontSize={15}
          fontFamily={InterFont.bold}
        />
        <Spacer height={20} />

        <FlatList
          data={getUsersData}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true}
          renderItem={({item, index}) => {
            // let name = item.name.replace('null', '');
            // console.log('index ==== >', item);

            return (
              <AddGroupContainer
                onPress={() => onAddGroupChat(item)}
                check={check}
                userIFollow={CurrentUser?.userIFollow}
                setCheck={setCheck}
                onSetGroupMember={onAddGroupChat}
                filterGroup={CurrentChatGroup}
                item={item}
                index={index}
              />
            );
          }}
        />
      </PH20>
    </SafeAreaView>
  );
};

export default AddGroupChat;

const styles = StyleSheet.create({});
