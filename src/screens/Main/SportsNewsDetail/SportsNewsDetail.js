import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {colors} from '../../../utils/Colors';
import {images} from '../../../assets/images';
import CustomText from '../../../components/CustomText';
import {Spacer} from '../../../components/Spacer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SportsNewsDetailHeader from './Molecules/SportsNewsDetailHeader';
import {InterFont} from '../../../utils/Fonts';

const SportsNewsDetail = ({route, navigation}) => {
  const {height} = Dimensions.get('window');
  let item = route?.params?.item;
  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{flex: 1, backgroundColor: colors.greyWhite}}>
        <SportsNewsDetailHeader item={item} />
        <View style={{padding: 10}}>
          <CustomText
            label={item?.title}
            fontSize={17}
            fontFamily={InterFont.semiBold}
            letterSpacing={1}
          />
          <Spacer height={15} />
          <CustomText label={item?.title} fontSize={11} letterSpacing={1} />
          <Spacer height={15} />
          <CustomText label={item?.content} fontSize={11} letterSpacing={1} />
          <Spacer height={15} />
          {/* <CustomText label={item?.description} fontSize={11} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SportsNewsDetail;
