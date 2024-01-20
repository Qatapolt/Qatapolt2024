import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BottomSheet} from 'react-native-btr';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {Spacer} from '../../../../../components/Spacer';
import CustomText from '../../../../../components/CustomText';
import {colors} from '../../../../../utils/Colors';
import CustomButton from '../../../../../components/CustomButton';
import {icons} from '../../../../../assets/icons';

const LeaveChatSheet = props => {
  const dispatch = useDispatch();
  // props?.postData.userId == props?.authData.uid
  return (
    <BottomSheet
      visible={props.modalVisible}
      onBackButtonPress={props.onCloseModal}
      onBackdropPress={props.onCloseModal}>
      <View
        flexDirection={'column'}
        backgroundColor={'white'}
        alignSelf="center"
        paddingHorizontal={scale(15)}
        height={'20%'}
        width={'100%'}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden">
        <Spacer height={5} />

        <View style={styles.topLine}></View>
        <Spacer height={10} />
        <TouchableOpacity
            onPress={props. onDel}
          activeOpacity={0.6}
          style={styles.optionContainer}>
          <Ionicons
            size={moderateScale(20)}
            name="exit-outline"
            color={colors.black}
          />
          <CustomText label="Leave Group" marginLeft={7} fontSize={13} />
        </TouchableOpacity>
        <Spacer height={20} />

        <CustomButton
          backgroundColor={colors.white}
          title={'Cancel'}
          borderWidth={0.2}
          onPress={props.onCloseModal}
          height={40}
          borderRadius={20}
        />

        {/* <TouchableOpacity
          activeOpacity={0.6}
          onPress={()=>{
           props.onCloseModal()

      

          }}

           style={styles.optionContainer}>
          <AntDesign  name='edit' size={moderateScale(20)} color={colors.black} />
  
          <CustomText label="Quote"  marginLeft={7} fontSize={13}/>
  
        </TouchableOpacity> */}
      </View>
    </BottomSheet>
  );
};

export default LeaveChatSheet;

const styles = StyleSheet.create({
  topLine: {
    width: scale(80),
    height: 5,
    backgroundColor: '#dee2e6',
    alignSelf: 'center',
    borderRadius: 10,
  },
  optionContainer: {
    width: '100%',
    padding: scale(10),
    // borderBottomWidth:0.5,
    // borderColor:"#dee2e6",
    flexDirection: 'row',
    alignItems: 'center',
  },
});
