import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import commonStyles, { PH20, PH10 } from "../../../utils/CommonStyles";
import { Spacer } from "../../../components/Spacer";
import SignupTop from "../Signup/molecules/SignupTop";
import { styles } from "../Signup/styles";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/Colors";
import CustomTextInput from "../../../components/CustomTextInput";
import SignupBottom from "../Signup/molecules/SignupBottom";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import { scale, verticalScale } from "react-native-size-matters";
import { icons } from "../../../assets/icons";
import { images } from "../../../assets/images";
import ProfileTop from "./molecules/ProfileTop";
import ProfilePhoto from "../../../components/ProfilePhoto";
import AgeRange from "./molecules/AgeRange";
import Toast from "react-native-root-toast";
import { locations } from "../../../utils/locations";
import {
  skill,
  position2,
  sports,
  EsportsSkills,
  accountType,
  EsportsSport,
} from "../../../utils/Data";
import auth from "@react-native-firebase/auth";
import GanderConatiner from "./molecules/GanderConatiner";
import GradientButton from "../../../components/GradientButton";
import HeigthBottomSheet from "./molecules/HeigthBottomSheet";
import CustomAlert from "../../../components/CustomAlert";
import { UseProfileDetail } from "./molecules/UseProfileDetail";
import { useSelector } from "react-redux";
import {
  authData,
  authSelector,
  setPositionsAndSkills,
} from "../../../redux/reducers/authReducer";
import { SaveUser } from "../../services/UserServices";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../services/StorageServics";
import CustomLocationBottomSheet from "../../../components/CustomLocationBottomSheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import moment from "moment";
import { positionSkillValidate } from "../../../utils/Commons";
import PhoneNumberInput from "../../../components/PhoneNumberInput";
const ProfileDetail = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state?.auth);

  const [heightModalVisible, setHeightModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const dispatch = useDispatch();
  const [alertlVisible, setAlertVisible] = useState(false);
  const [selectionType, setSelectionType] = useState("");
  const [heightValue, setHeightValue] = useState("");

  const [signupId, setSignupId] = useState("");
  // console.log('CurrentUser', currentUser);

  const [stateError, setStateError] = useState({
    errorHeader: "",
    errorBody: "",
  });
  const [signupValues, setSignupValues] = useState({
    accountType: "",
    country: "",
    age: "",
    gender: "",
    city: "",
    height: "",
    selectSport: "",
    sportEmoji: "",
    position: "",
    strongHand: "",
    strongFoot: "",
    skill1: "",
    skill2: "",
    skill3: "",
    bio: "",
    stats: "",
  });

  useEffect(() => {
    if (cityModalVisible === true) {
      setSelectionType("cities");
    } else if (countryModalVisible === true) {
      setSelectionType("country");
    } else {
    }
  }, [countryModalVisible, cityModalVisible]);
  const SignupData = [
    {
      id: 2,
      withLabel: "Country",
      placeholder: "Select Country",
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
      withLabel: "City / Town",
      placeholder: "Select City / Town",
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
      withLabel: "Select Sport",
      compulsory: true,
      placeholder: "Sport",
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
      withLabel: "Select Position",
      placeholder: "Position",
      compulsory: true,
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
      withLabel: "Strong Hand",
      placeholder: "Strong Hand",
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
      withLabel: "Strong Foot",
      placeholder: "Strong Foot",
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
      withLabel: "Skill #1",
      placeholder: "Choose Your Skill",
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
      withLabel: "Skill #2",
      placeholder: "Choose Your Skill",
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
      withLabel: "Skill #3",
      placeholder: "Choose Your Skill",
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
    {
      id: 10,
      withLabel: "Bio",
      placeholder: "Enter Bio",
      height: verticalScale(80),
      value: signupValues.bio,
      maxLength: 100,
      multiline: false,
      onChangeText: (txt) => {
        setSignupValues({ ...signupValues, bio: txt });
      },
    },
    {
      id: 11,
      withLabel: "Stats",
      placeholder: "Enter Stats",
      height: verticalScale(80),
      multiline: false,
      maxLength: 100,
      value: signupValues.stats,
      onChangeText: (txt) => {
        setSignupValues({ ...signupValues, stats: txt });
      },
    },
  ];
  const SignupData2 = [
    {
      id: 2,
      withLabel: "Country",
      placeholder: "Select Country",
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
      withLabel: "City / Town",
      placeholder: "Select City / Town",
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
      withLabel: "Select Sport",
      placeholder: "Sport",
      compulsory: true,
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
      id: 5,
      withLabel: "Bio",
      placeholder: "Enter Bio",
      value: signupValues.bio,
      height: verticalScale(80),
      multiline: true,
      maxLength: 100,
      onChangeText: (txt) => {
        setSignupValues({ ...signupValues, bio: txt });
      },
      // inputHeight: verticalScale(50),
    },
  ];

  const onSetHeightValue = (item) => {
    setSignupValues({ ...signupValues, height: `${item} cm` });
    setHeightModalVisible(false);
  };

  const onSetValue = (item, data) => {
    // console.log('Ibkbcd');
    if (signupId == "Account Type") {
      setSignupValues({ ...signupValues, accountType: item });
      setModalVisible(false);

      return;
    }
    // if (signupId == 2) {
    //   setSignupValues({...signupValues, country: item});
    //   setModalVisible(false);

    //   return;
    // }
    // if (signupId == 3) {
    //   setSignupValues({...signupValues, city: item});
    //   setModalVisible(false);

    //   return;
    // }
    if (signupId == "Select Sport") {
      // console.log('empjoData', data?.emoji);
      // setSportEmoji(data.emoji)
      setSignupValues({
        ...signupValues,
        selectSport: item,
        sportEmoji: data.emoji,
      });
      setModalVisible(false);

      return;
    }
    if (signupId == 5 || signupId == 10) {
      setSignupValues({ ...signupValues, bio: item });
      setModalVisible(false);
      return;
    }
    if (signupId == "Select Position") {
      setSignupValues({ ...signupValues, position: item });
      setModalVisible(false);
      return;
    }

    if (signupId == "Skill #1") {
      setSignupValues({ ...signupValues, skill1: item });
      setModalVisible(false);
      return;
    }
    if (signupId == "Strong Hand") {
      setSignupValues({ ...signupValues, strongHand: item });
      setModalVisible(false);
      return;
    }
    if (signupId == "Strong Foot") {
      setSignupValues({ ...signupValues, strongFoot: item });
      setModalVisible(false);
      return;
    }
    if (signupId == "Skill #2") {
      setSignupValues({ ...signupValues, skill2: item });
      setModalVisible(false);
      return;
    }
    if (signupId == "Skill #3") {
      setSignupValues({ ...signupValues, skill3: item });
      setModalVisible(false);
      return;
    }
    setModalVisible(false);
  };
  const onProfileDetail = async () => {
    const birthDate = moment(signupValues.age, "YYYY-MM-DD");
    const currentDate = moment();

    const ageInYears = currentDate.diff(birthDate, "years");

    if (
      signupValues.accountType == "Athlete" ||
      signupValues.accountType == "Esports" ||
      signupValues.accountType == "Others"
    ) {
      const validateResponse = UseProfileDetail(
        signupValues,
        setSignupValues,
        setStateError,
        stateError,
        setAlertVisible
      );

      if (validateResponse) {
        if (
          (phoneNumber.length == 0 && signupValues.accountType == "Athlete") ||
          signupValues.accountType == "Esports"
        ) {
          setStateError({
            ...stateError,
            errorHeader: "Missing Phone Number",
            errorBody: "Please Enter Phone Number To Proceed",
          });
          setAlertVisible(true);

          return;
        }
        if (ageInYears < 5) {
          setStateError({
            ...stateError,
            errorHeader: "Invalid Age",
            errorBody: "Please Select Correct D.O.B To Proceed",
          });
          setAlertVisible(true);

          return;
        }

        setIsLoading(true);
        await SaveUserProfile();
      }
    } else {
      if (!signupValues.accountType) {
        setStateError({
          ...stateError,
          errorHeader: "Missing Account Type",
          errorBody: "Please Select Account Type To Proceed",
        });

        setAlertVisible(true);

        return;
      }

      if (!signupValues.selectSport) {
        setStateError({
          ...stateError,
          errorHeader: "Missing Sport",
          errorBody: "Please Select Sport To Proceed",
        });

        setAlertVisible(true);

        return;
      }

      if (!signupValues.phone) {
        setStateError({
          ...stateError,
          errorHeader: "Missing Phone Number",
          errorBody: "Please Enter Phone Number To Proceed",
        });

        setAlertVisible(true);

        return;
      }

      setIsLoading(true);
      await SaveUserProfile();
    }
  };
  const SaveUserProfile = async () => {
    const imageData = "";
    var a = moment();
    var b = moment(signupValues.age, "YYYY");
    var age = a.diff(b, "years");
    const profileData = {
      email: currentUser?.currentUser.email,
      name: currentUser?.currentUser.name,
      username: currentUser?.currentUser.username,
      uid: currentUser?.currentUser.uid,
      firstLogin: currentUser.currentUser.firstLogin,
      accountType: signupValues.accountType,
      country: signupValues.country ? signupValues.country : "",
      age: age,
      gender: signupValues.gender,
      city: signupValues.city ? signupValues.city : "",
      height: signupValues.height ? signupValues.height : "",
      profileImage: "",
      selectSport: signupValues.selectSport,
      position: signupValues.position ? signupValues.position : "",
      strongHand: signupValues.strongHand ? signupValues.strongHand : "",
      strongFoot: signupValues.strongFoot ? signupValues.strongFoot : "",
      skill1: signupValues.skill1 ? signupValues.skill1 : "",
      skill2: signupValues.skill2 ? signupValues.skill2 : "",
      skill3: signupValues.skill3 ? signupValues.skill3 : "",
      bio: signupValues.bio ? signupValues.bio : "",
      stats: signupValues.stats ? signupValues.stats : "",
      followers: 0,
      following: 0,
      sportEmoji: signupValues.sportEmoji ? signupValues.sportEmoji : "",
      isLogin: true,
      isProfileComplete: true,
    };

    if (imageUrl) {
      const linkData = await uploadImage(
        imageUrl,
        currentUser?.currentUser.uid
      );
      profileData["profileImage"] = linkData;
    }
    // console.log('AllProfileData', profileData);
    await SaveUser(currentUser?.currentUser.uid, profileData);
    dispatch(authData(profileData));
    setIsLoading(false);
    auth().currentUser.sendEmailVerification();

    Toast.show("Profile is saved successfully");
    navigation.navigate("EmailVerification");
  };

  return (
    <>
      <View style={commonStyles.main}>
        <ImageBackground
          style={{ width: "101%", height: "100%" }}
          source={images.background}
        >
          <KeyboardAwareScrollView>
            <Spacer height={Platform.OS == "ios" ? 30 : 10} />
            <PH10>
              <ProfileTop
                navigation={navigation}
                EditParams={route.params?.edit}
              />
            </PH10>

            <PH20>
              <Spacer height={20} />

              <View
                style={{
                  flex: 1,
                }}
              >
                <ProfilePhoto
                  addPhoto
                  width={scale(80)}
                  height={scale(80)}
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  mainStyle={{
                    shadowColor:
                      Platform.OS == "ios" ? "#343a40" : colors.black,
                    shadowRadius: 2,
                    elevation: 5,
                    shadowOpacity: 0.4,
                    // inputMarginTop:-20,
                    shadowOffset: { width: -1, height: 3 },
                  }}
                />

                <Spacer height={20} />

                {/* <AgeRange/> */}
                <CustomTextInput
                  inputStyle={{
                    shadowColor:
                      Platform.OS == "ios" ? colors.inputGray : colors.black,
                    shadowRadius: 5,
                    elevation: 5,
                    shadowOpacity: 0.5,

                    shadowOffset: { width: 1, height: 1 },
                  }}
                  withLabel={"Account Type"}
                  value={signupValues.accountType}
                  editable={false}
                  iconWidth={scale(11)}
                  compulsory={true}
                  iconHeight={verticalScale(10)}
                  rigthIcon={icons.dropdown}
                  onPress={() => {
                    setSignupId("Account Type");
                    const data = positionSkillValidate(
                      "Account Type",
                      signupValues
                    );
                    dispatch(setPositionsAndSkills(data));
                    setModalVisible(true);
                  }}
                  onRightPress={() => {
                    setSignupId("Account Type");
                    const data = positionSkillValidate(
                      "Account Type",
                      signupValues
                    );
                    dispatch(setPositionsAndSkills(data));

                    setModalVisible(true);
                  }}
                  placeholder={"Select Type"}
                />
                {signupValues.accountType == "Athlete" ||
                !signupValues.accountType ||
                signupValues.accountType == "Esports" ||
                signupValues.accountType == "Others" ? (
                  <>
                    <View>
                      <View>
                        <Spacer height={15} />
                        <AgeRange
                          setSignupValues={setSignupValues}
                          signupValues={signupValues}
                        />
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
                        <PhoneNumberInput
                          value={phoneNumber}
                          onChangeText={setPhoneNumber}
                          placeholder="Enter your phone number"
                          signupValues={signupValues}
                          setSignupValues={setSignupValues}
                        />
                        <Spacer height={15} />
                      </View>
                      <CustomTextInput
                        inputStyle={{
                          shadowColor:
                            Platform.OS == "ios"
                              ? colors.inputGray
                              : colors.black,
                          shadowRadius: 5,
                          elevation: 5,
                          shadowOpacity: 0.5,

                          shadowOffset: { width: 1, height: 1 },
                        }}
                        inputMarginTop={Platform.OS == "ios" ? 5 : -7}
                        withLabel="Height"
                        placeholder="Select Height"
                        iconHeight={verticalScale(11)}
                        iconWidth={scale(11)}
                        value={signupValues.height}
                        editable={false}
                        rigthIcon={icons.dropdown}
                        onPress={() => {
                          setHeightModalVisible(true);
                        }}
                        onRightPress={() => {
                          setHeightModalVisible(true);
                        }}
                      />
                    </View>
                  </>
                ) : null}

                <Spacer height={15} />

                {signupValues.accountType == "Athlete" ||
                !signupValues.accountType ||
                signupValues.accountType == "Esports" ||
                signupValues.accountType == "Others" ? (
                  <View>
                    {SignupData.map((item, index) => {
                      return (
                        <>
                          <View>
                            <CustomTextInput
                              inputStyle={{
                                shadowColor:
                                  Platform.OS == "ios"
                                    ? colors.inputGray
                                    : colors.black,
                                shadowRadius: 5,
                                elevation: 5,
                                shadowOpacity: 0.5,

                                shadowOffset: { width: 1, height: 1 },
                              }}
                              inputMarginTop={Platform.OS == "ios" ? 5 : -7}
                              withLabel={item.withLabel}
                              value={item.value}
                              compulsory={item.compulsory}
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
                                  signupValues
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
                                  signupValues
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
                    {SignupData2.map((item) => {
                      return (
                        <>
                          <CustomTextInput
                            inputStyle={{
                              shadowColor:
                                Platform.OS == "ios"
                                  ? colors.inputGray
                                  : colors.black,
                              shadowRadius: 5,
                              elevation: 5,
                              shadowOpacity: 0.5,

                              shadowOffset: { width: 1, height: 1 },
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
                                signupValues
                              );
                              dispatch(setPositionsAndSkills(data));
                              setModalVisible(true);
                            }}
                            compulsory={item.compulsory}
                            iconWidth={item.iconWidth}
                            onChangeText={item.onChangeText}
                            iconHeight={item.iconHeight}
                            rigthIcon={item.rigthIcon}
                            inputHeight={item.inputHeight}
                            multiline={item.multiline}
                            // onRightPress={() => {
                            //   setSignupId(item?.id);
                            //   setModalVisible(true);
                            // }}

                            onRightPress={() => {
                              if (item.id == 2) {
                                setCountryModalVisible(true);

                                return;
                              }
                              if (item.id == 3) {
                                setCityModalVisible(true);

                                return;
                              }

                              setSignupId(item?.id);
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
                {/* CustomDrawer */}
                <GradientButton
                  onPress={onProfileDetail}
                  loading={isLoading}
                  title={"Next"}
                />
                <Spacer height={20} />

                {/* <SignupBottom navigation={navigation} /> */}
              </View>
            </PH20>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </View>

      <CustomBottomSheet
        modalVisible={modalVisible}
        value={signupId}
        type={signupValues}
        onSetValue={onSetValue}
        setValue={setValue}
        onCloseModal={() => setModalVisible(false)}
      />

      <CustomLocationBottomSheet
        modalVisible={countryModalVisible}
        onLocationPress={(data) => {
          setSignupValues({ ...signupValues, country: data });
          setCountryModalVisible(false);
        }}
        // onSetValue={onSetValue}
        // setValue={setValue}
        onCloseModal={() => setCountryModalVisible(false)}
        selectionType={selectionType}
      />
      <CustomLocationBottomSheet
        modalVisible={cityModalVisible}
        onLocationPress={(data) => {
          setSignupValues({ ...signupValues, city: data });
          setCityModalVisible(false);
        }}
        // onSetValue={onSetValue}
        // setValue={setValue}
        onCloseModal={() => setCityModalVisible(false)}
        selectionType={selectionType}
        selectedCountry={signupValues.country}
      />

      <CustomAlert
        stateError={stateError}
        modalVisible={alertlVisible}
        setModalVisible={setAlertVisible}
      />
      <HeigthBottomSheet
        EsportsSport
        modalVisible={heightModalVisible}
        onSetValue={onSetHeightValue}
        setValue={setHeightValue}
        onCloseModal={() => setHeightModalVisible(false)}
      />
    </>
  );
};

export default ProfileDetail;
