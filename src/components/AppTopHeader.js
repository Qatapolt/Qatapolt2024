import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from './CustomHeader'
import CustomText from './CustomText';
import { InterFont } from '../utils/Fonts';
import { colors } from '../utils/Colors';
import { PH10 } from '../utils/CommonStyles';


const AppTopHeader = ({navigation,title,isSave,onSave,isEnable}) => {
  return (
   <>
   <PH10>
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
              label={title}
              fontSize={18}
              textAlign="center"
              fontFamily={InterFont.bold}
              color={colors.black}
              // fontFamily={InterFont.bold}
            />
          )}

          
         
          

          RightSide={isSave? () => (
              <TouchableOpacity
              onPress={onSave}
              activeOpacity={0.6}
              >
                   <CustomText
              label={"Save"}
              fontSize={14}
              textAlign="center"
              fontFamily={InterFont.bold}
              color={isEnable?colors.green: colors.inputGray}
              // fontFamily={InterFont.bold}
            />

              </TouchableOpacity>
           
          ):null}
        />

   </PH10>
   
   </>
  )
}

export default AppTopHeader

const styles = StyleSheet.create({})