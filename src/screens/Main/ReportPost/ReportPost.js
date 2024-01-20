import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles, {PH10, PH20} from '../../../utils/CommonStyles';
import CustomText from '../../../components/CustomText';
import {Spacer} from '../../../components/Spacer';
import {InterFont} from '../../../utils/Fonts';
import {colors} from '../../../utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../../components/CustomHeader';
import {reportType} from '../../../utils/Data';
import ReportPostItem from './Molecules/ReportPostItem';
import CustomButton from '../../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setReportCategory, setReportUser } from '../../../redux/reducers/ReportUserReducer';

const ReportPost = ({navigation,route}) => {
  const [reportIndex, setReportIndex] = useState(-1);
  const [selectedReport, setSelectedReport] = useState("")

  const event=route.params?.event

  const dispatch=useDispatch()

  return (
    <SafeAreaView style={commonStyles.main}>
      <View style={{flex: 1}}>
        <PH10>
          <Spacer height={10} />
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
                label={ event?"Report User": 'Report Post'}
                fontSize={18}
                textAlign="center"
                fontFamily={InterFont.semiBold}
                color={colors.black}
                // fontFamily={InterFont.bold}
              />
            )}
          />
          <Spacer height={10} />
        </PH10>

        <View style={{height: 0.3, backgroundColor: colors.inputGray}} />
        <PH10>
          <CustomText
            marginTop={15}
            fontSize={13}
            fontFamily={InterFont.semiBold}
            label={"Tell us why don't want to see this"}
          />
          <CustomText
            marginTop={5}
            fontSize={10}
            color={colors.inputGray}
            label={'Your feedback will help us improve your experience'}
          />

          <Spacer height={20} />
          {reportType.map((item, index) => {
            return (
              <ReportPostItem
                reportIndex={reportIndex}
                setReportIndex={setReportIndex}
                setSelectedReport={setSelectedReport}
                item={item}
                index={index}
              />
            );
          })}
        </PH10>
      </View>
      <PH10>
        <CustomButton
          borderRadius={30}
          height={40}
          onPress={()=>{
            

            dispatch(setReportCategory(selectedReport))


            navigation.navigate("ReportReason",{event:event})

          }}
          marginBottom={10}
          color={colors.white}
          disabled={selectedReport?false:true}
          backgroundColor={ selectedReport? colors.green:colors.lightGray}
          title={'Submit'}
        />
      </PH10>
    </SafeAreaView>
  );
};

export default ReportPost;

const styles = StyleSheet.create({});
