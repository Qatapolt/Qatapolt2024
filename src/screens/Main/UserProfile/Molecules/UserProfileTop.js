import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {InterFont} from '../../../../utils/Fonts';
import CustomHeader from '../../../../components/CustomHeader';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Spacer} from '../../../../components/Spacer';
import {PH20} from '../../../../utils/CommonStyles';
import Entypo from 'react-native-vector-icons/Entypo';

const UserProfileTop = props => {
  const [blockReport, setBlockReport] = useState(false);
  // username
  // console.log('CurrentUserData', props.CurrentUser);

  return (
    <View>
      <PH20>
        <CustomHeader
          LeftSide={() => (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                color={colors.white}
                size={moderateScale(25)}
              />
            </TouchableOpacity>
          )}
          Center={() => (
            <View style={{width: scale(200), alignItems: 'center'}}>
              <CustomText
                label={props.CurrentUser?.name}
                fontSize={15}
                numberOfLines={1}
                alignItems={'center'}
                textAlign="center"
                color={colors.white}
                fontFamily={InterFont.semiBold}
              />
            </View>
          )}
          RightSide={() => (
            <View>
              <TouchableOpacity
                onPress={() => props.setSheetVisible(true)}
                activeOpacity={0.6}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',

                  height: verticalScale(30),
                  width: scale(30),
                }}>
                <Entypo
                  name="dots-three-horizontal"
                  color={colors.white}
                  size={moderateScale(22)}
                />
              </TouchableOpacity>

              <View style={{backgroundColor: 'blue'}}>
                {blockReport && (
                  <View
                    style={{
                      position: 'absolute',
                      // top: 22,
                      width: scale(100),
                      height: verticalScale(50),
                      borderRadius: scale(5),
                      backgroundColor: colors.white,
                      right: 0,
                      // alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: '45%',
                        borderBottomWidth: 1.5,
                        borderBottomColor: colors.lightGray,
                        // alignItems: 'center',
                        // justifyContent: 'center',
                      }}>
                      <CustomText
                        label="Block"
                        onPress={props.onBlockUser}
                        height={'100%'}
                        fontSize={12}
                        marginLeft={10}
                        marginTop={2}
                        // textAlign="center"
                        color={colors.green}
                        fontFamily={InterFont.semiBold}
                      />
                    </View>
                    <CustomText
                      label="Report"
                      onPress={props.onReportUser}
                      fontSize={12}
                      marginLeft={10}
                      // textAlign="center"
                      marginTop={3}
                      color={colors.green}
                      fontFamily={InterFont.semiBold}
                    />
                  </View>
                )}
              </View>
            </View>
          )}
        />
      </PH20>
    </View>
  );
};

export default UserProfileTop;

const styles = StyleSheet.create({});
