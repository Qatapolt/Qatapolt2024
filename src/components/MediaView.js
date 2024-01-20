import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useRef} from 'react';
import Modal from 'react-native-modal';
import Carousel from 'react-native-reanimated-carousel';
import {scale} from 'react-native-size-matters';
import MediaViewContainer from './MediaViewContainer';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MediaView = props => {
  const carouselRef = useRef(null);
  // setViewMedia={setViewMedia}
  // viewMedia={viewMedia}

  return (
    <Modal
      isVisible={props.viewMedia}
      onBackdropPress={() => props.setViewMedia(!props.viewMedia)}
      onRequestClose={() => {
        props.setViewMedia(!props.viewMedia);
      }}
      style={{
        flex: 1,
        margin: 0,
        borderRadius: scale(15),
        overflow: 'hidden',
      }}>
      <View
        backgroundColor={'black'}
        // style={{height: Platform.OS == 'ios' ? '90%' : '100%', width: '100%'}}
        overflow="hidden"
        // marginHorizontal="l"
        borderRadius={scale(15)}>
        <Carousel
          defaultIndex={props.imageIndex}
          ref={carouselRef}
          vertical={true}
          loop
          width={screenWidth}
          height={screenHeight}
          data={props?.hightLightData}
          scrollAnimationDuration={1000}
          renderItem={({item, index}) => {
            // console.log("ItemDAtaPosyt",item)
            return (
              <MediaViewContainer
                setViewMedia={props?.setViewMedia}
                userData={props?.userData}
                index={index}
                item={item}
                setShowPostPotions={props.setShowPostPotions}
              />
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default MediaView;

const styles = StyleSheet.create({});
