import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {verticalScale, moderateScale, scale} from 'react-native-size-matters';
import {Spacer} from '../../../../components/Spacer';
import * as Animatable from 'react-native-animatable';
const GanderConatiner = ({isFreeAgent, setSignupValues, signupValues}) => {
  const [genderIndex, setGenderIndex] = useState(-1);
  const [checkBox, setCheckBox] = useState(false);

  const onPressFreeAgent = () => {
    try {
      if (signupValues?.freeAgent === false) {
        setSignupValues({
          ...signupValues,
          freeAgent: true,
        });
      } else {
        setSignupValues({
          ...signupValues,
          freeAgent: false,
        });
      }
    } catch (error) {
      console.log('error checkBox', error);
    }
  };
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
      <CustomText
        label={isFreeAgent ? 'FreeAgent' : 'Gender'}
        color={
          isFreeAgent && signupValues?.freeAgent
            ? colors.green
            : colors.inputGray
        }
        fontSize={verticalScale(7)}
      />
      <Spacer height={5} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {isFreeAgent ? (
          <TouchableOpacity
            onPress={() => onPressFreeAgent()}
            activeOpacity={0.6}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: scale(50),
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View
              style={{
                width: 19,
                height: 19,
                borderWidth: 0.5,
                padding: 5,
                borderColor:
                  signupValues?.freeAgent === true
                    ? colors.green
                    : colors.inputGray,
              }}>
              {signupValues?.freeAgent === true && (
                <Animatable.View
                  animation="fadeIn"
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: 2,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                  direction="normal">
                  <Image
                    source={require('../../../../assets/images/tick.png')}
                    style={{
                      position: 'absolute',
                      height: 20,
                      width: 20,
                    }}
                  />
                </Animatable.View>
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {['Male', 'Female', 'Other'].map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: scale(50),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setGenderIndex(index),
                        setSignupValues({
                          ...signupValues,
                          gender: item,
                        });
                    }}
                    activeOpacity={0.6}
                    style={{
                      width: 19,
                      height: 19,
                      borderRadius: 10,
                      borderWidth: 1.2,
                      borderColor: colors.inputGray,
                      padding: 3,
                    }}>
                    {genderIndex == index && (
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
              );
            })}
          </View>
        )}
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
