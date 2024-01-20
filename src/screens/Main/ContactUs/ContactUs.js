import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import commonStyles, {PH20} from '../../../utils/CommonStyles';
import ContactHeader from './Molecules/ContactHeader';
import {Spacer} from '../../../components/Spacer';
import {images} from '../../../assets/images';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import CustomTextInput from '../../../components/CustomTextInput';
import {colors} from '../../../utils/Colors';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import {InterFont} from '../../../utils/Fonts';
import Accountverified from './Molecules/Accountverified';
import ContactUsContainer from './Molecules/ContactUsContainer';
import CustomAlert from '../../../components/CustomAlert';
import {UseContact} from './Molecules/UseContact';
import {
  saveContactUs,
  saveTrophyRequest,
  saveVerifiedAccount,
} from '../../services/ContactServices';
import Toast from 'react-native-root-toast';
import {UseVerified} from './Molecules/UseVerified';
import {uploadImage} from '../../services/StorageServics';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ContactUs = ({navigation}) => {
  const [accountVerified, setAccountVerified] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const authData = useSelector(state => state.auth.currentUser);
  const [imageFile, setImageFile] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [contactUsState, setContactUsState] = useState({
    name: authData?.name,
    username: authData?.username,
    email: authData?.email,
    message: '',
    phoneNumber: '',
    supporting: authData?.selectSport,
    descripation: '',
  });

  const [accountVerifiedState, setAccountVerifiedState] = useState({
    name: authData?.name,
    username: authData?.username,
    email: authData?.email,
    message: '',
    phoneNumber: '',
    supporting: authData?.selectSport,
    descripation: '',
  });
  const [stateError, setStateError] = useState({
    errorHeader: '',
    errorBody: '',
  });

  const onHandelSubmit = async () => {
    if (accountVerified) {
      const ValidateResponse = UseVerified(
        setAccountVerifiedState,
        accountVerifiedState,
        setStateError,
        stateError,
        imageFile,
        setModalVisible,
      );
      if (ValidateResponse) {
        setIsLoading(true);
        const data = {
          name: accountVerifiedState?.name,
          username: accountVerifiedState.username,
          email: accountVerifiedState.email,
          phoneNumber: accountVerifiedState.phoneNumber,
          supporting: accountVerifiedState.supporting,
          identification: '',
          userId: authData?.uid,
          sport: authData?.sportEmoji + authData?.selectSport,
          description: accountVerifiedState?.descripation,
          profilePicture: authData?.profileImage ? authData?.profileImage : '',
        };
        try {
          if (imageFile) {
            const linkData = await uploadImage(imageFile.uri, authData.uid);
            data['identification'] = linkData;
          }

          await saveTrophyRequest(data);
          Toast.show('Your Account Verification Successfully Submit');
          setIsLoading(false);
          navigation.goBack();
        } catch (error) {
          console.log('SubmitError', error);
          setIsLoading(false);
        }
      }

      return;
    }

    const ValidateResponse = UseContact(
      setContactUsState,
      contactUsState,
      setStateError,
      stateError,
      setModalVisible,
    );

    if (ValidateResponse) {
      const data = {
        name: contactUsState?.name,
        username: contactUsState.username,
        email: contactUsState.email,
        message: contactUsState.message,
      };

      try {
        await saveContactUs(data);
        Toast.show('Your Contact Successfully Submit ');
        navigation.goBack();
      } catch (error) {
        console.log('SubmitError', error);
      }
    }
    setIsLoading(false);
  };

  const onUploadImage = async () => {
    try {
      let options = {
        width: 300,
        height: 400,
        mediaType: 'photo',
        quality: 1,
      };

      const res = await launchImageLibrary(options);

      if (res.assets) {
        console.log('ResPAth', res.uri);
        setImageFile(res.assets[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onPressVerified = () => {
    if (authData?.trophy === undefined || authData?.trophy === 'unverified') {
      setAccountVerified(!accountVerified);
    } else {
      Alert.alert(
        'Qatapolt Instruction',
        'Your account already has been verified',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
      );
    }
  };
  return (
    <>
      <View style={commonStyles.main}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Spacer height={Platform.OS == 'ios' ? 50 : 10} />
          <PH20>
            <ContactHeader navigation={navigation} />
            <Spacer height={30} />
            <View style={styles.imgContainer}>
              <Image
                resizeMode="center"
                style={commonStyles.img}
                source={images.blackAppIcon}
              />
            </View>
            <Spacer height={50} />
            <ContactUsContainer
              contactUsState={contactUsState}
              setContactUsState={setContactUsState}
            />

            <CustomText
              onPress={onPressVerified}
              label={'Apply To Verify Your Account!'}
              numberOfLines={1}
              marginTop={5}
              fontSize={11}
              textAlign="center"
              color={colors.green}
              fontFamily={InterFont.bold}
            />

            <Spacer height={20} />
            {accountVerified && (
              <>
                <Accountverified
                  setContactUsState={setAccountVerifiedState}
                  capturedImage={imageFile}
                  setCaptureImage={setImageFile}
                  uploadImage={onUploadImage}
                  contactUsState={accountVerifiedState}
                />
                <Spacer height={20} />
              </>
            )}

            <CustomButton
              color={colors.white}
              onPress={onHandelSubmit}
              loading={isLoading}
              backgroundColor={colors.green}
              title={'Submit'}
            />
            <Spacer height={40} />
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

export default ContactUs;

const styles = ScaledSheet.create({
  imgContainer: {width: '50%', height: verticalScale(100), alignSelf: 'center'},
});
