import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import commonStyles from '../../../../utils/CommonStyles';
import {Spacer} from '../../../../components/Spacer';
import CustomText from '../../../../components/CustomText';
import CustomButton from '../../../../components/CustomButton';
import {colors} from '../../../../utils/Colors';
import {getSpecificUser} from '../../../services/UserServices';
import CustomImage from '../../../../components/CustomImage';
import {icons} from '../../../../assets/icons';
import {useSelector} from 'react-redux';

const FollowingContainer = ({item, onPressUnFollow, navigation}) => {
  console.log('ALlFolowItemn', item);
  const CurrentUser = useSelector(state => state.auth?.currentUser);
  // const [userData, setUserData] = useState({})
  // useEffect(() => {
  //   getFollowerUser()
  // }, [item])
  // const getFollowerUser= async()=>{
  //   const users= await getSpecificUser(item)
  //   setUserData(users)
  // }
  const onNavigate = () => {
    if (CurrentUser?.BlockUsers?.includes(item?.uid)) {
      navigation.navigate('BlockScreen');

      return;
    }

    if (item?.uid === CurrentUser?.uid) {
      navigation.navigate('Profile', {
        event: item?.uid,
      });
      return;
    }

    navigation.navigate('UserProfile', {
      event: item?.uid,
    });
  };
  return (
    <TouchableOpacity
      onPress={onNavigate}
      style={{width: '100%'}}
      activeOpacity={0.6}>
      <View style={commonStyles.rowJustify}>
        <View style={{...commonStyles.rowContainer, width: '70%'}}>
          <View>
            <CustomImage width={50} height={50} imageUrl={item?.profileImage} />
          </View>
          <Spacer width={15} />
          <View
            style={{display: 'flex', justifyContent: 'center', width: '60%'}}>
            <View>
              <CustomText label={item?.name} numberOfLines={1} fontSize={13} />
              <Spacer height={2} />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignItems: 'center',
                }}>
                <CustomText
                  numberOfLines={1}
                  label={item?.username ? `${item?.username}` : ''}
                />
                <Spacer width={5} />

                {item?.trophy == 'verified' && (
                  <Image
                    resizeMode="contain"
                    style={{width: 17, height: 17}}
                    source={icons.trophyIcon}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
        <CustomButton
          height={27}
          borderRadius={8}
          backgroundColor={colors.green}
          onPress={onPressUnFollow}
          color={colors.white}
          fontSize={13}
          title={'Unfollow'}
          width={'27%'}
        />
      </View>

      <Spacer height={15} />
    </TouchableOpacity>
  );
};

export default FollowingContainer;

const styles = StyleSheet.create({});
