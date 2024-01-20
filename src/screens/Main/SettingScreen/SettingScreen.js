import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import commonStyles, {PH20} from '../../../utils/CommonStyles';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils/Colors';
import {InterFont} from '../../../utils/Fonts';
import CustomHeader from '../../../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import {Spacer} from '../../../components/Spacer';
import SettingMain from './Molecules/SettingMain';
import {useSelector} from 'react-redux';
import SimpleLoader from '../../../utils/SimpleLoader';
import loaderAnimation from '../../../assets/Loaders';

const SettingScreen = ({navigation}) => {
  const authUser = useSelector(state => state.auth?.currentUser);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={commonStyles.main}>
      <ScrollView>
        <PH20>
          <Spacer height={10} />
          <CustomHeader
            LeftSide={() => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back"
                  color={colors.black}
                  size={moderateScale(30)}
                />
              </TouchableOpacity>
            )}
            Center={() => (
              <CustomText
                label={'Setting'}
                fontSize={18}
                textAlign="center"
                fontFamily={InterFont.semiBold}
                color={colors.black}
                // fontFamily={InterFont.bold}
              />
            )}
          />
          <Spacer height={20} />
          <SettingMain
            authUser={authUser}
            setIsLoading={setIsLoading}
            navigation={navigation}
          />
        </PH20>
      </ScrollView>

      {isLoading && <SimpleLoader file={loaderAnimation} />}
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
