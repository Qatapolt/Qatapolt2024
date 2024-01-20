import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import commonStyles, {PH20, PH10} from '../../../utils/CommonStyles';
import {images} from '../../../assets/images';
import {Spacer} from '../../../components/Spacer';
import SignupTop from './molecules/SignupTop';
import {scale, verticalScale} from 'react-native-size-matters';
import {styles} from './styles';
import SignupBottom from './molecules/SignupBottom';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils/Colors';
import CustomTextInput from '../../../components/CustomTextInput';
import {icons} from '../../../assets/icons';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import {InterFont} from '../../../utils/Fonts';
import {UseSignup} from './molecules/UseSignup';
import CustomAlert from '../../../components/CustomAlert';
import {Register} from '../../services/AuthServices';
import auth from '@react-native-firebase/auth';
import {checkUsername, SaveUser} from '../../services/UserServices';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-root-toast';
import {useDispatch} from 'react-redux';
import {authData} from '../../../redux/reducers/authReducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import messaging from '@react-native-firebase/messaging';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
const Signup = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPass, setShowConfirmPass] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const [stateError, setStateError] = useState({
    errorHeader: '',
    errorBody: '',
  });
  const [state, setState] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [signupValues, setSignupValues] = useState({
    accountType: '',
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

  const SignupData = [
    {
      id: 1,
      withLabel: 'Name',
      value: state.name,
      placeholder: 'i.e.john Doe',
      compulsory: true,
      onChangeText: txt => {
        setState({...state, name: txt});
      },
    },
    ,
    {
      id: 2,
      withLabel: 'Username',
      placeholder: 'i.e.@john23',
      compulsory: true,
      value: state.username,
      onChangeText: txt => {
        if (
          txt?.match(
            /^(?=.*[!@#$%^&*()\-=“‘?+{};:,<>£%©®™✓°¢$¥€~`|/•√π÷×¶∆"'])/,
          )
        ) {
          return;
        }

        setState({...state, username: txt});
      },
    },
    {
      id: 3,
      withLabel: 'Email',
      value: state.email,

      placeholder: 'i.e.johnoe@mail.com',
      compulsory: true,
      onChangeText: txt => {
        setState({...state, email: txt});
      },
    },
    {
      id: 4,
      withLabel: 'Password',
      value: state.password,

      placeholder: '********',
      secureTextEntry: showPassword,
      onPress: () => {
        setShowPassword(!showPassword);
      },
      onRightPress: () => {
        setShowPassword(!showPassword);
      },
      iconHeight: verticalScale(15),
      iconWidth: scale(15),
      rigthIcon: showPassword ? icons.hidden : icons.eye,
      compulsory: true,
      onChangeText: txt => {
        setState({...state, password: txt});
      },
    },
    {
      id: 5,
      withLabel: 'Confirm Password',
      value: state.confirmPassword,

      placeholder: '********',
      secureTextEntry: showConfirmPass,
      iconWidth: scale(15),
      onPress: () => {
        setShowConfirmPass(!showConfirmPass);
      },
      onRightPress: () => {
        setShowConfirmPass(!showConfirmPass);
      },
      iconHeight: verticalScale(15),
      rigthIcon: showConfirmPass ? icons.hidden : icons.eye,
      compulsory: true,
      onChangeText: txt => {
        setState({...state, confirmPassword: txt});
      },
    },
  ];
  const OnSignup = async () => {
    const ValidateResponse = UseSignup(
      setState,
      state,
      setStateError,
      stateError,
      setModalVisible,
    );

    if (ValidateResponse) {
      setLoading(true);

      const usernameExist = await checkUsername(`@${state.username}`);

      console.log('usernameExist', usernameExist);
      if (usernameExist) {
        setStateError({
          ...stateError,
          errorHeader: 'Username',
          errorBody:
            'Username is Already Exist Please Try Another Username To Proceed',
        });

        setModalVisible(true);
        setLoading(false)

        return;
      }

      try {
        const data = await Register(state.email, state.password);
        if (data.user.uid) {
          setLoading(false);
          const fcmToken = await messaging().getToken();

          const userData = {
            name: state.name,
            username: `@${state.username}`,
            email: state.email,
            isLogin: true,
            uid: data.user.uid,
            userIFollow: false,
            firstLogin: 0,
            freeAgent: false,
            privateProfile: false,
            isBioMetric: false,
            profileBackground: '',
            isNotification: false,
            fcmToken: fcmToken,
            isProfileComplete: false,
            isVerified: false,
          };
          Toast.show('Account is created successfully');
          await SaveUser(data.user.uid, userData);
          dispatch(authData(userData));
          navigation.navigate('ProfileDetail');
        }
      } catch (error) {
        console.log('error', error);
        setStateError({
          ...stateError,
          errorHeader: 'Error',
          errorBody: 'This email address is already in use. Please log in.',
        });
        Toast.show('Account is created successfully');

        setModalVisible(true);
        setLoading(false);
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const {idToken, user} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Checking Existing Methods
      let signInMethods = await auth().fetchSignInMethodsForEmail(user.email);
      // Sign-in the user with the credential
      if (signInMethods.length > 0) {
        alert('User Already Exist');
      } else {
        // Sign-in the user with the credential
        auth()
          .signInWithCredential(googleCredential)
          .then(userInfo => {
            // console.log('UserInfo --->', userInfo.user);

            onGoogleNavigate(userInfo.user);

            // AsyncStorage.setItem('userAuth', userInfo.user.uid);
            // navigation.navigate('EditProfile');
          })
          .catch(e => alert('Error: ', e));
      }

      // setUserInfo(userInfo);
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Signup ');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available');
      } else {
        alert(error.message);
      }
    }
  };
  const handleFacebookSignup = async () => {
    // console.log('Hit the facebook button');
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile']);
    // console.log(' handleFacebookSignup ~ result:', result);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();
    // console.log(' handleFacebookSignup ~ data:', data);

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };

  const onGoogleNavigate = async user => {
    const fcmToken = await messaging().getToken();
    const userData = {
      name: user.displayName,
      username: user?.email.split('@')[0],
      email: state.email,
      isLogin: true,
      uid: data.user.uid,
      userIFollow: false,
      firstLogin: 0,
      freeAgent: false,
      privateProfile: false,
      isBioMetric: false,
      profileBackground: '',
      isNotification: false,
      fcmToken: fcmToken,
      isProfileComplete: false,
      isVerified: false,
    };
    Toast.show('Account is created successfully');
    await SaveUser(user.uid, userData);

    dispatch(authData(userData));
    // 1;

    navigation.navigate('ConfirmUsername');
  };

  return (
    <>
      <View style={commonStyles.main}>
        <Image
          resizeMode="stretch"
          style={{width: '101%', height: '100%', position: 'absolute'}}
          source={images.background}
        />
        <KeyboardAwareScrollView>
          <Spacer height={Platform.OS === 'ios' ? 40 : 10} />
          <SignupTop navigation={navigation} />
          <PH20>
            <Spacer height={10} />
            <View style={styles.bodyView}>
              <Spacer height={10} />
              <CustomText
                label="Create Your Account"
                fontSize={12}
                textAlign="center"
                fontFamily={InterFont.bold}
                color={colors.white}
              />
              <Spacer height={20} />
              {SignupData.map(item => {
                return (
                  <>
                    <View
                      style={{
                        paddingHorizontal: Platform.OS == 'ios' ? 0 : 5,
                      }}>
                      <CustomTextInput
                        inputStyle={styles.inShadow}
                        inputMarginTop={Platform.OS == 'ios' ? 5 : -7}
                        withLabel={item.withLabel}
                        value={item.value}
                        onChangeText={item.onChangeText}
                        compulsory={item.compulsory}
                        editable={item.editable}
                        iconWidth={item.iconWidth}
                        iconHeight={item.iconHeight}
                        rigthIcon={item.rigthIcon}
                        onRightPress={item.onRightPress}
                        secureTextEntry={item.secureTextEntry}
                        placeholder={item.placeholder}
                      />
                    </View>
                    <Spacer height={15} />
                  </>
                );
              })}
              <Spacer height={5} />
              {/* <SignupBody/> */}
              <SignupBottom
                onPressGoogle={() => {
                  handleGoogleSignup();
                }}
                onPressFacebook={() => handleFacebookSignup()}
                onPress={OnSignup}
                loading={loading}
                navigation={navigation}
                accountType={signupValues.accountType}
              />
            </View>
          </PH20>
        </KeyboardAwareScrollView>
      </View>
      <CustomAlert
        stateError={stateError}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default Signup;
