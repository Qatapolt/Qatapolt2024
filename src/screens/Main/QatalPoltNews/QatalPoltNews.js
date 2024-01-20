import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Platform,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {Spacer} from '../../../components/Spacer';
import {colors} from '../../../utils/Colors';
import {icons} from '../../../assets/icons';
import {images} from '../../../assets/images';
import CustomText from '../../../components/CustomText';
import {InterFont} from '../../../utils/Fonts';
import CustomHeader from '../../../components/CustomHeader';
import CustomOpenDrawer from '../../../components/CustomOpenDrawer';
import {PH10, PH20} from '../../../utils/CommonStyles';
import {scale, verticalScale} from 'react-native-size-matters';
import CustomSearch from '../../../components/CustomSearch';
import CustomButton from '../../../components/CustomButton';
import firebase from '@react-native-firebase/app';
import ArenaLayout from '../../../utils/Layouts/ArenaLayout';
import {
  SaveUser,
  getSpecificUser,
  UpdateFollower,
  UpdateFollowing,
} from '../../../screens/services/UserServices';
import NewsWithUser from './Molecules/NewsWithUser';
import NewsWithoutUser from './Molecules/NewsWithoutUser';
import QatapoltNewsLayout from '../../../utils/Layouts/QatapoltNewsLayout';
import uuid from 'react-native-uuid';
import {
  NotificationSender,
  postNotification,
} from '../../services/NotificationServices';
import {authData} from '../../../redux/reducers/authReducer';
const QatalPoltNews = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("")
  const [news, setNews] = useState([]);
  const [followerState, setFollowerState] = useState(false);

  const authUser = useSelector(state => state.auth?.currentUser);
  const dispatch = useDispatch();
  // let userFollowExist = CurrentUser?.AllFollowers?.includes(authId)
  // console.log('AllCurrentUser', authUser?.uid);
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const newsRef = firebase.firestore().collection('news');
      const snapshot = await newsRef.get();
      const newsData = [];
      const currentDate = moment();
      snapshot.forEach(async doc => {
        const data = doc.data();
        const date = moment(data.createdAt);
        const day = date.format('ddd');
        const dateOfMonth = date.format('D');
        const month = date.format('MMM');
        const timeDifferenceMinutes = currentDate.diff(date, 'minutes');
        const timeDifferenceHours = currentDate.diff(date, 'hours');
        const timeDifferenceDays = currentDate.diff(date, 'days');
        let timeAgo = '';
        if (timeDifferenceDays > 0) {
          timeAgo = `${timeDifferenceDays} days ago`;
        } else if (timeDifferenceHours > 0) {
          timeAgo = `${timeDifferenceHours} hours ago`;
        } else {
          timeAgo = `${timeDifferenceMinutes} minutes ago`;
        }

        newsData.push({
          user: data.user,
          userID: data.user?.id,
          username: data.user?.username,
          title: data.title,
          subTitle: data.subTitle,
          description: data.description,
          image: {uri: data.image},
          day,
          date: dateOfMonth,
          month,
          timeAgo,
        });
      });

      setNews(newsData);
      setRefreshing(false);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setRefreshing(false);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true); // Start refreshing
    fetchNews();
  };

  const onUserFollower = async CurrentUser => {
    if (CurrentUser?.AllFollowers?.includes(authUser.uid)) {
      // console.log('OkDad');
      // filter user followers
      let filterUserFollowerList = CurrentUser?.AllFollowers.filter(
        data => data != authUser?.uid,
      );
      await SaveUser(CurrentUser?.uid, {
        AllFollowers: filterUserFollowerList,
      });
      // check auth following
      if (CurrentUser?.AllFollowers?.includes(authUser.uid)) {
        let filterFollowingList = authUser?.AllFollowing.filter(
          data => data != CurrentUser?.uid,
        );
        await SaveUser(authUser?.uid, {
          AllFollowing: filterFollowingList,
        });
      }

      const data = await getSpecificUser(authUser?.uid);
      dispatch(authData(data));
      setFollowerState(!followerState);

      return;
    }
    if (CurrentUser?.privateProfile) {
      if (followRequestExist) {
        // console.log('lvnlcnvln');

        // filter user followers
        let filterUserFollowRequest = CurrentUser?.RequestIds.filter(
          data => data != authUser?.uid,
        );
        await SaveUser(CurrentUser?.uid, {
          RequestIds: filterUserFollowRequest,
        });

        setFollowerState(!followerState);
      } else {
        const id = uuid.v4();
        await UpdateFollowRequest(CurrentUser.uid, authUser?.uid, id);
        sendFollowerNotification('Follow Request', 'FOLLOW__REQUEST', id);
        setFollowerState(!followerState);
      }
      return;
    }
    try {
      // update user followers
      await UpdateFollower(CurrentUser.uid, authUser?.uid);
      //  update auth following
      await UpdateFollowing(authUser?.uid, CurrentUser?.uid);
      const data = await getSpecificUser(authUser?.uid);
      dispatch(authData(data));

      setFollowerState(!followerState);

      // sendNotification(authUser,  CurrentUser, authUser?.profileImage?authUser?.profileImage:undefined, "Follow You", "Follow You")

      sendFollowerNotification('Follow You', 'FOLLOW', uuid.v4(), CurrentUser);
    } catch (error) {
      console.log('ErrorHai', error);
    }
  };
  const sendFollowerNotification = async (message, type, id, CurrentUser) => {
    const senderName = `${authUser?.name} ${message}`;

    NotificationSender(CurrentUser?.fcmToken, message, senderName);

    const senderData = {
      message: message,
      thumbnail: CurrentUser?.profileImage ? CurrentUser?.profileImage : '',
      senderName: authUser?.name,
      senderId: authUser?.uid,
      senderUsername: authUser?.username,
      notificationType: type,
      id: id,
      receiverId: CurrentUser?.uid,
      createdAt: new Date(),
      senderImage: authUser?.profileImage ? authUser?.profileImage : '',
    };

    await postNotification(senderData);
  };

  // const onSearchNews=()=>{

    
  // }

  const Header = ({navigation}) => (
    <View
      style={{
        height: showSearch ? verticalScale(130) : verticalScale(120),
        backgroundColor: colors.green,
      }}>
      <Spacer height={Platform.OS == 'ios' ? 50 : 10} />

      <PH20>
        <CustomHeader
          LeftSide={() => <CustomOpenDrawer navigation={navigation} />}
          Center={() => (
            <CustomText
              label="Qatapolt News"
              fontSize={18}
              color={colors.white}
              marginRight={20}
              fontFamily={InterFont.semiBold}
            />
          )}
          RightSide={() => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setShowSearch(!showSearch)}>
              <Image
                source={icons.search}
                style={{height: 27, width: 27, tintColor: colors.white}}
              />
            </TouchableOpacity>
          )}
        />
      </PH20>
      <View>
        {showSearch && (
          <>
            <Spacer height={10} />
            <PH10>
              <CustomSearch backgroundColor={colors.white} />
            </PH10>
          </>
        )}
      </View>
      <Spacer height={20} />
    </View>
  );
  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={{marginVertical:verticalScale(10)}} >
        {/* <> */}
        {/* {item?.user ? ( */}
        <NewsWithUser
        onNavigate={()=>navigation.navigate("QataPoltNewsDetail",{data:item})}
          user={item?.user}
          userID={item?.userID}
          authID={authUser?.uid}
          onFollow={data => onUserFollower(data)}
          username={item?.user.username}
          title={item?.title}
          followerState={followerState}
          subTitle={item?.subTitle}
          description={item?.description}
          image={item?.image}
          day={item?.day}
          date={item?.date}
          month={item?.month}
          timeAgo={item?.timeAgo}
        />
        {/* // ) : ( */}
        {/* <NewsWithoutUser
            user={item?.user }
              title={item?.title}
              subTitle={item?.subTitle}
              description={item?.description}
              image={item?.image}
              timeAgo={item?.timeAgo ? item.timeAgo : ''}
            /> */}
        {/* //   )} */}
        {/* // </> */}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {loading ? (
        <QatapoltNewsLayout />
      ) : (
        <View style={{flex:1,margin:scale(10)}}>
           <FlatList
          data={news}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />

        </View>
       
      )}
      <Spacer height={10} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
});
export default QatalPoltNews;
