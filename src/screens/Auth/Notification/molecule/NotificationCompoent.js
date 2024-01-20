import {Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {Spacer} from '../../../../components/Spacer';
import {scale} from 'react-native-size-matters';
import CustomImage from '../../../../components/CustomImage';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

const NotificationComponent = ({item}) => {
  console.log('ItemDAta', item);
  return (
    <Pressable
      key={item.id}
      style={{
        flexDirection: 'row',
        height: scale(80),
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: scale(5),
        paddingHorizontal: scale(10),
      }}>
      <CustomImage imageUrl={item?.senderImage} width={50} height={50} />

      <View style={{flex: 3, marginLeft: scale(10)}}>
        <Text
          style={{
            fontSize: scale(13),
            fontWeight: '600',
            color: 'black',
          }}>
          {item?.senderName}
          <Text
            style={{
              fontSize: scale(13),
              fontWeight: 'normal',
              color: 'gray',
            }}>
            {` ${item?.message}`}
          </Text>
        </Text>
        <Spacer height={scale(3)} />
        <Text
          style={{
            fontSize: scale(12),
            color: 'gray',
          }}>
          {moment(new Date(item?.createdAt?.toDate())).format('h:mm:A')}
        </Text>
      </View>
      {item?.thumbnail.length !== 0 && (
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              marginTop: scale(5),
              width: scale(45),
              height: scale(50),
              overflow: 'hidden',
              borderRadius: scale(7),
              //  backgroundColor: 'red',
            }}
            // source={item.imageNotification}
          >
            <FastImage
              style={{width: '100%', height: '100%'}}
              source={{uri: item?.thumbnail}}
              resizeMode="cover"
            />
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default NotificationComponent;
