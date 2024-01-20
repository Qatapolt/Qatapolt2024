import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {verticalScale} from 'react-native-size-matters';
import {colors} from '../../../../../utils/Colors';
import {InterFont} from '../../../../../utils/Fonts';

const InputesField = props => {
  return (
    <View
      style={{
        // flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
      }}>
      <View
        style={{
          width: '50%',
          top: 20,
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          left: 30,
        }}>
        <TextInput
          style={[
            {
              height: props.inputHeight,
              // paddingRight: props.paddingRight || 10,
              paddingHorizontal: props.paddingHorizontal,
              fontFamily: props.fontFamily || InterFont.semiBold,
              color: props.color || colors.white,
              fontSize: props.fontSize || verticalScale(12),
              multiline: props.multiline,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            },
          ]}
          onChangeText={props.onChangeText}
          value={props.value}
          numberOfLines={props.numberOfLines}
          keyboardType={props.keyboardType}
          autoCapitalize="none"
          maxLength={props.maxLength}
          multiline={props.multiline}
          placeholder={props.placeholder}
          placeholderTextColor={
            props.placeholderTextColor || colors.superDuperLightGray
          }
          secureTextEntry={props.secureTextEntry}
        />
      </View>
    </View>
  );
};

export default InputesField;

const styles = StyleSheet.create({});
