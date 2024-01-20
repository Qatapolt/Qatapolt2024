import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useMemo, useRef, useEffect, useCallback, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomHeader from '../../../../components/CustomHeader';
import commonStyles, {PH10, PH20} from '../../../../utils/CommonStyles';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';
import {Spacer} from '../../../../components/Spacer';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../../../components/CustomButton';
import {getSpecificUser, SaveUser, UpdateFollower, UpdateFollowing, UpdateFollowRequest} from '../../../services/UserServices';
import FastImage from 'react-native-fast-image';
import CustomTab from '../../../../components/CustomTab';
import uuid from 'react-native-uuid';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { sendFollowerNotification } from '../../../services/NotificationServices';
import { authData } from '../../../../redux/reducers/authReducer';

const QataPoltNewsDetail = ({navigation, route}) => {
  const snapPoints = useMemo(() => ['40%', '75%', '100%'], []);
  const authUser = useSelector(state => state.auth?.currentUser);
  // let followRequestExist = CurrentUser?.RequestIds?.includes(authId);

  const dispatch=useDispatch()
  const [userData, setUserData] = useState({});
  const [followerState, setFollowerState] = useState(false);



  const detail = route.params.data;
  // console.log('Detail', detail?.userID);


  useEffect(() => {
    if(detail?.user){
      getUser();


    }
  }, [ route.params.data,followerState]);

  const getUser = async () => {
    const data = await getSpecificUser(detail?.userID);
    setUserData(data);
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
      if (CurrentUser?.RequestIds?.includes(authUser?.uid)) {
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

  return (
    <View style={{flex:1}}> 


       <View
      style={{
        height: verticalScale(90),
        backgroundColor: colors.green,
      }}>
      <Spacer height={Platform.OS == 'ios' ? 50 : 10} />

      <PH10>
        <CustomHeader
          LeftSide={() => (
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                color={colors.white}
                size={moderateScale(30)}
              />
            </TouchableOpacity>
          )}
          Center={() => (
            <CustomText
              label="Qatapolt News"
              fontSize={18}
              color={colors.white}
              marginRight={20}
              fontFamily={InterFont.semiBold}
            />
          )}
        />





      </PH10>


    </View>
    <ScrollView style={{flex:1}}
    showsVerticalScrollIndicator={false}
    >

    <PH10>
      <Spacer height={10}/>
    <CustomText
            label={detail?.title}
            fontSize={20}
            numberOfLines={3}
            fontFamily={InterFont.bold}
          />

<Spacer height={10}/>
<View style={commonStyles.rowContainer}>
              <MaterialCommunityIcons
                name="clock-time-five-outline"
                size={moderateScale(17)}
                color={colors.inputGray}
              />

              <CustomText
                label={detail?.timeAgo}
                color={colors.inputGray}
                marginLeft={5}
                fontSize={12}
                fontFamily={InterFont.semiBold}
              />
              {
                detail?.user?(

                  <View style={commonStyles.rowContainer}>

                                      <Spacer width={10}/>

              <CustomButton
                title={
                  userData?.RequestIds?.includes(authUser?. uid)
                    ? 'Requested'
                    : userData?.AllFollowers?.includes(authUser?.uid)
                    ? 'Unfollow'
                    : 'Follow'
                }
                width={65}
                height={25}
                onPress={()=>onUserFollower(userData)}
                fontFamily={InterFont.bold}
                fontSize={10}
                borderRadius={20}
                // backgroundColor={colors.green}

                backgroundColor={
                  userData?.RequestIds?.includes(authUser?.uid)
                    ? colors.green
                    : userData?.AllFollowers?.includes(authUser?.uid)
                    ? colors.green
                    : colors.divider
                }
                color={
                  userData?.RequestIds?.includes(authUser?.uid)
                    ? colors.white
                    : userData?.AllFollowers?.includes(authUser?.uid)
                    ? colors.white
                    : colors.black
                }

                btnStyle={{
                  shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
                  shadowRadius: 2,
                  elevation: 5,
                  shadowOpacity: 0.4,
                  shadowOffset: {width: -1, height: 1},
                }}
              />

<CustomText
                  label={`${userData?.username}`}
                  fontSize={12}
                  color={colors.blue}
                  numberOfLines={1}
                  width={"60%"}
                  marginLeft={5}
                  fontFamily={InterFont.medium}
                />
                  </View>


                ):null
              }


              </View>

            




    </PH10>
    <Spacer height={15}/>


    <FastImage
              imageStyle={{
                borderRadius: 20,
              }}
              source={detail?.image}
              style={{
                height: 250,
                width: '100%',
                resizeMode: 'cover',
             
              }}/>
              <View style={{width:"100%",padding:scale(10),backgroundColor:colors.lightGray,justifyContent:"center"}}>

              <CustomText
                  label={detail?.subTitle}
                  fontSize={12}
                  color={colors.black}
                  numberOfLines={3}
                  marginLeft={5}
                  fontFamily={InterFont.medium}
                />

              </View>

              <Spacer height={15}/>
              <PH10>
              <CustomText
                  label={detail?.description}
                  fontSize={12}
                  color={colors.black}
                  fontFamily={InterFont.medium}
                />


                
                

                

              </PH10>

              <Spacer height={20}/>

              </ScrollView>



           
              </View>

             




   



   
  );
};

export default QataPoltNewsDetail;

const styles = StyleSheet.create({
  calendarContainer: {
    width: scale(110),
    height: verticalScale(30),
    backgroundColor: colors.superLightGray,
    borderRadius: scale(20),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(10),
  },
});
