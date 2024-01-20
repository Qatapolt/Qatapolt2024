import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Avatar, Divider, ListItem} from 'react-native-elements';
import {Spacer} from '../../../../../components/Spacer';
import CustomText from '../../../../../components/CustomText';
import {InterFont} from '../../../../../utils/Fonts';
import {colors} from '../../../../../utils/Colors';
import SepratorLine from '../../../../../components/SepratorLine';
import {icons} from '../../../../../assets/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const AddContactModel = ({
  modalVisible,
  setModalVisible,
  navigation,
  toggleModal,
}) => {
  return (
    <Modal
      backdropOpacity={0.3}
      onBackdropPress={() => toggleModal()}
      isVisible={modalVisible}>
        <TouchableOpacity
          style={{
            height: height / 5.7,
            width: width / 1.5,
            backgroundColor: colors.white,
            alignSelf:"center",
            borderRadius: scale(7),
          }}>
          <Spacer height={5} />

          <CustomText
            label={'Select Contact'}
            fontSize={15}
            alignSelf="center"
            fontFamily={InterFont.semiBold}
            color={colors.black}
            // fontFamily={InterFont.bold}
          />
          <Spacer height={5} />

          <SepratorLine height={2} />
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('AddChat');
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.green,
                height: 40,
                width: 40,
                margin: scale(5),
                marginLeft: scale(10),
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons
                name="person-add-sharp"
                color={colors.white}
                size={moderateScale(20)}
              />
              {/* <Image style={{width:scale(20),height:scale(20),tintColor:colors.primary}}
                    source={icons.person}
                    /> */}
            </TouchableOpacity>
            <CustomText
              label={'New Chat'}
              fontSize={13}
              alignSelf="center"
              fontFamily={InterFont.semiBold}
              color={colors.black}
              // fontFamily={InterFont.bold}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('AddGroupChat');
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.green,
                height: 40,
                width: 40,
                margin: scale(5),
                marginLeft: scale(10),
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: scale(20),
                  height: scale(20),
                  tintColor: colors.white,
                }}
                source={icons.multiUser}
              />
            </TouchableOpacity>
            <CustomText
              label={'New Group Chat'}
              fontSize={13}
              alignSelf="center"
              fontFamily={InterFont.semiBold}
              color={colors.black}
              // fontFamily={InterFont.bold}
            />
          </TouchableOpacity>
          {/* <ListItem>
          <Avatar
            activeOpacity={0.9}
            onPress={() => {
            navigation.navigate('Profile', {user: true});
            }}
            rounded
            source={icons.profile}
            size={50}
          />
          <ListItem.Content>
            <ListItem.Title style={{fontWeight: 'bold',fontSize:verticalScale(10)}}>
              {'Rodney Marks'}
            </ListItem.Title>
            <Spacer height={3} />
            <ListItem.Subtitle style={{color:colors.primary}} numberOfLines={1} ellipsizeMode="tail">
              {"@Ish"}
            </ListItem.Subtitle>
          </ListItem.Content>
  
          <CustomButton 
      height={30}
      onPress={()=>setModalVisible(false)}
      borderRadius={7}
      backgroundColor={colors.green}
      color={colors.white}
      fontSize={10}
      title={"Follow"}
       width={"27%"}/>
  
        
        </ListItem> */}
          {/* <Avatar
              activeOpacity={0.9}
              //   onPress={() => {
              //    props.navigation.navigate('Profile', {user: true});
              //   }}
              rounded
              source={icons.profile}
              size={50}
            /> */}
        </TouchableOpacity>
    </Modal>
  );
};

export default AddContactModel;

const styles = StyleSheet.create({});
