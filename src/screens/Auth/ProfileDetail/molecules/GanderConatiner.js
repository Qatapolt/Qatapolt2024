import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {verticalScale, moderateScale, scale} from 'react-native-size-matters';
import {Spacer} from '../../../../components/Spacer';
import * as Animatable from 'react-native-animatable';
import {InterFont} from '../../../../utils/Fonts';
import commonStyles from '../../../../utils/CommonStyles';

const GanderConatiner = ({setSignupValues, signupValues}) => {
  const [genderIndex, setGenderIndex] = useState(-1);
  return (
    <View
      style={{
        width: '100%',
        height: verticalScale(50),
        borderRadius: moderateScale(12),
        padding: scale(10),
        backgroundColor: colors.white,

        shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
        shadowRadius: 5,
        elevation: 5,
        shadowOpacity: 0.5,

        shadowOffset: {width: 1, height: 1},
      }}>
      <View style={commonStyles.rowContainer}>
        <CustomText
          label={'*'}
          color={colors.red}
          // marginBottosm={10}
          marginRight={3}
          // fontSize={10}
        />
        <CustomText
          label={'Gender'}
          color={colors.inputGray}
          fontFamily={InterFont.medium}
          fontSize={verticalScale(8)}
        />
      </View>

      {/* <Spacer height={5} /> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: scale(10),
        }}>
        {['Male', 'Female', 'Other'].map((item, index) => {
          return (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // marginRight: scale(60),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setSignupValues({...signupValues, gender: item});

                    setGenderIndex(index);
                  }}
                  activeOpacity={0.6}
                  style={styles.mainCheck}>
                  {signupValues.gender == item && (
                    <Animatable.View
                      animation="fadeIn"
                      // iterationCount={5}
                      style={styles.innerCheck}
                      direction="normal"></Animatable.View>
                  )}
                </TouchableOpacity>
                <CustomText
                  label={item}
                  marginLeft={7}
                  fontWeight={'500'}
                  color={colors.black}
                  fontSize={verticalScale(8)}
                />
              </View>
            </>
          );
        })}
      </View>
    </View>
  );
};

export default GanderConatiner;

const styles = StyleSheet.create({
  mainCheck: {
    width: 19,
    height: 19,
    borderRadius: 100,
    borderWidth: 1.2,
    borderColor: colors.inputGray,
    padding: 3,
  },
  innerCheck: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: colors.black,
  },
});
