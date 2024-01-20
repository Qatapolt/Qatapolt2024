import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomImage from '../../../../../components/CustomImage';
import {Avatar, Badge, Image, ListItem} from 'react-native-elements';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../../../utils/Colors';
import CustomText from '../../../../../components/CustomText';
import {Spacer} from '../../../../../components/Spacer';
import commonStyles from '../../../../../utils/CommonStyles';
import {InterFont} from '../../../../../utils/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { icons } from '../../../../../assets/icons';

const ParticipantsItem = props => {
  const lastIndex = props.participantsData.length - 1 == props?.index;
  console.log('lastIndex', props?.item);

  const onNavigate = () => {
    if (props?.authData?.BlockUsers?.includes(props?.item.uid)) {
      // console.log('BlockedUsercdcdcd');

      props.navigation.navigate('BlockScreen');

      return;
    }

    if (props?.item.uid == props?.authData.uid) {
      props.navigation.navigate('Profile', {
        event: props?.item.uid,
      });
      return;
    }
    props.navigation.navigate('UserProfile', {
      event: props?.item.uid,
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        borderBottomWidth: lastIndex ? -1 : 0.3,
        paddingVertical: verticalScale(7),
        borderBottomColor: colors.inputGray,
      }}
      onPress={onNavigate}>
      <View style={commonStyles.rowContainer}>
        <CustomImage
          width={40}
          height={40}
          imageUrl={props.item?.profileImage}
        />

        <View style={{width: '60%', marginHorizontal: scale(10)}}>
          <CustomText
            fontFamily={InterFont.semiBold}
            fontSize={13}
            numberOfLines={1}
            textTransform={'capitalize'}
            label={props?.item?.name}
          />
          <View style={{flexDirection:"row",alignItems:"center",width:"80%"}}>
          <CustomText 
          numberOfLines={1}
          label={`${props.item?.username}`} />
          <Spacer width={5}/>

          {
               props.item.trophy == 'verified'&&(
                  <Image
                  resizeMode="contain"
                  style={{width:17,height:17}}
                  source={icons.trophyIcon}
                  />

                )
              }


          </View>

        </View>

        <View
          style={
            props?.groupAdminId == props?.item?.uid
              ? styles.nextAdmin
              : styles.next
          }>
          {props?.groupAdminId == props?.item?.uid ? (
            <CustomText
              color={colors.inputGray}
              textTransform={'capitalize'}
              label={'Admin'}
            />
          ) : (
            <></>
          )}
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => props.navigation.goBack()}>
            <MaterialIcons
              name="navigate-next"
              color={colors.inputGray}
              size={moderateScale(20)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ParticipantsItem;

const styles = StyleSheet.create({
  nextAdmin: {
    width: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  next: {
    width: scale(50),
  },
});
