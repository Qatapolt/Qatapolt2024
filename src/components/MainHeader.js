import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {PH20} from '../utils/CommonStyles';
import CustomHeader from './CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import {InterFont} from '../utils/Fonts';
import CustomText from './CustomText';
import { useNavigation } from '@react-navigation/native';

const MainHeader = props => {
  const navigation=useNavigation()
  return (
    <PH20>
      <CustomHeader
        LeftSide={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              color={colors.black}
              size={moderateScale(30)}
            />
          </TouchableOpacity>
        )}
        Center={() => (
          <CustomText
            label={props.txt}
            fontSize={17}
            width={"60%"}
            numberOfLines={1}
            alignSelf={"center"}
            textAlign="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
            // fontFamily={InterFont.bold}
          />
        )}
      />
    </PH20>
  );
};

export default MainHeader;

const styles = StyleSheet.create({});
