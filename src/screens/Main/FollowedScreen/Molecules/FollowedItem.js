import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import commonStyles from '../../../../utils/CommonStyles'
import CustomButton from '../../../../components/CustomButton'
import { colors } from '../../../../utils/Colors'
import CustomImage from '../../../../components/CustomImage'
import { Spacer } from '../../../../components/Spacer'
import CustomTextInput from '../../../../components/CustomTextInput'
import CustomText from '../../../../components/CustomText'
import { getSpecificUser } from '../../../services/UserServices'

const FollowedItem = ({item,authId,authStateFollowing,onFollower,onNavigate}) => {
    const [userData, setUserData] = useState({})

//     useEffect(() => {

//         getUserData()
     
//     }, [])
// console.log("UserData",item?.uid)

// const getUserData= async()=>{
//     const data=await getSpecificUser(item)
//     setUserData(data)
// }
    
  return (
    <TouchableOpacity
     style={{width: '100%'}} activeOpacity={0.6}>
      <View style={commonStyles.rowJustify}>
        <TouchableOpacity 
        onPress={onNavigate}
        style={commonStyles.rowContainer}>
          <View>
              <CustomImage
              width={50}
              height={50}
               imageUrl={item?.profileImage}/>
          
          </View>
          <Spacer width={15} />
          <View style={{display: 'flex', justifyContent: 'center'}}>
            <View>
              <CustomText label={item?.name} fontSize={13} />
              <Spacer height={2} />
              <CustomText label={item?.username?`@${item?.username}`:""} />
            </View>
          </View>
        </TouchableOpacity>

        {authId==item?.uid?(
             <></>

        ):(
            <CustomButton
            height={27}
            borderRadius={8}
            onPress={onFollower}
            // onPress={onFollower}
            backgroundColor={authStateFollowing?.includes(item.uid)?colors.lightGray:colors.green}
            color={colors.white}
            fontSize={13}
            title={ authStateFollowing?.includes(item.uid)?"Following": 'Follow'}
            width={'27%'}
          />
        )
        }
        {/* <CustomButton
          height={27}
          borderRadius={8}
          backgroundColor={colors.green}
          color={colors.white}
          fontSize={13}
          title={
             'Following'
          }
          width={'27%'}
        /> */}
      </View>
  
      <Spacer height={15} />
    </TouchableOpacity>
  )
}

export default FollowedItem

const styles = StyleSheet.create({})