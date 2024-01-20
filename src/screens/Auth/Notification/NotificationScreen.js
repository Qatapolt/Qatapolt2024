import {
  Text,
  View,
  Platform,
  Pressable,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import commonStyles, {PH10} from '../../../utils/CommonStyles';
import {Spacer} from '../../../components/Spacer';
import CustomHeader from '../../../components/CustomHeader';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../utils/Colors';
import CustomText from '../../../components/CustomText';
import {InterFont} from '../../../utils/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationComponent from './molecule/NotificationCompoent';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFollowRequestNotiCount,
  getNotifications,
  getRequestWithLimit,
} from '../../services/NotificationServices';
import {dateFormat, notiDateFormat} from '../../../utils/Commons';
import moment from 'moment';
import {setNotificationAlert} from '../../../redux/reducers/authReducer';
import {useIsFocused} from '@react-navigation/native';
import NotiRequestContainer from './molecule/NotiRequestContainer';
import AppTopHeader from '../../../components/AppTopHeader';

const image1 = require('../../../assets/images/profile1.png');
const messageImage = require('../../../assets/images/postPic.png');
const image2 = require('../../../assets/images/profile2.png');
const image3 = require('../../../assets/images/profile3.png');

const Notifications = ({navigation}) => {
  const {uid} = useSelector(state => state?.auth?.currentUser);
  const [notificationData, setNotificationData] = useState([]);
  const [requestCount, setRequestCount] = useState(null);
  const [requestLimitData, setRequestLimitData] = useState([]);
  const focused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    getFollowRequestNotiCount(uid, setRequestCount);

    getRequestWithLimit(uid,setRequestLimitData);

    getNotificationData();

    dispatch(setNotificationAlert(false));
  }, [focused]);
  useEffect(() => {
    sortNotification();
  }, [notificationData]);

  const sortNotification = () => {
    const sortedDesc = notificationData.sort(
      (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt),
    );

    setNotificationData(sortedDesc);
  };

  const getNotificationData = () => {
    getNotifications(uid, setNotificationData);
  };



  return (
    <SafeAreaView style={commonStyles.main}>
      <AppTopHeader navigation={navigation} title={'Notifications'} />
      <Spacer height={Platform.OS == 'ios' ? 10 : 5} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: colors.white}}>
        <PH10>
          {requestCount > 0 ? (
            <>
              <NotiRequestContainer
                onNavigate={() => navigation.navigate('NotificationRequest')}
                count={requestCount}
                data={requestLimitData}
              />
              <Spacer height={10} />
            </>
          ) : null}

          <FlatList        
            keyExtractor={(item, index) => index.toString()}
            // ListEmptyComponent={
            //   <View
            //     style={{
            //       flex: 1,
            //       height: '100%',
            //       justifyContent: 'center',
            //       alignItems: 'center',
            //     }}>
            //     <CustomText 
            //     fontSize={14}
            //     label="No Notification Found " />
            //   </View>
            // }
            data={notificationData}
            renderItem={({item, index}) => {
              const notificationDate = moment(
                new Date(item.createdAt.toDate()),
              );
              let LestNotificationDate = notiDateFormat(notificationDate);

              let showDateLabel = false;
              if (index === notificationData.length + 1) {
                showDateLabel = true;
              } else {
                const nextNotification = notificationData[index - 1];
                const currentDate = new Date(item.createdAt?.toDate());
                const nextDate = new Date(
                  nextNotification?.createdAt?.toDate(),
                );

                if (currentDate.getDate() !== nextDate.getDate()) {
                  showDateLabel = true;
                }
              }

              return (
                <>
                  {showDateLabel ? (
                    <CustomText label={LestNotificationDate} fontSize={17} />
                  ) : null}
                  <NotificationComponent item={item} />
                  <Spacer height={5} />
                </>
              );
            }}
          />
        </PH10>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
