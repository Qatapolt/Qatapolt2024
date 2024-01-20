import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import {scale, verticalScale} from 'react-native-size-matters';
import {RNCamera} from 'react-native-camera';
import {colors} from '../utils/Colors';
import CustomText from './CustomText';
import {InterFont} from '../utils/Fonts';
import {Spacer} from './Spacer';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import {createThumbnail} from 'react-native-create-thumbnail';


const CustomCamera = ({toggleModal, isModalVisible, onPressStart,path,setPath,setIsVisible,setVideoFile,SendMessageData}) => {
  const [useCameraMode, setUseCameraMode] = useState('Camera');
  const [activeCamera, setActiveCamera] = useState('camera');
  const [isCaptured, setIsCaptured] = useState(false);
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [cameraPath, setCameraPath] = useState("")


  const takePicture = async () => {
    try {
      const options = {
        quality: 0.3,
        height: 1620,
        width: 3072,
        base64: true,
      };
      const data = await cameraRef?.current?.takePictureAsync(options);
      console.log('DataPicture', data?.type);
      const {uri, width, height} = data;
      const stats = await RNFS?.stat(uri);
      const type = uri?.substring(uri?.lastIndexOf('.') + 1);
      const fileName = uri?.split('/').pop();
      const imageData = {
        fileName: fileName,
        fileSize: stats?.size,
        name: fileName,
        path: stats?.path,
        type: "image",
        uri: stats?.path,
        size: stats?.size,
      };
      console.log('ckndkcdImagePath', imageData);

      setPath(imageData);
      setCameraPath(imageData)
      setIsCaptured(true);
    } catch (e) {
      // alert(e.message);
    }
  };

  const startRecording = async () => {
    RNCamera.Constants.RecordAudioPermissionStatus;
    if (cameraRef.current) {
      const options = {
        quality: 0.3,
        audio: true,
        maxDuration: Platform.OS == 'ios' ? 60 : 58,
        duration: Platform.OS == 'ios' ? 60 : 58,
        base64: true,
      };
      const data = await cameraRef.current.recordAsync(options);
      const {uri, width, height} = data;
      const stats = await RNFS.stat(uri);
      const type = uri.substring(uri.lastIndexOf('.') + 1);
      const fileName = uri.split('/').pop();
      const imageData = {
        fileName: fileName,
        fileSize: stats.size,
        name: fileName,
        path: stats.path,
        type: "video",
        uri: stats.path,
        size: stats.size,
      };
      createThumbnail({
        url: imageData.uri,
        timeStamp: 10000,
      })
        .then(response => {
          imageData['thumbnail'] = response.path;
          setVideoFile(imageData);
          // console.log('AllFile', file);
        })
        .catch(err => console.log({err}));

      setPath(imageData);
      setCameraPath(imageData)
      setIsCaptured(true);
      stopTimer();
      setIsRecording(false);
      SendMessageData?.(imageData)
    }
  };

  const intervalRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setElapsedTime(0);
  };

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  return (
    <Modal
      style={{
        backgroundColor: 'transparent',
        margin: 0,
        alignItems: 'center',
        flex: 1,
      }}
      onBackButtonPress={() => {
        toggleModal();
      }}
      onBackdropPress={toggleModal}
      isVisible={isModalVisible}>
      <View
        style={{
          // borderRadius: verticalScale(20),
          paddingTop: Platform.OS == 'ios' ? 50 : 10,
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: colors.darkBlack,
        }}>
        {!isCaptured ? (
          <>
            <RNCamera
              ref={cameraRef}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              // className="flex-1 justify-end items-center"
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              captureAudio={true}
            />
            <TouchableOpacity
                style={{
                  position: 'absolute',
                  top:70,
                  left:10,
                  alignItems:"center",
                  justifyContent:"center",
                  width:30,height:30,
               
                }}
                onPress={()=>{

                  setIsVisible(false)
                  setCameraPath("")
                  setIsCaptured(false)

                }}
                >
                                  <Entypo name="circle-with-cross" size={30} color={colors.graySearch} />

                  </TouchableOpacity>
            <View
              style={{
                height: 100,
                width: '100%',
                backgroundColor: colors.darkBlack,
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                paddingTop: 30,
              }}>
              <CustomText
                label="VIDEO"
                onPress={() => {
                  setActiveCamera('video');

                
                }}
                color={activeCamera == 'video' ? colors.green : colors.white}
                fontFamily={InterFont.semiBold}
              />
              <Spacer width={10} />

              <CustomText
                label="PHOTO"
                onPress={() => {
                  setActiveCamera('camera');
                }}
                color={activeCamera == 'camera' ? colors.green : colors.white}
                fontFamily={InterFont.semiBold}
              />


            

              <View
                style={{
                  position: 'absolute',
                  bottom: 110,
                  alignItems:"center",
                  justifyContent:"center"
               
                }}>
                  {
                    activeCamera=="video" && isRecording&&(
                      <View  style={{width:80,height:35,backgroundColor:colors.green,alignItems:"center",justifyContent:"center",borderRadius:5,marginBottom:5}}>
                        <CustomText
                        label={formatTime(elapsedTime)}
                        color={colors.white}
                        size={20}
                        />

           
          </View>

                    )
                  }
                  <TouchableOpacity
                  style={{
                    width: 70,
                    height: 70,
                    borderWidth: 2,
                    borderRadius: 100,
                    borderColor: colors.white,
                    padding: 3,

                  }}
                  >


                  <TouchableOpacity
                  onPress={() => {
                    if (activeCamera == 'camera') {
                      takePicture();
                    } else {
                      if (!isRecording) {
                        setIsRecording(!isRecording);
                        startTimer();
                        startRecording();
                      } else {
                        setIsRecording(false);
                        setIsCaptured(true)
                        stopTimer();
                        stopRecording();
                      }
                      // startRecording();
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: colors.white,
                    borderRadius: 100,
                  }}>

                  </TouchableOpacity>

                  </TouchableOpacity>
                
              
              </View>
            </View>
          </>
        ) : (
          <>
            {cameraPath?.type?.includes("video")? (
              <View
                style={{
                  // paddingTop: Platform.OS == 'ios' ? 50 : 10,
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  backgroundColor: colors.darkBlack,
                }}>
                <Video
                  source={{uri: cameraPath?.uri}}
                  style={{ width: '100%', height: '100%'}}
                  // resizeMode={}
                  // onTouchStart={() => setIsPause(!isPause)}
                  // paused={isPause}
                  // onLoad={(event) => {
                  //   setIsPause(false);
                  //   const { width, height } = event.naturalSize;
                  //   const aspectRatio = width / height;
                  //   if (aspectRatio > imageAspectRatio) {
                  //     setResizeMode("contain");
                  //   } else {
                  //     setResizeMode("cover");
                  //   }
                  // }}
                />
              </View>
            ) : (
              <View style={{flex: 1}}>
                <ImageBackground
                  source={{uri: cameraPath?.uri}}
                  style={{flex: 1, width: '100%', height: '100%'}}
                  resizeMode={'cover'}
                  resizeMethod="scale"
                  // onLoad={(event) => {
                  //   const { width, height } = event.nativeEvent.source;
                  //   const aspectRatio = width / height;
                  //   if (aspectRatio > imageAspectRatio) {
                  //     setResizeMode("contain");
                  //   } else {
                  //     setResizeMode("cover");
                  //   }
                  // }}
                />
              </View>
            )}

            <View
              style={{
                height: 100,
                width: '100%',
                backgroundColor: colors.darkBlack,
                alignContent: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
                paddingTop: 30,
              }}>
              <TouchableOpacity
                style={{width: 40, height: 40}}
                onPress={()=>{
                  setIsVisible(false)
                  setCameraPath("")
                  setIsCaptured(false)
                  SendMessageData?.(path)

                }}>
                <Octicons name="check" size={30} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: 40, height: 40}}
                onPress={() => {
                  setIsCaptured(false);
                  setPath('');
                  setCameraPath("")
                }}>
                <Entypo name="cross" size={30} color={colors.white} />
              </TouchableOpacity>

              {/* <CustomText
            label="VIDEO"
            onPress={() => {
              setActiveCamera('video');
            }}
            color={activeCamera == 'video' ? colors.green : colors.white}
            fontFamily={InterFont.semiBold}
          /> */}
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default CustomCamera;

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    top: '20%',
    start: '13%',
  },
  textContainer: {
    position: 'absolute',
    top: '55%',
    start: '20%',
  },
  proBtn: {
    alignItems: 'center',
    width: '100%',
  },
});
