// PhoneNumberInput.js

import React, {useState, useRef} from 'react';
import {View, TextInput} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {verticalScale} from 'react-native-size-matters';
import {colors} from '../utils/Colors';
import {InterFont} from '../utils/Fonts';
import CustomText from './CustomText';

const PhoneNumberInput = ({
  value,
  onChangeText,
  placeholder,
  signupValues,
  setSignupValues,
}) => {
  const phoneNumberInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState(value);

  const handleOnChangeText = text => {
    const countryCode = phoneNumberInput.current?.state?.code;

    // Remove the country code from the entered text
    const nationalNumber = text.startsWith(`+${countryCode}`)
      ? text.slice(countryCode.length + 1)
      : text;

    const formattedPhoneNumber = `+${countryCode || ''}${nationalNumber || ''}`;
    setFormattedValue(text);
    onChangeText(text);
    setSignupValues({
      ...signupValues,
      phone: formattedPhoneNumber,
    });
  };

  return (
    <View
      style={{
        borderRadius: 15,
        flex: 1,
      }}>
      <PhoneInput
        ref={phoneNumberInput}
        defaultValue={formattedValue}
        defaultCode="US"
        layout="first"
        onChangeText={handleOnChangeText}
        withDarkTheme
        withShadow
        autoFocus={false}
        placeholder={placeholder}
        countryPickerButtonStyle={{width: 60}}
        containerStyle={{
          backgroundColor: colors.white,
          width: '100%',
          height: 65,
          borderRadius: 15,
          paddingTop: 12,
          paddingLeft: 5,
        }}
        textContainerStyle={{
          backgroundColor: colors.white,
          width: '100%',
          borderRadius: 15,
        }}
        textInputStyle={{
          // backgroundColor: colors.superDuperLightGray,
          fontSize: 12,
          color: colors.black,
          height: 50,
          borderRadius: 15,
          padding: 10,
        }}
        textInputProps={{
          placeholderTextColor: colors.black,
          fontSize: 12,
        }}
      />
      <View style={{position: 'absolute', top: 7, left: 10}}>
        <View style={{flexDirection: 'row'}}>
          <CustomText
            label={'*'}
            color={colors.red}
            // marginBottosm={10}
            marginRight={3}
            // fontSize={10}
          />

          <CustomText
            label={'Phone Number'}
            color={colors.inputGray}
            fontFamily={InterFont.medium}
            fontSize={verticalScale(6)}
          />
        </View>
      </View>
    </View>
  );
};

export default PhoneNumberInput;
