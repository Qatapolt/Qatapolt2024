import React from 'react';
import {View, Text, Image} from 'react-native';
import {Spacer} from '../../../../components/Spacer';
import CustomText from '../../../../components/CustomText';
import {icons} from '../../../../assets/icons';
import {InterFont} from '../../../../utils/Fonts';
const LeagueDetail = ({
  teamAwayLogo,
  teamHomeLogo,
  liveScoreAway,
  liveScoreHome,
  teamHomeName,
  teamAwayName,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 13,
          width: '95%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '33%',
          }}>
          <View
            style={{
              alignItems: 'center',
              width: '33%',
              marginLeft: 5,
            }}>
            {teamHomeLogo ? (
              <Image
                source={{uri: teamHomeLogo}}
                style={{height: 22, width: 30}}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={icons.football2}
                style={{height: 22, width: 30}}
                resizeMode="contain"
              />
            )}
          </View>
          <CustomText
            label={teamHomeName}
            fontFamily={InterFont.semiBold}
            fontSize={9}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '12%',
          }}>
          <CustomText label={liveScoreHome} fontSize={10} />
          <Spacer width={5} />
          <CustomText label="-" />
          <Spacer width={5} />
          <CustomText label={liveScoreAway} fontSize={10} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',

            width: '33%',
          }}>
          <View
            style={{
              alignItems: 'center',

              width: '33%',
              marginRight: 5,
            }}>
            {teamAwayLogo ? (
              <Image
                source={{uri: teamAwayLogo}}
                style={{height: 22, width: 30}}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={icons.football2}
                style={{height: 22, width: 30}}
                resizeMode="contain"
              />
            )}
          </View>

          <CustomText
            label={teamAwayName}
            fontFamily={InterFont.semiBold}
            fontSize={9}
          />
        </View>
      </View>
      <Spacer height={20} />
    </View>
  );
};

export default LeagueDetail;
