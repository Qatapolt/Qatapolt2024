import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../../../../components/CustomText'
import { colors } from '../../../../utils/Colors'
import { Spacer } from '../../../../components/Spacer'

const LoginBottomContainer = (props) => {
  return (
    <View style={{alignSelf:"center"}}>
           <CustomText
          label="Don’t have an account?"
          fontSize={12}
          alignSelf="flex-end"
          marginBottom={1}
          fontWeight="500"
          color={colors.white}
        />
        <Spacer height={10}/>
         <TouchableOpacity
        activeOpacity={0.6}
        style={{
          borderBottomWidth: 1.2,
          borderBottomColor: colors.primary,
          width: '36%',
          alignSelf:"center",
        }}>
        <CustomText
        onPress={() => props.navigation.navigate('Signup')}
        label="Create New"
          fontSize={12}
          marginBottom={2}
          fontWeight="500"
          color={colors.primary}
        />
      </TouchableOpacity>


      
    </View>
  )
}

export default LoginBottomContainer

const styles = StyleSheet.create({})