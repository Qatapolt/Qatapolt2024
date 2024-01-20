import 'react-native-gesture-handler';
import 'react-native-reanimated'
import {
  View,
  Text,
  LogBox,
  TouchableOpacity,
  Image,
  PanResponder,
  Alert,
} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useRef, useState} from 'react';
import RootNavigator from './src/routes';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/routes/AuthStack/AuthStack';
import HomeStack from './src/routes/HomeStack/HomeStack';
import SportsNews from './src/screens/Main/SportesNews/SportsNews';
import SportsNewsDetail from './src/screens/Main/SportsNewsDetail/SportsNewsDetail';
import LiveScores from './src/screens/Main/LiveScores/LiveScores';
import FlashMessage from 'react-native-flash-message';
import CustomText from './src/components/CustomText';
import {colors} from './src/utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {images} from './src/assets/images';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  TourGuideProvider, // Main provider
} from 'rn-tourguide';
import {InterFont} from './src/utils/Fonts';
import CustomButton from './src/components/CustomButton';
import {Spacer} from './src/components/Spacer';
import commonStyles from './src/utils/CommonStyles';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

LogBox.ignoreLogs(['VirtualizedLists', 'Warning:...']);
LogBox.ignoreAllLogs();
const firebaseConfig = {
  apiKey: 'AIzaSyDJQjcJiTpN5RmkK5Z6cv2gHGleDRw-PYY',
  authDomain: '',
  projectId: 'qatapolt-2023',
  storageBucket: '',
  messagingSenderId: '',
  appId: '1:146031539666:android:a64f70535d2f212c3bc40b',
  // databaseURL: '',
};
firebase.initializeApp(firebaseConfig);
const App = () => {
  return (
    <Provider store={store}>
      <TourGuideProvider
        preventOutsideInteraction
        tooltipStyle={{
          backgroundColor: 'transparent',
          paddingRight: '20%',
          paddingTop: '10%',
          // backgroundColor:"red",
        }}
        tooltipComponent={props => (
          <View
            style={{
              height:
                props.currentStep.order === 3
                  ? verticalScale(110)
                  : verticalScale(95),
              width: props.currentStep.order === 3 ? scale(260) : scale(250),
              backgroundColor: colors.green,
              borderRadius: scale(8),
              alignItems: 'flex-start',
              // borderWidth:1.2,
              // borderColor:colors.primary,
              // paddingVertical: scale(10),
              padding: scale(5),
              // marginTop:props.currentStep.order === 4?verticalScale(400):0,

              marginLeft:
                props.currentStep.order === 1
                  ? scale(-30)
                  : props.currentStep.order === 2
                  ? scale(60)
                  : props.currentStep.order === 3
                  ? scale(70)
                  : 0,
              bottom:
                props.currentStep.order == 1
                  ? verticalScale(13)
                  : props.currentStep.order == 2
                  ? verticalScale(13)
                  : props.currentStep.order === 3
                  ? verticalScale(30)
                  : 0,
            }}>
            {/* {console.log('Nlnl', props.currentStep)} */}
            <View style={commonStyles.rowContainer}>
              <CustomText
                label={
                  props.currentStep.order === 1
                    ? '🏟️'
                    : props.currentStep.order === 2
                    ? '📝'
                    : props.currentStep.order === 3
                    ? '🌟'
                    : ''
                }
                marginRight={2}
              />

              <CustomText
                color={colors.white}
                fontFamily={InterFont.bold}
                label={
                  props.currentStep.text.includes('Contact')
                    ? 'Help / Support'
                    : props.currentStep.order === 1
                    ? 'Arena:'
                    : props.currentStep.order === 2
                    ? 'Create a Post'
                    : props.currentStep.order === 3
                    ? 'Watchlist'
                    : ''
                }
              />
            </View>
            <Spacer height={5} />

            <CustomText
              color={colors.white}
              fontFamily={InterFont.bold}
              label={props.currentStep.text}
              numberOfLines={4}
            />

            {/* <Text
                    style={[
                      {
                        color: theme.colors.background,
                      },
                      textStyle.b5,
                    ]}
                  >
                    {props.currentStep.text}
                  </Text> */}
            <View
              style={{
                marginTop:
                  props.currentStep.order === 3 ? scale(7) : verticalScale(8),
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {props.currentStep.order === 3 ||
                props.currentStep.text.includes('Contact') ? (
                  <CustomButton
                    onPress={props.handleStop}
                    backgroundColor={colors.white}
                    // marginBottom={90}
                    height={22}
                    width={80}
                    fontSize={11}
                    borderRadius={20}
                    title={'Finish up'}
                  />
                ) : (
                  <>
                    <CustomButton
                      onPress={props.handleNext}
                      backgroundColor={colors.white}
                      height={22}
                      width={80}
                      fontSize={11}
                      borderRadius={20}
                      title={'Next'}
                    />
                    <Spacer width={5} />

                    <CustomButton
                      height={22}
                      onPress={async () => {
                        props.handleStop();
                        await AsyncStorage.removeItem('contactUsTour');
                        await AsyncStorage.removeItem('searchTour');
                      }}
                      width={80}
                      fontSize={11}
                      backgroundColor={colors.white}
                      borderRadius={20}
                      title={'Skip'}
                    />
                  </>
                )}
              </View>

              <CustomText
                // color={colors.inputGray}
                color={colors.black}
                fontFamily={InterFont.bold}
                marginTop={5}
                label={`${props.currentStep.order} of 3`}
              />

              {/*                     
                    <Text
                      fontSize={scale(11)}
                      style={{color: theme.colors.grey2}}
                    >
                      {`0${props.currentStep.order}/05`}
                    </Text> */}
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: -15,
                left:
                  props.currentStep.order === 1
                    ? scale(10)
                    : props.currentStep.order === 2
                    ? scale(110)
                    : props.currentStep.order === 3
                    ? scale(180)
                    : scale(10),
                height: scale(30),
                width: scale(30),
              }}>
              <Image
                source={images.downArrowIcon}
                style={{
                  width: '100%',
                  height: '100%',
                  tintColor: colors.green,
                }}
              />
              {/* <View style={{position:"absolute",left:scale(5.5),top:verticalScale(10)}} >
                  <Entypo name="chevron-thin-down"
                  color={colors.green}
                   size={moderateScale(20)}/>

                  </View> */}
            </View>
          </View>
        )}
        {...{borderRadius: 16, backdropColor: 'transparent'}}>
        <RootNavigator />

        <FlashMessage position="top" />
      </TourGuideProvider>
    </Provider>
  );
};

export default App;
