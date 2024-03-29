import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {colors} from '../../../../utils/Colors';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';
import commonStyles from '../../../../utils/CommonStyles';
import {Spacer} from '../../../../components/Spacer';
import {Avatar, Divider, ListItem} from 'react-native-elements';
import {icons} from '../../../../assets/icons';
import {images} from '../../../../assets/images';
import {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';
import {handleCommentLikePress} from '../../../services/PostServices';
import {useSelector} from 'react-redux';
import CustomImage from '../../../../components/CustomImage';
import CommentMessageContainer from './CommentMessageContainer';
const CommentsMessage = props => {
  const RenderComments = ({item, index}) => {
    return (
      <View>
        <CommentMessageContainer item={item} likeComment={props.likeComment} />
      </View>
    );
  };

  return (
    <ScrollView style={{flex: 1}}>
      <FlatList
        data={props?.comments}
        scrollEnabled={true}
        style={styles.chat}
        keyExtractor={item => item.id}
        renderItem={RenderComments}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      />
    </ScrollView>
  );
};

export default CommentsMessage;

const styles = ScaledSheet.create({
  commentContainer: {
    backgroundColor: colors.superLightGray,
    paddingHorizontal: verticalScale(10),
    borderRadius: scale(10),
    paddingVertical: verticalScale(5),
    marginRight: scale(30),
    // marginTop: verticalScale(5),
    // shadowColor: Platform.OS == 'ios' ? colors.superDuperLightGray : colors.black,
    // shadowRadius: 5,
    // elevation: 3,
    // shadowOpacity: 1,

    // shadowOffset: {width: 1, height: 4},
  },
  chat: {
    padding: 15,
    // height: '75%',
  },
});
