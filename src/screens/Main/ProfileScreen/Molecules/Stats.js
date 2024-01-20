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
import {useSelector} from 'react-redux';

const Stats = ({route}) => {
  const authDate = useSelector(state => state.auth?.currentUser);

  const statsArray = [
    {id: 1, name: 'Sport', value: authDate?.selectSport},
    {id: 2, name: 'Account Type', value: authDate?.accountType},
    {id: 3, name: 'Country', value: authDate?.country},
    {id: 4, name: 'City', value: authDate?.city},
    {
      id: 8,
      name: 'Age',
      value: authDate?.age ? authDate?.age + ' ' + 'years' : '',
    },
    {id: 9, name: 'Height', value: authDate.height},
    {id: 10, name: 'Strong Hand', value: authDate?.strongHand},
    {id: 11, name: 'Strong Foot', value: authDate?.strongFoot},
    {id: 5, name: 'Skill #1', value: authDate?.skill1},
    {id: 6, name: 'Skill #2', value: authDate?.skill2},
    {id: 7, name: 'Skill #3', value: authDate?.skill3},
  ];

  return (
    <View style={commonStyles.main}>
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

export default Stats;

const styles = StyleSheet.create({
  alignContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtWidth: {
    width: scale(100),
  },
});
