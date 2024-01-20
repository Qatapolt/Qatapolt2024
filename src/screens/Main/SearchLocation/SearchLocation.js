import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {PH10, PH20} from '../../../utils/CommonStyles';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {colors} from '../../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../../components/CustomHeader';
import {InterFont} from '../../../utils/Fonts';
import {Spacer} from '../../../components/Spacer';
import CustomText from '../../../components/CustomText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {setCreatePostLocation} from '../../../redux/reducers/authReducer';
import {useState} from 'react';

const SearchLocation = props => {
  const dispatch = useDispatch();
  const postLocation = useSelector(state => state.auth.createPostLocation);
  const currentLocation = useSelector(state => state.auth.currentLocation);
  const [location, setLocation] = useState('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <PH10>
        <Spacer height={10} />
        <CustomHeader
          LeftSide={() => (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                color={colors.black}
                size={moderateScale(30)}
              />
            </TouchableOpacity>
          )}
          Center={() => (
            <CustomText
              label={'Search Location'}
              fontSize={18}
              textAlign="center"
              fontFamily={InterFont.semiBold}
              color={colors.black}
              // fontFamily={InterFont.bold}
            />
          )}
        />
        <Spacer height={30} />
        <View style={{height: '65%'}}>
          <GooglePlacesAutocomplete
            enablePoweredByContainer={false}
            predefinedPlacesAlwaysVisible={true}
            placeholder="Search Location"
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            textInputProps={{
              placeholderTextColor: '#6c757d',
              onChangeText: txt => {
                setLocation(txt);
                dispatch(setCreatePostLocation(txt));
              },
            }}
            styles={{
              textInputContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                backgroundColor: colors.graySearch,
                height: verticalScale(35),
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              },
              textInput: {
                height: '100%',
                backgroundColor: colors.graySearch,
                alignItems: 'center',
                borderRadius: 10,

                justifyContent: 'center',

                color: 'black',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
              description: {
                backgroundColor: 'white',
                textAlignVertical: 'center',
                color: 'black',
              },
              separator: {backgroundColor: 'white'},
            }}
            // onPress={()=>{

            // }}
            query={{
              key: 'AIzaSyDXoHO79vxypTv8xL4V10cf5kFpIYDO9Rk',
              language: 'en',
              types: 'geocode',
            }}
          />
        </View>
      </PH10>
      {location.length > 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: verticalScale(20),
          }}>
          <PH10>
            <CustomButton
              title={'Continue'}
              backgroundColor={colors.green}
              onPress={() =>
                props.navigation.navigate('NewPost', {
                  selectedLocation: location,
                })
              }
              height={45}
              color={colors.white}
              borderRadius={30}
              marginBottom={20}
            />
          </PH10>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchLocation;

const styles = StyleSheet.create({});
