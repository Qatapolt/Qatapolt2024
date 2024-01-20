import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../../../../utils/Colors';
import CustomText from '../../../../components/CustomText';
import {Montserrat} from '../../../../utils/Fonts';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Spacer} from '../../../../components/Spacer';
import {icons} from '../../../../assets/icons';

const AuthDate = [
  {id: 1, img: icons.google, text: 'Google'},
  {id: 2, img: icons.facebook, text: 'Facebook'},
];

const AuthOption = props => {
  return (
    <View>
      <View style={styles.OrContainer}>
        <View style={styles.lineSeprator}></View>
        <CustomText
          label="OR"
          color="#BDBDBD"
          // fontFamily={Montserrat.SemiBold}
          fontSize={15}
          marginLeft={10}
          marginRight={10}
        />
        <View style={styles.lineSeprator}></View>
      </View>
      <Spacer height={10} />
      {/* <View style={{alignSelf:"center",width:"100%"}}> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // alignSelf:"center",
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          onPress={props.onGoogle}
          activeOpacity={0.7}
          style={styles.authContainer}>
          <Image
            style={{width: scale(20), height: verticalScale(20)}}
            source={icons.googleLogo}
          />
          <Spacer width={5} />
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '600',
              marginTop: 3,
            }}>
            {'Google'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={props.onFacebook}
          activeOpacity={0.7}
          style={styles.authContainer}>
          <Image
            style={{width: scale(30), height: verticalScale(25),borderRadius:scale(5)}}
            source={icons.facebookLogo}
          />
          <Spacer width={5} />
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '600',
              marginTop: 3,
            }}>
            {'Facebook'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>

    // </View>
  );
};

export default AuthOption;

const styles = StyleSheet.create({
  OrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineSeprator: {
    width: '40%',
    backgroundColor: '#BDBDBD',
    height: 1,
  },
  authContainer: {
    width: 120,
    height: 40,
    // marginTop: 10,
    shadowColor: Platform.OS == 'ios' ? '#ced4da' : colors.black,
    shadowRadius: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    shadowOpacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowOffset: {width: 3, height: 5},
  },
});
