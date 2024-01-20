import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomTextInput from '../../../../components/CustomTextInput';
import {verticalScale} from 'react-native-size-matters';
import {Spacer} from '../../../../components/Spacer';
import {colors} from '../../../../utils/Colors';

const ContactUsContainer = ({contactUsState,setContactUsState}) => {
  const ContactUsArray = [
    {
      id: 1,
      withLabel: 'Name',
      placeholder: 'Enter Your Name',
      value: contactUsState.name,
      onChangeText: txt => {
        setContactUsState({...contactUsState, name: txt});
      },
    },
    {
      id: 2,
      withLabel: 'Username',
      placeholder: 'Enter Your Username',
      value: contactUsState.username,
      onChangeText: txt => {
        setContactUsState({...contactUsState, username: txt});
      },
    },
    {
      id: 3,
      withLabel: 'Email',
      placeholder: 'Enter Your Email',
      value: contactUsState.email,
      onChangeText: txt => {
        setContactUsState({...contactUsState, email: txt});
      },
    },
    {
      id: 4,
      withLabel: 'Message',
      placeholder: 'Enter Your Message',
      height:verticalScale(80),
      multiline:true,
      numberOfLines:3,
      maxLength:100,
      inputContainerHeight:60,
      value: contactUsState.message,
      onChangeText: txt => {
        setContactUsState({...contactUsState, message: txt});
      },
    },
  ];

  return (
    <View>
      {ContactUsArray.map(item => {
        return (
          <>
            <CustomTextInput
              withLabel={item.withLabel}
              value={item.value}
              height={item.height}
              onChangeText={item.onChangeText}
              numberOfLines={item.numberOfLines}
              maxLength={item.maxLength}
              multiline={item.multiline}
              inputContainerHeight={item.inputContainerHeight}
              iconHeight={verticalScale(15)}
              inputStyle={{
                shadowColor:
                  Platform.OS == 'ios' ? colors.inputGray : colors.black,
                shadowRadius: 5,
                elevation: 5,
                shadowOpacity: 0.5,
                shadowOffset: {width: 1, height: 1},
              }}
              // rigthIcon={showPassword ? icons.eye : icons.hidden}
              placeholder={item.placeholder}
            />
            <Spacer height={20} />
          </>
        );
      })}
    </View>
  );
};

export default ContactUsContainer;

const styles = StyleSheet.create({});
