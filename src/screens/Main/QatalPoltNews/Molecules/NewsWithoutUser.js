import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Spacer} from '../../../../components/Spacer';
import CustomText from '../../../../components/CustomText';
import {icons} from '../../../../assets/icons';
import {colors} from '../../../../utils/Colors';
import {InterFont} from '../../../../utils/Fonts';
import {images} from '../../../../assets/images';
const NewsWithoutUser = ({ user, title, subTitle, description, image, timeAgo}) => {
  return (
    <View>
      <View
        style={{
          width: '90%',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          padding: 7,
          backgroundColor: colors.white,
          shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
          shadowRadius: 5,
          elevation: 5,
          shadowOpacity: 0.5,
          shadowOffset: {width: 1, height: 1},

          borderRadius: 30,
        }}>
        {image ? (
          <>
            <ImageBackground
              imageStyle={{
                borderRadius: 20,
              }}
              source={image}
              style={{
                height: 250,
                width: '100%',
                resizeMode: 'cover',
                // borderRadius: 100,
                shadowColor:
                  Platform.OS == 'ios' ? colors.inputGray : colors.black,
                shadowRadius: 5,
                elevation: 5,
                shadowOpacity: 0.5,
                shadowOffset: {width: 1, height: 1},
              }}>
              <View
                style={{
                  position: 'absolute',

                  paddingHorizontal: 10,
                  display: 'flex',
                  bottom: 20,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                  zIndex: 10,
                }}>
                <CustomText
                  label={subTitle}
                  color={colors.black}
                  fontSize={14}
                  fontFamily={InterFont.bold}
                />
              </View>
            </ImageBackground>
          </>
        ) : (
          <>
            <View
              style={{
                // position: 'absolute',
                padding: 10,
                display: 'flex',
                bottom: 20,
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                zIndex: 10,
                marginVertical: 10,
              }}>
              <CustomText
                label={subTitle}
                color={colors.black}
                fontSize={14}
                fontFamily={InterFont.bold}
              />
            </View>
          </>
        )}

        {/* <Spacer height={10} /> */}
        <View
          style={{
            // padding: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',

            // backgroundColor: 'red',
            width: '90%',
            height: 'auto',
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <CustomText label="2 Days ago" color={'transparent'} />
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText label={timeAgo} color={colors.inputGray} />
          </View>
        </View>

        <View
          style={{
            // backgroundColor: 'red',
            // right: 50,
            width: '96%',
            height: 'auto',
          }}>
          <CustomText
            label={description}
            fontSize={14}
            textAlign={'left'}
            // fontFamily={InterFont.light}
          />
        </View>

        <Spacer height={10} />
      </View>
    </View>
  );
};

export default NewsWithoutUser;
