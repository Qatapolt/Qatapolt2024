import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Platform
  } from "react-native";
  import React from "react";
  import {
    moderateScale,
    scale,
    ScaledSheet,
    verticalScale,
  } from "react-native-size-matters";
  import CustomText from "./CustomText";
  import {colors} from "../utils/Colors"
  import commonStyles from "../utils/CommonStyles";
  import { InterFont } from "../utils/Fonts";
  import { images } from "../assets/images";
  
  const CustomDescription = ({
    eyeClick,
    password,
    setEyeClick,
    error,
    withLabel,
    leftIcon,
    source,
    iconWidth,
    iconHeight,
    onRightPress,
    rigthIcon,
    ...props
  }) => {
    return (
      <TouchableOpacity
      onPress={props.onPress}
      disabled={!props.onPress}
      style={[
        {
          width: props.width || "100%",
          height: props.height || verticalScale(50),
          borderRadius: props.borderRadius || moderateScale(12),
          backgroundColor: props.backgroundColor,
          padding:scale(10),
          marginTop: props.marginTop || verticalScale(0),
          borderColor: props.borderColor ,
          paddingLeft: props.paddingLeft,
          backgroundColor:colors.white,
        },
        props.inputStyle
      ]}
      >
       
     
          <CustomText
            label={withLabel}
            color={colors.inputGray}          
            fontSize={verticalScale(7)}
          />
        <View style={{flexDirection:"row",alignItems:"center",width:"100%",marginTop:verticalScale(5),}}>
          <TextInput
          onPressIn={props.onInputPress}
          editable={props.editable}
            style={[
              {
                width: rigthIcon?"90%":"95%",
                height: props.inputHeight || "100%",
                paddingRight: props.paddingRight || 10,
                paddingHorizontal: props.paddingHorizontal,
                fontFamily: props.fontFamily || InterFont.regular,
                color: props.color || colors.black,
                fontSize: verticalScale(11),
                multiline: props.multiline
              },
            ]}
            onChangeText={props.onChangeText}
            value={props.value}
            numberOfLines={props.numberOfLines}
            keyboardType={props.keyboardType}
            autoCapitalize="none"
            multiline={props.multiline}
            placeholder={props.placeholder}
            placeholderTextColor={colors.inputGray}
            secureTextEntry={props.secureTextEntry}
          />
          {
            rigthIcon?(
              
              <TouchableOpacity 
              activeOpacity={0.6}
              onPress={onRightPress}
              style={{
  
                width:  iconWidth ||scale(20),
                height:  iconHeight||verticalScale(20),
                marginLeft:verticalScale(10),
  
              }} >
             <Image style={commonStyles.img}  resizeMode="contain" source={rigthIcon} />
  
  
              </TouchableOpacity>
  
            ):<></>
          }
                </View>
  
         
  
       
      </TouchableOpacity>
    );
  };
  export default CustomDescription;
  const styles = ScaledSheet.create({
    icon: {
      width: "20@s",
      height: "20@vs",
      marginLeft:verticalScale(10),
    },
  });
  