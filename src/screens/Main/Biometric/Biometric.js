import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  Platform,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import ReactNativeBiometrics from 'react-native-biometrics';
import {colors} from '../../../utils/Colors';
import {setIsBioVerified} from '../../../redux/reducers/authReducer';
import CustomText from '../../../components/CustomText';
import {InterFont} from '../../../utils/Fonts';
import {icons} from '../../../assets/icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Spacer} from '../../../components/Spacer';
import CustomButton from '../../../components/CustomButton';
const {height, width} = Dimensions.get('screen');
export const Biometric = () => {
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  const dispatch = useDispatch();

  //   const user = useSelector(authSelector);

  const biometricLogin = async () => {
    try {
      const {biometryType, available} = await rnBiometrics.isSensorAvailable();

      if (!available) {
        dispatch(setIsBioVerified(false));
        return;
      }
      //   if (!user.isLoggedIn) {
      //     console.log(
      //       '🚀 ~ file: index.tsx:30 ~ biometricLogin ~ user.isLoggedIn:',
      //       user.isLoggedIn,
      //     );
      //     // dispatch(setIsBioVerified(true));
      //     return;
      //   }

      const resultObject = rnBiometrics.simplePrompt({
        promptMessage: 'Confirm fingerprint',
      });
      // .then(resultObject => {
      const {success} = await resultObject;

      if (success) {
        // console.log('successful biometrics provided');
        dispatch(setIsBioVerified(false));
      } else {
        console.log('user cancelled biometric prompt');
      }
      // })
      // .catch(() => {

      // });
    } catch (error) {
      // Alert.alert('Biometrics Failed');
      console.log('biometrics failed', error);
    }
  };

  useEffect(() => {
    biometricLogin();
  }, []);

  return (
    <SafeAreaView edges={['left', 'right']} style={{flex: 1}}>
      <Spacer height={Platform.OS == 'ios' ? 90 : 30} />

      <View
        style={{flex: 1, alignItems: 'center'}}
        onPress={biometricLogin}
        flex={1}>
        <Image
          style={{width: scale(50), height: scale(50), tintColor: colors.green}}
          source={icons.private}
        />
        <Spacer height={20} />

        <CustomText
          color={colors.black}
          fontSize={25}
          fontFamily={InterFont.bold}
          label="Qatapolt Locked"
        />
        <Spacer height={5} />

        <CustomText
          color={colors.black}
          fontSize={14}
          label={
            Platform.OS == 'ios'
              ? 'Unlock with ID to open qatapolt'
              : 'Unlock with Touch ID to open qatapolt'
          }
        />
      </View>
      <CustomButton
        onPress={biometricLogin}
        alignSelf={'center'}
        width={'90%'}
        height={40}
        color={colors.white}
        backgroundColor={colors.green}
        title={Platform.OS == 'ios' ? 'Use Face ID' : 'Use Touch ID'}
      />
      <Spacer height={40} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
