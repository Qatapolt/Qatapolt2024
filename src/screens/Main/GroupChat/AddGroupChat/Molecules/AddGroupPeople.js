import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../../../../utils/Colors';
import {icons} from '../../../../../assets/icons';
import commonStyles from '../../../../../utils/CommonStyles';
import CustomText from '../../../../../components/CustomText';
import {InterFont} from '../../../../../utils/Fonts';
import {images} from '../../../../../assets/images';
import CustomImage from '../../../../../components/CustomImage';
const AddGroupPeople = props => {
  const height = Dimensions.get('screen').height;
  return (
    <View>
      <View
        style={{
          width: props.white || scale(60),
          height: props.height || scale(60),
          borderRadius: 100,
          alignItems: 'center',
          marginRight:  scale(props.marginRight||30),
        }}>
          <CustomImage width={60} height={60} imageUrl={props.item.profileImage}/>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={props.onPress}
          style={{
            width: props.crossWidth || scale(25),
            height: props.crossHeight || scale(25),
            borderRadius: 30,
            backgroundColor: colors.white,
            position: 'absolute',
            alignSelf: 'center',
            //   marginTop: verticalScale(-5),
            right: -5,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
            shadowRadius: 2,
            elevation: 5,
            shadowOpacity: 0.4,
            // inputMarginTop:-20,
            shadowOffset: {width: -1, height: 3},
          }}>
          <Entypo
            name="cross"
            color={colors.black}
            size={moderateScale(props.iconSize || 22)}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: scale(props.textWidth || 60), alignItems: 'center'}}>
        <CustomText
          label={props?.item?.name}
          numberOfLines={2}
          marginTop={5}
          fontSize={props.fontSize || 11}
          textAlign="center"
          color={colors.black}
          fontFamily={InterFont.bold}
        />
      </View>
    </View>
  );
};

export default AddGroupPeople;

const styles = StyleSheet.create({});
