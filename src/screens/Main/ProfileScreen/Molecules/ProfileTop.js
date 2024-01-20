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
import {useDispatch} from 'react-redux';
import {setEmptyPositionsAndSkills} from '../../../../redux/reducers/authReducer';

const ProfileTop = props => {
  const [blockReport, setBlockReport] = useState(false);
  const dispatch = useDispatch();
  // username
  // console.log('CurrentUserData', props.CurrentUser);

  return (
    <View>
      <PH20>
        <CustomHeader
          Center={() => (
            <View style={{width: scale(200), alignItems: 'center'}}>
              <CustomText
                label={props.CurrentUser?.name}
                fontSize={15}
                numberOfLines={1}
                alignItems={'center'}
                marginLeft={!props.UserParams ? 40 : -20}
                textAlign="center"
                color={colors.white}
                fontFamily={InterFont.semiBold}
              />
            </View>
          )}
          RightSide={() => (
            <View
              style={{flexDirection: 'row', alignItems: 'center'}}
              // onPress={() => props.navigation.goBack()}
            >
              {!props.UserParams ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(setEmptyPositionsAndSkills());

                      props.navigation.navigate('EditProfile');
                    }}
                    activeOpacity={0.6}>
                    <FontAwesome
                      name="edit"
                      color={colors.white}
                      size={moderateScale(22)}
                    />
                  </TouchableOpacity>

                  <Spacer width={25} />
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('SettingScreen');
                    }}
                    activeOpacity={0.6}>
                    <Ionicons
                      name="settings-outline"
                      color={colors.white}
                      size={moderateScale(22)}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity onPress={() => setBlockReport(!blockReport)}>
                  {blockReport && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 22,
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
                        fontSize={12}
                        marginLeft={10}
                        // textAlign="center"
                        marginTop={3}
                        color={colors.green}
                        fontFamily={InterFont.semiBold}
                      />
                    </View>
                  )}

                  <Entypo
                    name="dots-three-horizontal"
                    color={colors.white}
                    size={moderateScale(25)}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </PH20>
    </View>
  );
};

export default ProfileTop;

const styles = StyleSheet.create({});
