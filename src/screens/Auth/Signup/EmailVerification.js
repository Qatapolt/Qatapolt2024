import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../../utils/CommonStyles';
import {colors} from '../../../utils/Colors';
import CustomText from '../../../components/CustomText';
import {InterFont} from '../../../utils/Fonts';
import {moderateScale, scale} from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Spacer} from '../../../components/Spacer';
import GradientButton from '../../../components/GradientButton';
import {images} from '../../../assets/images';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-root-toast';
import {getSpecificUser, SaveUser} from '../../services/UserServices';
import {useDispatch} from 'react-redux';
import {authData, setIsFirstLogin} from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EmailVerification = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getUser = () => auth().currentUser;
  const reloadUser = () => getUser().reload();
  const OnVerified = async () => {
    setIsLoading(true);

    try {
      await reloadUser();
      const user = getUser();
      // console.log('UserVerUid', user?.uid);
      if (user?.emailVerified == true) {
      // await SaveUser()
      await SaveUser(user?.uid, {isVerified: true});
      const data = await getSpecificUser(user?.uid);
      dispatch(authData(data));
      dispatch(setIsFirstLogin(true));
      let value = true;
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem('contactUsTour', jsonValue);
      await AsyncStorage.setItem('searchTour', jsonValue);

      Toast.show('Email Verified');

      setIsLoading(false);
      navigation.navigate('MainStack');
      } else {
        setIsLoading(false);

        Toast.show('Email not Verified');
      }
    } catch (error) {}

    // auth().onAuthStateChanged(function(firebaseUser) {
    //     console.log('EmailVerifiedData',firebaseUser);

    // })
  };

  const OnResendEmail = () => {
    auth().currentUser.sendEmailVerification();
    Toast.show('Email Verification Send');
  };
  return (
    <SafeAreaView
      edges={['right', 'left']}
      style={{
        ...commonStyles.main,
        alignItems: 'center',
      }}>
      <Image
        resizeMode="stretch"
        style={{width: '101%', height: '100%', position: 'absolute'}}
        source={images.background}
      />
      <View style={{height: '35%'}} />
      <CustomText
        width="90%"
        alignSelf="center"
        textAlign="center"
        fontFamily={InterFont.bold}
        fontSize={20}
        color={colors.white}
        label="A verification email has been send to you"
      />
      <Spacer height={10} />
      <MaterialIcons
        name="mark-email-unread"
        size={moderateScale(30)}
        color={colors.white}
      />
      <Spacer height={10} />

      <CustomText
        width="90%"
        alignSelf="center"
        textAlign="center"
        fontSize={13}
        color={colors.white}
        label="Pleas follow the link in the email to verify your account. Make sure to your check spam/junk folder."
      />
      <Spacer height={30} />

      <GradientButton
        alignSelf="center"
        width="90%"
        onPress={OnVerified}
        loading={isLoading}
        height={45}
        fontSize={16}
        title="I've Verifled"
      />
      <Spacer height={30} />

      <CustomText
        width="90%"
        alignSelf="center"
        textAlign="center"
        fontFamily={InterFont.semiBold}
        fontSize={13}
        color={colors.white}
        label="Didn't get the email?"
      />
      <Spacer height={10} />

      <CustomText
        onPress={OnResendEmail}
        alignSelf="center"
        textAlign="center"
        fontFamily={InterFont.bold}
        fontSize={15}
        color={colors.primary}
        label="Resend Email"
      />
    </SafeAreaView>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({});
