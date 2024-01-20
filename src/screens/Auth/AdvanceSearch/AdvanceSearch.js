import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import commonStyles, {PH20, PH10} from '../../../utils/CommonStyles';
import {Spacer} from '../../../components/Spacer';
import {colors} from '../../../utils/Colors';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import {icons} from '../../../assets/icons';
import {images} from '../../../assets/images';
import {InterFont} from '../../../utils/Fonts';
import AgeRange from './molecules/AgeRange';
import GanderConatiner from './molecules/GanderConatiner';
import GradientButton from '../../../components/GradientButton';
import HeigthBottomSheet from './molecules/HeigthBottomSheet';
import CustomHeader from '../../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import CustomText from '../../../components/CustomText';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomLocationBottomSheet from '../../../components/CustomLocationBottomSheet';
import {FilterAdvanceSearchUser} from '../../services/UserServices';
import SimpleLoader from '../../../utils/SimpleLoader';
import loaderAnimation from '../../../assets/Loaders';
import {useDispatch, useSelector} from 'react-redux';
import {setAdvanceSearch} from '../../../redux/reducers/advanceSearch';
import {positionSkillValidate} from '../../../utils/Commons';
import {setPositionsAndSkills} from '../../../redux/reducers/authReducer';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomPicker from '../../../components/CustomPicker';
const AdvanceSearch = ({navigation, route}) => {
  const [minAge, setMinAge] = useState();
  const [maxAge, setMaxAge] = useState();
  const [finalAge, setFinalAge] = useState();
  const [minHeight, setMinHeight] = useState();
  const [maxHeight, setMaxHeight] = useState();
  const [finalHeight, setFinalHeight] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [heightModalVisible, setHeightModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [heightValue, setHeightValue] = useState('');
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [advanceSearchData, setAdvanceSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const getSearchData = useSelector(state => state.advanceSearch);
  const [selectionType, setSelectionType] = useState('');
  const [signupId, setSignupId] = useState(-1);

  const [signupValues, setSignupValues] = useState({
    accountType: '',
    username: '',
    country: '',
    age: '',
    gender: '',
    city: '',
    height: '',
    freeAgent: false,
    selectSport: '',
    sportEmoji: '',
    position: '',
    strongHand: '',
    strongFoot: '',
    skill1: '',
    skill2: '',
    skill3: '',
    bio: '',
    stats: '',
  });
  console.log('signupValues', signupValues);
  useEffect(() => {
    if (cityModalVisible === true) {
      setSelectionType('cities');
    } else if (countryModalVisible === true) {
      setSelectionType('country');
    } else {
    }
  }, [countryModalVisible, cityModalVisible]);
  const SignupData = [
    {
      id: 2,
      withLabel: 'Country',
      placeholder: 'Select Country',
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues.country,
      editable: false,
      rigthIcon: icons.dropdown,
      onPress: () => {
        setCountryModalVisible(true);
      },
      onRightPress: () => {
        setCountryModalVisible(true);
      },
    },
    {
      id: 3,
      withLabel: 'City / Town',
      placeholder: 'Select City / Town',
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues.city,
      editable: false,
      rigthIcon: icons.dropdown,
      onPress: () => {
        setCityModalVisible(true);
      },
      onRightPress: () => {
        setCityModalVisible(true);
      },
    },
    {
      id: 4,
      withLabel: 'Select Sport',
      placeholder: 'Sport',
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues.selectSport,
      editable: false,
      rigthIcon: icons.dropdown,
      onPress: () => {
        setModalVisible(true);
      },
      onRightPress: () => {
        setModalVisible(true);
      },
    },
    {
      id: 6,
      withLabel: 'Select Position',
      placeholder: 'Position',
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues.position,
      editable: false,
      rigthIcon: icons.dropdown,
      onPress: () => {
        setModalVisible(true);
      },
      onRightPress: () => {
        setModalVisible(true);
      },
    },

    {
      id: 12,
      withLabel: 'Strong Hand',
      placeholder: 'Strong Hand',
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues.strongHand,
      editable: false,
      rigthIcon: icons.dropdown,
      onPress: () => {
        setModalVisible(true);
      },
      onRightPress: () => {
        setModalVisible(true);
      },
    },
    {
      id: 13,
      withLabel: 'Strong Foot',
      placeholder: 'Strong Foot',
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues.strongFoot,
      editable: false,
      rigthIcon: icons.dropdown,
      onPress: () => {
        setModalVisible(true);
      },
      onRightPress: () => {
        setModalVisible(true);
      },
    },

    {
      id: 7,
      withLabel: 'Skill #1',
      placeholder: 'Choose Your Skill',
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues.skill1,
      editable: false,
      rigthIcon: icons.dropdown,
      onPress: () => {
        setModalVisible(true);
      },
      onRightPress: () => {
        setModalVisible(true);
      },
    },
    {
      id: 8,
      withLabel: 'Skill #2',
      placeholder: 'Choose Your Skill',
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues.skill2,
      editable: false,
      rigthIcon: icons.dropdown,
      onPress: () => {
        setModalVisible(true);
      },
      onRightPress: () => {
        setModalVisible(true);
      },
    },
    {
      id: 9,
      withLabel: 'Skill #3',
      placeholder: 'Choose Your Skill',
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues.skill3,
      editable: false,
      rigthIcon: icons.dropdown,
      onPress: () => {
        setModalVisible(true);
      },
      // onRightPress: () => {
      //   setModalVisible(true);
      // },
    },
  ];
  const SignupData2 = [
    {
      id: 2,
      withLabel: 'Country',
      placeholder: 'Select Country',
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues.country,
      editable: false,
      rigthIcon: icons.dropdown,
      onPress: () => {
        setCountryModalVisible(true);
      },
      onRightPress: () => {
        setCountryModalVisible(true);
      },
    },
    {
      id: 3,
      withLabel: 'City / Town',
      placeholder: 'Select City / Town',
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues.city,
      editable: false,
      rigthIcon: icons.dropdown,
      onPress: () => {
        setCityModalVisible(true);
      },
      onRightPress: () => {
        setCityModalVisible(true);
      },
    },
    {
      id: 4,
      withLabel: 'Select Sport',
      placeholder: 'Sport',
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues.selectSport,
      editable: false,
      rigthIcon: icons.dropdown,
      onPress: () => {
        setModalVisible(true);
      },
      onRightPress: () => {
        setModalVisible(true);
      },
    },
  ];

  const accountType = [
    {value: 'Agent'},
    {value: 'Athlete'},
    {value: 'Club'},
    {value: 'Coach'},
    {value: 'Esports'},
    {value: 'General'},
    {value: 'Manager'},
    {value: 'Scout'},
  ];
  const EsportsSport = [{value: 'Gamer'}, {value: 'Multi-Genre Gamer'}];
  const country = [{value: 'Country'}];
  const city = [{value: 'City'}];
  const empty = [{value: 'empty'}];
  const position1 = [
    {value: 'Center'},
    {value: 'Cornerback'},
    {value: 'Defensive End'},
    {value: 'Defensive Tackle'},
    {value: 'Free Safety'},
    {value: 'Holder'},
    {value: 'Kick Returner'},
    {value: 'Left Guard'},
    {value: 'Left Tackle'},
    {value: 'Linebacker'},
    {value: 'Long Snapper'},
    {value: 'Nose Tackle'},
    {value: 'Other'},
    {value: 'Place Kicker'},
    {value: 'Punter'},
    {value: 'Quarterback'},
    {value: 'Right Guard'},
    {value: 'Right Tackle'},
    {value: 'Running Back'},
    {value: 'Strong Safety'},
    {value: 'Tight End'},
    {value: 'Wide Receiver'},
  ];
  const position2 = [
    {value: 'First Person Shooters (FPS Games)'},
    {value: 'Role Playing Games (RPG Games)'},
    {value: 'Adventure'},
    {value: 'Simulation'},
    {value: 'Strategy'},
    {value: 'Sports & Fitness'},
    {value: 'Fighting'},
    {value: 'Platformers'},
    {value: 'Survival & Horror'},
    {value: 'Stealth'},
    {value: 'Interactive Movie'},
    {value: 'Puzzlers & Party Games'},
    {value: 'Social Deduction'},
    {value: 'Educational'},
    {value: 'Augmented Reality'},
    {value: 'Other'},
  ];
  const sports = [
    {value: 'American Football'},
    {value: 'Athletics'},
    {value: 'Baseball'},
    {value: 'Basketball'},
    {value: 'Boxing'},
    {value: 'Cricket'},
    {value: 'Football'},
    {value: 'Formula One'},
    {value: 'Golf'},
    {value: 'Gymnastics'},
    {value: 'Hockey'},
    {value: 'Horse Racing'},
    {value: 'Ice Hockey'},
    {value: 'MMA'},
    {value: 'Multi-Sport'},
    {value: 'Netball'},
    {value: 'Other'},
    {value: 'Rugby'},
    {value: 'Swimming'},
    {value: 'Tennis'},
    {value: 'Volleyball'},
  ];
  const EsportsSkills = [
    {value: 'One Player Games'},
    {value: 'Multiplayer Games'},
    {value: 'Quick Thinking'},
    {value: 'Streaming'},
    {value: 'Communication'},
    {value: 'Critical Thinking'},
    {value: 'Researching'},
    {value: 'Multitasking'},
    {value: 'Risk Taking'},
    {value: 'Teamwork'},
    {value: 'Leadership'},
    {value: 'Problem Solving'},
    {value: 'Strategising'},
    {value: 'Networking with Others'},
    {value: 'Recognising Patterns'},
    {value: 'Confidence'},
    {value: 'Giving Instructions'},
    {value: 'Receiving Instructions'},
    {value: 'Creativity'},
    {value: 'Hand-Eye Coordination'},
    {value: 'Vision'},
    {value: 'Spatial Awareness'},
    {value: 'Patience'},
    {value: 'Concentration'},
    {value: 'Conflict Resolution'},
    {value: 'Other'},
  ];
  const skill = [
    {value: 'Other'},
    {value: 'Agility'},
    {value: 'Ball Handling'},
    {value: 'Blocking'},
    {value: 'Body Control'},
    {value: 'Carrying'},
    {value: 'Catching'},
    {value: 'Composure'},
    {value: 'Coordination'},
    {value: 'Dive pass'},
    {value: 'Drop Kicking'},
    {value: 'Drop Punt'},
    {value: 'Endurance'},
    {value: 'Forcing Turnovers'},
    {value: 'Grubber'},
    {value: 'Hand Off'},
    {value: 'Handle Pressure'},
    {value: 'Interceptions'},
    {value: 'Juking Skills'},
    {value: 'Kicking'},
    {value: 'Long Passing'},
    {value: 'Marking'},
    {value: 'Mental Strength'},
    {value: 'Pass Defending'},
    {value: 'Pass Rushing'},
    {value: 'Passing'},
    {value: 'Passion'},
    {value: 'Place Kick'},
    {value: 'Positioning'},
    {value: 'Power'},
    {value: 'Punting'},
    {value: 'Receiving'},
    {value: 'Risk Assessment'},
    {value: 'Run Stopping'},
    {value: 'Running'},
    {value: 'Self-Motivation'},
    {value: 'Short Passing'},
    {value: 'Side Step'},
    {value: 'Spatial Awareness'},
    {value: 'Speed'},
    {value: 'Spiral Bomb'},
    {value: 'Strength'},
    {value: 'Support Line Running'},
    {value: 'Swerve'},
    {value: 'Tackling'},
    {value: 'Touchdowns'},
    {value: 'Up and Under'},
  ];
  const onSetHeightValue = item => {
    setSignupValues({...signupValues, height: `${item} cm`});
    setHeightModalVisible(false);
  };

  const onSetValue = (item, data) => {
    if (signupId == 'Account Type') {
      setSignupValues({...signupValues, accountType: item});
      setModalVisible(false);

      return;
    }

    if (signupId == 'Select Sport') {
      setSignupValues({
        ...signupValues,
        selectSport: item,
        sportEmoji: data.emoji,
      });
      setModalVisible(false);

      return;
    }
    if (signupId == 5 || signupId == 10) {
      setSignupValues({...signupValues, bio: item});
      setModalVisible(false);
      return;
    }
    if (signupId == 'Select Position') {
      setSignupValues({...signupValues, position: item});
      setModalVisible(false);
      return;
    }

    if (signupId == 'Skill #1') {
      setSignupValues({...signupValues, skill1: item});
      setModalVisible(false);
      return;
    }
    if (signupId == 'Strong Hand') {
      setSignupValues({...signupValues, strongHand: item});
      setModalVisible(false);
      return;
    }
    if (signupId == 'Strong Foot') {
      setSignupValues({...signupValues, strongFoot: item});
      setModalVisible(false);
      return;
    }
    if (signupId == 'Skill #2') {
      setSignupValues({...signupValues, skill2: item});
      setModalVisible(false);
      return;
    }
    if (signupId == 'Skill #3') {
      setSignupValues({...signupValues, skill3: item});
      setModalVisible(false);
      return;
    }
    setModalVisible(false);
  };

  const onSearchUser = values => {
    // setIsLoading(true);
    // FilterAdvanceSearchUser(
    //   setAdvanceSearchData,
    //   signupValues,
    //   dispatch,
    //   setAdvanceSearch,
    // );
    // setTimeout(() => {
    setIsLoading(false);
    navigation.navigate('AdvanceSearchUser', values);
    // }, 1000);
  };
  return (
    <>
      <View style={commonStyles.main}>
        <Spacer height={Platform.OS == 'ios' ? 15 : 10} />
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <Spacer height={Platform.OS == 'ios' ? 30 : 10} />
          <PH20>
            <CustomHeader
              LeftSide={() => (
                <Pressable onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="chevron-back"
                    color={colors.black}
                    size={moderateScale(30)}
                  />
                </Pressable>
              )}
              Center={() => (
                <CustomText
                  label={'Search'}
                  fontWeight={'400'}
                  fontSize={14}
                  textAlign="center"
                  fontFamily={InterFont.bold}
                  color={colors.black}
                  marginLeft={5}
                />
              )}
              RightSide={() => (
                <Pressable
                  onPress={() => {
                    setSignupValues({}), navigation.goBack();
                  }}>
                  <Entypo
                    name="cross"
                    size={moderateScale(25)}
                    color={colors.red}
                  />
                </Pressable>
              )}
            />
            <View
              style={{
                flex: 1,
              }}>
              <Spacer height={25} />
              <CustomTextInput
                inputStyle={{
                  shadowColor:
                    Platform.OS == 'ios' ? colors.inputGray : colors.black,
                  shadowRadius: 5,
                  elevation: 5,
                  shadowOpacity: 0.5,

                  shadowOffset: {width: 1, height: 1},
                }}
                withLabel={'Account Type'}
                value={signupValues.accountType}
                editable={false}
                iconWidth={scale(11)}
                iconHeight={verticalScale(11)}
                rigthIcon={icons.dropdown}
                onPress={() => {
                  setSignupId('Account Type');
                  const data = positionSkillValidate(
                    'Account Type',
                    signupValues,
                  );
                  dispatch(setPositionsAndSkills(data));
                  setModalVisible(true);
                }}
                onRightPress={() => {
                  setSignupId('Account Type');
                  const data = positionSkillValidate(
                    'Account Type',
                    signupValues,
                  );
                  dispatch(setPositionsAndSkills(data));
                  setModalVisible(true);
                }}
                placeholder={'Select Type'}
              />
              <Spacer height={15} />

              <CustomTextInput
                inputStyle={{
                  shadowColor:
                    Platform.OS == 'ios' ? colors.inputGray : colors.black,
                  shadowRadius: 5,
                  elevation: 5,
                  shadowOpacity: 0.5,

                  shadowOffset: {width: 1, height: 1},
                }}
                inputMarginTop={Platform.OS == 'ios' ? 5 : -7}
                withLabel={'Username'}
                value={signupValues.username}
                onChangeText={txt => {
                  setSignupValues({...signupValues, username: txt});
                }}
                editable={true}
                placeholder={'Username'}
                // width={"99%"}
              />
              {signupValues.accountType == 'Athlete' ||
              !signupValues.accountType ||
              signupValues.accountType == 'Esports' ? (
                <>
                  <View>
                    <View>
                      <Spacer height={15} />
                      <View style={styles.box}>
                        <View
                          style={{
                            justifyContent: 'center',
                          }}>
                          <View>
                            <CustomText
                              label={'Age'}
                              color={colors.inputGray}
                              fontSize={verticalScale(8)}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            top: 5,
                          }}>
                          <View>
                            <CustomPicker
                              disableAutoScroll={true}
                              data={Array.from({length: 60}, (_, i) => i + 10)}
                              onSelect={(selectedItem, index) => {
                                setMinAge(selectedItem);
                                console.log(selectedItem, index);
                              }}
                              defaultButtonText={'Min Age'}
                              buttonTextAfterSelection={(
                                selectedItem,
                                index,
                              ) => {
                                return selectedItem + '  years';
                              }}
                              rowTextForSelection={(item, index) => {
                                return item + '  years';
                              }}
                              buttonStyle={styles.dropdown2BtnStyle}
                              buttonTextStyle={styles.dropdown2BtnTxtStyle}
                              renderDropdownIcon={isOpened => {
                                return (
                                  <Icon
                                    name={
                                      isOpened ? 'chevron-up' : 'chevron-down'
                                    }
                                    color={
                                      isOpened ? colors.black : colors.inputGray
                                    }
                                    size={18}
                                  />
                                );
                              }}
                              dropdownIconPosition={'right'}
                              dropdownStyle={styles.dropdown2DropdownStyle}
                              rowStyle={styles.dropdown2RowStyle}
                              rowTextStyle={styles.dropdown2RowTxtStyle}
                              selectedRowStyle={
                                styles.dropdown2SelectedRowStyle
                              }
                              // renderCustomizedRowChild={renderArea}
                            />
                          </View>

                          <View>
                            <CustomPicker
                              disabled={minAge === undefined ? true : false}
                              disableAutoScroll={true}
                              data={Array.from(
                                {length: 60 - minAge + 1},
                                (_, i) => minAge + i,
                              )}
                              onSelect={(selectedItem, index) => {
                                setMaxAge(selectedItem);
                                if (
                                  minAge !== undefined &&
                                  maxAge !== undefined
                                ) {
                                  const age = parseInt((minAge + maxAge) / 2);
                                  console.log('Average age ===>', age);
                                  setFinalAge(age);
                                  setSignupValues({
                                    ...signupValues,
                                    age: age,
                                  });
                                }

                                console.log(selectedItem, index);
                              }}
                              defaultButtonText={'Max Age'}
                              buttonTextAfterSelection={(
                                selectedItem,
                                index,
                              ) => {
                                return selectedItem + '  years';
                              }}
                              rowTextForSelection={(item, index) => {
                                return item + '  years';
                              }}
                              buttonStyle={styles.dropdown2BtnStyle}
                              buttonTextStyle={styles.dropdown2BtnTxtStyle}
                              renderDropdownIcon={isOpened => {
                                return (
                                  <Icon
                                    name={
                                      isOpened ? 'chevron-up' : 'chevron-down'
                                    }
                                    color={
                                      isOpened ? colors.black : colors.inputGray
                                    }
                                    size={18}
                                  />
                                );
                              }}
                              dropdownIconPosition={'right'}
                              dropdownStyle={styles.dropdown2DropdownStyle}
                              rowStyle={styles.dropdown2RowStyle}
                              rowTextStyle={styles.dropdown2RowTxtStyle}
                              selectedRowStyle={
                                styles.dropdown2SelectedRowStyle
                              }
                              // renderCustomizedRowChild={renderArea}
                            />
                          </View>
                        </View>
                      </View>
                      {/* <AgeRange
                        setSignupValues={setSignupValues}
                        signupValues={signupValues}
                      /> */}
                    </View>
                    <Spacer height={15} />

                    <View>
                      <GanderConatiner
                        setSignupValues={setSignupValues}
                        signupValues={signupValues}
                      />
                      <Spacer height={15} />
                    </View>
                    <View>
                      <GanderConatiner
                        isFreeAgent={true}
                        setSignupValues={setSignupValues}
                        signupValues={signupValues}
                      />
                      <Spacer height={15} />
                    </View>
                    <View style={styles.box}>
                      <View
                        style={{
                          justifyContent: 'center',
                        }}>
                        <View>
                          <CustomText
                            label={'Height'}
                            color={colors.inputGray}
                            fontSize={verticalScale(8)}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          // backgroundColor: 'red',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          top: 5,
                        }}>
                        <View>
                          <CustomPicker
                            disableAutoScroll={true}
                            data={Array.from({length: 235}, (_, i) => i + 41)}
                            onSelect={(selectedItem, index) => {
                              setMinHeight(selectedItem);
                              console.log(selectedItem, index);
                            }}
                            defaultButtonText={'Min Height'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                              return selectedItem + '  cm';
                            }}
                            rowTextForSelection={(item, index) => {
                              return item + '  cm';
                            }}
                            buttonStyle={styles.dropdown2BtnStyle}
                            buttonTextStyle={styles.dropdown2BtnTxtStyle}
                            renderDropdownIcon={isOpened => {
                              return (
                                <Icon
                                  name={
                                    isOpened ? 'chevron-up' : 'chevron-down'
                                  }
                                  color={
                                    isOpened ? colors.black : colors.inputGray
                                  }
                                  size={18}
                                />
                              );
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown2DropdownStyle}
                            rowStyle={styles.dropdown2RowStyle}
                            rowTextStyle={styles.dropdown2RowTxtStyle}
                            selectedRowStyle={styles.dropdown2SelectedRowStyle}
                            // renderCustomizedRowChild={renderArea}
                          />
                        </View>
                        <View>
                          <CustomPicker
                            disabled={minHeight === undefined ? true : false}
                            disableAutoScroll={true}
                            data={Array.from(
                              {length: 235 - minHeight + 1},
                              (_, i) => minHeight + i,
                            )}
                            onSelect={(selectedItem, index) => {
                              setMaxHeight(selectedItem);
                              if (
                                minHeight !== undefined &&
                                maxHeight !== undefined
                              ) {
                                const height = parseInt(
                                  (minHeight + maxHeight) / 2,
                                );
                                console.log('Average Height ====>', height);
                                setFinalHeight(height);
                                setSignupValues({
                                  ...signupValues,
                                  height: `${height} cm`,
                                });
                              }
                              console.log(selectedItem, index);
                            }}
                            defaultButtonText={'Max Height'}
                            buttonTextAfterSelection={(selectedItem, index) => {
                              return selectedItem + '  cm';
                            }}
                            rowTextForSelection={(item, index) => {
                              return item + '  cm';
                            }}
                            buttonStyle={styles.dropdown2BtnStyle}
                            buttonTextStyle={styles.dropdown2BtnTxtStyle}
                            renderDropdownIcon={isOpened => {
                              return (
                                <Icon
                                  name={
                                    isOpened ? 'chevron-up' : 'chevron-down'
                                  }
                                  color={isOpened ? 'black' : 'gray'}
                                  size={18}
                                />
                              );
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown2DropdownStyle}
                            rowStyle={styles.dropdown2RowStyle}
                            rowTextStyle={styles.dropdown2RowTxtStyle}
                            selectedRowStyle={styles.dropdown2SelectedRowStyle}
                            // renderCustomizedRowChild={renderArea}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </>
              ) : null}

              <Spacer height={15} />

              {signupValues.accountType == 'Athlete' ||
              !signupValues.accountType ||
              signupValues.accountType == 'Esports' ? (
                <View>
                  {SignupData.map((item, index) => {
                    return (
                      <>
                        <View>
                          <CustomTextInput
                            inputStyle={{
                              shadowColor:
                                Platform.OS == 'ios'
                                  ? colors.inputGray
                                  : colors.black,
                              shadowRadius: 5,
                              elevation: 5,
                              shadowOpacity: 0.5,

                              shadowOffset: {width: 1, height: 1},
                            }}
                            inputMarginTop={Platform.OS == 'ios' ? 5 : -7}
                            withLabel={item.withLabel}
                            value={item.value}
                            editable={item.editable}
                            height={item.height}
                            onPress={() => {
                              if (item.id == 2) {
                                setCountryModalVisible(true);

                                return;
                              }
                              if (item.id == 3) {
                                setCityModalVisible(true);

                                return;
                              }

                              setSignupId(item?.withLabel);
                              const data = positionSkillValidate(
                                item?.withLabel,
                                signupValues,
                              );
                              dispatch(setPositionsAndSkills(data));
                              setModalVisible(true);
                            }}
                            onChangeText={item.onChangeText}
                            iconWidth={item.iconWidth}
                            iconHeight={item.iconHeight}
                            rigthIcon={item.rigthIcon}
                            inputHeight={item.inputHeight}
                            multiline={item.multiline}
                            onRightPress={() => {
                              if (item.id == 2) {
                                setCountryModalVisible(true);

                                return;
                              }
                              if (item.id == 3) {
                                setCityModalVisible(true);

                                return;
                              }

                              setSignupId(item?.withLabel);
                              const data = positionSkillValidate(
                                item?.withLabel,
                                signupValues,
                              );
                              dispatch(setPositionsAndSkills(data));
                              setModalVisible(true);
                            }}
                            secureTextEntry={item.secureTextEntry}
                            placeholder={item.placeholder}
                          />
                          <Spacer height={15} />
                        </View>
                      </>
                    );
                  })}
                </View>
              ) : (
                <View>
                  {SignupData2.map(item => {
                    return (
                      <>
                        <CustomTextInput
                          inputStyle={{
                            shadowColor:
                              Platform.OS == 'ios'
                                ? colors.inputGray
                                : colors.black,
                            shadowRadius: 5,
                            elevation: 5,
                            shadowOpacity: 0.5,

                            shadowOffset: {width: 1, height: 1},
                          }}
                          maxLength={item.maxLength}
                          withLabel={item.withLabel}
                          value={item.value}
                          editable={item.editable}
                          height={item.height}
                          onPress={() => {
                            if (item.id == 2) {
                              setCountryModalVisible(true);

                              return;
                            }
                            if (item.id == 3) {
                              setCityModalVisible(true);

                              return;
                            }

                            setSignupId(item?.withLabel);
                            const data = positionSkillValidate(
                              item?.withLabel,
                              signupValues,
                            );
                            dispatch(setPositionsAndSkills(data));
                            setModalVisible(true);
                          }}
                          iconWidth={item.iconWidth}
                          onChangeText={item.onChangeText}
                          iconHeight={item.iconHeight}
                          rigthIcon={item.rigthIcon}
                          inputHeight={item.inputHeight}
                          multiline={item.multiline}
                          onRightPress={() => {
                            setSignupId(item?.withLabel);
                            const data = positionSkillValidate(
                              item?.withLabel,
                              signupValues,
                            );
                            dispatch(setPositionsAndSkills(data));
                            setModalVisible(true);
                          }}
                          secureTextEntry={item.secureTextEntry}
                          placeholder={item.placeholder}
                        />
                        <Spacer height={15} />
                      </>
                    );
                  })}
                </View>
              )}

              <Spacer height={5} />
              <GradientButton
                onPress={() => {
                  onSearchUser(signupValues);
                }}
                title={'Show Results'}
              />
              <Spacer height={20} />
            </View>
          </PH20>
        </ScrollView>
      </View>
      <CustomBottomSheet
        EsportsSport
        modalVisible={modalVisible}
        list={
          signupId === 1
            ? accountType
            : signupId === 2
            ? country
            : signupId == 3
            ? city
            : signupId == 4 && signupValues.accountType == 'Esports'
            ? EsportsSport
            : signupId == 4
            ? sports
            : signupId == 6 && signupValues.accountType == 'Esports'
            ? position2
            : signupId == 6
            ? position1
            : signupId >= 7 && signupValues.accountType == 'Esports'
            ? EsportsSkills
            : signupId >= 7
            ? skill
            : empty
        }
        onSetValue={onSetValue}
        setValue={setValue}
        onCloseModal={() => setModalVisible(false)}
      />
      <CustomLocationBottomSheet
        modalVisible={countryModalVisible}
        onLocationPress={data => {
          setSignupValues({...signupValues, country: data});
          setCountryModalVisible(false);
        }}
        onCloseModal={() => setCountryModalVisible(false)}
        selectionType={selectionType}
      />
      <CustomLocationBottomSheet
        modalVisible={cityModalVisible}
        onLocationPress={data => {
          setSignupValues({...signupValues, city: data});
          setCityModalVisible(false);
        }}
        onCloseModal={() => setCityModalVisible(false)}
        selectionType={selectionType}
        selectedCountry={signupValues.country}
      />

      <HeigthBottomSheet
        EsportsSport
        modalVisible={heightModalVisible}
        onSetValue={onSetHeightValue}
        setValue={setHeightValue}
        onCloseModal={() => setHeightModalVisible(false)}
      />

      {isLoading && <SimpleLoader file={loaderAnimation} />}
    </>
  );
};
const styles = StyleSheet.create({
  dropdown2BtnStyle: {
    width: 150,
    height: 35,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.inputGray,
    padding: 8,
  },
  dropdown2BtnTxtStyle: {
    color: 'black',
    textAlign: 'left',

    fontSize: 12,
  },

  dropdown2DropdownStyle: {backgroundColor: '#fff'},
  dropdown2RowStyle: {
    backgroundColor: '#fff',
    borderBottomColor: '#fff',
    // height: 35,
  },
  dropdown2RowTxtStyle: {
    color: 'black',
    textAlign: 'left',

    fontSize: 20,
    // height: 40,
  },
  dropdown2SelectedRowStyle: {backgroundColor: '#fff'},
  box: {
    width: '100%',
    height: verticalScale(65),
    borderRadius: moderateScale(12),
    padding: scale(10),
    marginTop: verticalScale(0),
    backgroundColor: colors.white,
    shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.5,
    shadowOffset: {width: 1, height: 1},
  },
});
export default AdvanceSearch;
