import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import commonStyles from '../../../../utils/CommonStyles'
import { scale, verticalScale } from 'react-native-size-matters'
import { colors } from '../../../../utils/Colors'
import CustomText from '../../../../components/CustomText'

const ReportPostItem = ({item,index,reportIndex,setReportIndex,setSelectedReport}) => {
  return (
    <TouchableOpacity 
    activeOpacity={0.6}
    onPress={()=>{
      setReportIndex(index)
      setSelectedReport(item.value)

    }}
    style={{...commonStyles.rowContainer,marginVertical:verticalScale(8)}}>
        <View style={{...styles.reportCircle,
        backgroundColor:reportIndex==index?colors.green:colors.white,
        borderWidth:reportIndex==index?0:1,

        }}/>
        <CustomText label={item.value}  fontSize={12} marginLeft={5}/>
    </TouchableOpacity>
  )
}

export default ReportPostItem

const styles = StyleSheet.create({
    reportCircle:{
        width:scale(18),
        height:scale(18),
        borderRadius:scale(100),



    }

})