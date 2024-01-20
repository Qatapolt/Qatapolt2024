import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../../../components/CustomHeader';
import CustomText from '../../../../components/CustomText';
import {colors} from '../../../../utils/Colors';
import {Spacer} from '../../../../components/Spacer';
import {InterFont} from '../../../../utils/Fonts';
import {icons} from '../../../../assets/icons';
import CustomSearch from '../../../../components/CustomSearch';
import {PH10, PH20} from '../../../../utils/CommonStyles';
import CustomOpenDrawer from '../../../../components/CustomOpenDrawer';

const SportsNewsHeader = ({navigation}) => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <View>
      <PH20>
        <CustomHeader
            LeftSide={() => (
              <CustomOpenDrawer navigation={navigation}/>
            
            )}
          Center={() => (
            <CustomText
              label="Latest News"
              fontSize={18}
              color={colors.white}
              fontFamily={InterFont.semiBold}
            />
          )}
          RightSide={() => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setShowSearch(!showSearch)}>
              <Image
                source={icons.search}
                style={{height: 27, width: 27, tintColor: colors.white}}
              />
            </TouchableOpacity>
          )}
        />
      </PH20>
      <View>
        {showSearch && (
          <>
            <Spacer height={10} />
            <PH10>
              <CustomSearch backgroundColor={colors.white}/>
            </PH10>
          </>
        )}
      </View>
      <Spacer height={20} />
    </View>
  );
};

export default SportsNewsHeader;
