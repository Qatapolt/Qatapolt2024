import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {colors} from '../utils/Colors';
import {InterFont} from '../utils/Fonts';

const CustomTab = ({index, setTab, item, tab,lineColor,txtUnActiveColor,txtActiveColor,onClickTab}) => {
  return (
    <View
      key={index}
      style={{
        alignItems: 'center',
        marginRight: scale(20),
        // height: vertiscalScale(40),
        justifyContent:"center"
        // marginTop: verticalScale(10),
      }}>
          <View style={{height:verticalScale(20)}}>

      <CustomText
        onPress={() => {
          setTab(index);
        }}
        label={item.day}
        fontFamily={InterFont.semiBold}
        fontSize={12}
        color={ tab==index?  colors.black:  colors.inputGray}
      />
      </View>

      {tab == index && <View style={{...styles.emptyView,
          backgroundColor:  colors.black,

    }} />}


    </View>
  );
};

export default CustomTab;

const styles = ScaledSheet.create({
  emptyView: {
    width: '80@s',
    // marginTop: 4,
    height: '2.5@vs',
    borderRadius: '100@msr',
    // position: 'absolute',
    // bottom: '-2@vs',
  },
});
