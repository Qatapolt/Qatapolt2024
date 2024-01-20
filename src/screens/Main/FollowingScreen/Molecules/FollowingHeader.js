import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {PH10} from '../../../../utils/CommonStyles';
import {Spacer} from '../../../../components/Spacer';
import CustomHeader from '../../../../components/CustomHeader';
import {icons} from '../../../../assets/icons';
import {colors} from '../../../../utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';
import {useNavigation} from '@react-navigation/native';
import CustomSearch from '../../../../components/CustomSearch';

const FollowingHeader = ({
  label,
  onFilerFollowers,
  search,
  allFollower,
  setAllFollower,
  navigation,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const onPressBack = () => {
    // console.log('Press back', allFollower);
    if (allFollower) {
      setAllFollower([]);
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={{backgroundColor: 'white'}}>
      <PH10
        style={{
          backgroundColor: colors.green,
          width: '100%',
          height: 120,
          shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
          shadowRadius: 5,
          elevation: 5,
          shadowOpacity: 1,
        }}>
        <Spacer height={Platform.OS == 'ios' ? 50 : 20} />
        <CustomHeader
          LeftSide={() => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={onPressBack}>
                <Ionicons
                  name="chevron-back"
                  color={colors.white}
                  size={moderateScale(30)}
                />
              </TouchableOpacity>
            </View>
          )}
          Center={() => (
            <CustomText
              label={label}
              fontSize={18}
              fontFamily={InterFont.semiBold}
              color={colors.white}
            />
          )}
          RightSide={() => (
            <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
              <Image
                source={icons.search}
                style={{height: 27, width: 27, tintColor: colors.white}}
              />
            </TouchableOpacity>
          )}
        />
      </PH10>
      {showSearch && (
        <>
          <Spacer height={10} />
          <PH10>
            <CustomSearch search={search} onSearchFilter={onFilerFollowers} />
          </PH10>
        </>
      )}
    </View>
  );
};

export default FollowingHeader;
