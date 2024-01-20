import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {Spacer} from '../../../../components/Spacer';

const LoginBottomContainer = props => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Signup')}
      style={{
        borderBottomWidth: 1.2,
        borderBottomColor: colors.white,
        width: '50%',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <CustomText
        label="Create a New Account"
        fontSize={12}
        alignSelf="flex-end"
        marginBottom={1}
        fontWeight="500"
        color={colors.white}
      />
    </TouchableOpacity>
  );
};

export default LoginBottomContainer;

const styles = StyleSheet.create({});
