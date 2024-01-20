import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Divider, ListItem} from 'react-native-elements';
import {colors} from '../../../../utils/Colors';
import {icons} from '../../../../assets/icons';
import commonStyles, {PH10} from '../../../../utils/CommonStyles';
import CustomText from '../../../../components/CustomText';
import {Spacer} from '../../../../components/Spacer';
import {scale} from 'react-native-size-matters';
import {getSpecificUser, SaveUser} from '../../../services/UserServices';
import {InterFont} from '../../../../utils/Fonts';
import CustomImage from '../../../../components/CustomImage';
import {useDispatch} from 'react-redux';
import {authData} from '../../../../redux/reducers/authReducer';

const WatchItem = props => {
  const [watchListUser, setWatchListUser] = useState({});
  const dispatch = useDispatch();
  const onDeleteWatchList = async id => {
    const filterWatchList = props.authUser?.WatchList.filter(data => {
      return data != id;
    });
    await SaveUser(props.authUser.uid, {
      WatchList: filterWatchList,
    });
    const data = await getSpecificUser(props.authUser.uid);
    dispatch(authData(data));
    props.setonReFresh(!props?.onReFresh);
  };

  const onNavigate = item => {
    if (props?.authUser?.BlockUsers?.includes(item.uid)) {
      props.navigation.navigate('BlockScreen');

      return;
    }

    if (item.uid == props?.authUser.uid) {
      props.navigation.navigate('Profile', {
        event: item.uid,
      });
      return;
    }
    props.navigation.navigate('UserProfile', {
      event: item.uid,
    });
  };

  const WatchItemHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: scale(10),
        marginVertical: scale(10),
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '80%'}}>
        <CustomImage
          onImagePress={() => {
            onNavigate(props?.item);
          }}
          width={50}
          height={50}
          imageUrl={props?.item.profileImage}
        />

        <TouchableOpacity
          onPress={() => {
            onNavigate(props?.item);
          }}
          activeOpacity={0.6}
          style={{marginLeft: scale(7)}}>
          <ListItem.Title
            style={{fontWeight: 'bold', fontFamily: InterFont.bold}}>
            {props?.item?.name}
          </ListItem.Title>
          <Spacer height={3} />
          <ListItem.Subtitle
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: colors.green,
              fontSize: 12,
              fontFamily: InterFont.regular,
            }}>
            {`@${props?.item.username}`}
          </ListItem.Subtitle>
        </TouchableOpacity>
        {/* <AntDesign
                name={"star"}
                size={moderateScale(25)}
                color={colors.yellow}
              /> */}
      </View>

      <TouchableOpacity
        onPress={() => {
          onDeleteWatchList(props?.item?.uid);
        }}>
        <Image style={{width: 35, height: 35}} source={icons.starGoldActive} />
      </TouchableOpacity>
    </View>
  );
  return (
    <View>
      <PH10>
        <WatchItemHeader />
        <Spacer height={-10} />
        {props?.item?.stats ? (
          <CustomText
            width={'90%'}
            label={watchListUser?.stats}
            fontSize={16}
            marginBottom={10}
            color={colors.black}
            fontFamily={'inter-Regular'}
          />
        ) : (
          <></>
        )}
        <Spacer height={2} />
        <View style={{paddingHorizontal: scale(10), ...commonStyles.row}}>
          <View style={{flex: 1}}>
            <CustomText
              label={'Account Type'}
              fontSize={10}
              color={colors.lightGray}
              fontFamily={'inter-Regular'}
              padding={5}
            />
            <CustomText
              label={props?.item?.accountType}
              fontSize={12}
              fontFamily={'inter-Regular'}
              padding={5}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomText
              label={'Sport'}
              fontSize={10}
              color={colors.lightGray}
              fontFamily={'inter-Regular'}
              padding={5}
            />
            <CustomText
              label={props?.item?.selectSport}
              fontSize={12}
              fontFamily={'inter-Regular'}
              padding={5}
            />
          </View>
        </View>
        <Spacer height={10} />

        <View style={{paddingHorizontal: scale(10), ...commonStyles.row}}>
          <View style={{flex: 1}}>
            <CustomText
              label={'Position'}
              fontSize={10}
              color={colors.lightGray}
              fontFamily={'inter-Regular'}
              padding={5}
            />
            <CustomText
              label={props?.item?.position}
              fontSize={12}
              fontFamily={'inter-Regular'}
              padding={5}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomText
              label={'Location'}
              fontSize={10}
              color={colors.lightGray}
              fontFamily={'inter-Regular'}
              padding={5}
            />
            <CustomText
              label={props?.item?.country}
              fontSize={12}
              fontFamily={'inter-Regular'}
              padding={5}
            />
          </View>
        </View>
        <Spacer height={10} />
      </PH10>
      <Spacer height={10} />
      <Divider width={5} color={colors.divider} />
    </View>
  );
};

export default WatchItem;

const styles = StyleSheet.create({});
