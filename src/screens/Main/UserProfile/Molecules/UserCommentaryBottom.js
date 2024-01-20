import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator,
  } from 'react-native';
  import React from 'react';
  import {colors} from '../../../../utils/Colors';
  import commonStyles from '../../../../utils/CommonStyles';
  import CustomText from '../../../../components/CustomText';
  import {icons} from '../../../../assets/icons';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {Spacer} from '../../../../components/Spacer';
  import {moderateScale, scale} from 'react-native-size-matters';

  
  const UserCommentaryBottom = props => {
    // console.log("comments",props?.postData?.comments)
    return (
      <View style={{...commonStyles.rowJustify, paddingVertical: 10}}>
        <View style={commonStyles.rowMain}>
          <View>
            <Image
              resizeMode="contain"
              source={icons.medal}
              style={{
                width: scale(22),
                height: 22,
                tintColor:
                   props.allColor ? colors.white : null,
              }}
            />
          </View>
          <Spacer width={5} />
          <CustomText
            label={props?.postData?.medals}
            fontSize={12}
            color={props.allColor ? colors.white : colors.inputGray}
          />
        </View>
        <View
          style={commonStyles.rowMain}>
          <Image
            source={icons.comment}
            style={{
              ...styles.postFooterIcon,
              tintColor: props.allColor ? colors.white : null,
            }}
          />
  
          <CustomText
            label={
              !props.postData?.comments ? 0 : props.postData?.comments.length
            }
            fontSize={12}
            marginLeft={2}
            color={props.allColor ? colors.white : colors.inputGray}
          />
        </View>
        <View style={commonStyles.rowContainer}>
          <Image
            source={icons.sharepost}
            style={{
              width: scale(18),
              height: scale(18),
              tintColor: props.allColor ? colors.white : null,
            }}
          />
          <Spacer width={5} />
          <CustomText
            label={props.postData?.internalShare}
            fontSize={12}
            color={props.allColor ? colors.white : colors.inputGray}
          />
        </View>
  
        
  
        <View style={{flexDirection: 'row',}}>
          <View
           >
            <Image
              source={icons.view}
              style={{
                width: scale(15),
                height: 18,
  
                tintColor: props.allColor ? colors.white : null,
              }}
            />
          </View>
  
          <Spacer width={5} />
          <CustomText
            label={props?.postData?.views}
            fontSize={12}
            color={props.allColor ? colors.white : colors.inputGray}
          />
        </View>

        <View style={{flexDirection:"row"}}>
        <Image
          source={icons.share}
          style={{
            ...styles.postFooterIcon,
          }}
        />
        <Spacer width={5} />
        <CustomText
          label={props.postData?.internalShare}
          fontSize={12}
          marginTop={3}

        />
      </View>
  
        {/* <View style={commonStyles.rowMain}>
          <Image
            source={icons.share}
            style={{
              ...styles.postFooterIcon,
              tintColor: props.allColor ? colors.white : null,
            }}
          />
        </View> */}
      </View>
    );
  };
  
  export default UserCommentaryBottom;
  
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
  