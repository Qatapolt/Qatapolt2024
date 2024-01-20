import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {PH20} from '../../../../utils/CommonStyles';
import {Spacer} from '../../../../components/Spacer';
import {icons} from '../../../../assets/icons';
import {colors} from '../../../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CreatePostBottom = ({
  useTextInput,
  onPressLocation,
  handleOpenGallery,
  onPickGallery,
  onOpenCamera,
  navigation,
  setPostDescription,
}) => {
  return (
    <PH20>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: verticalScale(10),
          // backgroundColor: 'red',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={onOpenCamera} activeOpacity={0.6}>
            <Entypo
              name="camera"
              size={moderateScale(25)}
              color={colors.inputGray}
            />
          </TouchableOpacity>

          <Spacer width={20} />

          <TouchableOpacity onPress={handleOpenGallery}>
            <FontAwesome
              name="image"
              size={moderateScale(21)}
              color={colors.inputGray}
            />
          </TouchableOpacity>
          <Spacer width={20} />

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPressLocation}
            // style={{width:scale(30),backgroundColor:"red"}}
          >
            <Ionicons
              name="location-sharp"
              size={moderateScale(23)}
              color={colors.inputGray}
            />
          </TouchableOpacity>
          <Spacer width={20} />

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setPostDescription('@')}
            // onPress={() => actionSheetRef.current.show()}
          >
            <Image
              source={icons.at}
              style={{
                width: scale(18),
                height: scale(18),
                tintColor: colors.inputGray,
              }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => useTextInput?.current?.focus()}
          activeOpacity={0.6}>
          <MaterialCommunityIcons
            name="keyboard"
            size={moderateScale(25)}
            color={colors.inputGray}
          />
        </TouchableOpacity>
      </View>
    </PH20>
  );
};

export default CreatePostBottom;

const styles = StyleSheet.create({});
