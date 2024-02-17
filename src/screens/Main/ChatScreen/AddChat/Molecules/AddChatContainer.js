import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Avatar} from 'react-native-elements';
import {icons} from '../../../../../assets/icons';
import CustomText from '../../../../../components/CustomText';
import {colors} from '../../../../../utils/Colors';
import {InterFont} from '../../../../../utils/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {Spacer} from '../../../../../components/Spacer';

import {getSpecificUser} from '../../../../services/UserServices';
import CustomImage from '../../../../../components/CustomImage';
import commonStyles from '../../../../../utils/CommonStyles';

const AddChatContainer = props => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          paddingBottom: 10,
          marginTop: verticalScale(10),
          borderBottomColor: colors.lightGray,
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '60%'}}>
          <CustomImage
            width={50}
            height={50}
            imageUrl={props.item?.profileImage}
          />
          {/* <Avatar rounded source={props.item.img} size={55} /> */}
          <View>
            <CustomText
              label={props.item?.name}
              fontSize={13}
              marginLeft={10}
              fontFamily={InterFont.semiBold}
            />
            <View style={commonStyles.rowContainer}>
              <CustomText
                label={`${props.item?.username}`}
                fontSize={9}
                numberOfLines={1}
                marginLeft={10}
                fontFamily={InterFont.regular}
              />
              <Spacer width={2} />
              {props?.item?.trophy == 'verified' && (
                <Image
                  resizeMode="contain"
                  style={{width: 15, height: 15}}
                  source={icons.trophyIcon}
                />
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            props.setCheck(props.index);
            props.setUserObject(props.item?.uid);
          }}
          style={{
            ...styles.checkCon,
            backgroundColor:
              props.check == props.index ? colors.black : colors.white,
          }}
          activeOpacity={0.6}>
          {props.check == props.index && (
            <AntDesign name="check" size={20} color={colors.white} />
          )}
        </TouchableOpacity>
      </View>
      <Spacer height={10} />
    </>
  );
};

export default AddChatContainer;

const styles = ScaledSheet.create({
  checkCon: {
    width: 23,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.black,
    marginRight: scale(10),
  },
});
