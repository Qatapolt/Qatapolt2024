import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import commonStyles, {PH20, PH10} from '../../../../utils/CommonStyles';
import AddChatTop from './Molecules/AddChatTop';
import AddChatContainer from './Molecules/AddChatContainer';
import {Spacer} from '../../../../components/Spacer';
import {images} from '../../../../assets/images';
import {useSelector} from 'react-redux';
import {authData} from '../../../../redux/reducers/authReducer';
import {useIsFocused} from '@react-navigation/native';
import {getAllUSers} from '../../../services/UserServices';
import {verticalScale} from 'react-native-size-matters';
import Toast from 'react-native-root-toast';

const AddChat = ({navigation}) => {
  const CurrentUser = useSelector(state => state.auth?.currentUser);
  const [check, setCheck] = useState(-1);
  const [search, setSearch] = useState('');
  const [userObject, setUserObject] = useState('');

  const focused = useIsFocused();

  const [userData, setUserData] = useState([]);

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

  return (
    <SafeAreaView style={commonStyles.main}>
      <PH20>
        <AddChatTop
          userObject={userObject}
          navigation={navigation}
          search={search}
          onSearch={searchUser}
          onSendChat={() => {
            if (userObject) {
              navigation.navigate('ChatDetail', {
                userId: userObject,
                formId: CurrentUser.uid,
              });
            } else {
              Toast.show('Please select any one to start a chat');
            }
          }}
        />
        <FlatList
          data={userData}
          style={{marginBottom: verticalScale(60)}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <AddChatContainer
                userObject={userObject}
                setUserObject={setUserObject}
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
  );
};

export default AddChat;

const styles = StyleSheet.create({});
