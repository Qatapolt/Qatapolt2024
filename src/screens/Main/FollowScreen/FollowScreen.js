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
import FollowScreenHeader from './FollowScreenHeader';
import FollowContainer from './FollowContainer';
import {
  getAllFollowers,
  getSpecificUser,
  SaveUser,
} from '../../services/UserServices';
import {useDispatch, useSelector} from 'react-redux';
import {authData} from '../../../redux/reducers/authReducer';

const FollowScreen = ({route, navigation}) => {
  const [allFollower, setAllFollower] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth.currentUser);
  const [refreshState, setRefreshState] = useState(false);

  useEffect(() => {
    getAllFollowerData();
  }, [route?.params?.event, refreshState]);

  const getAllFollowerData = () => {
    if (
      authState?.AllFollowers?.length == 0 ||
      authState?.AllFollowers == undefined
    ) {
      setAllFollower([]);
      return;
    }
    getAllFollowers(setAllFollower, authState?.AllFollowers);
  };

  const RenderFollowerData = ({item, index}) => {
    return (
      <FollowContainer
        navigation={navigation}
        onRemoveFollower={() => {
          onRemove(item);
        }}
        item={item}
      />
    );
  };
  const onRemove = async item => {
    const filterAuthFollowerList = authState?.AllFollowers.filter(data => {
      return data != item.uid;
    });
    const filterUserFollowingList = item?.AllFollowing.filter(data => {
      return data != authState.uid;
    });

    console.log('authFollowerRemove', filterAuthFollowerList);
    console.log('filterUserFollowingList', filterUserFollowingList);

    // update  auth user
    await SaveUser(authState.uid, {
      AllFollowers: filterAuthFollowerList,
      followers: authState?.followers - 1,
    });
    // update Follower User
    await SaveUser(item.uid, {
      AllFollowing: filterUserFollowingList,
      following: item?.following - 1,
    });
    const data = await getSpecificUser(authState.uid);
    dispatch(authData(data));
    setRefreshState(!refreshState);
  };
  const onFilerFollowers = txt => {
    setSearch(txt);
    // console.log('TxtData', txt);
    if (txt.length == 0) {
      if (
        authState?.AllFollowers?.length == 0 ||
        authState?.AllFollowers == undefined
      ) {
        setAllFollower([]);
        return;
      }

      getAllFollowers(setAllFollower, authState?.AllFollowers);
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

  return (
    <View>
      <FollowScreenHeader
        onFilerFollowers={onFilerFollowers}
        search={search}
        label={'Followers'}
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

export default FollowScreen;
