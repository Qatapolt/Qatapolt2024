import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
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
// import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
const ForgetBodyItem = props => {
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [remember, setRemember] = useState(false);
  const [stateError, setStateError] = useState({
    errorHeader: '',
    errorBody: '',
  });
  const [state, setState] = useState({
    email: '',
  });

  const OnResetPassword = async () => {
    const ValidateResponse = UseLogin(
      state,
      stateError,
      setStateError,
      setModalVisible,
    );

    if (ValidateResponse) {
      setLoading(true);

      try {
        await auth().sendPasswordResetEmail(state.email.trim());
        setLoading(false);
        Toast.show('Password reset email sent successfully');
        props.navigation.goBack();
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          setStateError({
            ...stateError,
            errorHeader: 'Error',
            errorBody: 'User not found. Please check your email and try again',
          });
        } else {
          setStateError({
            ...stateError,
            errorHeader: 'Error',
            errorBody: 'Failed to reset password. Please try again',
          });
        }
        setModalVisible(true);
        setLoading(false);
      }
    }
  };

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
            label="Reset Your Password"
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
        />
        <Spacer height={90} />

        <GradientButton
          onPress={OnResetPassword}
          loading={loading}
          // height={ verticalScale(45)}
          fontSize={16}
          title="Proceed"
        />
      </View>
      <Spacer height={10} />

      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          borderBottomWidth: 1.2,
          borderBottomColor: colors.white,
          textAlign: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          width: scale(60),
        }}>
        <CustomText
          onPress={() => {
            props.navigation.navigate('Login');
          }}
          label="Login"
          fontSize={14}
          alignSelf="flex-end"
          marginBottom={1}
          fontWeight="500"
          color={colors.white}
        />
      </TouchableOpacity>

      <CustomAlert
        stateError={stateError}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default ForgetBodyItem;

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
