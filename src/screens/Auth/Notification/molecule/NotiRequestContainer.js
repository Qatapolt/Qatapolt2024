import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import commonStyles from '../../../../utils/CommonStyles';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';
import {Spacer} from '../../../../components/Spacer';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const NotiRequestContainer = ({data, count, onNavigate}) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onNavigate}
        style={{
          ...commonStyles.rowContainer,
          width: '100%',
          paddingHorizontal: scale(10),
        }}>
        <CustomImage imageUrl={data[0]?.senderImage} width={40} height={40} />

        <View style={{width: '75%', marginLeft: scale(10)}}>
          <CustomText
            label={'Follow Request'}
            fontFamily={InterFont.semiBold}
            fontSize={14}
          />
          <Spacer height={3} />
          <View style={{...commonStyles.rowContainer, width: '80%'}}>
            <CustomText
              label={data[0]?.senderName}
              numberOfLines={1}
              color={colors.grey0}
              marginRight={3}
            />
            {count > 1 && (
              <CustomText label={`+ ${count-1} others`} color={colors.grey0} />
            )}
          </View>
        </View>

        <MaterialIcons
          name="navigate-next"
          color={colors.black}
          size={moderateScale(25)}
        />
      </TouchableOpacity>

      <View
        style={{
          height: 0.5,
          backgroundColor: colors.inputGray,
          marginVertical: verticalScale(15),
        }}
      />
    </>
  );
};

export default NotiRequestContainer;

const styles = StyleSheet.create({});
