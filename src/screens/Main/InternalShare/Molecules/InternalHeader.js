import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import {Spacer} from '../../../../components/Spacer';
import CustomHeader from '../../../../components/CustomHeader';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {InterFont} from '../../../../utils/Fonts';
import CustomSearch from '../../../../components/CustomSearch';

const InternalHeader = props => {
  return (
    <View>
      <Spacer height={10} />
      <CustomHeader
        LeftSide={() => (
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              color={colors.black}
              size={moderateScale(25)}
            />
          </TouchableOpacity>
        )}
        Center={() => (
          <CustomText
            label="Send Chat"
            fontSize={13}
            textAlign="center"
            color={colors.black}
            fontFamily={InterFont.bold}
          />
        )}
        RightSide={() => (
          <TouchableOpacity onPress={props.onSendChat}>
            <CustomText
              label="Send"
              fontSize={13}
              textAlign="center"
              color={colors.black}
              fontFamily={InterFont.bold}
            />
          </TouchableOpacity>
        )}
      />
      <Spacer height={20} />

      <CustomSearch onSearchFilter={props.onSearch} search={props.search} />
    </View>
  );
};

export default InternalHeader;

const styles = StyleSheet.create({});
