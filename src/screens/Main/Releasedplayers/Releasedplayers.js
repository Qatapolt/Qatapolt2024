import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import PostItem from '../ArenaScreen/Molecules/PostItem';
import CustomHeader from '../../../components/CustomHeader';
import { icons } from '../../../assets/icons';
import { colors } from '../../../utils/Colors';
import { Spacer } from '../../../components/Spacer';
import CustomText from '../../../components/CustomText';
import { InterFont } from '../../../utils/Fonts';

const Releasedplayers = ({route}) => {
  const navigation = useNavigation();
  const freeAgent=route?.params
  console.log("releaseAgent",freeAgent)

  const [likePost, setLikePost] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [heartPost, setHeartPost] = useState(false);
  const [appFounderModal, setAppFounderModal] = useState(true);
  const [viewPostModal, setViewPostModal] = useState(false);
  const [postIndex, setPostIndex] = useState(-1);
  const [showFilter, setShowFilter] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [signupId, setSignupId] = useState(-1);
  const [value, setValue] = useState('');
  return (
    <View style={{backgroundColor:colors.white}} >
        <Spacer height={Platform.OS == 'ios' ? 40 : 20} />
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} >
      {[1, 2, 3, 4].map(index => (
        <PostItem
          navigation={navigation}
          index={index}
          setPostIndex={setPostIndex}
          showPost={showPost}
          setViewPostModal={setViewPostModal}
          setShowPost={setShowPost}
          heartPost={heartPost}
          setHeartPost={setHeartPost}
          likePost={likePost}
          setLikePost={setLikePost}
        />
      ))}
      </ScrollView>
    </View>
  );
};

export default Releasedplayers;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
});

const Header = ({navigation}) => (
  <View style={styles.header}>
    {/* <CustomText label={''}/> */}
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={{
          width: 40,
          height: 40,
          backgroundColor: colors.superLightGray,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
          marginRight: 10,
        }}>
        <Image source={icons.drawer} style={{height: 27, width: 27}} />
      </TouchableOpacity>
      {/* <Image source={icons.logoText} style={{height: 27, width: 145}} /> */}
      <CustomText label="Free Agent Posts" fontSize={15} fontFamily={InterFont.semiBold} /> 
    </View>
 
    <View style={styles.row}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('SearchScreen')}>
        <Image source={icons.search} style={{height: 27, width: 27}} />
      </TouchableOpacity>
      <Spacer width={10} />

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate('Notifications')}>
        <Image source={icons.bell} style={{height: 27, width: 27}} />
      </TouchableOpacity>
    </View>
  </View>
);
