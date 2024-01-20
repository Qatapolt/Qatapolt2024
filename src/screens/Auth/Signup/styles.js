import {scale, ScaledSheet} from 'react-native-size-matters';
import {colors} from '../../../utils/Colors';
import {
  Platform,
 
} from 'react-native';
export const styles = ScaledSheet.create({
  bodyView: {
    flex: 1,
    // backgroundColor: colors.white,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
  },
  inShadow:{
    shadowColor:colors.white,
    shadowRadius: 5,
    elevation: 5,
    shadowOpacity: 0.5,
    // inputMarginTop:-20,
    shadowOffset: {width: 1, height: 1},
  }
});
