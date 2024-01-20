import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {InterFont} from '../../../../utils/Fonts';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BottomSheet} from 'react-native-btr';
import {Spacer} from '../../../../components/Spacer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {setReportUserId} from '../../../../redux/reducers/ReportUserReducer';
import {icons} from '../../../../assets/icons';
import {SavePost, updateRepostCount} from '../../../services/PostServices';
import uuid from 'react-native-uuid';
import Toast from 'react-native-root-toast';
import CustomButton from '../../../../components/CustomButton';
import {getSpecificUser, userPostId} from '../../../services/UserServices';
import {authData} from '../../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportSheet = props => {
  const OnRepostPost = async () => {
    Toast.show('Reposting...');
    const postData = {
      uriData: {
        uri: props?.selectPost.uriData?.uri
          ? props?.selectPost.uriData?.uri
          : '',
        type: props?.selectPost.uriData?.type
          ? props?.selectPost.uriData?.type
          : '',
        thumbnail: props?.selectPost?.uriData?.thumbnail
          ? props?.selectPost?.uriData?.thumbnail
          : '',
      },
      description: props?.selectPost?.description
        ? props?.selectPost?.description
        : '',

      freeAgent: props?.selectPost?.freeAgent
        ? props?.selectPost?.freeAgent
        : false,
      postId: uuid.v4(),
      medalsId: [],
      location: props?.selectPost?.location ? props?.selectPost?.location : '',
      userId: props?.selectPost?.userId,
      medals: 0,
      views: 0,
      ViewsId: [],
      createAt: new Date(),
      externalShare: 0,
      internalShare: 0,
      rePostCount: 0,
      rePostIds: [],
      comments: [],
      comments_Count: 0,
      repostedBy: {
        uid: props.authUser.uid,
        name: props.authUser?.name,
      },
    };

    await SavePost(postData);

    const userPostIdsData = {
      postId: postData?.postId,
      createAt: postData?.createAt,
      type: postData?.uriData.type,
    };
    await userPostId(props?.authUser.uid, userPostIdsData);
    const data = await getSpecificUser(props?.authUser.uid);
    props.dispatch(authData(data));

    await updateRepostCount(props?.selectPost?.postId, props?.authUser?.uid);
    Toast.show('Posted!');
    props?.setRepost(true);
    props?.onCloseModal();
  };
  return (
    <BottomSheet
      visible={props.modalVisible}
      onBackButtonPress={props.onCloseModal}
      onBackdropPress={props.onCloseModal}>
      <View
        flexDirection={'column'}
        backgroundColor={'white'}
        alignSelf="center"
        paddingHorizontal={scale(15)}
        height={'20%'}
        width={'100%'}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden">
        <Spacer height={5} />

        <View style={styles.topLine}></View>
        <Spacer height={10} />
        <TouchableOpacity
          onPress={OnRepostPost}
          activeOpacity={0.6}
          style={styles.optionContainer}>
          <Image
            source={icons.sharepost}
            style={{
              width: scale(16),
              height: scale(16),
            }}
            //   containerStyle={{width: scale(18), height: scale(18)}}
          />
          {/* <AntDesign  name='copy1' size={moderateScale(20)} color={colors.black} /> */}

          <CustomText label="Repost" marginLeft={7} fontSize={13} />
        </TouchableOpacity>
        <Spacer height={20} />

        <CustomButton
          backgroundColor={colors.white}
          title={'Cancel'}
          borderWidth={1}
          onPress={props.onCloseModal}
          height={40}
          borderRadius={30}
        />

        {/* <TouchableOpacity
          activeOpacity={0.6}
          onPress={()=>{
           props.onCloseModal()

      

          }}

           style={styles.optionContainer}>
          <AntDesign  name='edit' size={moderateScale(20)} color={colors.black} />
  
          <CustomText label="Quote"  marginLeft={7} fontSize={13}/>
  
        </TouchableOpacity> */}
      </View>
    </BottomSheet>
  );
};

export default ReportSheet;

const styles = StyleSheet.create({
  topLine: {
    width: scale(80),
    height: 5,
    backgroundColor: '#dee2e6',
    alignSelf: 'center',
    borderRadius: 10,
  },
  optionContainer: {
    width: '100%',
    padding: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
