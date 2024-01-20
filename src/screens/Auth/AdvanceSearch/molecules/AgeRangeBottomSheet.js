import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {BottomSheet} from 'react-native-btr';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {Spacer} from '../../../../components/Spacer';
import DatePicker from 'react-native-date-picker';
import {colors} from '../../../../utils/Colors';
import moment from 'moment';
const AgeRangeBottomSheet = props => {
  const screenSize = Dimensions.get('window');
  const screenWidth = screenSize.width;
  const onSelectDate = () => {
    const birthDate = moment(props.date);
    const currentDate = moment();

    const years = currentDate.diff(birthDate, 'years');
    console.log(' years:', years);
    props.setSignupValues({
      ...props.signupValues,
      age: years,
    });
    props.onCloseModal();
  };
  return (
    <BottomSheet
      visible={props.modalVisible}
      onBackButtonPress={props.onCloseModal}
      onBackdropPress={props.onCloseModal}>
      <View
        flexDirection={'column'}
        backgroundColor={'white'}
        alignSelf="center"
        maxHeight={'60%'}
        paddingHorizontal={scale(15)}
        minHeight={'50%'}
        width={'97%'}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden">
        <Spacer height={5} />

        <View style={styles.topLine}></View>
        <Spacer height={10} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <DatePicker
            mode="date"
            maximumDate={new Date()}
            date={props.date}
            onDateChange={date => props.setDate(date)}
            style={{
              borderRadius: 8,
              width: screenWidth - 50,
              backgroundColor: 'white',
            }}
            textColor="black"
          />
        </View>
        <TouchableOpacity
          onPress={() => onSelectDate()}
          style={{
            height: scale(37),
            width: scale(100),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.green,
            borderColor: colors.yellow,
            borderWidth: 2,
            borderRadius: scale(20),
            position: 'absolute',
            top: scale(280),
            left: scale(120),
          }}>
          <Text
            style={{color: 'white', fontSize: scale(14), fontWeight: 'bold'}}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default AgeRangeBottomSheet;

const styles = ScaledSheet.create({
  topLine: {
    width: scale(80),
    height: 5,
    backgroundColor: '#dee2e6',
    alignSelf: 'center',
    borderRadius: 10,
  },
});
