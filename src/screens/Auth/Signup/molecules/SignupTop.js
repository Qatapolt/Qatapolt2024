import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {InterFont} from '../../../../utils/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, scale} from 'react-native-size-matters';
import {Spacer} from '../../../../components/Spacer';

const SignupTop = props => {
  return (
    <View style={{padding: scale(10)}}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Ionicons
          name="md-chevron-back"
          size={moderateScale(30)}
          color={colors.white}
        />
      </TouchableOpacity>
      <Spacer height={10} />
      <View style={{width: '100%', alignSelf: 'center', alignItems: 'center'}}>
        <CustomText
          label="Register"
          fontSize={20}
          textAlign="center"
          color={colors.white}
          fontFamily={InterFont.bold}
        />
      </View>
    </View>
  );
};

export default SignupTop;

const styles = StyleSheet.create({});
