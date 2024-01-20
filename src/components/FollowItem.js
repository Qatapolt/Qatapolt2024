import {StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomText from './CustomText';
import {Spacer} from './Spacer';
import CustomImage from './CustomImage';
import {colors} from '../utils/Colors';
import commonStyles from '../utils/CommonStyles';
import CustomButton from './CustomButton';
import { icons } from '../assets/icons';

const FollowItem = ({
  item,
  authId,
  authStateFollowing,
  onFollower,
  onNavigate,
  authState,
}) => {
  return (
    <TouchableOpacity style={{width: '100%'}} activeOpacity={0.6}>
      <View style={commonStyles.rowJustify}>
        <TouchableOpacity
          onPress={onNavigate}
          style={{...commonStyles.rowContainer,width:"70%"}}>
          <View>
            <CustomImage width={50} height={50} imageUrl={item?.profileImage} />
          </View>
          <Spacer width={15} />
          <View style={{display: 'flex', justifyContent: 'center',width:"60%"}}>
            <View>
              <CustomText label={item?.name} fontSize={13} />
              <Spacer height={2} />
              <View style={{flexDirection:"row",alignItems:"center"}}>
              <CustomText 
              numberOfLines={1}
              label={item?.username ? `${item?.username}` : ''} />
             <Spacer width={5}/>
              {
                item.trophy == 'verified'&&(
                  <Image
                  resizeMode="contain"
                  style={{width:17,height:17}}
                  source={icons.trophyIcon}
                  />

                )
              }

              </View>

            </View>
          </View>
        </TouchableOpacity>

        {authId == item?.uid ? (
          <></>
        ) : (
          <CustomButton
            height={27}
            borderRadius={8}
            onPress={onFollower}
            // onPress={onFollower}
            backgroundColor={
              item?.RequestIds?.includes(authState.uid)
                ? colors.green
                : authStateFollowing?.includes(item.uid)
                ? colors.lightGray
                : colors.green
            }
            color={colors.white}
            fontSize={13}
            title={
              item?.RequestIds?.includes(authState.uid)
                ? 'Requested'
                : authStateFollowing?.includes(item.uid)
                ? 'Following'
                : 'Follow'
            }
            width={'27%'}
          />
        )}
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
  );
};

export default FollowItem;

const styles = StyleSheet.create({});
