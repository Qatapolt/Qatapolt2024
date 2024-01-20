import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect} from 'react';
import commonStyles, {PH10} from '../../../utils/CommonStyles';
import {images} from '../../../assets/images';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Spacer} from '../../../components/Spacer';
import {colors} from '../../../utils/Colors';
import {styles} from './styles';
import LoginBodyItem from './Molecules/LoginBodyItem';
import LoginBottomContainer from './Molecules/LoginBottomContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '../../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({navigation}) => {
  return (
    <View style={commonStyles.main}>
      <ImageBackground
        style={{width: '101%', height: '100%'}}
        source={images.background1}>
        <KeyboardAwareScrollView>
          <Spacer height={Platform.OS == 'ios' ? 50 : 20} />
          <PH10>
            <CustomHeader
              LeftSide={() => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="chevron-back"
                    color={colors.white}
                    size={moderateScale(30)}
                  />
                </TouchableOpacity>
              )}
            />
          </PH10>
          <Spacer height={10} />
          <View style={styles.imgContainer}>
            <Image
              resizeMode="contain"
              style={commonStyles.img}
              source={images.appIcon}
            />
          </View>
          <LoginBodyItem navigation={navigation} />
          <View style={{paddingHorizontal: scale(15)}}>
            <LoginBottomContainer navigation={navigation} />
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
