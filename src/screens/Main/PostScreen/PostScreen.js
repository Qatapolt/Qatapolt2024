import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  Alert,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {colors} from '../../../utils/Colors';
import CustomText from '../../../components/CustomText';
import {icons} from '../../../assets/icons';
import {Spacer} from '../../../components/Spacer';
import {Avatar, Divider, Image, ListItem} from 'react-native-elements';
import TopTabs from '../../../components/TopTabs';
import commonStyles, {PH10, PH20} from '../../../utils/CommonStyles';
import {images} from '../../../assets/images';
import GradientButton from '../../../components/GradientButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {InterFont} from '../../../utils/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomHeader from '../../../components/CustomHeader';
import Entypo from 'react-native-vector-icons/Entypo';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import ActionSheet from 'react-native-actionsheet';
import Geocoder from 'react-native-geocoding';
import CustomButton from '../../../components/CustomButton';
import CreatePostBottom from './Molecules/CreatePostBottom';
import {CheckBox} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import CustomImage from '../../../components/CustomImage';
import {uploadImage, uploadVideo} from '../../services/StorageServics';
import {SavePost} from '../../services/PostServices';
import {useFocusEffect} from '@react-navigation/native';
import VideoPlayer from 'react-native-video-player';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {
  getAllUSers,
  getSpecificUser,
  userPost,
  userPostId,
} from '../../services/UserServices';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {createThumbnail} from 'react-native-create-thumbnail';
import {cameraPermissionError} from '../../../utils/Permissions';
import UserContainer from './Molecules/UserContainer';
import {
  authData,
  setCurrentLocation,
  setEmptyPostLocation,
} from '../../../redux/reducers/authReducer';
import {ImageHeight, ImageWidth} from '../../../utils/Data';
import PostHeader from './Molecules/PostHeader';
import {locationPermissionError} from '../../../utils/Commons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  requestCameraPermission,
  requestGalleryPermission,
} from '../../services/Permissions';
import CustomCamera from '../../../components/CustomCamera';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
const PostScreen = ({navigation, route}) => {
  const height = Dimensions.get('screen').height;
  const viewref = useRef(null);
  const useTextInput = useRef();
  const currentUser = useSelector(state => state.auth?.currentUser);
  const postLocation = useSelector(state => state.auth?.createPostLocation);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [checkFreeAgent, setCheckFreeAgent] = useState(false);
  const [loading, setLoading] = useState(false);
  const actionSheetRef = useRef();
  const [imageFile, setImageFile] = useState('');
  const [VideoFile, setVideoFile] = useState('');
  const dispatch = useDispatch();
  const [postDescription, setPostDescription] = useState('');
  const [userData, setUserData] = useState([]);
  const [mentionedUsers, setMentionedUsers] = useState([]);
  const [placeId, setPlaceId] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
  const [visibleFlatList, setVisibleFlatList] = useState(false);
  const handleOpenActionSheet = () => {
    actionSheetRef.current?.show();
  };

  useFocusEffect(
    React.useCallback(() => {
      requestPermission();
      if (route?.params?.selectedLocation === undefined) {
        setTimeout(() => {
          handleGetLocation();
        }, 1000);
      }
      return async () => {
        setPostDescription('');
        setImageFile('');
        setCheckFreeAgent(false);
      };
    }, []),
  );
  useEffect(() => {
    if (postDescription.includes('@') && visibleFlatList === false) {
      try {
        viewref?.current
          ?.fadeOut()
          .then(
            () => console.log('visibleFlatList ===>', visibleFlatList),
            setVisibleFlatList(true),
          );
        getAllUSers(setUserData, currentUser.uid);
      } catch (error) {
        console.log('error ====>', error);
      }
    }
  }, [postDescription]);

  useEffect(() => {
    const selectedLocation = route?.params?.selectedLocation;
    if (route?.params?.selectedLocation !== undefined) {
      setLocationDetails(selectedLocation);
    }
  }, [route?.params]);
  async function requestPermission() {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]).then(result => {
          // console.log('requestPermission result', result);
        });
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const onPressBackIcon = () => {
    if (
      locationDetails !== null &&
      route?.params?.selectedLocation !== undefined
    ) {
      route.params = {
        ...route.params,
        selectedLocation: undefined,
      };

      setLocationDetails(null);

      setMentionedUsers([]);
      setPostDescription('');
      navigation.goBack();
    } else if (
      locationDetails !== null &&
      route?.params?.selectedLocation === undefined
    ) {
      setLocationDetails(null);

      setMentionedUsers([]);
      setPostDescription('');
      navigation.goBack();
    } else {
      setMentionedUsers([]);

      setPostDescription('');
      navigation.goBack();
    }
  };

  const Header = ({
    postDescription,
    imageUrl,
    SavePost,
    loading,
    videoFile,
  }) => (
    <PH10>
      <CustomHeader
        LeftSide={() => (
          <View>
            <TouchableOpacity onPress={onPressBackIcon}>
              <Ionicons
                name="chevron-back"
                color={colors.black}
                size={moderateScale(30)}
              />
            </TouchableOpacity>
          </View>
        )}
        Center={() => (
          <CustomText
            label={'Create Post'}
            fontSize={16}
            marginLeft={30}
            textAlign="center"
            fontFamily={InterFont.bold}
            color={colors.black}
            // fontFamily={InterFont.bold}
          />
        )}
        RightSide={() => (
          <View>
            <CustomButton
              fontSize={11}
              disabled={imageUrl || postDescription || videoFile ? false : true}
              onPress={SavePost}
              loading={loading}
              height={27}
              borderRadius={30}
              color={colors.white}
              backgroundColor={
                imageUrl || postDescription || videoFile
                  ? colors.green
                  : colors.lightGray
              }
              title={'Publish'}
              width={80}
            />
          </View>
        )}
      />
    </PH10>
  );

  const onOpenCamera = async () => {
    const cameraPermission = await requestCameraPermission();
    if (cameraPermission == 'granted') {
      setIsCameraActive(true);
    } else if (cameraPermission == 'blocked') {
      if (Platform.OS == 'android') {
        Linking.openSettings();
      } else {
        openSettings();
      }
    }
  };
  const onPostImagevideoSelect = () => {
    Alert.alert(
      'Qatapolt Instruction',
      'If you Want to post a video, please select less than 60 seconds',
      [
        {
          text: 'OK',
          onPress: () => {
            onPickGallery();
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };
  const onPickGallery = async () => {
    const cameraPermission = await requestGalleryPermission();
    if (cameraPermission == 'granted') {
      try {
        const res = await ImagePicker.openPicker({
          width: 300,
          height: 400,
          mediaType: 'any',
        });

        if (res) {
          const file = {
            uri: res.path,
            fileName: res.path,
            type: res.mime,
            thumbnail: '',
          };

          let videDuration = Number(res.duration);
          console.log('DurationData', videDuration);
          if (file.type?.includes('video')) {
            if (videDuration >= 60000) {
              Alert.alert('Video length must be smaller than 60 seconds');
            } else {
              createThumbnail({
                url: file.uri,
                timeStamp: 10000,
              })
                .then(response => {
                  file['thumbnail'] = response.path;
                  setVideoFile(file);
                })
                .catch(err => console.log({err}));
            }
          } else {
            setImageFile(file);
            props.SendMessageData(file);
          }
        }
      } catch (error) {
        cameraPermissionError(error);
      }
    } else if (cameraPermission == 'blocked') {
      if (Platform.OS == 'android') {
        Linking.openSettings();
      } else {
        openSettings();
      }
    }
  };
  const onImagePick = async () => {
    try {
      if (VideoFile != '') {
        setVideoFile('');
      }
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        mediaType: 'photo',
        multiple: false,
      });

      if (!result.cancelled) {
        const file = {
          uri: result.path,
          fileName: result.path,
          type: result.mime,
          // duration: res.assets[0]?.duration,
        };

        // console.log('ResultData', result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSavePost = async () => {
    setLoading(true);
    const postData = {
      uriData: {
        uri: '',
        type:
          VideoFile != ''
            ? VideoFile.type
              ? VideoFile.type
              : ''
            : imageFile.type
            ? imageFile.type
            : '',
      },
      description: postDescription,
      thumbnail: '',
      freeAgent: checkFreeAgent,
      postId: uuid.v4(),
      medalsId: [],
      location: postLocation,
      userId: currentUser.uid,
      medals: 0,
      views: 0,
      ViewsId: [],
      createAt: new Date(),
      externalShare: 0,
      internalShare: 0,
      rePostCount: 0,
      rePostIds: [],
      mentionedUsers: mentionedUsers,
      comments: [],
      comments_Count: 0,
    };
    if (imageFile.uri) {
      const linkData = await uploadImage(imageFile.uri, currentUser.uid);
      postData.uriData['uri'] = linkData;
    } else if (VideoFile.uri) {
      const thumbnailData = await uploadImage(
        VideoFile.thumbnail,
        currentUser.uid,
      );
      postData.uriData['thumbnail'] = thumbnailData;

      const linkData = await uploadVideo(VideoFile.uri, currentUser.uid);
      postData.uriData['uri'] = linkData;
    }
    try {
      await SavePost(postData);
      const userPostIdsData = {
        postId: postData?.postId,
        createAt: postData?.createAt,
        type: postData?.uriData.type,
      };
      await userPostId(currentUser.uid, userPostIdsData);
      const data = await getSpecificUser(currentUser.uid);
      dispatch(authData(data));
      dispatch(setEmptyPostLocation());

      if (checkFreeAgent) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Free Agents', freeAgent: true}],
        });
      } else {
        let myObj = {
          success: true,
        };
        await AsyncStorage.setItem('NEW_POST', JSON.stringify(myObj));
        navigation.goBack();
      }

      setLocationDetails(null);
      setMentionedUsers([]);
      setImageFile('');
      setVideoFile('');
      setPostDescription('');
    } catch (error) {
      console.log('ImageUploading error', error);
    }
    setLoading(false);
  };
  const onSelectUser = item => {
    const mentionSymbol = '@';
    if (postDescription.includes(mentionSymbol)) {
      console.log('Before state update:', visibleFlatList);
      const updatedDescription = postDescription.replace(mentionSymbol, '');
      setPostDescription(`${updatedDescription}${item.username}`);
      setMentionedUsers(prevUsers => [...prevUsers, item.uid]);
      console.log('===>', visibleFlatList);
      try {
        viewref?.current
          ?.fadeOutUpBig()
          .then(
            () => console.log('visibleFlatList ===>', visibleFlatList),
            setVisibleFlatList(false),
          );
      } catch (error) {
        console.log('error ==>', error);
      }
    }
  };
  const renderSearchUser = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          onSelectUser(item);
        }}>
        <UserContainer item={item} />
      </TouchableOpacity>
    );
  };

  const handleGetLocation = async () => {
    const apiKey = 'AIzaSyDXoHO79vxypTv8xL4V10cf5kFpIYDO9Rk';
    const result = await request(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.ACCESS_FINE_LOCATION,
    );

    if (result && result === RESULTS.GRANTED) {
      try {
        Geolocation.getCurrentPosition(
          position => {
            const latitude = position?.coords?.latitude;
            const longitude = position?.coords?.longitude;
            const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

            axios
              .get(geocodingApiUrl)
              .then(response => {
                const results = response.data.results;
                if (results && results.length > 0) {
                  const firstResult = results[0];
                  const resultPlaceId = firstResult.place_id;
                  setPlaceId(resultPlaceId);
                  const placesApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${resultPlaceId}&key=${apiKey}`;

                  axios
                    .get(placesApiUrl)
                    .then(placesResponse => {
                      const result = placesResponse.data.result;
                      if (result) {
                        // Extracting specific components from the formatted address
                        const addressComponents = result.address_components;
                        const city =
                          addressComponents.find(
                            component =>
                              component.types.includes('locality') ||
                              component.types.includes(
                                'administrative_area_level_2',
                              ),
                          )?.long_name || '';

                        const state =
                          addressComponents.find(component =>
                            component.types.includes(
                              'administrative_area_level_1',
                            ),
                          )?.long_name || '';

                        const country =
                          addressComponents.find(component =>
                            component.types.includes('country'),
                          )?.long_name || '';

                        const formattedAddress = `${city}, ${state}, ${country}`;
                        setLocationDetails(formattedAddress);
                      }
                    })
                    .catch(placesError => {
                      console.error(
                        'Error fetching place details:',
                        placesError,
                      );
                    });
                }
              })
              .catch(error => {
                console.error('Error fetching location details:', error);
              });
          },
          error => {
            console.log(error);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } catch (error) {
        console.log('Location error:', error);
      }
    } else {
      // If permission is not granted, request permission again
      Alert.alert(
        'Permission Denied',
        'Please grant location permission to use this feature.',
        [
          {
            text: 'OK',
            onPress: async () => {
              try {
                const permissionResult = await request(
                  Platform.OS === 'android'
                    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                    : PERMISSIONS.IOS.ACCESS_FINE_LOCATION,
                );

                if (permissionResult === RESULTS.GRANTED) {
                  // Permission granted after the second attempt
                  handleGetLocation();
                } else {
                  // Handle case where permission is still not granted
                  console.log('Permission still not granted.');
                }
              } catch (permissionError) {
                console.error(
                  'Error requesting location permission:',
                  permissionError,
                );
              }
            },
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
      );
    }
  };

  const handleTextChange = text => {
    setPostDescription(text);
  };

  const renderHighlightedText = () => {
    const components = [];
    let currentText = '';
    let lastIndex = 0;

    for (let i = 0; i < postDescription.length; i++) {
      if (postDescription[i] === '@') {
        // If there is text before the '@', render it
        if (currentText) {
          components.push(
            <Text
              style={{
                fontSize: verticalScale(12),
                fontFamily: InterFont.regular,
                color: colors.inputGray,
              }}
              key={`text_${lastIndex}`}>
              {currentText}
            </Text>,
          );
          currentText = ''; // Reset currentText
        }

        // Check if the '@' is followed by a valid username
        const usernameStart = i + 1;
        while (
          i + 1 < postDescription.length &&
          postDescription[i + 1].match(/[a-zA-Z0-9_]/)
        ) {
          i++;
        }

        const username = postDescription.substring(usernameStart, i + 1);

        // Render only if '@' is entered manually
        if (usernameStart !== i + 1) {
          components.push(
            <TouchableOpacity
              key={`mention_${lastIndex}`}
              onPress={() => handleUsernamePress(username)}>
              <Text style={styles.mention}>{`@${username}`}</Text>
            </TouchableOpacity>,
          );
        } else {
          // If '@' is not entered manually, render as regular text
          currentText += '@';
        }

        lastIndex = i + 1;
      } else {
        currentText += postDescription[i];
      }
    }

    // If there is remaining text after the last '@', render it
    if (currentText) {
      components.push(
        <Text
          style={{
            fontSize: verticalScale(12),
            fontFamily: InterFont.regular,
            color: colors.inputGray,
          }}
          key={`text_${lastIndex}`}>
          {currentText}
        </Text>,
      );
    }

    return components;
  };
  const handleUsernamePress = username => {
    // Implement your navigation logic here, e.g., navigate to the user's profile
    console.log(`Navigating to profile of ${username}`);
  };
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? responsiveHeight(-1) : responsiveHeight(1)
        }>
        <SafeAreaView style={{...styles.container}}>
          <View style={{flex: 1}}>
            <Header
              SavePost={onSavePost}
              loading={loading}
              postDescription={postDescription}
              imageUrl={imageFile.uri}
              videoFile={VideoFile.uri}
              setLocationDetails={setLocationDetails}
              route={route}
            />
            <Spacer height={5} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <Spacer height={10} />
              <PostHeader currentUser={currentUser} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <View style={{flex: 1}}>
                  {currentUser?.freeAgent && (
                    <>
                      <CheckBox
                        // center
                        checkedColor={colors.green}
                        title={<CustomText label="Free Agent Post" />}
                        checked={checkFreeAgent}
                        onPress={() => setCheckFreeAgent(!checkFreeAgent)}
                      />
                    </>
                  )}
                </View>

                {locationDetails && (
                  <View
                    style={{
                      ...commonStyles.rowContainer,
                      ...styles.locationContainer,
                      padding: 10,
                    }}>
                    <Octicons
                      name="location"
                      size={moderateScale(10)}
                      color={colors.inputGray}
                    />

                    <CustomText
                      label={locationDetails}
                      marginLeft={5}
                      numberOfLines={1}
                      fontSize={moderateScale(8)}
                    />
                  </View>
                )}
              </View>

              <PH10>
                <View
                  style={{
                    paddingHorizontal: 10,
                    borderRadius: scale(10),
                  }}>
                  <TextInput
                    multiline={true}
                    ref={useTextInput}
                    scrollEnabled={false}
                    value={postDescription}
                    onChangeText={handleTextChange}
                    style={{
                      fontSize: verticalScale(12),
                      fontFamily: InterFont.regular,
                      color: 'transparent',
                    }}
                    placeholder={'Create Your Own Luck...'}
                    placeholderTextColor={colors.inputGray}
                  />
                  <View style={styles.textContainer}>
                    {renderHighlightedText()}
                  </View>
                </View>

                <Spacer height={10} />
                {imageFile || VideoFile ? (
                  <View
                    style={{
                      height: height / 2,
                      width: '100%',
                      borderRadius: scale(10),

                      borderWidth: 2,
                      borderColor: colors.superLightGray,
                      alignItems: 'center',
                      overflow: 'hidden',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setImageFile('');
                        setVideoFile('');
                      }}
                      style={{...styles.iconsPosition, top: 10}}>
                      <Image
                        source={icons.trashVector}
                        style={{height: 16, width: 16}}
                      />
                    </TouchableOpacity>

                    {imageFile?.type?.includes('image') ? (
                      <Image
                        resizeMode="cover"
                        containerStyle={{
                          width: '100%',
                          height: '100%',
                          borderRadius: scale(10),
                        }}
                        source={{uri: imageFile.uri}}
                      />
                    ) : (
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'red',
                        }}>
                        <VideoPlayer
                          autoplay={false}
                          defaultMuted={true}
                          resizeMode="cover"
                          style={{width: '100%', height: '100%'}}
                          playButton={true}
                          pauseOnPress={true}
                          // onPress={() => props.setViewPostModal(true)}
                          //   videoWidth={100}
                          //   videoHeight={150}
                          video={{uri: VideoFile?.uri}}
                          thumbnail={{uri: VideoFile?.thumbnail}}

                          // controls={true}
                          // onPause={true}
                          // videoHeight={300}
                          // defaultMuted={true}
                          // styles={{window}}

                          // containerStyle={styles.postContainer}
                          // video={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
                          // navigator={this.props.navigator}
                        />
                      </View>
                    )}
                  </View>
                ) : (
                  <View>
                    {postDescription.includes('@') ? (
                      <Animatable.View
                        animation={'fadeIn'}
                        ref={viewref}
                        duration={500}
                        useNativeDriver
                        value={100}
                        style={{
                          height: 400,
                          // position: 'absolute',
                          width: '100%',
                          top: 0,
                          zIndex: 9999999999999,
                          elevation: 5,
                          overflow: 'hidden',
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        }}>
                        <FlatList
                          data={userData}
                          keyExtractor={item => item.uid.toString()}
                          renderItem={renderSearchUser}
                        />
                      </Animatable.View>
                    ) : null}
                  </View>
                )}
              </PH10>
            </ScrollView>
            <CreatePostBottom
              onImagePick={onImagePick}
              onOpenCamera={() => {
                onOpenCamera();
              }}
              onPressLocation={() => {
                navigation.navigate('SearchLocation');
                // handleGetLocation();
              }}
              onPickGallery={onPostImagevideoSelect}
              navigation={navigation}
              setPostDescription={setPostDescription}
              useTextInput={useTextInput}
              handleOpenGallery={onPostImagevideoSelect}
              handleOpenActionSheet={handleOpenActionSheet}
            />

            <ActionSheet
              ref={actionSheetRef}
              title={'Add Image'}
              options={[
                'Choose Image from gallery',
                'Choose Video from gallery',
                'Cancel',
              ]}
              cancelButtonIndex={2}
              onPress={index => {
                if (index == 0) {
                  onPickGallery(false);
                }
                if (index == 1) {
                  onPickGallery(true);
                }
              }}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>

      <CustomCamera
        path={imageFile}
        setPath={setImageFile}
        setIsVisible={setIsCameraActive}
        isModalVisible={isCameraActive}
        setVideoFile={setVideoFile}
      />
    </>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 40,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postContainer: {
    // aspectRatio: 1,
    width: '100%',
    height: 350,
    // flex: 1,
  },
  postFooterIcon: {
    width: 24,
    height: 26,
  },
  iconsPosition: {
    backgroundColor: colors.black1,
    height: scale(30),
    width: scale(30),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 99,
    right: 10,
  },
  iconsEditPosition: {
    backgroundColor: colors.black1,
    height: scale(30),
    width: scale(30),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 99,
    left: 10,
    paddingLeft: 2,
  },
  locationContainer: {
    height: verticalScale(30),
    minWidth: '20%',
    maxWidth: '30%',
    backgroundColor: colors.superLightGray,
    borderRadius: scale(30),
    borderWidth: 0.5,
    borderColor: colors.lightGray,
    alignItems: 'center',
    padding: scale(15),
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: scale(10),
  },
  //
  mention: {
    fontSize: verticalScale(12),
    fontFamily: InterFont.regular,
    color: colors.green,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'absolute',
    top: 13,
    left: 12.5,
    right: 10,
  },
});
