import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import commonStyles from '../../../../utils/CommonStyles';
import {images} from '../../../../assets/images';
import {scale, verticalScale} from 'react-native-size-matters';
import {Spacer} from '../../../../components/Spacer';
import {useSelector} from 'react-redux';
import UserHightLightContainer from '../../UserProfile/Molecules/UserHightLightContainer';
import MediaView from '../../../../components/MediaView';
import _ from 'lodash';

const Highlights = ({route}) => {
  const [viewMedia, setViewMedia] = useState(false);
  const [userData, setUserData] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const [hightLightData, setHightLightData] = useState([]);
  const authDate = useSelector(state => state.auth?.currentUser);

  // useEffect(() => {
  //   const filterIds=authDate.PostIds?.filter(item=>item.type!="")
  //   setUserData(authDate)

  //   setHightLightData(filterIds)

  // }, [authDate])

  useEffect(() => {
    const filterIds = authDate.PostIds?.filter(item => item.type != '');
    setUserData(authDate);

    const sortedByDate = _.orderBy(filterIds, item => item?.createAt, ['desc']);
    setHightLightData(sortedByDate);
  }, [authDate]);
  const renderHightLightData = ({item, index}) => {
    return (
      <UserHightLightContainer
        index={index}
        setViewMedia={setViewMedia}
        setImageIndex={setImageIndex}
        postId={item.postId}
      />
    );
  };

  return (
    <>
      <View style={commonStyles.main}>
        <FlatList
          data={hightLightData}
          numColumns={3}
          style={{marginHorizontal: 20}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderHightLightData}
        />
      </View>
      <MediaView
        setViewMedia={setViewMedia}
        viewMedia={viewMedia}
        imageIndex={imageIndex}
        userData={userData}
        hightLightData={hightLightData}
      />
    </>
  );
};

export default Highlights;

const styles = StyleSheet.create({});
