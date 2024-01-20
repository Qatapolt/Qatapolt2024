import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles from '../../../utils/CommonStyles';
import {images} from '../../../assets/images';
import {scale, verticalScale} from 'react-native-size-matters';
import {Spacer} from '../../../components/Spacer';
import {styles} from './styles';
import BodyItem from './molecules/BodyItem';
import GradientButton from '../../../components/GradientButton';
import CustomButton from '../../../components/CustomButton';
import {colors} from '../../../utils/Colors';

const LoginSignup = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const handleRegister = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={commonStyles.main}>
      <ImageBackground style={commonStyles.img} source={images.background1}>
        <Spacer height={Platform.OS == 'ios' ? 90 : 70} />

        <Spacer height={30} />
        <View style={styles.imgContainer}>
          <Image
            resizeMode="contain"
            style={commonStyles.img}
            source={images.appIcon}
          />
        </View>

        <View style={{height: '12%'}} />
        <BodyItem />
        <Spacer height={20} />
        <View style={{paddingHorizontal: scale(10)}}>
          <GradientButton
            // height={ver}
            onPress={handleRegister}
            title="Register"
          />
          <Spacer height={20} />

          <CustomButton
            onPress={handleLogin}
            title="Login"
            backgroundColor={colors.white}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginSignup;
