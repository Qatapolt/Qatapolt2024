import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../../../utils/Colors';
import CustomText from '../../../../../components/CustomText';
import {InterFont} from '../../../../../utils/Fonts';

const GroupDescription = ({defaultValue,setGroupDetails,groupDetails}) => {
  return (
    <>
      <View
        style={{
          width: '100%',
          minHeight: verticalScale(40),
          padding: scale(10),
          backgroundColor: colors.white,
          shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
          shadowRadius: 2,
          elevation: 5,
          shadowOpacity: 0.4,
          shadowOffset: {width: 1, height: 1},
          borderRadius: scale(5),
        }}>
        <TextInput
          // value={des?.groupDes}
          defaultValue={defaultValue}
          multiline={true}
          onChangeText={(txt)=>setGroupDetails({...groupDetails,groupDes:txt}) }

          style={{
            width: '100%',

            fontFamily: InterFont.regular,
            color: colors.black,
            fontSize: verticalScale(13),
            // inputMarginTop:-20,
          }}
        />
      </View>
    </>
  );
};

export default GroupDescription;

const styles = StyleSheet.create({});
