import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import CustomHeader from '../../../../components/CustomHeader';
import {colors} from '../../../../utils/Colors';
import CustomText from '../../../../components/CustomText';
import {Spacer} from '../../../../components/Spacer';
import {InterFont} from '../../../../utils/Fonts';
import CustomSearch from '../../../../components/CustomSearch';

const AdvanceTop = props => {
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
            label="Users"
            fontSize={13}
            textAlign="center"
            color={colors.black}
            fontFamily={InterFont.bold}
          />
        )}
      />
      <Spacer height={20} />

      <CustomSearch onSearchFilter={props.onSearch} search={props.search} />
    </View>
  );
};

export default AdvanceTop;

const styles = StyleSheet.create({});
