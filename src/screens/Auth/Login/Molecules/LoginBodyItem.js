import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';
import {colors} from '../../../../utils/Colors';
import {Spacer} from '../../../../components/Spacer';
import GradientButton from '../../../../components/GradientButton';
import CustomTextInput from '../../../../components/CustomTextInput';
import {icons} from '../../../../assets/icons';
import commonStyles from '../../../../utils/CommonStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomAlert from '../../../../components/CustomAlert';
import {UseLogin} from './UseLogin';
import {Login} from '../../../services/AuthServices';
import {getSpecificUser, SaveUser} from '../../../services/UserServices';
import {useDispatch} from 'react-redux';
import {authData} from '../../../../redux/reducers/authReducer';
import Toast from 'react-native-root-toast';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AuthOption from './AuthOption';
import messaging from '@react-native-firebase/messaging';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
const LoginBodyItem = props => {
  const [showPassword, setShowPassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const getUser = () => auth().currentUser;
  const reloadUser = () => getUser().reload();

  const [stateError, setStateError] = useState({
    errorHeader: '',
    errorBody: '',
  });
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '146031539666-af919tcf2hnurrc67mhnesdji5kovtjo.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId:
        '146031539666-05tq8ke86giocolt93souvh8n2paujfe.apps.googleusercontent.com',
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }, []);

  const OnLogin = async () => {
    const ValidateResponse = UseLogin(
      state,
      stateError,
      setStateError,
      setModalVisible,
    );
    const fcmToken = await messaging().getToken();
    if (ValidateResponse) {
      setLoading(true);

      try {
        const data = await Login(state.email.trim(), state.password.trim());
        if (data.user.uid) {
          const userData = await getSpecificUser(data.user.uid);
          if (userData?.status == 'blocked') {
            setLoading(false);

            Toast.show('Account is Blocked Please Contact with Admin');
          } else {
            await SaveUser(data.user.uid, {
              firstLogin: 1,
              fcmToken: fcmToken,
              isLogin: true,
            });

            setLoading(false);
            Toast.show('Login successfully');

            dispatch(authData(userData));
            props.navigation.reset({
              index: 0,
              routes: [{name: 'MainStack'}],
            });
          }
        }

        // console.log('DataResponse', data);
      } catch (error) {
        if (
          error.code == 'auth/wrong-password' ||
          error.code == 'auth/user-not-found'
        ) {
          setStateError({
            ...stateError,
            errorHeader: 'Error',
            errorBody: 'Invalid Email and Password ',
          });
          setModalVisible(true);
          setLoading(false);
        }
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const {idToken, user} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Checking Existing Methods
      let signInMethods = await auth().fetchSignInMethodsForEmail(user.email);
      // console.log('signInMethods', signInMethods);

      if (signInMethods.length > 0) {
        // Sign-in the user with the credential
        auth()
          .signInWithCredential(googleCredential)
          .then(async userInfo => {
            await SaveUser(userInfo.user.uid, {firstLogin: 1});

            const userData = await getSpecificUser(userInfo.user.uid);
            setLoading(false);
            Toast.show('Login successfully');

            dispatch(authData(userData));
            props.navigation.reset({
              index: 0,
              routes: [{name: 'MainStack'}],
            });

            // console.log('UserInfo --->', userInfo.user);
            // if (!userInfo.additionalUserInfo.isNewUser) {
            // AsyncStorage.setItem('userAuth', userInfo.user.uid);
            // // save user data
            // await saveUser(userInfo.user.uid, {fcmToken: newFcmToken});
            // navigation.reset({
            //   index: 0,
            //   routes: [{name: 'MainStack'}],
            // });
            // }
          })
          .catch(e => alert('Error: ', e));
      } else {
        alert('No Such User Exist');
      }
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available ');
      } else {
        alert(error.message);
      }
    }
  };
  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining the access token');
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      await auth().signInWithCredential(facebookCredential);
      console.log('Logged in with Facebook');
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };
  // googleSigin configration

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={{width: '90%', alignItems: 'center', alignSelf: 'center'}}>
          <CustomText
            label="Create Your Own Luck"
            fontSize={22}
            textAlign="center"
            color={colors.white}
            fontFamily={InterFont.bold}
          />
          <Spacer height={5} />
          <CustomText
            label="Login to your sports hub"
            fontSize={12}
            textAlign="center"
            fontWeight="500"
            color={'#BDBDBD'}
          />
        </View>
        <Spacer height={40} />
        <CustomTextInput
          withLabel={'Email'}
          placeholder="johndoe@mail.com"
          value={state.email}
          onChangeText={txt => {
            setState({...state, email: txt});
          }}
          multiline={false}
          numberOfLines={1}
        />
        <Spacer height={10} />

        <CustomTextInput
          withLabel={'Password'}
          iconWidth={scale(15)}
          value={state.password}
          onChangeText={txt => {
            setState({...state, password: txt});
          }}
          secureTextEntry={showPassword}
          onRightPress={() => {
            setShowPassword(!showPassword);
          }}
          iconHeight={verticalScale(15)}
          rigthIcon={showPassword ? icons.hidden : icons.eye}
          placeholder="Enter your password"
        />
        <Spacer height={7} />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: scale(5),
            marginTop: verticalScale(5),
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              borderBottomWidth: 1.2,
              borderBottomColor: colors.inputGray,
              alignSelf: 'flex-end',
            }}>
            <CustomText
              onPress={() => {
                props.navigation.navigate('ForgetPassword');
              }}
              label="Forgot Password?"
              fontSize={12}
              alignSelf="flex-end"
              marginBottom={1}
              fontWeight="500"
              color={'#BDBDBD'}
            />
          </TouchableOpacity>
        </View>
        <Spacer height={20} />

        <GradientButton
          onPress={OnLogin}
          loading={loading}
          fontSize={16}
          title="Login"
        />
        <Spacer height={20} />
        <AuthOption
          onGoogle={handleGoogleLogin}
          onFacebook={handleFacebookLogin}
        />

        <Spacer height={20} />
      </View>
      <CustomAlert
        stateError={stateError}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default LoginBodyItem;

const styles = ScaledSheet.create({
  mainContainer: {
    paddingHorizontal: scale(15),
  },
  checkCon: {
    width: scale(18),
    height: scale(18),
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 5,
    shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowOpacity: 0.4,
    // inputMarginTop:-20,
    shadowOffset: {width: -1, height: 3},
  },
});
