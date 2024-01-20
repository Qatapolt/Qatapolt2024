import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {InterFont} from '../../../../utils/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, scale} from 'react-native-size-matters';
import {Spacer} from '../../../../components/Spacer';
import ProfilePhoto from '../../../../components/ProfilePhoto';
import CustomHeader from '../../../../components/CustomHeader';

const ProfileTop = props => {
  return (
    <View style={{padding: scale(10)}}>
      <Spacer height={20} />
      <CustomHeader
        LeftSide={() => (
          <View>
            {props?.EditParams && (
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Ionicons
                  name="chevron-back"
                  color={colors.white}
                  size={moderateScale(27)}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        Center={() => (
          <CustomText
            label={props?.EditParams?"Edit Profile": "Profile"}
            fontSize={16}
            textAlign="center"
            marginRight={ props?.EditParams? 30:0}
            fontFamily={InterFont.bold}
            color={colors.white}
            // fontFamily={InterFont.bold}
          />
        )}
        RightSide={() => (
          <View>
            {/* {props?.EditParams?<></>:(
              <TouchableOpacity>
              <CustomText
                onPress={() =>props.navigation.navigate('MainStack')}

                label="Skip"
                fontSize={14}
                textAlign="center"
                color={colors.white}
                fontFamily={InterFont.semiBold}
              />
            </TouchableOpacity>

            )} */}

          </View>
          
        )}
      />
    </View>
  );
};

export default ProfileTop;

const styles = StyleSheet.create({});
