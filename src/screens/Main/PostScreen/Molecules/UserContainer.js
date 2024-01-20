import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar, Divider, Image, ListItem} from 'react-native-elements';
import {InterFont} from '../../../../utils/Fonts';
import CustomImage from '../../../../components/CustomImage';
import {Spacer} from '../../../../components/Spacer';
import {verticalScale} from 'react-native-size-matters';
import {colors} from '../../../../utils/Colors';

export default function UserContainer(props) {
  return (
    <View style={{borderTopWidth: 0.5, borderColor: colors.graySearch}}>
      <ListItem>
        <CustomImage
          onImagePress={() => {}}
          width={40}
          height={40}
          imageUrl={props.item?.profileImage}
        />

        <ListItem.Content>
          <ListItem.Title style={{fontFamily: InterFont.semiBold}}>
            {props.item?.name}
          </ListItem.Title>
          <Spacer height={3} />
          <ListItem.Subtitle
            style={{
              fontFamily: InterFont.regular,
              fontSize: verticalScale(8),
              width: '80%',
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {`${props.item?.username} - ${
              props.item?.accountType ? props.item?.accountType : ''
            }`}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
}

const styles = StyleSheet.create({});
