import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../../utils/Colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import FollowingContainer from './Molecules/FollowingContainer';
import FollowingHeader from './Molecules/FollowingHeader';
import {
  getAllFollowers,
  getSpecificUser,
  SaveUser,
} from '../../services/UserServices';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {authData} from '../../../redux/reducers/authReducer';

const FollowingScreen = ({navigation, route}) => {
  const [allFollower, setAllFollower] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const AllFollowing = route?.params?.AllFollowing;
  const authState = useSelector(state => state.auth.currentUser);
  const [refreshState, setRefreshState] = useState(false);

  console.log('AllFollowing', AllFollowing);

  const focused = useIsFocused();
  useEffect(() => {
    getAllFollowerData();
  }, [focused, refreshState]);
  const getAllFollowerData = () => {
    if (
      authState?.AllFollowing?.length == 0 ||
      authState?.AllFollowing == undefined
    ) {
      setAllFollower([]);
      return;
    }
    getAllFollowers(setAllFollower, authState?.AllFollowing);
  };

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
  const RenderFollowerData = ({item, index}) => {
    return (
      <FollowingContainer
        navigation={navigation}
        onPressUnFollow={() => {
          onUnfollow(item);
        }}
        item={item}
      />
    );
  };
  const onFilerFollowers = txt => {
    setSearch(txt);
    // console.log('TxtData', txt);
    if (txt.length == 0) {
      if (AllFollowing?.length == 0 || AllFollowing == undefined) {
        setAllFollower([]);
        return;
      }
      getAllFollowers(setAllFollower, AllFollowing);
    } else {
      let filterSearch = allFollower?.filter(item => {
        return `${item.name} ${item.username}`
          .toLowerCase()
          .trim()
          .includes(txt.toLowerCase().trim());
      });
      // console.log('FilterSearch', allFollower);
      setAllFollower(filterSearch);
    }
  };

  return (
    <View>
      <FollowingHeader
        onFilerFollowers={onFilerFollowers}
        search={search}
        navigation={navigation}
        label={'Following'}
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
            renderItem={RenderFollowerData}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default FollowingScreen;
