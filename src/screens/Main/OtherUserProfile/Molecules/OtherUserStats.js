import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import commonStyles, {PH20} from '../../../../utils/CommonStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';
import {Spacer} from '../../../../components/Spacer';
import moment from 'moment';

const OtherUserStats = ({route}) => {
  

  
  const statsArray = [
    {id: 1, name: 'Sport', value: route?.params?.selectSport},
    {id: 2, name: 'Account Type', value: route?.params?.accountType},
    {id: 3, name: 'Country', value:route?.params?.country},
    {id: 4, name: 'City', value:route?.params?.city},
    {id: 8, name: 'Age', value: route?.params?.age?route?.params?.age + " "+"years":""},
    {id: 9, name: 'Height', value: route?.params?.height},
    {id: 10, name: 'Strong Hand', value: route?.params?.strongHand},
    {id: 11, name: 'Strong Foot', value: route?.params?.strongFoot},
    {id: 5, name: 'Skill #1', value: route?.params?.skill1},
    {id: 6, name: 'Skill #2', value: route?.params?.skill2},
    {id: 7, name: 'Skill #3', value: route?.params?.skill3},
    
  ];
  
  return (
    <View style={commonStyles.main}>
      <Spacer height={20} />
      <PH20>
      <ScrollView contentContainerStyle={{height:"100%",paddingBottom:verticalScale(50)}}>
        <Spacer height={20} />

          {statsArray.map(item => {
            if (item.value == '') {
              return;
            }
            return (
              <>
                <View
                  style={{
                    ...commonStyles.rowContainer,
                    marginVertical: verticalScale(5),
                  }}>
                  <View style={styles.txtWidth}>
                    <CustomText
                      label={`${item.name}:`}
                      fontSize={11}
                      marginLeft={5}
                      textAlign="center"
                      color={colors.inputGray}
                      fontFamily={InterFont.semiBold}
                    />
                  </View>

                  <CustomText
                    label={item.value}
                    fontSize={11}
                    alignSelf="center"
                    marginLeft={5}
                    textAlign="center"
                    color={colors.black}
                    fontFamily={InterFont.semiBold}
                  />
                  <Spacer height={10} />
                </View>
              </>
            );
          })}
        </ScrollView>
      
      </PH20>
    </View>
  );
};

export default OtherUserStats;

const styles = StyleSheet.create({
  alignContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtWidth: {
    width: scale(100),
  },
});
