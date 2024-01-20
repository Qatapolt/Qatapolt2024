import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
// import { Ionicons } from "@expo/vector-icons";
import {
  ScaledSheet,
  verticalScale,
  scale,
  moderateScale,
} from 'react-native-size-matters';

// import { ActivityIndicator } from "react-native-paper";
import {colors} from '../utils/Colors';
import {InterFont, Montserrat} from '../utils/Fonts';
function CustomButton({
  loading,
  title,
  onPress,
  icon,
  color,
  width,
  height,
  borderColor,
  borderRadius,
  marginTop,
  alignItems,
  justifyContent,
  borderWidth,
  backgroundColor,
  fontFamily,
  marginBottom,
  fontSize,
  marginHorizontal,
  fontWeight,
  alignSelf,
  disabled,
  btnStyle,
}) {
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      activeOpacity={0.6}
      style={[
        {
          backgroundColor: backgroundColor || colors.primary,
          width: width || '100%',
          height: verticalScale(height || 45),
          borderRadius: borderRadius || scale(10),
          alignItems: alignItems || 'center',
          alignSelf: alignSelf,
          borderWidth: borderWidth,

          justifyContent: justifyContent || 'center',
          marginTop,
          marginBottom: marginBottom,
          marginHorizontal: marginHorizontal,
          zIndex: 999999,
        },
        btnStyle,
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={colors.white} size={moderateScale(26)} />
      ) : (
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              {
                color: color || colors.black,
                fontSize: verticalScale(fontSize || 14),
                fontWeight: fontWeight || '600',
                fontFamily: fontFamily || InterFont.regular,
              },
            ]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  filledButton: {
    backgroundColor: colors.primary,
  },
});

export default CustomButton;
