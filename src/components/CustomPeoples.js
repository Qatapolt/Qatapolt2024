import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from './CustomText';
import {colors} from '../utils/Colors';
import {InterFont} from '../utils/Fonts';
import {scale} from 'react-native-size-matters';
import commonStyles from '../utils/CommonStyles';
import {getSpecificUser} from '../screens/services/UserServices';
import CustomImage from './CustomImage';
import {useNavigation} from '@react-navigation/native';

const CustomPeoples = props => {
  const navigation = useNavigation();
  const [squadData, setSquadData] = useState({});

  useEffect(() => {
    getUserData();
  }, [props?.item]);

  const getUserData = async () => {
    const data = await getSpecificUser(props?.item);
    setSquadData(data);
  };

  const onNavigate = item => {
    if (props?.authUser?.BlockUsers?.includes(squadData?.uid)) {
      navigation.navigate('BlockScreen');

      return;
    }

    if (squadData.uid == props?.authUser?.uid) {
      navigation.navigate('Profile', {
        event: squadData.uid,
      });
      return;
    }
    if (props?.isOther) {
      navigation.navigate('UserProfile', {
        event: squadData.uid,
      });

      return;
    }
    navigation.navigate('OtherUserProfile', {
      event: squadData.uid,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onNavigate}
      style={{marginHorizontal: scale(10)}}>
      <CustomImage imageUrl={squadData?.profileImage} width={50} height={50} />
      <View style={{width: scale(props.textWidth || 55), alignItems: 'center'}}>
        <CustomText
          label={squadData?.name}
          numberOfLines={1}
          marginTop={5}
          fontSize={props.fontSize || 9}
          textAlign="center"
          color={colors.black}
          fontFamily={InterFont.bold}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomPeoples;

const styles = StyleSheet.create({});
