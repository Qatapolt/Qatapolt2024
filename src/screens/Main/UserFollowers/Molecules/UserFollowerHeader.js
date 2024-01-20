import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import { colors } from '../../../../utils/Colors';
import CustomText from '../../../../components/CustomText';
import { InterFont } from '../../../../utils/Fonts';
import { PH10 } from '../../../../utils/CommonStyles';
import { Spacer } from '../../../../components/Spacer';
import CustomHeader from '../../../../components/CustomHeader';
import { icons } from '../../../../assets/icons';
import CustomSearch from '../../../../components/CustomSearch';

const UserFollowerHeader = ({label,
  onFilerFollowers,
  search
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor:"white"}}>
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
              <TouchableOpacity onPress={() => navigation.goBack()}>
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
            label= {label} 
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
            <CustomSearch 
            search={search}
            onSearchFilter={(txt)=> onFilerFollowers(txt)}

            />
          </PH10>
        </>
      )}
    </View>
  );
};

export default UserFollowerHeader;
