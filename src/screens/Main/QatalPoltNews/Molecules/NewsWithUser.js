import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Spacer} from '../../../../components/Spacer';
import CustomText from '../../../../components/CustomText';
import {icons} from '../../../../assets/icons';
import {InterFont} from '../../../../utils/Fonts';
import {images} from '../../../../assets/images';
import CustomButton from '../../../../components/CustomButton';
import {colors} from '../../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles from '../../../../utils/CommonStyles';
import {getSpecificUser} from '../../../services/UserServices';
const NewsWithUser = ({
  user,
  userID,
  username,
  title,
  subTitle,
  description,
  image,
  day,
  date,
  month,
  authID,
  timeAgo,
  onFollow,
  followerState,
  onNavigate
}) => {
  const [userData, setUserData] = useState({});

  // console.log('UserAllData', userData?.AllFollowers?.includes(authID));

  useEffect(() => {
    if (user) {
      // console.log('knknckdn');

      getUser();
    }
  }, [user, followerState]);

  const getUser = async () => {
    const data = await getSpecificUser(userID);
    setUserData(data);
  };

  return (
      <TouchableOpacity
      activeOpacity={0.6}
      onPress={onNavigate}
        // style={{
        //   width: '90%',
        //   height: 'auto',
        //   // display: 'flex',
        //   alignSelf: 'center',
        //   padding: scale(10),
        //   backgroundColor: colors.white,
        //   shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
        //   elevation: 5,
        //   shadowOpacity: 0.5,
        //   shadowOffset: {width: 1, height: 1},

        //   borderRadius: scale(10),
        // }}
        >
        <ImageBackground
          imageStyle={{
            borderRadius: 10,
            // overflow: 'hidden',
          }}
          source={image}
          style={{
            height: scale(450),
            width: '100%',
            resizeMode: 'cover',
          }}>
          <View
            style={{
              borderRadius: 10,
              opacity: 0.1,
              backgroundColor: '#454545',
              width: '100%',
              height: '100%',
            }}
          />
          <View
            style={{
              position: 'absolute',

              paddingHorizontal: scale(7),
              display: 'flex',
              bottom: verticalScale(30),
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              zIndex: 10,
            }}>
            {/* <View style={commonStyles.rowContainer}>
              <MaterialCommunityIcons
                name="clock-time-five-outline"
                size={moderateScale(17)}
                color={colors.white}
              />

              <CustomText
                label={timeAgo}
                color={colors.white}
                fontSize={12}
                fontFamily={InterFont.semiBold}
              />
            </View> */}
            <CustomText
              numberOfLines={2}
              label={title}
              color={colors.white}
              fontSize={30}
              fontFamily={InterFont.bold}
            />
          </View>
        </ImageBackground>
        {/* <Spacer height={10} />

        <CustomText label={title} fontSize={15} fontFamily={InterFont.bold} />
        <Spacer height={5} />

        <CustomText
          label={subTitle}
          fontSize={13}
          fontFamily={InterFont.semiBold}
        />
        <Spacer height={10} /> */}

        {/* <View style={commonStyles.row}>
            <View style={{width:"52%",paddingRight:scale(5)}}>

            <CustomText
          label={title}
          fontSize={15}
          fontFamily={InterFont.bold}
        />
        <Spacer height={10} />


        <CustomText
          label={subTitle}
          fontSize={13}
          fontFamily={InterFont.semiBold}
        />


            </View>


     

          </View> */}
        {/* The date and qatapolt news heading view */}

        {/* <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 15,
          }}>
          <View>
            <CustomText
              label={day}
              fontSize={11}
              fontFamily={InterFont.medium}
              color={colors.inputGray}
            />
            <CustomText
              label={date}
              fontSize={11}
              fontFamily={InterFont.medium}
              color={colors.darkBlue}
            />
            <CustomText
              label={month}
              fontSize={11}
              fontFamily={InterFont.medium}
              color={colors.lightGreen}
            />
          </View>
          <Spacer width={10} />
          <View
            style={{
              height: 55,
              width: 0.5,
              backgroundColor: colors.inputGray,
            }}
          />
          <Spacer width={10} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '85%',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <CustomText
                label="Qata Polt News"
                textAlign={'center'}
                fontSize={14}
                fontFamily={InterFont.semiBold}
              />
              <Spacer width={5} />
              <Image source={icons.trophy} style={{height: 14, width: 14}} />
            </View>
            <Spacer width={5} />
            <View style={{alignSelf: 'center'}}>
              <Image
                source={images.logo2}
                resizeMode="cover"
                style={{height: 40, width: 40, borderRadius: 50}}
              />
            </View>
          </View>
        </View> */}

        {/* {user ? (
          <>

            

            <View
              style={{
                // paddingHorizontal: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-between',
                // backgroundColor: 'red',
                width: '90%',
              }}>
              <CustomButton
                title={
                  userData?.RequestIds?.includes(authID)
                    ? 'Requested'
                    : userData?.AllFollowers?.includes(authID)
                    ? 'Unfollow'
                    : 'Follow'
                }
                width={65}
                height={25}
                onPress={() => onFollow(userData)}
                fontFamily={InterFont.bold}
                fontSize={10}
                borderRadius={20}
                // backgroundColor={colors.green}

                backgroundColor={
                  userData?.RequestIds?.includes(authID)
                    ? colors.green
                    : userData?.AllFollowers?.includes(authID)
                    ? colors.green
                    : colors.divider
                }
                color={
                  userData?.RequestIds?.includes(authID)
                    ? colors.white
                    : userData?.AllFollowers?.includes(authID)
                    ? colors.white
                    : colors.black
                }
                // color={colors.white}
              />
              <Spacer width={5} />
              <TouchableOpacity activeOpacity={0.6}>
                <CustomText
                  label={`${userData?.username}`}
                  fontSize={12}
                  color={colors.blue}
                  fontFamily={InterFont.medium}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : null} */}
      </TouchableOpacity>
  );
};

export default NewsWithUser;
