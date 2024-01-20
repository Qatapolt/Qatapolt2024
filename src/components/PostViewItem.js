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
  
  const PostViewItem = props => {
    // console.log('comments', props?.postData?.comments);
    return (
      <View style={{...commonStyles.rowJustify, paddingVertical: 10,borderBottomWidth:0.5,borderColor:colors.borderColor}}>
        <View style={commonStyles.rowMain}>
          <View>
            <Image
              resizeMode="contain"
              source={icons.likemadel}
              style={{
                width: scale(20),
                height: 18,
              }}
            />
          </View>
          {/* <Spacer width={3} /> */}
          <CustomText
            label={props?.postData?.medals}
            fontSize={9}
            marginTop={5}
            color={props?.activeColor?colors.black: colors.white}
          />
        </View>
        <View style={commonStyles.rowMain}>
          {/* <Image
            source={icons.comment}
            style={{
              ...styles.postFooterIcon,
              tintColor: props?.activeColor?colors.black: colors.white,
            }}
          />
   */}
          <CustomText
            label={
              !props.postData?.comments ? 0 : props.postData?.comments.length
            }
            fontSize={9}
            marginLeft={2}
            marginTop={3}
  
            color={props?.activeColor?colors.black: colors.white}
          />
          <CustomText
            label={
             "Comments"
            }
            fontSize={9}
            marginLeft={2}
            marginTop={3}
  
            color={props?.activeColor?colors.black: colors.white}
          />
        </View>
        <View style={commonStyles.rowMain}>
          {/* <Image
            source={icons.sharepost}
            style={{
              width: scale(18),
              height: scale(18),
              tintColor:props?.activeColor?colors.black: colors.white,
            }}
          /> */}
          <Spacer width={3} />
          <CustomText
            label={props.postData?.rePost}
            fontSize={9}
            color={props?.activeColor?colors.black: colors.white}
            marginTop={3}
  
          />

<CustomText
            label={
             "Reposts"
            }
            fontSize={9}
            marginLeft={2}
            marginTop={3}
  
            color={props?.activeColor?colors.black: colors.white}
          />
        </View>
  
        <View style={commonStyles.rowMain}>
          {/* <View>
            <Image
              source={icons.view}
              style={{
                width: scale(15),
                height: 18,
  
                tintColor: props?.activeColor?colors.black: colors.white,
              }}
            />
          </View> */}
  
          <Spacer width={5} />
          <CustomText
            label={props?.postData?.views}
            fontSize={9}
            marginTop={3}
            color={props?.activeColor?colors.black: colors.white}
          />

<CustomText
            label={
             "Views"
            }
            fontSize={9}
            marginLeft={2}
            marginTop={3}
  
            color={props?.activeColor?colors.black: colors.white}
          />
        </View>
  
        <View style={commonStyles.rowMain}>
          {/* <Image
            source={icons.share}
            style={{
              ...styles.postFooterIcon,
              tintColor:  props?.activeColor?colors.black: colors.white,
            }}
          /> */}
          <Spacer width={5} />
          <CustomText
            label={props.postData?.internalShare}
            fontSize={9}
            marginTop={3}
  
            color={props?.activeColor?colors.black: colors.white}
          />

<CustomText
            label={
             "Sends"
            }
            fontSize={9}
            marginLeft={2}
            marginTop={3}
  
            color={props?.activeColor?colors.black: colors.white}
          />
        </View>
      </View>
    );
  };
  
  export default PostViewItem;
  
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
  