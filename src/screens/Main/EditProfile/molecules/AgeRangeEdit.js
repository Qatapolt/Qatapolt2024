import {Platform, Text, View, Pressable, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import moment from 'moment';
import AgeRangeBottomSheet from './AgeRangeBottomSheetEdit';
import {icons} from '../../../../assets/icons';
import {InterFont} from '../../../../utils/Fonts';
const AgeRangeEdit = props => {
  const [bottomSheet, setBottomSheet] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState();
  const closeModel = () => {
    setBottomSheet(!bottomSheet);
  };
  const onConfirmDate = () => {
    const ageData = JSON.stringify(date).slice(1, 11);

    setBottomSheet(!bottomSheet);
    props.setSignupValues({...props?.signupValues, age: ageData});
    // dateOfBirth = calculateDateOfBirth(ageData);
  };
  const calculateDateOfBirth = age => {
    const currentDate = moment();
    const dateOfBirth = currentDate.subtract(age, 'years');
    return dateOfBirth.format('DD-MM-YYYY');
  };
  useEffect(() => {
    const dateOfBirth = calculateDateOfBirth(props?.signupValues?.age);
    props.setSignupValues({...props?.signupValues, age: dateOfBirth});
  }, []);

  // console.log('dateOfBirth:', props?.signupValues);
  return (
    <Pressable
      onPress={() => setBottomSheet(true)}
      style={{
        width: props.width || '100%',
        height: props.height || verticalScale(50),
        borderRadius: props.borderRadius || moderateScale(12),
        backgroundColor: props.backgroundColor,
        padding: scale(10),
        marginTop: props.marginTop || verticalScale(0),
        borderColor: props.borderColor,
        paddingLeft: props.paddingLeft,
        backgroundColor: colors.white,
        shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
        shadowRadius: 5,
        elevation: 5,
        shadowOpacity: 0.5,
        shadowOffset: {width: 1, height: 1},
      }}>
         <View style={{flexDirection: 'row'}}>
          <CustomText
            label={'*'}
            color={colors.red}
            // marginBottosm={10}
            marginRight={3}
            // fontSize={10}
          />
           <Pressable onPress={() => setOpen(true)}>
        <CustomText
            label={'D.O.B'}
            color={colors.inputGray}
          fontFamily={InterFont.medium}
          fontSize={verticalScale(6)}
        />
         
        </Pressable>
 
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          // marginTop: scale(8),
        }}>
        {/* setSignupValues={setSignupValues} signupValues={signupValues} */}
        {props?.signupValues?.age ? (
          <Text style={{color: colors.black}}>{props?.signupValues?.age}</Text>
        ) : (
          <Text style={{color: '#828282'}}>Select Date</Text>
        )}
      </View>
      <Pressable
        onPress={() => closeModel()}
        style={{
          position: 'absolute',
          top: scale(15),
          left: scale(272),
          alignItems: 'center',
          justifyContent: 'center',
          height: scale(30),
          width: scale(30),
        }}>
        <Image
          style={{
            height: scale(8),
            width: scale(8),
          }}
          resizeMode="contain"
          source={icons.dropdown}
        />
      </Pressable>

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

export default AgeRangeEdit;
