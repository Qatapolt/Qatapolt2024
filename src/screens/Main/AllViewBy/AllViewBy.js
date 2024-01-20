import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import {authData} from '../../../redux/reducers/authReducer';
import {
  getAllFollowers,
  getAllUSers,
  getAllViewBy,
  getSpecificUser,
  SaveUser,
  UpdateFollower,
  UpdateFollowing,
  UpdateFollowRequest,
} from '../../services/UserServices';
import {colors} from '../../../utils/Colors';
import FollowingHeader from '../FollowingScreen/Molecules/FollowingHeader';
import FollowingContainer from '../FollowingScreen/Molecules/FollowingContainer';
import FollowItem from '../../../components/FollowItem';
import {sendFollowerNotification} from '../../services/NotificationServices';
import uuid from 'react-native-uuid';
import {firebase} from '@react-native-firebase/firestore';
const AllViewBy = ({navigation, route}) => {
  // console.log('route?.params', route?.params);
  const [allFollower, setAllFollower] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const eventBy = route?.params?.eventBy;
  const allViewData = useSelector(state => state.auth.allViewIds);
  const authState = useSelector(state => state.auth.currentUser);
  const [refreshState, setRefreshState] = useState(false);

  const getPostStatics = () => {
    let userArray = [];
    if (route?.params?.postID !== '') {
      firebase
        .firestore()
        .collection('Posts')
        .doc(route?.params?.postID)
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            const postData = snapshot.data();
            // console.log('postData ====== > ', postData);
            if (postData) {
              const {medalsId, rePostIds, internalShareIds} = postData;
              // console.log('medalsId:', medalsId);
              // console.log('rePostIds:', rePostIds);

              if (
                route?.params?.eventBy === 'Liked by' &&
                medalsId &&
                medalsId.length > 0
              ) {
                try {
                  firebase
                    .firestore()
                    .collection('users')
                    .where('uid', 'in', medalsId)
                    .get()
                    .then(querySnapshot => {
                      querySnapshot.forEach(doc => {
                        userArray.push(doc.data());
                      });
                      // console.log('Users with medalsId:', userArray);
                      setAllFollower(userArray);
                    })
                    .catch(error => {
                      console.error(
                        'Error fetching users with medalsId:',
                        error,
                      );
                    });
                } catch (error) {
                  console.error('Error:', error);
                }
              }

              if (
                route?.params?.eventBy === 'Reposted by' &&
                rePostIds &&
                rePostIds.length > 0
              ) {
                try {
                  firebase
                    .firestore()
                    .collection('users')
                    .where('uid', 'in', rePostIds) // Use rePostIds here
                    .get()
                    .then(querySnapshot => {
                      querySnapshot.forEach(doc => {
                        userArray.push(doc.data());
                      });
                      // console.log('Users with rePostIds:', userArray);
                      setAllFollower(userArray);
                    })
                    .catch(error => {
                      console.error(
                        'Error fetching users with rePostIds:',
                        error,
                      );
                    });
                } catch (error) {
                  console.error('Error:', error);
                }
              }
              if (
                route?.params?.eventBy === 'Send by' &&
                internalShareIds &&
                internalShareIds.length > 0
              ) {
                try {
                  firebase
                    .firestore()
                    .collection('users')
                    .where('uid', 'in', internalShareIds) // Use rePostIds here
                    .get()
                    .then(querySnapshot => {
                      querySnapshot.forEach(doc => {
                        userArray.push(doc.data());
                      });
                      // console.log('Users with internalShareIds:', userArray);
                      setAllFollower(userArray);
                    })
                    .catch(error => {
                      console.error(
                        'Error fetching users with rePostIds:',
                        error,
                      );
                    });
                } catch (error) {
                  console.error('Error:', error);
                }
              }
            }
          }
        });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getPostStatics();
    }, []),
  );
  // const focused = useIsFocused();
  // useEffect(() => {
  //   getAllFollowerData();
  // }, [focused, refreshState]);

  // const getAllFollowerData = () => {
  //   if (allViewData?.length == 0 || allViewData == undefined) {
  //     setAllFollower([]);
  //     return;
  //   } else {
  //     getAllViewBy(setAllFollower, allViewData);
  //     console.log('allFollower', allFollower);
  //   }
  // };

  const onUnfollow = async item => {
    const filterAuthFollowingList = authState?.AllFollowing.filter(data => {
      return data != item.uid;
    });
    const filterUserFollowerList = item?.AllFollowers.filter(data => {
      return data != authState.uid;
    });

    // update   user
    await SaveUser(item.uid, {
      AllFollowers: filterUserFollowerList,
      followers: item?.followers - 1,
    });
    // update Follower User
    await SaveUser(authState.uid, {
      AllFollowing: filterAuthFollowingList,
      following: authState?.following - 1,
    });
    const data = await getSpecificUser(authState.uid);
    dispatch(authData(data));
    setRefreshState(!refreshState);
  };
  const navigateTo = item => {
    let BlockExist = authState?.BlockUsers?.map(item => item).includes(
      authState.uid,
    );
    if (BlockExist) {
      navigation.navigate('BlockScreen');

      return;
    }

    if (authState.uid == item.uid) {
      navigation.navigate('Profile', {
        event: authState.uid,
      });
      return;
    }
    navigation.navigate('UserProfile', {
      event: item.uid,
    });
  };
  const onFilerAllView = txt => {
    setSearch(txt);
    // console.log('TxtData', txt);
    if (txt.length == 0) {
      if (allViewData.length == 0 || allViewData == undefined) {
        setAllFollower([]);
        return;
      }

      getAllFollowers(setAllFollower, allViewData);
    } else {
      let filterSearch = allFollower.filter(item => {
        return `${item.name} ${item.username}`
          .toLowerCase()
          .trim()
          .includes(txt.toLowerCase().trim());
      });

      setAllFollower(filterSearch);
    }
  };

  const onFollowUser = async item => {
    let userFollowExist = item?.AllFollowers?.map(data => data)?.includes(
      authState?.uid,
    );
    try {
      if (userFollowExist) {
        // check auth following
        let authFollowingExist = authState?.AllFollowing?.map(
          data => data,
        )?.includes(item?.uid);
        // filter user followers
        let filterUserFollowerList = item?.AllFollowers.filter(
          data => data != authState.uid,
        );
        await SaveUser(item.uid, {
          followers: item.followers - 1,
          AllFollowers: filterUserFollowerList,
        });
        // check auth following
        if (authFollowingExist) {
          let filterFollowingList = authState?.AllFollowing.filter(
            data => data != item.uid,
          );
          await SaveUser(authState?.uid, {
            following: authState?.uid.following - 1,
            AllFollowing: filterFollowingList,
          });
        }

        const data = await getSpecificUser(authState.uid);
        dispatch(authData(data));
        // setFollowerState(!followerState);
        setRefreshState(!refreshState);

        return;
      }

      if (item?.privateProfile) {
        if (authState?.RequestIds?.includes(item.uid)) {
          // console.log('lvnlcnvln');

          // filter user followers
          let filterUserFollowRequest = item?.RequestIds.filter(
            data => data != authState?.uid,
          );
          await SaveUser(item?.uid, {
            RequestIds: filterUserFollowRequest,
          });
          setRefreshState(!refreshState);
        } else {
          const id = uuid.v4();
          await UpdateFollowRequest(item.uid, authState?.uid, id);
          setRefreshState(!refreshState);

          sendFollowerNotification(
            authState,
            item,
            'Follow Request',
            'FOLLOW__REQUEST',
            id,
          );
        }
        return;
      }

      // update user followers
      await UpdateFollower(item.uid, authState.uid);
      // await SaveUser(item.uid, {followers: item.followers + 1});
      //  update auth following
      // await SaveUser(authState?.uid, {following: authState.following + 1});
      await UpdateFollowing(authState?.uid, item.uid);
      const data = await getSpecificUser(authState?.uid);
      dispatch(authData(data));
      // sendFollowerNotification("Follow Request","FOLLOW__REQUEST",id);

      sendFollowerNotification(
        authState,
        item,
        'Follow You',
        'FOLLOW',
        uuid.v4(),
      );
      setRefreshState(!refreshState);
      // export const sendFollowerNotification = async ( authUser,CurrentUser, message,type,id) => {

      // console.log('ckdnkcdncdkncdkn');
    } catch (error) {
      console.log('ErrorHai', error);
    }
  };

  return (
    <View>
      <FollowingHeader
        onFilerFollowers={onFilerAllView}
        allFollower={allFollower}
        setAllFollower={setAllFollower}
        search={search}
        label={eventBy}
        navigation={navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{display: 'flex', height: '90%', backgroundColor: colors.white}}>
        <View style={{padding: 15}}>
          <FlatList
            data={allFollower}
            contentContainerStyle={{
              paddingBottom: verticalScale(50),
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <FollowItem
                  item={item}
                  authId={authState.uid}
                  authState={authState}
                  onNavigate={() => {
                    navigateTo(item);
                  }}
                  onFollower={() => {
                    onFollowUser(item);
                  }}
                  authStateFollowing={authState?.AllFollowing}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AllViewBy;
