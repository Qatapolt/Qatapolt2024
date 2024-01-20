import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../../../../utils/Colors';
import {InterFont} from '../../../../../utils/Fonts';
import {Spacer} from '../../../../../components/Spacer';
import CustomText from '../../../../../components/CustomText';
import CustomHeader from '../../../../../components/CustomHeader';
import Ionicons from "react-native-vector-icons/Ionicons"
import { moderateScale } from 'react-native-size-matters';
import CustomSearch from '../../../../../components/CustomSearch';

import Toast from 'react-native-root-toast';

const GropChatTop = (props) => {
  return (
    <View >
      {/* <TouchableOpacity onPress={()=>props.navigation.goBack()}>
<Ionicons name='md-chevron-back' size={moderateScale(30)} color={colors.white}/>


</TouchableOpacity> */}
      <Spacer height={10} />
      <CustomHeader
        LeftSide={() => (
            <TouchableOpacity
            onPress={()=>props.navigation.goBack()}
            >
                <Ionicons name="chevron-back" color={colors.black} size={moderateScale(25)}/>
                

            </TouchableOpacity>
           
          )}
        Center={() => (
          <CustomText
            label="New Group"
            fontSize={13}
            textAlign="center"
            color={colors.black}
            fontFamily={InterFont.bold}
          />
        )}
        RightSide={() => (
            <CustomText
            onPress={()=>
              {
                if(props?.CurrentChatGroup.length==0){
                  Toast.show('Please select any one to start a chat');


                  return

                }
                props.navigation.navigate("AddGroupChatDetail")

              }
           }
              label="Next"
              fontSize={13}
              textAlign="center"
              color={colors.black}
              fontFamily={InterFont.bold}
            />
        )}
      />
            <Spacer height={20} />


      <CustomSearch/>
    </View>
  );
};

export default GropChatTop;

const styles = StyleSheet.create({});
