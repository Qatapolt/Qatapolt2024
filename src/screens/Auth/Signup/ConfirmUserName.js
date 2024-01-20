import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import commonStyles, {PH10} from '../../../utils/CommonStyles';
import {images} from '../../../assets/images';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {Spacer} from '../../../components/Spacer';
import LoginBodyItem from '../Login/Molecules/LoginBodyItem';
import LoginBottomContainer from '../Login/Molecules/LoginBottomContainer';
import AuthOption from '../Login/Molecules/AuthOption';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextInput from '../../../components/CustomTextInput';
import GradientButton from '../../../components/GradientButton';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils/Colors';
import {InterFont} from '../../../utils/Fonts';
import {useSelector, dispatch, useDispatch} from 'react-redux';
import {getSpecificUser, SaveUser} from '../../services/UserServices';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ConfirmUserName = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const authData = useSelector(state => state.auth?.currentUser);

  useEffect(() => {
    setUsername(authData?.username);
  }, []);

  const OnNext = async () => {
    if (authData?.username == username.trim()) {
      navigation.navigate('ProfileDetail');
      return;
    }
    setIsLoading(true);

    await SaveUser(authData.uid, {username: username});

    const userData = await getSpecificUser(authData.uid);
    setIsLoading(false);

    dispatch(authData(userData));
    navigation.navigate('ProfileDetail');
  };

  return (
    <SafeAreaView edges={['right', 'left']} style={commonStyles.main}>
      <ImageBackground
        style={{width: '101%', height: '100%'}}
        source={images.background1}>
        <KeyboardAwareScrollView>
          <Spacer height={140} />
          {/* <Spacer height={Platform.OS == 'ios' ? 50 : 20} /> */}
          <View style={styles.imgContainer}>
            <Image
              resizeMode="center"
              style={commonStyles.img}
              source={images.appIcon}
            />
          </View>
          <Spacer height={20} />
          <CustomText
            label="Create Your Own Luck"
            fontSize={22}
            alignSelf="center"
            textAlign="center"
            color={colors.white}
            fontFamily={InterFont.bold}
          />
          <View style={{marginTop: verticalScale(40), alignItems: 'center'}}>
            <CustomTextInput
              withLabel="Username"
              inputMarginTop={Platform.OS == 'ios' ? 5 : -7}
              placeholder="i.e.@john23"
              value={username}
              onChangeText={txt => {
                setUsername(txt);
              }}
              width={'90%'}
            />
          </View>

          <Spacer height={20} />
          <View style={{paddingHorizontal: scale(15)}}>
            <Spacer height={30} />

            <GradientButton
              onPress={OnNext}
              loading={isLoading}
              height={45}
              fontSize={16}
              title="Next"
            />
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  imgContainer: {width: '50%', height: verticalScale(100), alignSelf: 'center'},
});

export default ConfirmUserName;
