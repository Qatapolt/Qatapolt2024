import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import {Spacer} from '../../../../components/Spacer';
import {InterFont} from '../../../../utils/Fonts';
import {colors} from '../../../../utils/Colors';
import {authData} from '../../../../redux/reducers/authReducer';
const AdvanceUserContainer = props => {
  const onNavigate = () => {
    let BlockExist = authData?.BlockUsers?.map(item => item).includes(
      props?.item?.uid,
    );
    if (BlockExist) {
      props?.navigation.navigate('BlockScreen');

      return;
    }

    if (props?.item?.uid == authData.uid) {
      props?.navigation.navigate('Profile', {
        event: props?.item?.uid,
      });
      return;
    }
    props.navigation.navigate('UserProfile', {
      event: props?.item?.uid,
    });
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          onNavigate();
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 0.5,
          paddingBottom: 10,
          marginTop: verticalScale(10),
          borderBottomColor: colors.lightGray,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            <CustomText
              label={`${props.item?.username}`}
              fontSize={9}
              marginLeft={10}
              fontFamily={InterFont.regular}
            />
          </View>
        </View>
      </TouchableOpacity>
      <Spacer height={10} />
    </>
  );
};

export default AdvanceUserContainer;

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
