import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import CustomText from '../../../../../components/CustomText'
import { InterFont } from '../../../../../utils/Fonts'
import { scale, verticalScale } from 'react-native-size-matters'
import commonStyles from '../../../../../utils/CommonStyles'
import { colors } from '../../../../../utils/Colors'

const GroupInfoHeader = ({groupDetails,defaultValue,setGroupDetails,groupDateLength}) => {
  return (
    <View style={{alignItems:"center",marginVertical:verticalScale(15),width:"80%",alignItems:"center",alignSelf:"center"}}>


<TextInput
          defaultValue={defaultValue}
          multiline={true}
          onChangeText={(txt)=>setGroupDetails({...groupDetails,groupName:txt}) }
          maxLength={60}
          style={{
textAlign:"center",
            fontFamily: InterFont.bold,
            color: colors.black,
            minHeight:verticalScale(25),
            fontSize: verticalScale(17),
          }}
        />

        {/* <CustomText 
        numberOfLines={1}
    fontFamily={InterFont.bold}
    fontSize={17}
        label={info?.groupName}/> */}
        <View style={commonStyles.rowContainer}>
        <CustomText 
        numberOfLines={1}
    fontSize={12}
    color={colors.inputGray}
        label={"Group"}/>
         <CustomText 
    fontSize={12}
    marginBottom={5}
    marginLeft={scale(5)}
    marginRight={scale(2)}
    color={colors.inputGray}

        label={"."}/>

<CustomText 
        numberOfLines={1}
        color={colors.inputGray}

    fontSize={12}
        label={`${groupDateLength} participants`}/>

        </View>

    </View>
  )
}

export default GroupInfoHeader

const styles = StyleSheet.create({})