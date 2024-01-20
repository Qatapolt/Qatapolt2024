import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Badge, Image, ListItem} from 'react-native-elements';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import CustomImage from '../../../../components/CustomImage';
import {Spacer} from '../../../../components/Spacer';
import {scale, verticalScale} from 'react-native-size-matters';
import {InterFont} from '../../../../utils/Fonts';

const GroupChatContainer = props => {
  // console.log('DataDetailProps', props?.item);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        height: verticalScale(70),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: colors.inputGray,
        borderTopWidth: props?.index == 0 ? 0.5 : 0,
        marginHorizontal: scale(10),
      }}
      onPress={() =>
        props.navigation.navigate('groupChatDetail', {groupData: props.item})
      }>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '70%'}}>
        <CustomImage width={45} height={45} imageUrl={props.item?.groupImage} />
        <View style={{marginHorizontal: scale(5)}}>
          <CustomText
            label={props.item?.groupName}
            fontSize={13}
            numberOfLines={1}
            fontFamily={InterFont.bold}
            color={colors.black}
          />
          <Spacer height={5} />
          <CustomText
            numberOfLines={3}
            label={
              props.item?.lastMessage?.text
                ? props.item?.lastMessage?.text
                : props.item?.createdMessage
            }
            color={colors.inputGray}
          />
        </View>
      </View>

      <View>
        <CustomText
          label={props?.date == 'Today' ? props?.ChatTime : props.date}
          fontSize={9}
          color={colors.inputGray}
        />
      </View>

      {/* <ListItem 
    >
        <CustomImage  width={50} height={50}  imageUrl={props.item?.groupImage}/>

      <ListItem.Content
      style={{paddingTop:verticalScale(5)}}
      >
        <ListItem.Title
        numberOfLines={1}
         style={{fontWeight: 'bold',width:"90%"}}>{ props.item?.groupName}</ListItem.Title>
        <Spacer height={4} />
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
        <CustomText
        numberOfLines={3}
         label={  props.item?.lastMessage?.text?props.item?.lastMessage?.text:props.item?.createdMessage} color={colors.inputGray} />

       
        
        </ListItem.Subtitle>
      </ListItem.Content>
      <View>
        <CustomText
          label={props?.date=="Today"? props?.ChatTime:props.date}
          fontSize={9}
          color={colors.inputGray}
        />
      </View>
    </ListItem> */}
    </TouchableOpacity>
  );
};

export default GroupChatContainer;

const styles = StyleSheet.create({});
