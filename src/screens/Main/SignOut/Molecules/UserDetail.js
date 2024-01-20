import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../../utils/Colors';
import commonStyles from '../../../../utils/CommonStyles';
import {images} from '../../../../assets/images';
import CustomText from '../../../../components/CustomText';
import {Spacer} from '../../../../components/Spacer';
import {Montserrat} from '../../../../utils/Fonts';

const UserDetail = () => {
  return (
    <View
      style={{
        width: '95%',
        height: verticalScale(150),
        backgroundColor: colors.primary,
        borderRadius: moderateScale(20),
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(10),
      }}>
      <View style={{alignSelf: 'flex-end', width: 100, height: 60}}>
        <Image style={commonStyles.img} source={images.appIcon} />
        {/* <Text>cncn</Text> */}
      </View>
      <Spacer height={10} />
      <View style={{flexDirection:"row"}}>
      <View style={{width:8,height:6,backgroundColor:colors.white,marginRight:8}}></View>
      <View style={{width:8,height:6,backgroundColor:colors.white,marginRight:8}}></View>
      <View style={{width:8,height:6,backgroundColor:colors.white,marginRight:8}}></View>

      <Spacer width={15}/>

      <View style={{width:8,height:6,backgroundColor:colors.white,marginRight:8}}></View>
      <View style={{width:8,height:6,backgroundColor:colors.white,marginRight:8}}></View>
      <View style={{width:8,height:6,backgroundColor:colors.white,marginRight:8}}></View>
      <Spacer width={20}/>


      <View style={{width:8,height:6,backgroundColor:colors.white,marginRight:8}}></View>
      <View style={{width:8,height:6,backgroundColor:colors.white,marginRight:8}}></View>
      <View style={{width:8,height:6,backgroundColor:colors.white,marginRight:8}}></View>
      <Spacer width={20}/>


      <View style={{width:8,height:6,backgroundColor:colors.white,marginRight:7}}></View>
      <View style={{width:8,height:6,backgroundColor:colors.white,marginRight:7}}></View>
      <View style={{width:8,height:6,backgroundColor:colors.white,marginRight:7}}></View>


      </View>

      <Spacer height={20} />



      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{alignSelf: 'flex-end'}}>
          <CustomText
            label="User Name"
            alignSelf={'flex-end'}
            fontSize={15}
            fontFamily={Montserrat.SemiBold}
            color={colors.white}
          />
        </View>

        <View style={{alignItems: 'flex-end'}}>
          <CustomText
            label="Valid till"
            fontSize={15}
            fontFamily={Montserrat.SemiBold}
            color={colors.white}
          />
          <CustomText
            label="20/20"
            fontSize={15}
            fontFamily={Montserrat.SemiBold}
            color={colors.white}
          />
        </View>
      </View>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({});
