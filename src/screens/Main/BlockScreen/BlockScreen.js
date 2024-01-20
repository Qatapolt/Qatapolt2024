import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../../assets/images';
import { scale, verticalScale } from 'react-native-size-matters';
import CustomButton from '../../../components/CustomButton';
import { colors } from '../../../utils/Colors';
import { PH20 } from '../../../utils/CommonStyles';

const BlockScreen = ({navigation}) => {
  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right', 'top']}
      style={{alignItems: 'center', }}>
        <View style={{height: '20%'}} />
      <Image
        style={{width: scale(200), height: verticalScale(300)}}
        resizeMode="contain"
        source={images.blockUser}
      />
      <CustomButton title={"Go Back To Screen"}
      backgroundColor={colors.green}
      onPress={()=>navigation.goBack()}
      color={colors.white}
      width="90%"
      />

     
    </SafeAreaView>
  );
};

export default BlockScreen;

const styles = StyleSheet.create({});
