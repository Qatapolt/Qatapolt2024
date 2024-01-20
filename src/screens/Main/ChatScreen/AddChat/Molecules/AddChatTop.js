import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../../../../utils/Colors';
import {InterFont} from '../../../../../utils/Fonts';
import {Spacer} from '../../../../../components/Spacer';
import CustomText from '../../../../../components/CustomText';
import CustomHeader from '../../../../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import CustomSearch from '../../../../../components/CustomSearch';

const AddChatTop = props => {
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
            label="New Message"
            fontSize={13}
            textAlign="center"
            color={colors.black}
            fontFamily={InterFont.bold}
          />
        )}
        RightSide={() => (
          <TouchableOpacity onPress={props.onSendChat}>
            <CustomText
              label="Next"
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

export default AddChatTop;

const styles = StyleSheet.create({});
