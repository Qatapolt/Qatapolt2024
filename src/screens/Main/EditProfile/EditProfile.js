import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import commonStyles, { PH20, PH10 } from "../../../utils/CommonStyles";
import { Spacer } from "../../../components/Spacer";
import { styles } from "../Signup/styles";
import CustomText from "../../../components/CustomText";
import { colors } from "../../../utils/Colors";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import { scale, verticalScale } from "react-native-size-matters";
import { icons } from "../../../assets/icons";
import { images } from "../../../assets/images";
import ProfileTopEdit from "./molecules/ProfileTopEdit";
import ProfilePhoto from "../../../components/ProfilePhoto";
import AgeRangeEdit from "./molecules/AgeRangeEdit";
import Toast from "react-native-root-toast";
import GanderConatinerEdit from "./molecules/GanderConatinerEdit";
import GradientButton from "../../../components/GradientButton";
import HeigthBottomSheetEdit from "./molecules/HeigthBottomSheetEdit";
import CustomAlert from "../../../components/CustomAlert";
import { UseProfileDetailEdit } from "./molecules/UseProfileDetailEdit";
import { useSelector } from "react-redux";
import {
  authData,
  setPositionsAndSkills,
} from "../../../redux/reducers/authReducer";
import {
  checkUsername,
  getSpecificUser,
  SaveUser,
} from "../../services/UserServices";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../services/StorageServics";
import CustomLocationBottomSheet from "../../../components/CustomLocationBottomSheet";
import moment from "moment";
import ProfilePhotoEdit from "../../../components/ProfilePhotoEdit";
import { deleteImage } from "../../services/PostServices";
import { positionSkillValidate } from "../../../utils/Commons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneNumberInput from "../../../components/PhoneNumberInput";
const EditProfile = ({ navigation, route }) => {
  const currentDate = moment();
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [selectionType, setSelectionType] = useState("");
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState('');
  useEffect(() => {
    if (cityModalVisible === true) {
      setSelectionType("cities");
    } else if (countryModalVisible === true) {
      setSelectionType("country");
    } else {
    }
  }, [countryModalVisible, cityModalVisible]);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state?.auth);
  const [heightModalVisible, setHeightModalVisible] = useState(false);
  const [value, setValue] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const dispatch = useDispatch();
  const [alertlVisible, setAlertVisible] = useState(false);

  const [heightValue, setHeightValue] = useState("");

  const [signupId, setSignupId] = useState(-1);

  const [stateError, setStateError] = useState({
    errorHeader: "",
    errorBody: "",
  });
  const [signupValues, setSignupValues] = useState({
    accountType: currentUser?.currentUser?.accountType,
    country: currentUser?.currentUser?.country,
    age: currentUser?.currentUser?.age,
    gender: currentUser?.currentUser?.gender,
    city: currentUser?.currentUser?.city,
    height: currentUser?.currentUser?.height,
    selectSport: currentUser?.currentUser?.selectSport,
    sportEmoji: currentUser?.currentUser?.sportEmoji,
    position: currentUser?.currentUser?.position,
    strongHand: currentUser?.currentUser?.strongHand,
    strongFoot: currentUser?.currentUser?.strongFoot,
    skill1: currentUser?.currentUser?.skill1,
    skill2: currentUser?.currentUser?.skill2,
    skill3: currentUser?.currentUser?.skill3,
    bio: currentUser?.currentUser?.bio,
    stats: currentUser?.currentUser?.stats,
    name: currentUser?.currentUser.name,
    username: currentUser?.currentUser.username,
    phone: currentUser?.currentUser.phoneNumber,
  });
  const SignupData = [
    {
      withLabel: "Name",
      value: signupValues.name,
      placeholder: "i.e.john Doe",
      compulsory: true,
      onChangeText: (txt) => {
        setSignupValues({ ...signupValues, name: txt });
      },
    },
    {
      withLabel: "Username",
      placeholder: "i.e.@john23",
      compulsory: true,
      value: signupValues.username,
      onChangeText: (txt) => {
        if (
          txt?.match(
            /^(?=.*[!@#$%^&*()\-=“‘?+{};:,<>£%©®™✓°¢$¥€~`|/•√π÷×¶∆"'])/
          )
        ) {
          return;
        }
        setUsername(txt);

        setSignupValues({ ...signupValues, username: txt });
      },
    },

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
      multiline: true,
      onChangeText: (txt) => {
        setSignupValues({ ...signupValues, bio: txt });
      },

      // inputHeight: verticalScale(50),
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
      // inputHeight: verticalScale(50),
    },
  ];
  const SignupData2 = [
    {
      withLabel: "Name",
      value: signupValues.name,
      placeholder: "i.e.john Doe",
      compulsory: true,
      onChangeText: (txt) => {
        setSignupValues({ ...signupValues, name: txt });
      },
    },
    {
      withLabel: "Username",
      placeholder: "i.e.@john23",
      compulsory: true,
      value: signupValues.username,
      onChangeText: (txt) => {
        if (
          txt?.match(/^(?=.*[!@#$%^&*()\-=“‘?+{};:,<>£%©®™✓°¢$¥€~`|/•√π÷×¶∆])/)
        ) {
          return;
        }
        setSignupValues({ ...signupValues, username: txt });
      },
    },

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
      height: verticalScale(100),
      multiline: true,
      maxLength: 100,
      onChangeText: (txt) => {
        setSignupValues({ ...signupValues, bio: txt });
      },
    },
  ];

  const onSetHeightValue = (item) => {
    setSignupValues({ ...signupValues, height: `${item} cm` });
    setHeightModalVisible(false);
  };

  const onSetValue = (item, data) => {
    if (signupId == "Account Type") {
      setSignupValues({ ...signupValues, accountType: item });
      setModalVisible(false);

      return;
    }

    if (signupId == "Select Sport") {
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
    console.log("signupValues.phone", signupValues.phone);
    const birthDate = moment(signupValues.age, "YYYY-MM-DD");
    const currentDate = moment();

    const ageInYears = currentDate.diff(birthDate, "years");
    console.log(ageInYears);

    if (
      signupValues.accountType == "Athlete" ||
      signupValues.accountType == "Esports"
    ) {
      const validateResponse = UseProfileDetailEdit(
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
        if (ageInYears <= 5) {
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

      setIsLoading(true);
      await SaveUserProfile();
    }
  };
  const SaveUserProfile = async () => {
    const usernameExist = await checkUsername(username);

    // console.log('usernameExistData', signupValues.username);
    if (usernameExist) {
      setStateError({
        ...stateError,
        errorHeader: "Username",
        errorBody:
          "Username is Already Exist Please Try Another Username To Proceed",
      });

      setAlertVisible(true);

      setIsLoading(false);

      return;
    }
    var a = moment();
    var b = moment(signupValues.age, "YYYY");
    var age =
      currentUser?.currentUser?.age == signupValues.age
        ? currentUser?.currentUser?.age
        : a.diff(b, "years");

    const profileData = {
      ...currentUser?.currentUser,
      email: currentUser?.currentUser.email,
      name: currentUser?.currentUser.name,
      username: username ? username : currentUser?.currentUser.username,
      uid: currentUser?.currentUser.uid,
      firstLogin: currentUser.currentUser.firstLogin,
      accountType: signupValues.accountType,
      country: signupValues.country,
      age: age,
      phoneNumber: signupValues.phone,
      gender: signupValues.gender,
      city: signupValues.city,
      height: signupValues.height,
      profileImage: currentUser?.currentUser?.profileImage,
      selectSport: signupValues.selectSport,
      position: signupValues.position,
      strongHand: signupValues.strongHand,
      strongFoot: signupValues.strongFoot,
      skill1: signupValues.skill1,
      skill2: signupValues.skill2,
      skill3: signupValues.skill3,
      bio: signupValues.bio,
      stats: signupValues.stats,
      name: signupValues?.name,
      username: signupValues?.username,
      sportEmoji: signupValues.sportEmoji ? signupValues.sportEmoji : "",
    };

    if (imageUrl) {
      const deleRes = deleteImage(currentUser?.currentUser.profileImage);
      if (deleRes) {
        const linkData = await uploadImage(
          imageUrl,
          currentUser?.currentUser.uid
        );
        profileData["profileImage"] = linkData;
      }
    }
    // console.log('data', profileData);
    await SaveUser(currentUser?.currentUser.uid, profileData);
    const data = await getSpecificUser(currentUser?.currentUser?.uid);

    dispatch(authData(data));
    setIsLoading(false);
    Toast.show("Profile  update successfully");
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView
      automaticallyAdjustKeyboardInsets={true}
      keyboardShouldPersistTaps={"always"}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={commonStyles.main}>
        <ImageBackground
          style={{ width: "101%", height: "100%" }}
          source={images.background}
        >
          <Spacer height={Platform.OS == "ios" ? 30 : 10} />
          <PH10>
            <ProfileTopEdit
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
              <ProfilePhotoEdit
                addPhoto
                width={scale(80)}
                height={scale(80)}
                imageUrl={
                  imageUrl ? imageUrl : currentUser?.currentUser?.profileImage
                }
                setImageUrl={setImageUrl}
                profilePic={currentUser?.currentUser?.profileImage}
                mainStyle={{
                  shadowColor: Platform.OS == "ios" ? "#343a40" : colors.black,
                  shadowRadius: 2,
                  elevation: 5,
                  shadowOpacity: 0.4,
                  // inputMarginTop:-20,
                  shadowOffset: { width: -1, height: 3 },
                }}
              />
              <Spacer height={20} />
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
                iconWidth={scale(9)}
                compulsory={true}
                iconHeight={verticalScale(9)}
                rigthIcon={icons.dropdown}
                onPress={() => {
                  setSignupId("Account Type");
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
              signupValues.accountType == "Esports" ? (
                <>
                  <View>
                    <View>
                      <Spacer height={15} />
                      <AgeRangeEdit
                        setSignupValues={setSignupValues}
                        signupValues={signupValues}
                      />
                    </View>
                    <Spacer height={15} />

                    <View>
                      <GanderConatinerEdit
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
                      iconHeight={verticalScale(9)}
                      iconWidth={scale(9)}
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
              signupValues.accountType == "Esports" ? (
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
                              if (item.id == 10 || item.id == 11) {
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
                            if (item.id == 10 || item.id == 11) {
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
                          onRightPress={() => {
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
                      </>
                    );
                  })}
                </View>
              )}
              <Spacer height={5} />
              <GradientButton
                onPress={onProfileDetail}
                loading={isLoading}
                title={"Update Profile"}
              />
              <Spacer height={20} />
            </View>
          </PH20>
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
        onCloseModal={() => setCountryModalVisible(false)}
        selectionType={selectionType}
      />
      <CustomLocationBottomSheet
        modalVisible={cityModalVisible}
        onLocationPress={(data) => {
          setSignupValues({ ...signupValues, city: data });
          setCityModalVisible(false);
        }}
        onCloseModal={() => setCityModalVisible(false)}
        selectionType={selectionType}
        selectedCountry={signupValues.country}
      />

      <CustomAlert
        stateError={stateError}
        modalVisible={alertlVisible}
        setModalVisible={setAlertVisible}
      />
      <HeigthBottomSheetEdit
        EsportsSport
        modalVisible={heightModalVisible}
        onSetValue={onSetHeightValue}
        setValue={setHeightValue}
        onCloseModal={() => setHeightModalVisible(false)}
      />
    </KeyboardAwareScrollView>
  );
};

export default EditProfile;
