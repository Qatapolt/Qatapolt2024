import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef, useMemo} from 'react';
import {BottomSheet} from 'react-native-btr';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../utils/Colors';
import {Spacer} from './Spacer';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomText from './CustomText';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {locations} from '../utils/locations';
import {InterFont} from '../utils/Fonts';
import {AlphabetList} from 'react-native-section-alphabet-list';
const CustomLocationBottomSheet = props => {
  const allLocations = [locations];

  const [search, setSearch] = useState('');
  //  Cities
  const citiesInSelectedCountry = Object.keys(locations).filter(city => {
    return locations[city] === props.selectedCountry;
  });
  const cities = Array.from(citiesInSelectedCountry).sort();
  // Countries
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

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // console.log("combinedDataCountry",combinedDataCountry)

  const renderItemCountries = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCountry(item.value);
          props.onCloseModal();
        }}
        style={{
          backgroundColor: 'white',
          padding: 10,
          marginVertical: 10,
          // borderBottomWidth: 0.5,
          // borderBottomColor: '#000',
        }}>
        <CustomText
          label={item.value}
          fontFamily={InterFont.semiBold}
          fontSize={11}
        />
      </TouchableOpacity>
    );
  };
  const renderItemCities = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCity(item.value);
          props.onCloseModal();
        }}
        style={{
          backgroundColor: 'white',
          padding: 10,
          marginVertical: 10,
          // borderBottomWidth: 0.5,
          // borderBottomColor: '#000',
        }}>
        <CustomText
          label={item.value}
          fontFamily={InterFont.semiBold}
          fontSize={11}
        />
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    if (selectedCountry !== null) {
      props.onLocationPress(selectedCountry);
      setSearch('');
    } else if (selectedCity !== null) {
      props.onLocationPress(selectedCity);
      setSearch('');
    }
  }, [selectedCountry, selectedCity]);
  return (
    <BottomSheet
      visible={props.modalVisible}
      onBackButtonPress={props.onCloseModal}
      onBackdropPress={props.onCloseModal}>
      <View
        flexDirection={'column'}
        backgroundColor={'white'}
        alignSelf="center"
        maxHeight={'80%'}
        paddingHorizontal={scale(15)}
        minHeight={'70%'}
        width={'97%'}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden">
        <Spacer height={5} />

        <View style={styles.topLine}></View>
        <Spacer height={10} />
        {props?.selectionType === 'country' ? (
          <>
            <TextInput
              value={search}
              onChangeText={text => {
                setSearch(text);
              }}
              placeholder="Search Country"
              placeholderTextColor="#6c757d"
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                backgroundColor: colors.graySearch,
                height: verticalScale(35),
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                fontSize: 16,
                padding: 10,
              }}
            />
            <View style={{backgroundColor: '#fff', flex: 1}}>
              <AlphabetList
                data={combinedDataCountry.filter(country =>
                  country.value
                    .toLowerCase()
                    .includes(search.toLowerCase().trim()),
                )}
                style={{height: '100%'}}
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
                extraData={combinedDataCountry.filter(country =>
                  country.value
                    .toLowerCase()
                    .includes(search.toLowerCase().trim()),
                )}
                // renderCustomItem={(item, index) => (
                //   <View
                //     style={{
                //       marginVertical: 10,
                //       // borderBottomWidth: 0.5,
                //       // borderBottomColor: colors.green,
                //       marginHorizontal: 25,
                //     }}
                //     key={index}>
                //     <CustomText fontWeight={'500'} label={item.value} />
                //   </View>
                // )}
                renderCustomSectionHeader={section => (
                  <View
                    style={{
                      backgroundColor: colors.green,
                      height: verticalScale(20),
                      width: scale(30),
                      borderRadius: scale(20),
                      justifyContent: 'center',

                      marginVertical: 10,
                    }}>
                    <CustomText
                      fontWeight={'600'}
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
        ) : (
          <>
            <TextInput
              value={search}
              onChangeText={text => {
                setSearch(text);
              }}
              placeholder={'City / Town'}
              placeholderTextColor="#6c757d"
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                backgroundColor: colors.graySearch,
                height: verticalScale(35),
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                fontSize: 16,
                padding: 10,
              }}
            />

            <>
              <View style={{backgroundColor: '#fff', flex: 1}}>
                <AlphabetList
                  data={combinedDataCity.filter(country =>
                    country.value
                      .toLowerCase()
                      .includes(search.toLowerCase().trim()),
                  )}
                  style={{height: '100%'}}
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
                  renderCustomItem={renderItemCities}
                  renderCustomSectionHeader={section => (
                    <View
                      style={{
                        backgroundColor: colors.green,
                        height: verticalScale(20),
                        width: scale(30),
                        borderRadius: scale(20),
                        justifyContent: 'center',

                        marginVertical: 10,
                      }}>
                      <CustomText
                        fontWeight={'600'}
                        fontSize={13}
                        marginLeft={10}
                        color={colors.white}
                        label={section.title}
                      />
                    </View>
                  )}
                  extraData={combinedDataCity.filter(country =>
                    country.value
                      .toLowerCase()
                      .includes(search.toLowerCase().trim()),
                  )}
                />

                {/* <FlatList
                  data={cities.filter(city =>
                    city.toLowerCase().includes(search.toLowerCase().trim()),
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItemCities}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  nestedScrollEnabled
                /> */}
              </View>
            </>
          </>
        )}
      </View>
    </BottomSheet>
  );
};

export default CustomLocationBottomSheet;

const styles = StyleSheet.create({
  topLine: {
    width: scale(80),
    height: 5,
    backgroundColor: '#dee2e6',
    alignSelf: 'center',
    borderRadius: 10,
  },
  searchBody: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#dee2e6',
    height: verticalScale(30),
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
