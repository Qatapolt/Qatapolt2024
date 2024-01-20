import {Platform, Text, View, Pressable, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import moment from 'moment';
import AgeRangeBottomSheet from './AgeRangeBottomSheet';
import {icons} from '../../../../assets/icons';
import {InterFont} from '../../../../utils/Fonts';
const AgeRange = ({
  compulsory = true,
  setSignupValues,
  signupValues,
  width,
  height,
  borderRadius,
  backgroundColor,
  marginTop,
  paddingLeft,
  borderColor,
}) => {
  const [bottomSheet, setBottomSheet] = useState(false);
  const [date, setDate] = useState(new Date());
  const closeModel = () => {
    setBottomSheet(!bottomSheet);
  };

  const onConfirmDate = () => {
    const ageData = JSON.stringify(date).slice(1, 11);
    setBottomSheet(!bottomSheet);
    setSignupValues({...signupValues, age: ageData});
  };

  return (
    <Pressable
      onPress={() => setBottomSheet(true)}
      style={{
        width: width || '100%',
        height: height || verticalScale(50),
        borderRadius: borderRadius || moderateScale(12),
        backgroundColor: backgroundColor,
        padding: scale(10),
        marginTop: marginTop || verticalScale(0),
        borderColor: borderColor,
        paddingLeft: paddingLeft,
        backgroundColor: colors.white,
        shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
        shadowRadius: 5,
        elevation: 5,
        shadowOpacity: 0.5,
        shadowOffset: {width: 1, height: 1},
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {compulsory && (
          <CustomText
            label={'*'}
            color={colors.red}
            // marginBottosm={10}
            marginRight={3}
            // fontSize={10}
          />
        )}

        <Pressable onPress={() => setOpen(true)}>
          <CustomText
            label={'D.O.B'}
            color={colors.inputGray}
            fontFamily={InterFont.medium}
            fontSize={verticalScale(8)}
          />
        </Pressable>
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          width: '100%',
          flexDirection: 'row',
          // marginTop: scale(8),
        }}>
        {/* setSignupValues={setSignupValues} signupValues={signupValues} */}
        {signupValues?.age ? (
          <Text style={{color: colors.black, width: '94%'}}>
            {moment(signupValues.age).format('DD-MM-YYYY')}
          </Text>
        ) : (
          <Text style={{color: '#828282', width: '94%'}}>Select Date</Text>
        )}
        <Pressable
          onPress={() => closeModel()}
          style={{
            height: scale(30),
            width: scale(30),
          }}>
          <Image
            style={{
              height: scale(9),
              width: scale(9),
            }}
            resizeMode="contain"
            source={icons.dropdown}
          />
        </Pressable>
      </View>

      <AgeRangeBottomSheet
        modalVisible={bottomSheet}
        onCloseModal={closeModel}
        onConfirmDate={onConfirmDate}
        date={date}
        setDate={setDate}
      />
    </Pressable>
  );
};

export default AgeRange;
