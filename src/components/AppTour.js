import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {scale, verticalScale} from 'react-native-size-matters';
import { icons } from '../assets/icons';
import { images } from '../assets/images';
import { colors } from '../utils/Colors';
import commonStyles, {PH10} from '../utils/CommonStyles';
import { InterFont } from '../utils/Fonts';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import { Spacer } from './Spacer';

const AppTour = ({toggleModal, isModalVisible, emoji,title,description,marginTop}) => {
  return (
    <Modal
    animationIn={"fadeIn"}
    
    
      style={{
        backgroundColor: 'transparent',
        alignItems:"flex-start",
        justifyContent:"flex-start",
        // margin: 0,
        // alignItems: 'center',
        flex: 1,
      }}
    //   onBackButtonPress={() => {
    //     toggleModal();
    //   }}
    //   onBackdropPress={toggleModal}
      isVisible={isModalVisible}>
    

<View
            style={{
              height:  verticalScale(95),
              width:  scale(250),
              backgroundColor: colors.green,
              borderRadius: scale(8),
              alignItems: 'flex-start',
              marginTop: marginTop|| verticalScale(50),
              marginLeft:"24%",
              // borderWidth:1.2,
              // borderColor:colors.primary,
              // paddingVertical: scale(10),
              padding: scale(5),
              // marginTop:props.currentStep.order === 4?verticalScale(400):0,

            //   marginLeft:
            //     verticalScale(30)
            }}>
            {/* {console.log('Nlnl', props.currentStep)} */}
            <View style={commonStyles.rowContainer}>
              <CustomText
                label={emoji
              
                }
                marginRight={2}
              />

              <CustomText
                color={colors.white}
                fontFamily={InterFont.bold}
                label={
                 title
                }
              />
            </View>
            <Spacer height={5} />

            <CustomText
              color={colors.white}
              fontFamily={InterFont.bold}
              label={description}
            />

            {/* <Text
                    style={[
                      {
                        color: theme.colors.background,
                      },
                      textStyle.b5,
                    ]}
                  >
                    {props.currentStep.text}
                  </Text> */}
            <View
              style={{
                marginTop: scale(15),
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View flexDirection={'row'}>

              <CustomButton
                     onPress={toggleModal}
                     backgroundColor={colors.white}
                     height={22}
                     width={80}
                     fontSize={11}
                     borderRadius={20}
                     title={'Finish up'}
                   />
               
              </View>

              <CustomText
                // color={colors.inputGray}
                color={colors.black}
                fontFamily={InterFont.bold}
                marginTop={5}
                label={"1 of 1"}
              />

              {/*                     
                    <Text
                      fontSize={scale(11)}
                      style={{color: theme.colors.grey2}}
                    >
                      {`0${props.currentStep.order}/05`}
                    </Text> */}
            </View>
            {/* <View
              style={{
                position: 'absolute',
                bottom: -15,
                left:
                  scale(180),
                height: scale(30),
                width: scale(30),
              }}>
              <Image
                source={images.downArrowIcon}
                style={{
                  width: '100%',
                  height: '100%',
                  tintColor: colors.green,
                }}
              />
             
            </View> */}

<View
              style={{
                position: 'absolute',
                top: -15,
                left:
                  scale(220),
                height: scale(30),
                width: scale(20),
              }}>
              <Image
                source={icons.up}
                style={{
                  width: '100%',
                  height: '100%',
                  tintColor: colors.green,
                }}
              />
             
            </View>
          </View>
       
    </Modal>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    top: '20%',
    start: '13%',
  },
  textContainer: {
    position: 'absolute',
    top: '55%',
    start: '20%',
  },
  proBtn: {
    alignItems: 'center',
    width: '100%',
  },
});

export default AppTour;
