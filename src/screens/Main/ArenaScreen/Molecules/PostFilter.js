import { View, Text, Platform, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import CustomTextInput from "../../../../components/CustomTextInput";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { icons } from "../../../../assets/icons";
import { Spacer } from "../../../../components/Spacer";
import { colors } from "../../../../utils/Colors";
import CustomButton from "../../../../components/CustomButton";
import { InterFont } from "../../../../utils/Fonts";
import AgeRange from "../../../Auth/AdvanceSearch/molecules/AgeRange";
import GanderConatiner from "../../../Auth/AdvanceSearch/molecules/GanderConatiner";
import { positionSkillValidate } from "../../../../utils/Commons";
import { useDispatch, useSelector } from "react-redux";
import { setPositionsAndSkills } from "../../../../redux/reducers/authReducer";
import CustomText from "../../../../components/CustomText";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomPicker from "../../../../components/CustomPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
const PostFilter = ({
  setModalVisible,
  setCityModalVisible,
  setCountryModalVisible,
  setSignupId,
  onFilterTimeLine,
  setHeightModalVisible,
  type,
}) => {
  const [minAge, setMinAge] = useState(null);
  const [maxAge, setMaxAge] = useState(null);
  const [finalAge, setFinalAge] = useState(null);
  const [minHeight, setMinHeight] = useState(null);
  const [maxHeight, setMaxHeight] = useState(null);
  const [finalHeight, setFinalHeight] = useState(null);

  const [signupValues, setSignupValues] = useState({
    selectSport: "",
    accountType: "",
    position: "",
    country: "",
    city: "",
    height: "",
    age: "",
    gender: "",
    strongHand: "",
    strongFoot: "",
    skill1: "",
    skill2: "",
    skill3: "",
    freeAgent: false,
  });
  const dispatch = useDispatch();

  const FilterData = [
    {
      id: 2,
      withLabel: "Country",
      placeholder: "Select Country",
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues?.country,
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
      value: signupValues?.city,
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
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues?.selectSport,
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
      iconHeight: verticalScale(11),
      iconWidth: scale(11),
      value: signupValues?.position,
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
      value: signupValues?.strongHand,
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
      value: signupValues?.strongFoot,
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
      value: signupValues?.skill1,
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
      value: signupValues?.skill2,
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
      value: signupValues?.skill3,
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
  const onResetValues = async () => {
    if (type === "FreeAgentPostScreen") {
      try {
        setSignupValues({
          ...signupValues,
          freeAgent: true,
        });
        setMinAge(null);
        setMaxAge(null);
        setFinalAge(null);
        setMinHeight(null);
        setMaxHeight(null);
        setFinalHeight(null);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await AsyncStorage.removeItem("USERS_VALUE_FILTER");
        setSignupValues({
          selectSport: "",
          accountType: "",
          position: "",
          country: "",
          city: "",
          height: "",
          age: "",
          gender: "",
          strongHand: "",
          strongFoot: "",
          skill1: "",
          skill2: "",
          skill3: "",
          freeAgent: false,
        });
        setMinAge(null);
        setMaxAge(null);
        setFinalAge(null);
        setMinHeight(null);
        setMaxHeight(null);
        setFinalHeight(null);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <View style={{ padding: 10 }}>
      <CustomTextInput
        inputStyle={{
          shadowColor: Platform.OS == "ios" ? colors.inputGray : colors.black,
          shadowRadius: 5,
          elevation: 5,
          shadowOpacity: 0.5,

          shadowOffset: { width: 1, height: 1 },
        }}
        withLabel={"Account Type"}
        value={signupValues.accountType}
        editable={false}
        iconWidth={scale(11)}
        iconHeight={verticalScale(11)}
        rigthIcon={icons.dropdown}
        onPress={() => {
          setSignupId("Account Type");

          const data = positionSkillValidate("Account Type", signupValues);
          dispatch(setPositionsAndSkills(data));
          setModalVisible(true);
        }}
        onRightPress={() => {
          setSignupId("Account Type");
          const data = positionSkillValidate("Account Type", signupValues);
          dispatch(setPositionsAndSkills(data));
          setModalVisible(true);
        }}
        placeholder={"Select Type"}
      />

      <View>
        <Spacer height={15} />
        <View style={styles.box}>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <View>
              <CustomText
                label={"Age"}
                color={colors.inputGray}
                fontSize={verticalScale(8)}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              top: 5,
            }}
          >
            <View>
              <CustomPicker
                disableAutoScroll={true}
                data={Array.from({ length: 60 }, (_, i) => i + 10)}
                onSelect={(selectedItem, index) => {
                  setMinAge(selectedItem);
                  console.log("selectedValue: " + selectedItem);
                }}
                defaultButtonText={"Min Age"}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem + "  years";
                }}
                rowTextForSelection={(item, index) => {
                  return item + "  years";
                }}
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Icon
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={isOpened ? colors.black : colors.inputGray}
                      size={18}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
                selectedRowStyle={styles.dropdown2SelectedRowStyle}
              />
            </View>

            <View>
              <CustomPicker
                disabled={minAge === null ? true : false}
                disableAutoScroll={true}
                data={Array.from(
                  { length: 60 - minAge + 1 },
                  (_, i) => minAge + i
                )}
                onSelect={(selectedItem, index) => {
                  setMaxAge(selectedItem);
                  try {
                    if (minAge !== undefined && selectedItem !== undefined) {
                      const age = parseInt((minAge + selectedItem) / 2);

                      setFinalAge(age);
                      setSignupValues({
                        ...signupValues,
                        age: age,
                      });

                      console.log("selectedValue: " + selectedItem);
                    }
                  } catch (error) {
                    console.log("error", error);
                  }
                }}
                defaultButtonText={"Max Age"}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem + "  years";
                }}
                rowTextForSelection={(item, index) => {
                  return item + "  years";
                }}
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Icon
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={isOpened ? colors.black : colors.inputGray}
                      size={18}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
                selectedRowStyle={styles.dropdown2SelectedRowStyle}
                // renderCustomizedRowChild={renderArea}
              />
            </View>
          </View>
        </View>
        {/* <AgeRange
          setSignupValues={setSignupValues}
          signupValues={signupValues}
          compulsory={false}
        /> */}
        <Spacer height={15} />
        <View style={styles.box}>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <View>
              <CustomText
                label={"Height"}
                color={colors.inputGray}
                fontSize={verticalScale(8)}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              top: 5,
            }}
          >
            <View>
              <CustomPicker
                disableAutoScroll={true}
                data={Array.from({ length: 235 }, (_, i) => i + 41)}
                onSelect={(selectedItem, index) => {
                  setMinHeight(selectedItem);
                }}
                defaultButtonText={"Min Height"}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem + "  cm";
                }}
                rowTextForSelection={(item, index) => {
                  return item + "  cm";
                }}
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Icon
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={isOpened ? colors.black : colors.inputGray}
                      size={18}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
                selectedRowStyle={styles.dropdown2SelectedRowStyle}
              />
            </View>
            <View>
              <CustomPicker
                disabled={minHeight === null ? true : false}
                disableAutoScroll={true}
                data={Array.from(
                  { length: 235 - minHeight + 1 },
                  (_, i) => minHeight + i
                )}
                onSelect={(selectedItem, index) => {
                  setMaxHeight(selectedItem);
                  try {
                    if (minHeight !== undefined && selectedItem !== undefined) {
                      const height = parseInt((minHeight + selectedItem) / 2);

                      setFinalHeight(height);
                      setSignupValues({
                        ...signupValues,
                        height: `${height} cm`,
                      });

                      console.log("selectedValue: " + selectedItem);
                    }
                  } catch (error) {
                    console.log("error", error);
                  }
                }}
                defaultButtonText={"Max Height"}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem + "  cm";
                }}
                rowTextForSelection={(item, index) => {
                  return item + "  cm";
                }}
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Icon
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={isOpened ? "black" : "gray"}
                      size={18}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
                selectedRowStyle={styles.dropdown2SelectedRowStyle}
                // renderCustomizedRowChild={renderArea}
              />
            </View>
          </View>
        </View>
        <Spacer height={15} />
        <View>
          <GanderConatiner
            type={type}
            isFreeAgent={true}
            setSignupValues={setSignupValues}
            signupValues={signupValues}
          />
        </View>

        <Spacer height={15} />
      </View>
      {FilterData.map((item, index) => {
        return (
          <>
            <View>
              <CustomTextInput
                inputStyle={{
                  shadowColor:
                    Platform.OS == "ios" ? colors.inputGray : colors.black,
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

                  setSignupId(item.withLabel);
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
      <View
        style={{
          alignItems: "flex-end",
          width: "100%",
          marginLeft: -5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <CustomButton
            title="Reset"
            width={"20%"}
            height={40}
            onPress={() => {
              onResetValues();
            }}
            color={colors.white}
            fontFamily={InterFont.light}
            fontWeight={"500"}
            backgroundColor={colors.green}
            marginHorizontal={20}
          />

          <CustomButton
            title="Filter"
            width={"20%"}
            height={40}
            onPress={() => {
              onFilterTimeLine(signupValues, type);
            }}
            color={colors.white}
            fontFamily={InterFont.light}
            fontWeight={"500"}
            backgroundColor={colors.green}
            // marginHorizontal={10}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  dropdown2BtnStyle: {
    width: 150,
    height: 35,
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.inputGray,
    padding: 8,
  },
  dropdown2BtnTxtStyle: {
    color: "black",
    textAlign: "left",

    fontSize: 12,
  },

  dropdown2DropdownStyle: { backgroundColor: "#fff" },
  dropdown2RowStyle: {
    backgroundColor: "#fff",
    borderBottomColor: "#fff",
    // height: 35,
  },
  dropdown2RowTxtStyle: {
    color: "black",
    textAlign: "left",

    fontSize: 20,
    // height: 40,
  },
  dropdown2SelectedRowStyle: { backgroundColor: "#fff" },
  box: {
    width: "100%",
    height: verticalScale(65),
    borderRadius: moderateScale(12),
    padding: scale(10),
    marginTop: verticalScale(0),
    backgroundColor: colors.white,
    shadowColor: Platform.OS == "ios" ? colors.inputGray : colors.black,
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
  },
});
export default PostFilter;
