import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {InterFont} from '../../../../utils/Fonts';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BottomSheet} from 'react-native-btr';
import {Spacer} from '../../../../components/Spacer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {setReportUserId} from '../../../../redux/reducers/ReportUserReducer';

const SetBackgroundSheet = props => {
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
        
        <CustomText label="Test Profile Background" marginLeft={7} fontSize={13} />


        <TouchableOpacity
          activeOpacity={0.6}
          onPress={props?.onCopyLink}
          style={styles.optionContainer}>
          <AntDesign
            name="copy1"
            size={moderateScale(20)}
            color={colors.black}
          />

          <CustomText label="Copy Link" marginLeft={7} fontSize={13} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            props.onCloseModal();

            dispatch(setReportUserId(props?.selectedId));
            props?.navigation.navigate('ReportPost');
          }}
          style={styles.optionContainer}>
          <MaterialIcons
            name="report"
            size={moderateScale(20)}
            color={colors.black}
          />

          <CustomText label="Report Post" marginLeft={7} fontSize={13} />
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default SetBackgroundSheet;

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
