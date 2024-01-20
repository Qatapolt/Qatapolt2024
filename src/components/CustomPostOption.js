import {StyleSheet, Text, View, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {Spacer} from './Spacer';
import {moderateScale, scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {colors} from '../utils/Colors';
import CustomText from './CustomText';
import {setReportUserId} from '../redux/reducers/ReportUserReducer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomPostOption = props => {
  const dispatch = useDispatch();
  console.log("SelectPost",props?.selectPost)
  return (
    <Pressable
    onPress={()=>props.setPotionSheet(false)}
      style={{
        height:"100%",
        width:"100%",
        position: 'absolute',
        alignItems: 'flex-end',
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        justifyContent:"flex-end"
        // flexDirection: 'row',
      }}>
      <View
        flexDirection={'column'}
        backgroundColor={'white'}
        paddingHorizontal={scale(15)}
        height={'20%'}
        width={'100%'}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden"
        >
        <Spacer height={5} />

        <View style={styles.topLine}></View>
        <Spacer height={10} />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={props?.onCopyLink}
          style={styles.optionContainer}>
          <AntDesign
            name="copy1"
            size={moderateScale(20)}
            color={colors.black}
          />

          <CustomText label="Copy Link" marginLeft={7} fontSize={13} />
        </TouchableOpacity>

         {props?.selectPost?.userId == props?.authData?.uid ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={props?.onDelPost}
            style={styles.optionContainer}>
            <FontAwesome
              name="trash-o"
              size={moderateScale(20)}
              color={colors.black}
            />

            <CustomText label="Delete Post" marginLeft={10} fontSize={13} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              props.onCloseModal();

              dispatch(setReportUserId(props?.selectedId));
              props?.navigation.navigate('ReportPost');
            }}
            style={styles.optionContainer}>
            <MaterialIcons
              name="report"
              size={moderateScale(20)}
              color={colors.black}
            />

            <CustomText label="Report Post" marginLeft={7} fontSize={13} />
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
};

export default CustomPostOption;

const styles = StyleSheet.create({
  topLine: {
    width: scale(80),
    height: 5,
    backgroundColor: '#dee2e6',
    alignSelf: 'center',
    borderRadius: 10,
  },
  optionContainer: {
    width: '100%',
    padding: scale(10),
    // borderBottomWidth:0.5,
    // borderColor:"#dee2e6",
    flexDirection: 'row',
    alignItems: 'center',
  },
});
