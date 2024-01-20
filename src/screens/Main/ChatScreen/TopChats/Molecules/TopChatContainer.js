import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../../../utils/Colors';
import {Avatar, Badge, Image, ListItem} from 'react-native-elements';
import {getSpecificUser} from '../../../../services/UserServices';
import CustomText from '../../../../../components/CustomText';
import CustomImage from '../../../../../components/CustomImage';
import {Spacer} from '../../../../../components/Spacer';
import {scale, verticalScale} from 'react-native-size-matters';
import {InterFont} from '../../../../../utils/Fonts';

const TopChatContainer = props => {
  const [userData, setUserData] = useState({});


  useEffect(() => {
      getUser();
    }, [props.userId]);

  const getUser = async () => {
      getSpecificUser(props.userId).then(data => {
        setUserData(data);
      });
    };
    // console.log("UswrChatData",userData?.uid)
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
        props.navigation.navigate('ChatDetail', {userId: props.userId})
      }>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '70%'}}>
        <CustomImage
          width={45}
          height={45}
          imageUrl={userData?.profileImage}
        />
        <View style={{marginHorizontal: scale(5)}}>
          <CustomText
            label={userData?.name}
            fontSize={13}
            fontFamily={InterFont.bold}
            color={colors.black}
          />
          <Spacer height={5} />
          <CustomText
            numberOfLines={3}
            label={props.item?.lastMessage?.text}
            color={colors.inputGray}
            fontSize={10}
          />
        </View>
      </View>

      <View>
        <CustomText
          label={props?.date == 'Today' ? props?.ChatTime : props?.date}
          fontSize={9}
          color={colors.inputGray}
        />
      </View>
    </TouchableOpacity>

    //   <TouchableOpacity
    //   activeOpacity={0.6}
    //   style={{borderBottomWidth:0.2,borderColor:colors.inputGray,borderTopWidth:props?.index==0?0.2:0}}

    //   onPress={() => props.navigation.navigate('ChatDetail',{userId:props.userId})}>
    //   <ListItem>
    //       <CustomImage  width={50} height={50}  imageUrl={props?.item?.profileImage}/>
    //     {/* <Avatar rounded source={icons.profile} size={55} /> */}
    //     <ListItem.Content>
    //       <ListItem.Title style={{fontWeight: 'bold'}}>{ props?.item?.name}</ListItem.Title>
    //       <Spacer height={4} />
    //       <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
    //       <CustomText label={ props.item?.lastMessage?.text} color={colors.inputGray} />
    //       </ListItem.Subtitle>
    //     </ListItem.Content>
    //     <View>
    //       <CustomText
    //         label={props?.date=="Today"? props?.ChatTime:props?.date}
    //         fontSize={9}
    //         color={colors.inputGray}
    //       />
    //     </View>
    //   </ListItem>
    // </TouchableOpacity>
  );
};

export default TopChatContainer;

const styles = StyleSheet.create({});
