import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../../../../components/CustomText'
import { InterFont } from '../../../../utils/Fonts'
import { colors } from '../../../../utils/Colors'
import { moderateScale } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../../../components/CustomHeader'


const ContactHeader = ({navigation}) => {
  return (
   <>
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
              label={'Contact us'}
              fontSize={18}
              textAlign="center"
              fontFamily={InterFont.bold}
              color={colors.black}
              // fontFamily={InterFont.bold}
            />
          )}
        />
   </>
  )
}

export default ContactHeader

const styles = StyleSheet.create({})