import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Spacer} from '../../../../components/Spacer';
import commonStyles, {PH10} from '../../../../utils/CommonStyles';
import AppTopHeader from '../../../../components/AppTopHeader';
import {useDispatch, useSelector} from 'react-redux';
import {getRequestNotification} from '../../../services/NotificationServices';
import {useIsFocused} from '@react-navigation/native';
import FollowRequestContainer from './Molecules/FollowRequestContainer';
import CustomText from '../../../../components/CustomText';
import {deleteNotiRequest} from '../../../services/PostServices';
import {
  getSpecificUser,
  SaveUser,
  UpdateFollower,
  UpdateFollowing,
  UpdateRequestId,
} from '../../../services/UserServices';
import {authData} from '../../../../redux/reducers/authReducer';

const NotificationRequest = ({navigation}) => {
  const authUser = useSelector(state => state?.auth?.currentUser);
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const [requestData, setRequestData] = useState([]);
  const [reFreshState, setReFreshState] = useState(false);

  useEffect(() => {
    getRequestNotification(authUser?.uid, setRequestData);
  }, [focused, reFreshState]);

  const onDeleteNoti = async item => {
    console.log('authUser', authUser?.RequestIds, item?.senderId);
    console.log('CliclID', item?.id);
    if (item.id) {
      deleteNotiRequest(item?.id);

      const filterRequestNotiId = authUser?.RequestNotifiedIds.filter(
        del => del != item?.id,
      );

      const filterRequestId = authUser?.RequestIds.filter(
        del => del != item?.senderId,
      );

      await SaveUser(authUser?.uid, {
        RequestNotifiedIds: filterRequestNotiId,
        RequestIds: filterRequestId,
      });
      setReFreshState(!reFreshState);
    }
  };

  const onFollowUser = async (item, id) => {
    try {
      await UpdateFollower(authUser.uid, item.uid);
      await UpdateFollowing(item.uid, authUser?.uid);
      const filterRequestIds = authUser?.RequestIds.filter(
        del => del != item?.uid,
      );

      const filterRequestNotiId = authUser?.RequestNotifiedIds.filter(
        del => del != id,
      );

      await SaveUser(authUser?.uid, {
        RequestIds: filterRequestIds,
        RequestNotifiedIds: filterRequestNotiId,
      });

      //   await UpdateRequestId(item.uid, authUser?.uid);

      const data = await getSpecificUser(authUser?.uid);
      dispatch(authData(data));
      deleteNotiRequest(id);
      setReFreshState(!reFreshState);
    } catch (error) {
      console.log('NetworkError', error);
    }
  };
  return (
    <SafeAreaView style={commonStyles.main}>
      <AppTopHeader navigation={navigation} title={'Follow Requests'} />
      <Spacer height={Platform.OS == 'ios' ? 20 : 10} />
      <PH10>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          //   ListEmptyComponent={
          //     <View
          //       style={{
          //         flex: 1,
          //         height: '100%',
          //         justifyContent: 'center',
          //         alignItems: 'center',
          //       }}>
          //       <CustomText fontSize={14} label="No Notification Found " />
          //     </View>
          //   }
          data={requestData}
          renderItem={({item, index}) => {
            return (
              <>
                <Spacer height={10} />
                <FollowRequestContainer
                  onDelete={() => onDeleteNoti(item)}
                  onFollower={(data, id) => onFollowUser(data, id)}
                  item={item}
                  navigation={navigation}
                />
                <Spacer height={10} />
              </>
            );
          }}
        />
      </PH10>
    </SafeAreaView>
  );
};

export default NotificationRequest;

const styles = StyleSheet.create({});
