import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getSpecificPost} from '../../../services/PostServices';
import commonStyles from '../../../../utils/CommonStyles';
import {scale, verticalScale} from 'react-native-size-matters';
import {icons} from '../../../../assets/icons';
import {colors} from '../../../../utils/Colors';

const OtherUserHightLightContainer = props => {
  const [hightLightData, setHightLightData] = useState({});

  useEffect(() => {
    getPostData();
  }, [props]);

  const getPostData = async () => {
    const data = await getSpecificPost(props?.postId);

    setHightLightData(data);
  };
  // console.log('HighList', hightLightData);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          props.setImageIndex(props.index);
          props.setViewMedia(true);
        }}
        style={{
          width: '30%',
          height: verticalScale(100),
          borderRadius: scale(5),
          overflow: 'hidden',
          marginHorizontal: scale(5),
          marginBottom: verticalScale(10),
        }}>
        {hightLightData?.uriData?.type.includes('image') ? (
          <Image
            style={commonStyles.img}
            resizeMode="cover"
            source={{uri: hightLightData?.uriData?.uri}}
          />
        ) : (
          <>
            <Image
              style={commonStyles.img}
              resizeMode="cover"
              source={{uri: hightLightData?.uriData?.thumbnail}}
            />
            <View
              style={{
                width: scale(40),
                height: scale(40),
                position: 'absolute',
                top: '30%',
                padding: scale(3),
                borderRadius: scale(100),
                backgroundColor: colors.black,
                opacity: 0.4,
                alignSelf: 'center',
              }}></View>

            <Image
              source={icons.pause}
              style={{
                width: scale(20),
                height: scale(20),
                position: 'absolute',
                tintColor: colors.white,
                left: '40%',
                top: '37%',
              }}
            />
          </>
        )}
      </TouchableOpacity>
    </>
  );
};

export default OtherUserHightLightContainer;

const styles = StyleSheet.create({});
