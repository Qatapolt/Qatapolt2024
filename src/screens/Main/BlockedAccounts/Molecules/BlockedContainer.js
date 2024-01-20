import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import CustomText from '../../../../components/CustomText'
import { colors } from '../../../../utils/Colors'
import { Avatar } from 'react-native-elements'
import { InterFont } from '../../../../utils/Fonts'
import { Spacer } from '../../../../components/Spacer'
import CustomButton from '../../../../components/CustomButton'
import { getSpecificUser } from '../../../services/UserServices'
import CustomImage from '../../../../components/CustomImage'

const BlockedContainer = (props) => {

  const [userDate, setUserDate] = useState({})

  useEffect(() => {

    getUser()
  
  }, [props])

  const getUser=async()=>{

  const user=  await getSpecificUser(props?.id)

  setUserDate(user)


  }
  
  return (
      <>
        <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      paddingBottom: 10,
      borderBottomColor: colors.lightGray,
      
    }}>
    <View style={{flexDirection: 'row', alignItems: 'center',width:"70%"}}>

    <CustomImage
          onImagePress={() => {
     
            props.navigation.navigate('UserProfile', {
              event: userDate.uid,
            });
          }}
          width={50}
          height={50}
          imageUrl={userDate?.profileImage}
        />
      <CustomText
        label={userDate.name}
        fontSize={12}
        width={"75%"}
        numberOfLines={1}
        marginLeft={10}
        fontFamily={InterFont.bold}
      />
    </View>
    <CustomButton 
    height={27}
    borderRadius={7}
    onPress={props.unblock}
    backgroundColor={colors.green}
    color={colors.white}
    fontSize={12}
    title={"Unblock"} width={"22%"}/>
  </View>
  <Spacer height={15}/>
      </>
  
  )
}

export default BlockedContainer

const styles = StyleSheet.create({})