import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Spacer} from '../../../../components/Spacer';
import {colors} from '../../../../utils/Colors';
import {images} from '../../../../assets/images';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';
import {icons} from '../../../../assets/icons';
import {useNavigation} from '@react-navigation/native';

const SportsNewsDetailHeader = item => {
  const {height} = Dimensions.get('window');
  const navigation = useNavigation();
  let data = item?.item;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          backgroundColor: colors.white,
          height: height / 4,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          // flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{zIndex: 10, position: 'absolute', marginLeft: 10}}>
          <Spacer height={height / 25} />
          <AntDesign name="left" color={colors.white} size={25} />
        </TouchableOpacity>

        {/* <TouchableOpacity
        activeOpacity={0.6}
        style={{
          zIndex: 10,
          position: 'absolute',
          marginLeft: 10,
          display: 'flex',
          alignSelf: 'flex-end',
        }}>
        <Spacer height={height / 2.56} />
        <View
          style={{
            height: 55,
            width: 55,
            backgroundColor: colors.green,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            marginRight: 20,
          }}>
          <Feather name="share" color={colors.white} size={25} />
        </View>
      </TouchableOpacity> */}

        <Image
          source={{uri: data?.image}}
          style={{
            height: 280,
            width: '100%',
            resizeMode: 'cover',
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        />

        {/* <View style={{...styles.ScrollInnerBody}}>
      <View
          style={{
            ...styles.flexRow,
            width: '35%',
            justifyContent: 'space-between',
          }}>
          <Image source={icons.arsenal} style={{height: 35, width: 30}} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignSelf: 'center',
              alignItems: 'center',
              width: '50%',
            }}>
            <CustomText
              label="0"
              fontSize={15}
              fontFamily={InterFont.semiBold}
            />
            <CustomText
              label=":"
              fontSize={13}
              fontFamily={InterFont.semiBold}
            />
            <CustomText
              label="0"
              fontSize={15}
              fontFamily={InterFont.semiBold}
            />
          </View>

          <Image source={icons.Manchester} style={{height: 35, width: 30}} />
        </View>
      <View style={{top: -10, marginHorizontal: 10}}>
        <CustomText
          label={data?.publishedAt}
          fontSize={9}
          color={colors.inputGray}
        />
        <Spacer height={3} />
          <CustomText
            label="Emirates Stadium"
            fontSize={10}
            color={colors.inputGray}
          />
      </View>
      </View> */}
      </View>
      <View
        style={{
          padding: 20,
          marginTop: 55,
          height: 100,
          alignContent: 'center',
        }}>
        <CustomText
          label="Reports"
          fontFamily={InterFont.semiBold}
          color={colors.green}
          fontSize={10}
        />
        <CustomText
          label={data?.source?.name}
          fontFamily={InterFont.semiBold}
          color={colors.green}
          fontSize={18}
        />
        <CustomText
          label={data?.publishedAt}
          fontSize={15}
          color={colors.inputGray}
        />
      </View>
    </SafeAreaView>
  );
};

export default SportsNewsDetailHeader;

const styles = StyleSheet.create({
  ScrollInnerBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
});
