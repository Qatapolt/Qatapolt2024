import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { BottomSheet } from "react-native-btr";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { colors } from "../utils/Colors";
import { Spacer } from "./Spacer";
import Octicons from "react-native-vector-icons/Octicons";
import CustomText from "./CustomText";
import { AlphabetList } from "react-native-section-alphabet-list";

import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { setPositionsAndSkills } from "../redux/reducers/authReducer";
import { positionSkillValidate } from "../utils/Commons";
import { Modalize } from "react-native-modalize";
const CustomBottomSheet = (props) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const selectData = useSelector((state) => state?.auth?.positionsAndSkills);
  const flatListRef = useRef(null);
  const onSearchFilter = (txt) => {
    setSearch(txt);
    if (txt.length == 0) {
      const data = positionSkillValidate(props?.value, props?.type);
      dispatch(setPositionsAndSkills(data));
    } else {
      const filterSearch = selectData.filter((item) => {
        return `${item?.value}`
          .toLowerCase()
          .trim()
          .includes(txt.toLowerCase().trim());
      });

      dispatch(setPositionsAndSkills(filterSearch));
    }
  };

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  const renderItemData = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("pressed", props.signupValues);
          if (
            props.type.skill1 == item.value ||
            props.type.skill2 == item.value ||
            props.type.skill3 == item.value
          ) {
            return;
          }
          if (props.value == "Account Type") {
            props.setSignupValues({
              ...props.signupValues,
              accountType: item.value,
            });
            props.onCloseModal();
            return;
          }
          if (props.value == "Select Sport") {
            props.setSignupValues({
              ...props.signupValues,
              selectSport: item.value,
              sportEmoji: data.emoji,
            });
            props.onCloseModal();
            return;
          }
          if (props.value == 5 || props.value == 10) {
            props.setSignupValues({ ...props.signupValues, bio: item.value });
            props.onCloseModal();
            return;
          }
          if (props.value == "Select Position") {
            props.setSignupValues({
              ...props.signupValues,
              position: item.value,
            });
            props.onCloseModal();
            return;
          }
          if (props.value == "Skill #1") {
            props.setSignupValues({
              ...props.signupValues,
              skill1: item.value,
            });
            props.onCloseModal();
            return;
          }
          if (props.value == "Strong Hand") {
            props.setSignupValues({
              ...props.signupValues,
              strongHand: item.value,
            });
            setModalVisible(false);
            return;
          }
          if (props.value == "Strong Foot") {
            props.setSignupValues({
              ...props.signupValues,
              strongFoot: item.value,
            });
            props.onCloseModal();
            return;
          }
          if (props.value == "Skill #2") {
            props.setSignupValues({
              ...props.signupValues,
              skill2: item.value,
            });
            props.onCloseModal();
            return;
          }
          if (props.value == "Skill #3") {
            props.setSignupValues({
              ...props.signupValues,
              skill3: item.value,
            });
            props.onCloseModal();
            return;
          }
        }}
        key={index}
      >
        <Spacer height={10} />

        <CustomText
          fontWeight={"500"}
          label={item.value}
          color={
            props.type.skill1 == item.value
              ? colors.graySearch
              : props.type.skill2 == item.value
              ? colors.graySearch
              : props.type.skill3 == item.value
              ? colors.graySearch
              : colors.black
          }
        />
        <Spacer height={10} />
      </TouchableOpacity>
    );
  };

  const renderAlphabet = ({ item, index }) => {
    return (
      <View key={index}>
        <Spacer height={10} />

        <CustomText
          fontWeight={"500"}
          onPress={() => scrollToIndex(index)}
          label={item.alphabet}
        />
      </View>
    );
  };

  return (
    <BottomSheet
      visible={props.modalVisible}
      onBackButtonPress={props.onCloseModal}
      onBackdropPress={props.onCloseModal}
    >
      <View
        flexDirection={"column"}
        backgroundColor={"white"}
        alignSelf="center"
        maxHeight={"80%"}
        paddingHorizontal={scale(15)}
        minHeight={"70%"}
        width={"97%"}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden"
      >
        <Spacer height={5} />

        <View style={styles.topLine}></View>
        <Spacer height={10} />
        <Spacer height={10} />
        <View style={styles.searchBody}>
          <Octicons
            name="search"
            color={colors.black}
            size={moderateScale(20)}
          />
          <TextInput
            value={search}
            style={{
              width: "86%",
              padding: 0,
              paddingRight: scale(10),
              paddingLeft: scale(7),
            }}
            onChangeText={onSearchFilter}
            placeholder="Search..."
            placeholderTextColor={"#6c757d"}
          />
        </View>
        <Spacer height={20} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "90%" }}>
            <FlatList
              data={selectData}
              ref={flatListRef}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: verticalScale(100) }}
              // style={{height: '90%'}}
              // indexLetterStyle={{
              //   color: colors.black,
              //   fontSize: verticalScale(10),
              // }}
              // keyExtractor={(item, index) => index.toString()}

              // indexLetterContainerStyle={{height: verticalScale(20)}}
              renderItem={renderItemData}

              // extraData={selectData.filter(data =>
              //   data.value
              //     .toLowerCase()
              //     .includes(search.toLowerCase().trim()),
              // )}
              // renderCustomSectionHeader={section => (
              //   <View
              //     style={{
              //       backgroundColor: colors.green,
              //       height: verticalScale(20),
              //       width: scale(30),
              //       borderRadius: scale(20),
              //       justifyContent: 'center',
              //     }}>
              //     <CustomText
              //       fontWeight={'600'}
              //       fontSize={13}
              //       marginLeft={10}
              //       color={colors.white}
              //       label={section.title}
              //     />
              //   </View>
              // )}
            />
          </View>

          <View style={{ alignSelf: "flex-end" }}>
            <FlatList
              data={selectData.filter((data) => data?.alphabet)}
              // contentContainerStyle={{paddingBottom: verticalScale(100)}}
              // style={{height: '90%'}}
              // indexLetterStyle={{
              //   color: colors.black,
              //   fontSize: verticalScale(10),
              // }}
              // keyExtractor={(item, index) => index.toString()}

              // indexLetterContainerStyle={{height: verticalScale(20)}}
              renderItem={renderAlphabet}

              // extraData={selectData.filter(data =>
              //   data.value
              //     .toLowerCase()
              //     .includes(search.toLowerCase().trim()),
              // )}
              // renderCustomSectionHeader={section => (
              //   <View
              //     style={{
              //       backgroundColor: colors.green,
              //       height: verticalScale(20),
              //       width: scale(30),
              //       borderRadius: scale(20),
              //       justifyContent: 'center',
              //     }}>
              //     <CustomText
              //       fontWeight={'600'}
              //       fontSize={13}
              //       marginLeft={10}
              //       color={colors.white}
              //       label={section.title}
              //     />
              //   </View>
              // )}
            />
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  topLine: {
    width: scale(80),
    height: 5,
    backgroundColor: "#dee2e6",
    alignSelf: "center",
    borderRadius: 10,
  },
  searchBody: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#dee2e6",
    height: verticalScale(30),
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
