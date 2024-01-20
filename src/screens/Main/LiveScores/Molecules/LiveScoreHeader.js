import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../../utils/Colors';
import {Spacer} from '../../../../components/Spacer';
import CustomText from '../../../../components/CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../../../../components/CustomHeader';
import {InterFont} from '../../../../utils/Fonts';
import {icons} from '../../../../assets/icons';
import {ScaledSheet, scale, verticalScale} from 'react-native-size-matters';
import CustomOpenDrawer from '../../../../components/CustomOpenDrawer';
import commonStyles, {PH10, PH20} from '../../../../utils/CommonStyles';

const LiveScoreHeader = ({
  navigation,
  onDateClick,
  setSelectedDate,
  loading,
  selectedDate,
  tab,
  setTab,
  goBack,
  goBackToHome,
}) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const [matchDay, setMatchDay] = useState(() =>
    generateDatesArray(14, onDateClick),
  );

  function generateDatesArray(numberOfDays) {
    const currentDate = new Date();
    const datesArray = [];
    for (let i = 0; i < numberOfDays; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0];
      datesArray.push({
        id: i + 1,
        day: formattedDate,
      });
    }
    return datesArray.map((dateItem, index) => ({
      ...dateItem,
    }));
  }

  function handleDateClick(date, index) {
    const updatedMatchDay = generateDatesArray(14, handleDateClick);
    setMatchDay(updatedMatchDay);
    setTab(index);
    onDateClick(date);
    setSelectedDate(date);
  }
  return (
    <View
      style={{
        height:
          Platform.OS == 'android' ? verticalScale(70) : verticalScale(85),
        backgroundColor: colors.green,
      }}>
      <Spacer height={Platform.OS == 'ios' ? 50 : 20} />
      <View style={{marginHorizontal: 10}}>
        <CustomHeader
          LeftSide={() => <CustomOpenDrawer navigation={navigation} />}
          Center={() => (
            <TouchableOpacity
              onPress={goBackToHome}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <Spacer width={10} />
              <CustomText
                label="Football"
                color={colors.white}
                fontFamily={InterFont.semiBold}
                fontSize={18}
              />
              <Spacer width={10} />
              <Image
                source={icons.football2}
                style={{
                  height: scale(20),
                  width: scale(20),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          )}
          RightSide={() => (
            <CustomText
              label={'Go Back'}
              // label={selectedDate === currentDate ? 'Live' : ''}
              color={colors.white}
              fontSize={11}
              fontFamily={InterFont.bold}
              onPress={goBack}
            />
          )}
        />
      </View>

      {/* <Spacer height={10} /> */}

      {/* <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{height: verticalScale(50)}}>
        <View style={commonStyles.rowContainer}>
          {matchDay.map((item, index) => {
            index = item.id;

            return (
              <View
                pointerEvents={loading === true ? 'none' : 'auto'}
                key={index}
                style={{
                  alignItems: 'center',
                  marginRight: scale(20),
                  height: verticalScale(50),
                  marginTop: verticalScale(20),
                  marginHorizontal: verticalScale(8),
                }}>
                <CustomText
                  onPress={() => {
                    handleDateClick(item.day, index);
                  }}
                  label={item.day}
                  fontFamily={InterFont.semiBold}
                  fontSize={12}
                  color={tab === index ? colors.white : colors.white}
                />
                {tab === index && <View style={styles.emptyView} />}
              </View>
            );
          })}
        </View>
      </ScrollView> */}
    </View>
  );
};
const styles = ScaledSheet.create({
  mainContainer: {
    // width:"100%",
    height: verticalScale(40),
    marginHorizontal: scale(20),
    backgroundColor: '#ECF2F6',
    borderWidth: 0.5,
    borderColor: '#ced4da',
    flexDirection: 'row',
    borderRadius: scale(20),
    justifyContent: 'space-between',
    // borderWidth: 1,
    alignItems: 'center',
    shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
    shadowRadius: 5,
    elevation: 3,
    shadowOpacity: 0.2,
    // inputMarginTop:-20,
    shadowOffset: {width: 1, height: 1},
    // borderTopColor: colors.textStyle,
  },
  emptyView: {
    width: '80@s',
    marginTop: 4,
    height: '2.5@vs',
    borderRadius: '100@msr',
    backgroundColor: colors.white,
    // position: 'absolute',
    // bottom: '-2@vs',
  },
});
export default LiveScoreHeader;
