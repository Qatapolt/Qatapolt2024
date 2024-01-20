import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';
import {colors} from '../../../../utils/Colors';
import {Spacer} from '../../../../components/Spacer';
import GradientButton from '../../../../components/GradientButton';

const BodyItem = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={{width: '100%', alignItems: 'center', alignSelf: 'center'}}>
        <CustomText
          label="Create Your Own Luck"
          fontSize={20}
          textAlign="center"
          color={colors.white}
          fontFamily={InterFont.bold}
        />
        <Spacer height={10} />
        <CustomText
          label="Your Hub For Sports"
          fontSize={12}
          textAlign="center"
          fontWeight="500"
          color={'#BDBDBD'}
        />
      </View>
    </View>
  );
};

export default BodyItem;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: scale(15),
  },
});
