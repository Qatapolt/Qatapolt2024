import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import commonStyles from '../../../utils/CommonStyles';
import {Spacer} from '../../../components/Spacer';
import {PH20} from '../../../utils/CommonStyles';
import CustomButton from '../../../components/CustomButton';
import {verticalScale} from 'react-native-size-matters';
import UserDetail from './Molecules/UserDetail';
import { showMessage, hideMessage } from "react-native-flash-message";


const SignOutScreen = () => {
  return (
    <View style={commonStyles.IosPadding}>
      <PH20>
        <Spacer height={20} />
        <CustomButton
          title="Sign out"
          onPress={()=>{

            showMessage({
              message: "Simple message",
              type: "info",
              position:"top"
            });
            

          }}
          fontSize={18}
          height={verticalScale(47)}
          width={'65%'}
        />

        <Spacer height={100} />

        {/* <UserDetail /> */}
      </PH20>
    </View>
  );
};

export default SignOutScreen;

const styles = StyleSheet.create({});
