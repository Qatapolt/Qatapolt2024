import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Divider, Image, ListItem} from 'react-native-elements';
import {icons} from '../../../../assets/icons';
import {PH10, PH20} from '../../../../utils/CommonStyles';
import CustomText from '../../../../components/CustomText';
import {Spacer} from '../../../../components/Spacer';
import {InterFont} from '../../../../utils/Fonts';
import CustomImage from '../../../../components/CustomImage';
import {verticalScale} from 'react-native-size-matters';
import moment from 'moment';

const OtherUserCommentaryHeader = props => {
  const [userProfileData, setUserProfileData] = useState({});
  // console.log("ALLPostCommun",props.postData)

  useEffect(() => {
    setUserProfileData(props?.userData);
  }, [props]);

  const PostCreateAt = moment(new Date(props.postData?.createAt?.toDate()));

  let dateFormat = '';

  if (moment(PostCreateAt).isSame(moment(), 'day')) {
    dateFormat = 'Today';
  } else {
    dateFormat = 'not';
  }

  return (
    <View>
      <ListItem>
        <CustomImage
          //   onImagePress={() => {
          //     if (userProfileData.uid == auth().currentUser.uid) {
          //       props.navigation.navigate('Profile', {
          //         event: userProfileData.uid,
          //       });
          //       return;
          //     }
          //     props.navigation.navigate('UserProfile', {
          //       event: userProfileData.uid,
          //     });
          //   }}
          width={50}
          height={50}
          imageUrl={userProfileData?.profileImage}
        />

        <ListItem.Content>
          <ListItem.Title style={{fontFamily: InterFont.semiBold}}>
            {userProfileData?.name}
          </ListItem.Title>
          <Spacer height={3} />
          <ListItem.Subtitle
            style={{fontFamily: InterFont.regular, fontSize: verticalScale(8)}}
            numberOfLines={1}
            ellipsizeMode="tail">
            {}
            {props.postData?.createAt
              ? dateFormat == 'Today'
                ? moment(new Date(props.postData?.createAt?.toDate())).fromNow()
                : moment(new Date(props.postData?.createAt?.toDate())).format(
                    'DD MMM h:mm:A',
                  )
              : ''}
          </ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Are you sure ', 'Do you want to delete this post?', [
              {
                text: 'Yes',
                onPress: () => {
                  // getMedia();
                },
              },
              {
                text: 'No',
                onPress: () => {
                  // getMedia();
                },
              },
            ]);
          }}>
          <Avatar source={icons.menu} />
        </TouchableOpacity>
      </ListItem>
      {props.postData?.description ? (
        <PH20>
          <CustomText label={props.postData.description} />
        </PH20>
      ) : null}
    </View>
  );
};

export default OtherUserCommentaryHeader;

const styles = StyleSheet.create({});
