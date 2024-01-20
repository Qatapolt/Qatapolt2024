import {Text, Pressable, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {scale, moderateScale} from 'react-native-size-matters';
import {colors} from '../../../../utils/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import {View} from 'react-native-animatable';
import {Spacer} from '../../../../components/Spacer';
import CustomImage from '../../../../components/CustomImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {icons} from '../../../../assets/icons';
const SearchComponent = ({item, authData, navigation}) => {
  const onPressProfile = () => {
    let BlockExist = authData?.BlockUsers?.map(item => item).includes(item.uid);
    if (BlockExist) {
      navigation.navigate('BlockScreen');

      return;
    }

    if (item.uid == authData.uid) {
      navigation.navigate('Profile', {
        event: item.uid,
      });
      return;
    }
    navigation.navigate('UserProfile', {
      event: item.uid,
    });
  };
  return (
    <>
      <Spacer height={5} />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPressProfile}
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          // marginHorizontal:10,
          height: scale(40),
        }}>
        <View style={{flex: 0.8, alignItems: 'center'}}>
          <Octicons
            name="search"
            color={colors.black}
            size={moderateScale(18)}
          />
        </View>
        <View
          style={{
            width: '78%',
            // flex: 3.4,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{color: 'black', fontSize: scale(13), fontWeight: '600'}}>
            {item.name}
          </Text>
          <View
            style={{
              marginHorizontal: scale(5),
              flexDirection: 'row',
              width: scale(2),
              height: scale(2),
              borderRadius: scale(24),
              backgroundColor: colors.inputGray,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: scale(10),
              color: colors.inputGray,
              fontWeight: '500',
              // width:"90%"
            }}>
            {item.sportEmoji}
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '55%'}}>
            <Text
              numberOfLines={1}
              style={{
                color: 'black',
                fontSize: scale(10),
                color: colors.inputGray,
                fontWeight: '500',
              }}>
              {item.selectSport}
            </Text>
            {item?.trophy == 'verified' && (
              <Image
                resizeMode="contain"
                style={{width: 17, height: 17}}
                source={icons.trophyIcon}
              />
            )}
          </View>
        </View>
        <View
          style={{
            flex: 0.7,
            alignItems: 'center',
            justifyContent: 'center',
            right: 15,
          }}>
          <CustomImage
            imageUrl={item?.profileImage}
            width={scale(25)}
            height={scale(25)}
          />
          {/* <Image
          style={{
            width: scale(30),
            height: scale(30),
            borderRadius: scale(25),
          }}
          source={item.image}
        /> */}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default SearchComponent;
