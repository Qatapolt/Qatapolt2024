import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import commonStyles from '../../../../../utils/CommonStyles';
import CustomImage from '../../../../../components/CustomImage';
import {ListItem} from 'react-native-elements';
import CustomText from '../../../../../components/CustomText';
import {scale} from 'react-native-size-matters';
import {getSpecificUser} from '../../../../services/UserServices';
import {useIsFocused} from '@react-navigation/native';
import {InterFont} from '../../../../../utils/Fonts';
import {Spacer} from '../../../../../components/Spacer';
import CustomButton from '../../../../../components/CustomButton';
import {colors} from '../../../../../utils/Colors';
import {useSelector} from 'react-redux';

const FollowRequestContainer = props => {
  const CurrentUser = useSelector(state => state.auth?.currentUser);
  const [userData, setUserData] = useState({});
  const focused = useIsFocused();
  console.log('userids', userData);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const data = await getSpecificUser(props.item.senderId);

    setUserData(data);
  };
  const onNavigate = () => {
    if (CurrentUser?.BlockUsers?.includes(userProfileData?.uid)) {
      props.navigation.navigate('BlockScreen');

      return;
    }

    if (userData?.uid === CurrentUser?.uid) {
      props.navigation.navigate('Profile', {
        event: userProfileData?.uid,
      });
      return;
    }

    props.navigation.navigate('UserProfile', {
      event: userProfileData?.uid,
    });
  };

  return (
    <View style={{...commonStyles.rowContainer}}>
      <View style={{...commonStyles.rowContainer, width: '60%'}}>
        <CustomImage
          onImagePress={props.onNavigate}
          width={45}
          height={45}
          imageUrl={userData.profileImage}
        />

        <TouchableOpacity
          style={{marginLeft: scale(10), width: '70%'}}
          activeOpacity={0.6}
          onPress={onNavigate}>
          <ListItem.Title
            textTransform={'capitalize'}
            numberOfLines={1}
            style={{fontFamily: InterFont.bold}}>
            {userData?.name}
          </ListItem.Title>
          <Spacer height={3} />
          <View style={{...commonStyles.rowContainer, width: '60%'}}>
            <CustomText
              label={`${userData?.username}`}
              fontSize={10}
              numberOfLines={1}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{...commonStyles.rowContainer}}>
        <CustomButton
          height={27}
          borderRadius={8}
          onPress={() => props.onFollower(userData, props.item.id)}
          backgroundColor={colors.green}
          color={colors.white}
          fontSize={10}
          title={'Confirm'}
          width={scale(60)}
        />
        <Spacer width={5} />
        <CustomButton
          height={27}
          borderRadius={8}
          onPress={props.onDelete}
          backgroundColor={colors.lightGray}
          color={colors.black}
          fontSize={10}
          title={'Delete'}
          width={scale(60)}
        />
      </View>
    </View>
  );
};

export default FollowRequestContainer;

const styles = StyleSheet.create({});
