import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Avatar, Divider, Image, ListItem} from 'react-native-elements';
import { verticalScale } from 'react-native-size-matters';
import { InterFont } from '../../../../utils/Fonts';
import { colors } from '../../../../utils/Colors';
import CustomImage from '../../../../components/CustomImage';
import { Spacer } from '../../../../components/Spacer';
import commonStyles from '../../../../utils/CommonStyles';
import { icons } from '../../../../assets/icons';


const PostHeader = ({currentUser}) => {
  return (
        <ListItem>
          <CustomImage
            width={50}
            height={50}
            imageUrl={currentUser?.profileImage}
          />
    
          <ListItem.Content>
            <ListItem.Title style={{fontWeight: 'bold'}}>
              {currentUser?.name}
            </ListItem.Title>
            <Spacer height={3} />


            <View style={{...commonStyles.rowContainer,width:"80%"}}>
            <ListItem.Subtitle
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: colors.primary,
                fontFamily: 
                InterFont.regular,
                fontSize: verticalScale(10),
              }}>
              {`${currentUser.username}`}
            </ListItem.Subtitle>
            <Spacer width={2}/>
            {currentUser?.trophy == 'verified' && (
                <Image
                  resizeMode="contain"
                  style={{width: 15, height: 15}}
                  source={icons.trophyIcon}
                />
              )}

            </View>
          </ListItem.Content>
        </ListItem>
      
  )
}

export default PostHeader

const styles = StyleSheet.create({})