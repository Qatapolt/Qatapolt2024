import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { BottomSheet } from "react-native-btr";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { colors } from "../utils/Colors";
import { Spacer } from "./Spacer";
import CustomText from "./CustomText";
import { locations } from "../utils/locations";
import { InterFont } from "../utils/Fonts";
import { AlphabetList } from "react-native-section-alphabet-list";

const CustomSearchLocation = ({
  setLocationDetails,
  navigation,
  onCloseModal,
  modalVisible,
}) => {
  const [search, setSearch] = useState("");
  const citiesFromLocation = Object.keys(locations);
  const cities = Array.from(citiesFromLocation).sort();
  const countriesSet = new Set(Object.values(locations));
  const countries = Array.from(countriesSet).sort();
  const alphabetDataCountry = countries.map((country, index) => ({
    value: country,
    key: index.toString(), // You can use the index as the key
  }));
  const alphabetDataCity = cities.map((city, index) => ({
    value: city,
    key: index.toString(), // You can use the index as the key
  }));
  const combinedDataCountry = [...alphabetDataCountry];
  const combinedDataCity = [...alphabetDataCity];
  const citiesAndCountries = [...combinedDataCity, ...combinedDataCountry];

  const renderItemCountries = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setLocationDetails(item.value);
          onCloseModal();
          setSearch("");
        }}
        style={{
          backgroundColor: "white",
          padding: 10,
          marginVertical: 10,
        }}
      >
        <CustomText
          label={item.value}
          fontFamily={InterFont.semiBold}
          fontSize={11}
        />
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheet
      visible={modalVisible}
      onBackButtonPress={onCloseModal}
      onBackdropPress={onCloseModal}
    >
      <View
        flexDirection={"column"}
        backgroundColor={"white"}
        alignSelf="center"
        maxHeight={"90%"}
        paddingHorizontal={scale(15)}
        minHeight={"90%"}
        width={"97%"}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden"
      >
        <Spacer height={5} />

        <View style={styles.topLine}></View>
        <Spacer height={10} />

        <>
          <TextInput
            value={search}
            onChangeText={(text) => {
              setSearch(text);
            }}
            placeholder="Search Location"
            placeholderTextColor="#6c757d"
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              backgroundColor: colors.graySearch,
              height: verticalScale(35),
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              color: "black",
              fontSize: 16,
              padding: 10,
            }}
          />
          <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <AlphabetList
              data={citiesAndCountries.filter((country) =>
                country.value
                  .toLowerCase()
                  .includes(search.toLowerCase().trim())
              )}
              style={{ height: "100%" }}
              indexLetterStyle={{
                color: colors.black,
                fontSize: verticalScale(10),
                paddingVertical: 3,
              }}
              keyExtractor={(item, index) => index.toString()}
              indexLetterContainerStyle={{
                height: verticalScale(16),
                width: verticalScale(15),
              }}
              renderCustomItem={renderItemCountries}
              extraData={citiesAndCountries.filter((country) =>
                country.value
                  .toLowerCase()
                  .includes(search.toLowerCase().trim())
              )}
              renderCustomSectionHeader={(section) => (
                <View
                  style={{
                    backgroundColor: colors.green,
                    height: verticalScale(20),
                    width: scale(30),
                    borderRadius: scale(20),
                    justifyContent: "center",

                    marginVertical: 10,
                  }}
                >
                  <CustomText
                    fontWeight={"600"}
                    fontSize={13}
                    marginLeft={10}
                    color={colors.white}
                    label={section.title}
                  />
                </View>
              )}
            />
          </View>
        </>
      </View>
    </BottomSheet>
  );
};

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

export default CustomSearchLocation;
