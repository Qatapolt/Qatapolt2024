import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../assets/icons'
import { colors } from '../utils/Colors'
import { scale } from 'react-native-size-matters'

const CustomOpenDrawer = ({navigation}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{
        width: scale(35),
        height:scale(35),
        backgroundColor: colors.superLightGray,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginRight: 10,
      }}>
      <Image source={icons.drawer} style={{height: scale(24), width: scale(24)}} />
    </TouchableOpacity>
  </View>
  )
}

export default CustomOpenDrawer

const styles = StyleSheet.create({})