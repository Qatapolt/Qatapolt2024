import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import commonStyles from '../../../../utils/CommonStyles';
import {Avatar} from 'react-native-elements';
import {icons} from '../../../../assets/icons';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../../utils/Colors';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';
import {useNavigation} from '@react-navigation/native';
import CustomImage from '../../../../components/CustomImage';
import {getSpecificUser} from '../../../services/UserServices';

const UserFollowedContainer = props => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  // console.log('CurrentUserCurrentUser', props.CurrentUser);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const data = await getSpecificUser(props.CurrentUser);
    setUserData(data);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() =>
        navigation.navigate('FollowedStack', {event: props.CurrentUser})
      }
      style={{
        ...commonStyles.rowContainer,
        width: '100%',
        // height: verticalScale(40),
      }}>
      <CustomImage
        imageUrl={userData?.profileImage}
        width={40}
        height={40}
        mainStyle={{
          left: 20,
        }}
      />

      <CustomText
        label="Followed by"
        fontSize={11}
        color={colors.black}
        marginLeft={30}
        // fontFamily={InterFont.re}
      />

      <CustomText
        label={`${userData?.name}`}
        fontSize={11}
        color={colors.black}
        marginLeft={5}
        fontFamily={InterFont.semiBold}
      />

      {props?.AllFollowers?.length >= 2 && (
        <CustomText
          label="and"
          fontSize={12}
          color={colors.black}
          marginLeft={5}
          // fontFamily={InterFont.}
        />
      )}

      <CustomText
        label={
          props?.AllFollowers?.length >= 2
            ? props?.AllFollowers?.length - 1 + ' ' + 'others'
            : ''
        }
        // label="7 others"
        fontSize={11}
        color={colors.black}
        marginLeft={5}
        fontFamily={InterFont.semiBold}
      />
    </TouchableOpacity>
  );
};

export default UserFollowedContainer;

const styles = StyleSheet.create({});
