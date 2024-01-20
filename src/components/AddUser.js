import {Platform, StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {moderateScale, scale} from 'react-native-size-matters';
import { icons } from '../assets/icons';

const AddUser = props => {
  return (
    <TouchableOpacity
    activeOpacity={0.6}
    onPress={props.onPress}
    
     
        style={{
          position: 'absolute',
          bottom: props.bottom|| 0,
          right: scale(props.right|| 20),
          alignSelf: 'flex-end',
          backgroundColor: colors.green,
          height:scale(50),
          width: scale(50),
          margin:10,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
          shadowRadius: 5,
          elevation: 5,
          shadowOpacity: 1,

          shadowOffset: {width: 1, height: 2},
        }}>
          <Image style={{width:"60%",height:"60%",tintColor:colors.white}}
        source={icons.addchat}
          />
       
    </TouchableOpacity>
  );
};

export default AddUser;

const styles = StyleSheet.create({});
