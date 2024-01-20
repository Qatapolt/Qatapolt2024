import {StyleSheet, Text, View, TouchableOpacity, Platform,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles, {PH10, PH20} from '../../../../utils/CommonStyles';
import CustomButton from '../../../../components/CustomButton';
import {colors} from '../../../../utils/Colors';
import CustomText from '../../../../components/CustomText';
import CustomTextInput from '../../../../components/CustomTextInput';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Spacer} from '../../../../components/Spacer';
import CustomHeader from '../../../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {InterFont} from '../../../../utils/Fonts';
import CustomAlert from '../../../../components/CustomAlert';
import { reportUser, saveReportUser } from '../../../services/UserServices';
import { useSelector } from 'react-redux';
import SimpleLoader from '../../../../utils/SimpleLoader';
import loaderAnimation from '../../../../assets/Loaders';

const ReportReason = ({navigation,route}) => {
  const [reason, setReason] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const authState=useSelector(state=>state.auth?.currentUser)
  const reportData=useSelector(state=>state.report?.reportUser)
  const [loading, setLoading] = useState(false)

  const event=route.params?.event
  console.log("reportData",event)

  const [stateError, setStateError] = useState({
    errorHeader: '',
    errorBody: '',
  })



  const onSubmitReport= async()=>{
      if(reason.length==0){
        setStateError({
            ...stateError,
            errorHeader: 'Missing Report Reason',
            errorBody: 'Please Enter Report Reason To Proceed',
          });
          setModalVisible(true);

          return

      }
      setLoading(true)

      const data={

        reason:reason,
        category:reportData?.category,
        date:new Date,
        reportedUserId:reportData?.reportedUserId,
        reportedOn:authState?.uid,



      }

      const res=await saveReportUser(data)

      setTimeout(() => {

        setLoading(false)
        if(event){
            navigation.navigate(event,{event:reportData?.reportedUserId})

            return

            
        }
        navigation.navigate("Arena")
          
      }, 1000);

    console.log("SaveUSerRep",res)





  }
  return (
      <>
       <SafeAreaView style={commonStyles.main}>
         <TouchableWithoutFeedback
    onPress={Keyboard.dismiss}


   style={commonStyles.main}>
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
                label={"Report Reason"}
                fontSize={18}
                textAlign="center"
                fontFamily={InterFont.semiBold}
                color={colors.black}
                // fontFamily={InterFont.bold}
              />
            )}
          />
          <View style={{height: '10%'}} />

          <CustomTextInput
            withLabel={'Report Reason'}
            value={reason}
            //   keyboardType={item.keyboardType}
            onChangeText={txt => {
              setReason(txt);
            }}
            iconHeight={verticalScale(15)}
            inputStyle={{
              shadowColor:
                Platform.OS == 'ios' ? colors.inputGray : colors.black,
              shadowRadius: 5,
              elevation: 5,
              shadowOpacity: 0.5,
              shadowOffset: {width: 1, height: 1},
            }}
            placeholder={'Enter Report Reason'}
          />

          <View style={{height: '65%'}} />

          <CustomButton
            borderRadius={30}
            height={40}
            onPress={onSubmitReport}

            marginBottom={10}
            color={colors.white}
            backgroundColor={colors.green}
            title={'Submit'}
          />
        </PH10>
      </View>

      </TouchableWithoutFeedback>

      <CustomAlert
        stateError={stateError}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

    </SafeAreaView>


{
        loading&&(
          <SimpleLoader file={loaderAnimation}/>


        )
      }
      </>
   

    
  );
};

export default ReportReason;

const styles = StyleSheet.create({});
