import {Platform, Text, View, Pressable, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import moment from 'moment';
import AgeRangeBottomSheet from './AgeRangeBottomSheet';
import {icons} from '../../../../assets/icons';
import {Spacer} from '../../../../components/Spacer';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomPicker from '../../../../components/CustomPicker';
const AgeRange = props => {
  const [bottomSheet, setBottomSheet] = useState(false);
  const [date, setDate] = useState(new Date());
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();
  const [age, setAge] = useState(0);
  const closeModel = () => {
    setBottomSheet(!bottomSheet);
  };
  return (
    <View
      // onPress={() => setBottomSheet(true)}
      style={{
        width: props.width || '100%',
        height: props.height || verticalScale(60),
        borderRadius: props.borderRadius || moderateScale(12),
        backgroundColor: props.backgroundColor,
        padding: scale(10),
        marginTop: props.marginTop || verticalScale(0),
        borderColor: props.borderColor,
        paddingLeft: props.paddingLeft,
        backgroundColor: colors.white,
        shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
        shadowRadius: 5,
        elevation: 5,
        shadowOpacity: 0.5,
        shadowOffset: {width: 1, height: 1},
      }}>
      <View
        style={{
          // flexDirection: 'row',
          // alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
        //  onPress={() => setOpen(true)}
        >
          <CustomText
            label={'Age'}
            color={colors.inputGray}
            fontSize={verticalScale(8)}
          />
        </View>
      </View>

      {/* <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          // marginTop: scale(8),
        }}>
        {date ? (
          <Text style={{color: '#828282'}}>
            {moment(date).format('MM-DD-YYYY')}
          </Text>
        ) : (
          <Text style={{color: '#828282'}}>Select Date</Text>
        )}
      </View> */}
      {/* <Pressable
        onPress={() => closeModel()}
        style={{
          position: 'absolute',
          top: scale(20),
          left: scale(272),
          alignItems: 'center',
          justifyContent: 'center',
          height: scale(30),
          width: scale(30),
        }}>
        <Image
          style={{
            height: scale(11),
            width: scale(11),
          }}
          resizeMode="contain"
          source={icons.dropdown}
        />
      </Pressable> */}

      {/* <AgeRangeBottomSheet
        modalVisible={bottomSheet}
        onCloseModal={closeModel}
        date={date}
        setDate={setDate}
        signupValues={props.signupValues}
        setSignupValues={props.setSignupValues}
      /> */}
    </View>
  );
};

export default AgeRange;
