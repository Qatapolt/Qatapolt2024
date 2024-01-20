import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React,{useEffect,useState} from 'react';
import commonStyles from '../../../../utils/CommonStyles';
import {Spacer} from '../../../../components/Spacer';
import CustomText from '../../../../components/CustomText';
import CustomButton from '../../../../components/CustomButton';
import {colors} from '../../../../utils/Colors';
import CustomImage from '../../../../components/CustomImage';
import {verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import FollowedItem from './FollowedItem';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getAllFollowers, getSpecificUser, SaveUser, UpdateFollower, UpdateFollowing } from '../../../services/UserServices';
import { authData } from '../../../../redux/reducers/authReducer';

const MutualContainer = ({followedData}) => {
  const followerData = useSelector(state => state.user.userData);
  const authState = useSelector(state => state.auth.currentUser);
  const isFocused=useIsFocused()
  const dispatch=useDispatch()
  const [refreshState, setRefreshState] = useState(false);
  const [allFollower, setAllFollower] = useState([]);
  const navigation=useNavigation()

  useEffect(() => {
    getAllFollowerData();
  }, [ isFocused,refreshState]);


  

  const getAllFollowerData = () => {
    if (!followerData?.AllFollowers?.length == 0 || !followerData?.AllFollowers == undefined) {
      getAllFollowers(setAllFollower, followerData?.AllFollowing);

      return;
    }
    setAllFollower([]);

  };


  const onFollowUser = async item => {
    console.log("ItemData",)
    let userFollowExist = item?.AllFollowers?.map(
        data => data,
      )?.includes(authState?.uid);
      console.log("userFollowExist",userFollowExist)
    try {
        if (userFollowExist) {
          // check auth following
          let authFollowingExist = authState?.AllFollowing?.map(
            data => data,
          )?.includes(item?.uid);
          // filter user followers
          let filterUserFollowerList = item?.AllFollowers.filter(
            data => data!= authState.uid,
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
          setRefreshState(!refreshState)
  
          return;
        }
        // update user followers
        await UpdateFollower(item.uid, authState.uid);
        await SaveUser(item.uid, {followers: item.followers + 1});
        //  update auth following
        await SaveUser(authState?.uid, {following: authState.following + 1});
        await UpdateFollowing(authState?.uid, item.uid);
  
        const data = await getSpecificUser(authState?.uid);
        dispatch(authData(data));
        setRefreshState(!refreshState)
        console.log("UpdateSttae")
      } catch (error) {
        console.log('ErrorHai', error);
      }
  
  };
  const navigateTo = item => {

    let BlockExist = authState?.BlockUsers?.map(
        item => item,
      ).includes(authState.uid);
      if (BlockExist) {
        navigation.navigate('BlockScreen');

        return;
      }

      if (authState.uid ==item.uid) {
        navigation.navigate('Profile', {
          event: authState.uid,
        });
        return;
      }
    navigation.navigate('UserProfile', {
        event: item.uid,
      });
 
  };


  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{display: 'flex', height: '90%', backgroundColor: colors.white}}>
   <View style={{padding: 15}}>
   {
          allFollower&&(
            <FlatList
            data={allFollower}
            contentContainerStyle={{
              paddingBottom: verticalScale(50),
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return <FollowedItem item={item}
              authId={authState.uid}
              onNavigate={()=>{
                navigateTo(item)
  
              }}
              onFollower={()=>{
                onFollowUser(item)
  
              }}
  
  
  
              authStateFollowing={authState?.AllFollowing}
  
              
              />;
            }}
          />

          )}
        
      </View>
    </ScrollView>
  );
};

export default MutualContainer;

const styles = StyleSheet.create({});
