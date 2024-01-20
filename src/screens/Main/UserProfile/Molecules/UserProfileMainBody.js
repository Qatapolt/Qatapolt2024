import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import SepratorLine from '../../../../components/SepratorLine';
import commonStyles, {PH10, PH20} from '../../../../utils/CommonStyles';
import {Spacer} from '../../../../components/Spacer';
import {colors} from '../../../../utils/Colors';
import {InterFont} from '../../../../utils/Fonts';
import CustomText from '../../../../components/CustomText';
import CustomPeoples from '../../../../components/CustomPeoples';
import {images} from '../../../../assets/images';
import {scale, verticalScale} from 'react-native-size-matters';
import ProfileTopNav from './UserProfileTopNav';
import {icons} from '../../../../assets/icons';

const UserProfileMainBody = ({userData, authUser}) => {
  let ChecKAuthFollower = userData?.AllFollowers?.map(
    data => data.uid,
  )?.includes(authUser?.uid);
  return (
    <View style={{width: '100%'}}>
      <SepratorLine height={8} />
      <Spacer height={20} />

      <PH20>
        <View style={commonStyles.rowJustify}>
          <CustomText
            label="Squad"
            fontSize={12}
            textAlign="center"
            color={colors.black}
            fontFamily={InterFont.semiBold}
          />
        </View>
      </PH20>

      <Spacer height={20} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingLeft: scale(10),
          }}>
          {userData?.AllFollowers?.map(item => {
            return (
              <>
                <CustomPeoples item={item} authUser={authUser} />
              </>
            );
          })}
        </View>
      </ScrollView>
      <Spacer height={20} />

      <SepratorLine height={8} />
      <Spacer height={20} />

      {/* <View style={{width: '100%', height: verticalScale(400)}}> */}
      {userData?.privateProfile ? (
        <View style={{width: '100%', height: verticalScale(400)}}>
          {!ChecKAuthFollower ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <PH20>
                <Image
                  style={{width: scale(40), height: scale(40)}}
                  source={icons.private}
                />
              </PH20>
              <View>
                <CustomText
                  label="This account is private"
                  fontSize={14}
                  color={colors.black}
                  fontFamily={InterFont.semiBold}
                />
                <CustomText
                  width={'89%'}
                  label="Follow this account to see photos and video"
                  fontSize={14}
                  marginTop={5}
                  color={colors.inputGray}
                />
              </View>
            </View>
          ) : (
            <ProfileTopNav userData={userData} />
          )}
        </View>
      ) : (
        <View style={{width: '100%', height: verticalScale(400)}}>
          <ProfileTopNav userData={userData} />
        </View>
      )}
      {/* </View> */}
      {/* <SepratorLine height={8} />
      <Spacer height={20} /> */}

      {/* <CustomText
        label="Posts"
        fontSize={15}
        textAlign="center"
        marginLeft={20}
        color={colors.black}
        fontFamily={InterFont.bold}
      />
      <Spacer height={20} />

      <FlatList
        data={PostArray}
        numColumns={3}
        style={{marginHorizontal:20}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          console.log('index', index);

          return (
            <>
              <View
                style={{
                  width: '30%',
                  height: verticalScale(100),
                  borderRadius: scale(5),
                  overflow: 'hidden',
                  marginHorizontal: scale(5),
                  marginBottom: verticalScale(10),
                }}>
                <Image  source={item.img} style={commonStyles.img} />
              </View>
            </>
          );
        }}
      /> */}
    </View>
  );
};

export default UserProfileMainBody;

const styles = StyleSheet.create({});
