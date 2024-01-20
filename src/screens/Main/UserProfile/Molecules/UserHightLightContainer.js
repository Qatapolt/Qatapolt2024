import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getSpecificPost} from '../../../services/PostServices';
import commonStyles from '../../../../utils/CommonStyles';
import {scale, verticalScale} from 'react-native-size-matters';
import {icons} from '../../../../assets/icons';
import {colors} from '../../../../utils/Colors';
import FastImage from 'react-native-fast-image';

const UserHightLightContainer = props => {
  const [hightLightData, setHightLightData] = useState({});

  useEffect(() => {
    let isMounted = true;

    const getPostData = async () => {
      try {
        const data = await getSpecificPost(props?.postId);

        if (isMounted) {
          setHightLightData(data);
        }
      } catch (error) {
        // Handle error
      }
    };

    getPostData();

    return () => {
      // Cleanup function to set isMounted to false when unmounting
      isMounted = false;
    };
  }, [props]);

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
          <FastImage
            style={commonStyles.img}
            resizeMode="cover"
            source={{uri: hightLightData?.uriData?.uri}}
          />
        ) : (
          <>
            <FastImage
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
              }}
            />

            <Image
              source={icons.pause}
              style={{
                width: scale(20),
                height: scale(20),
                position: 'absolute',
                tintColor: colors.white,
                left: '42%',
                top: '40%',
              }}
            />
          </>
        )}
      </TouchableOpacity>
    </>
  );
};

export default UserHightLightContainer;

const styles = StyleSheet.create({});
