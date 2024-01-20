import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../../utils/Colors';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';

const LiveScoreDays = ({item, tab, setTab, index}) => {
  return (
    <View
      key={index}
      style={{
        alignItems: 'center',
        marginRight: scale(20),
        height: verticalScale(50),
        marginTop: verticalScale(20),
      }}>
      <CustomText
        onPress={() => {
          setTab(index);
        }}
        label={item.day}
        fontFamily={InterFont.semiBold}
        fontSize={12}
        color={tab == index ? colors.white : colors.white}
      />
      {tab == index && <View style={styles.emptyView} />}
    </View>
  );
};

export default LiveScoreDays;

const styles = ScaledSheet.create({
  mainContainer: {
    // width:"100%",
    height: verticalScale(40),
    marginHorizontal: scale(20),
    backgroundColor: '#ECF2F6',
    borderWidth: 0.5,
    borderColor: '#ced4da',
    flexDirection: 'row',
    borderRadius: scale(20),
    justifyContent: 'space-between',
    // borderWidth: 1,
    alignItems: 'center',
    shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
    shadowRadius: 5,
    elevation: 3,
    shadowOpacity: 0.2,
    // inputMarginTop:-20,
    shadowOffset: {width: 1, height: 1},
    // borderTopColor: colors.textStyle,
  },
  emptyView: {
    width: '80@s',
    marginTop: 4,
    height: '2.5@vs',
    borderRadius: '100@msr',
    backgroundColor: colors.white,
    // position: 'absolute',
    // bottom: '-2@vs',
  },
});
