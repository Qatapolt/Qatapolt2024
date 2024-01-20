import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale, scale} from 'react-native-size-matters';
import commonStyles from '../utils/CommonStyles';
import {Spacer} from './Spacer';
import CustomText from './CustomText';
import {colors} from '../utils/Colors';
import {icons} from '../assets/icons';

const PostBottomItem = props => {
  return (
    <View style={{...commonStyles.rowJustify, paddingVertical: 10}}>
      <View style={commonStyles.rowMain}>
        <View>
          <Image
            resizeMode="contain"
            source={icons.unFilledMedal}
            style={{
              width: scale(22),
              height: scale(18),

              // tintColor: props?.activeColor ? colors.black : colors.white,
            }}
          />
        </View>
        {/* <Spacer width={5} /> */}
        <CustomText
          label={props?.postData?.medals}
          fontSize={12}
          marginTop={5}
          color={props?.activeColor ? colors.black : colors.white}
        />
      </View>
      <View style={[commonStyles.rowMain]}>
        <Image
          source={icons.comment}
          style={{
            ...styles.postFooterIcon,
            tintColor: props?.activeColor ? colors.black : colors.white,
          }}
        />

        <CustomText
          label={
            !props.postData?.comments ? 0 : props.postData?.comments.length
          }
          fontSize={12}
          marginLeft={2}
          marginTop={3}
          color={props?.activeColor ? colors.black : colors.white}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={icons.sharepost}
          style={{
            width: scale(18),
            height: scale(18),
            tintColor: props?.activeColor ? colors.black : colors.white,
          }}
        />
        <Spacer width={5} />
        <CustomText
          label={props.postData?.rePostCount}
          fontSize={12}
          color={props?.activeColor ? colors.black : colors.white}
          marginTop={3}
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <View>
          <Image
            source={icons.view}
            style={{
              width: scale(15),
              height: 18,

              tintColor: props?.activeColor ? colors.black : colors.white,
            }}
          />
        </View>

        <Spacer width={5} />
        <CustomText
          label={props?.postData?.views}
          fontSize={12}
          marginTop={3}
          color={props?.activeColor ? colors.black : colors.white}
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <Image
          source={icons.share}
          style={{
            ...styles.postFooterIcon,
            tintColor: props?.activeColor ? colors.black : colors.white,
          }}
        />
        <Spacer width={5} />
        <CustomText
          label={props.postData?.internalShare}
          fontSize={12}
          marginTop={3}
          color={props?.activeColor ? colors.black : colors.white}
        />
      </View>
    </View>
  );
};

export default PostBottomItem;

const styles = StyleSheet.create({
  postFooterIcon: {
    width: scale(18),
    height: 22,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
