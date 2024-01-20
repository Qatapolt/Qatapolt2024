import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../../utils/Colors';
import {InterFont} from '../../../utils/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  ScaledSheet,
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SwitchToggle from 'react-native-switch-toggle';
import CustomText from '../../../components/CustomText';
import {Spacer} from '../../../components/Spacer';
import {useNavigation} from '@react-navigation/native';

const ChatSettings = () => {
  const [on, setOn] = useState(on);
  const navigation = useNavigation();
  return (
    <View>
      <Spacer height={Platform.OS == 'ios' ? 50 : 20} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="chevron-back"
          color={colors.black}
          size={moderateScale(30)}
          style={{marginLeft: 10}}
        />
      </TouchableOpacity>
      <Spacer height={20} />
      <View style={{padding: 15, paddingLeft: 20}}>
        <CustomText
          label={'Who can add me to Groups'}
          fontSize={13}
          textAlign="center"
          fontFamily={InterFont.semiBold}
          color={colors.green}
        />
        <Spacer height={5} />
        <TouchableOpacity style={styles.box}>
          <View style={styles.innerView}>
            {/* <MaterialIcons
              name="follow"
              size={moderateScale(27)}
              color={colors.green}
            /> */}
            <CustomText
              label={'Who Followed me'}
              fontSize={13}
              marginLeft={15}
              textAlign="center"
              fontFamily={InterFont.semiBold}
              color={colors.black}
            />
          </View>

          <SwitchToggle
            switchOn={on}
            onPress={() => setOn(!on)}
            circleColorOn="white"
            backgroundColorOn={colors.green}
            containerStyle={{
              width: scale(50),
              height: scale(28),
              borderRadius: 25,
              padding: 5,
            }}
            circleStyle={{
              width: 24,
              height: 24,
              borderRadius: 12,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatSettings;

const styles = ScaledSheet.create({
  box: {
    width: '100%',
    height: verticalScale(38),
    backgroundColor: '#F5F9F8',
    borderRadius: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    justifyContent: 'space-between',
    shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
    shadowRadius: 2,
    elevation: 5,
    shadowOpacity: 0.2,
    shadowOffset: {width: -1, height: 2},
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
