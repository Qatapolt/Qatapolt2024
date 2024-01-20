import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity } from 'react-native'
import React from 'react'
import commonStyles, { PH10 } from '../../../utils/CommonStyles'
import AppTopHeader from '../../../components/AppTopHeader'
import CustomHeader from '../../../components/CustomHeader'
import { colors } from '../../../utils/Colors'
import Ionicons from "react-native-vector-icons/Ionicons"
import CustomText from '../../../components/CustomText'
import { InterFont } from '../../../utils/Fonts'
import { moderateScale } from 'react-native-size-matters'
const DeepLinkPost = ({navigation}) => {
  return (
    <SafeAreaView style={commonStyles.main}>
        <PH10>
        <CustomHeader
          LeftSide={() => (
            <TouchableOpacity onPress={() => navigation.navigate("ArenaScreen")}>
              <Ionicons
                name="chevron-back"
                color={colors.black}
                size={moderateScale(30)}
              />
            </TouchableOpacity>
          )}
          Center={() => (
            <CustomText
              label={"Post"}
              fontSize={18}
              textAlign="center"
              fontFamily={InterFont.bold}
              color={colors.black}
              // fontFamily={InterFont.bold}
            />
          )}

          
         
          

      
        />
        {/* <AppTopHeader title={"Post"}/> */}


        </PH10>
    
  </SafeAreaView>
  )
}

export default DeepLinkPost

const styles = StyleSheet.create({})