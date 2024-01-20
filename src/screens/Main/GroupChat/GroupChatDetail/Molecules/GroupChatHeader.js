import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../../../../components/CustomText';
import {InterFont} from '../../../../../utils/Fonts';
import {colors} from '../../../../../utils/Colors';
import ProfilePhoto from '../../../../../components/ProfilePhoto';
import {Spacer} from '../../../../../components/Spacer';

const GroupChatHeader = props => {
  // const [groupData, setGroupData] = useState({})

  // useEffect(() => {

  //   setGroupData(props?.groupData)

  // }, [props?.groupData])

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: scale(10),
        height: verticalScale(105),
        justifyContent: 'space-between',
        backgroundColor: colors.green,
      }}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          props.navigation.navigate('GroupInfo', {groupData: props?.groupData})
        }
        style={{flexDirection: 'row', width: '70%', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('GroupChat')}>
          <Ionicons
            name="md-chevron-back"
            size={moderateScale(30)}
            color={colors.white}
          />
        </TouchableOpacity>
        <Spacer width={10} />

        <ProfilePhoto
          imageUrl={props?.groupData?.groupImage}
          multiUser
          width={scale(55)}
          height={scale(55)}
        />

        <View style={{paddingLeft: scale(10), maxWidth: '70%'}}>
          <CustomText
            label={props?.groupData?.groupName}
            numberOfLines={1}
            fontSize={12}
            fontFamily={InterFont.semiBold}
            color={colors.black}
          />

          <CustomText
            label={props?.groupData?.groupDes}
            fontSize={11}
            numberOfLines={1}
            fontFamily={InterFont.semiBold}
            color={colors.white}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.setLeaveChatModal(true)}
        activeOpacity={0.6}
        style={{paddingRight: scale(10), paddingBottom: scale(11)}}>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={moderateScale(25)}
          color={colors.white}
        />
      </TouchableOpacity>

      {/* <ProfilePhoto
          groupChat
          toggleModal={toggleOptionModal}
          isModalVisible={isModalVisibleOption}
        /> */}
    </View>
  );
};

export default GroupChatHeader;

const styles = StyleSheet.create({});
