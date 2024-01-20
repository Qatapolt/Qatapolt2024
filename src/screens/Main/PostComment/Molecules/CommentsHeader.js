import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import CustomHeader from '../../../../components/CustomHeader';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';
import {colors} from '../../../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {PH20} from '../../../../utils/CommonStyles';

const CommentsHeader = props => {
  return (
    <View
      style={{
        width: '100%',
        height: verticalScale(40),
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: colors.superLightGray,
        shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
        shadowRadius: 2,
        elevation: 5,
        shadowOpacity: 0.2,
        shadowOffset: {width: -1, height: 1},
      }}>
      <PH20>
        <CustomHeader
          Center={() => (
            <CustomText
              label={'Comments'}
              fontSize={18}
              textAlign="center"
              fontFamily={InterFont.semiBold}
              color={colors.black}
              // fontFamily={InterFont.bold}
            />
          )}
        />
      </PH20>
    </View>
  );
};

export default CommentsHeader;

const styles = StyleSheet.create({});
