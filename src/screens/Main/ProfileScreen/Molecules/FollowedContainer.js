import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import commonStyles from '../../../../utils/CommonStyles';
import {Avatar} from 'react-native-elements';
import {icons} from '../../../../assets/icons';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../../utils/Colors';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';
import { useNavigation } from '@react-navigation/native';

const FollowedContainer = ({props}) => {

    const navigation = useNavigation();

  return (
    <TouchableOpacity
    activeOpacity={0.6}
    onPress={()=>navigation.navigate("FollowedScreen",)}
      style={{
        ...commonStyles.rowContainer,
        width: '100%',
        // height: verticalScale(40),
      }}>
      <Image
        source={icons.profile}
        style={{
          height: scale(38),
          width: scale(38),
          resizeMode: 'contain',
          //   position: 'absolute',
          left: 20,
        }}
      />

      <Image
        source={icons.followProfile}
        style={{
          height: scale(38),
          width: scale(38),
          resizeMode: 'contain',
          //   position: 'absolute',
          //   left: scale(30),
        }}
      />

      <Image
        source={icons.followProfile}
        style={{
          height: scale(38),
          width: scale(38),
          resizeMode: 'contain',
          //   position: 'absolute',
          left: scale(-20),
        }}
      />

      <CustomText
        label="Followed by "
        fontSize={11}
        color={colors.black}
        marginLeft={-10}
        // fontFamily={InterFont.re}
      />

      <CustomText
        label="Ish,"
        fontSize={11}
        color={colors.black}
        // marginLeft={5}
        fontFamily={InterFont.semiBold}
      />

      <CustomText
        label="Alasan"
        fontSize={11}
        color={colors.black}
        // marginLeft={5}
        fontFamily={InterFont.semiBold}
      />
      <CustomText
        label="and"
        fontSize={12}
        color={colors.black}
        marginLeft={5}
        // fontFamily={InterFont.}
      />

      <CustomText
        label="7 others"
        fontSize={11}
        color={colors.black}
        marginLeft={5}
        fontFamily={InterFont.semiBold}
      />

      {/* <Image
                  source={icons.followProfile}
                  style={{height: 45, width: 45, resizeMode: 'contain',marginLeft:scale(10)}}
                /> */}

      {/* <Avatar
        activeOpacity={0.9}
        //   onPress={() => {
        //    props.navigation.navigate('Profile', {user: true});
        //   }}
        rounded
        source={icons.followProfile}
        size={40}
      /> */}
      {/* <Avatar
        activeOpacity={0.9}
        //   onPress={() => {
        //    props.navigation.navigate('Profile', {user: true});
        //   }}
        rounded
        source={icons.followProfile}
        size={40}
      /> */}

      {/* <Text>FollowedContainer</Text> */}
    </TouchableOpacity>
  );
};

export default FollowedContainer;

const styles = StyleSheet.create({});
