import EStyleSheet from 'react-native-extended-stylesheet';
import { colors } from '../../../theme';
import { Fonts } from '../../../theme';
import { isIphoneX } from '../../../libs/Utils';
export default EStyleSheet.create({
  flatList: {},
  flatListView: {
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    shadowColor: colors.darkBlack,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 13,
    borderColor: colors.darkGreyBlue
  },
  flatListInnerView: {
    flexDirection: 'row'
  },
  flatListInnerImage: {
    height: 35,
    width: 35,
    resizeMode: 'contain'
  },
  itemDetailsView: {
    width: '100%',
    justifyContent: 'center',
    left: 5
  },
  flatListInnerShortTitle: {
    width:'70%',
    paddingLeft: 8,
    //...Fonts.style.boldWhite
  },
  switchToggleView: {
    right: 35,
    position: 'absolute'
  },
  containerStyle: {
    width: 30,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#ccc',
    padding: 0
  },
  circleStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.lightBlueGrey
  },
  subTitleView: {
    width: '70%',
    top: 3
  },
  subTitle: {
    fontSize: 12,
    paddingLeft: 8,
    //...Fonts.style.mediumBluegrey
  },
  currencyText: {
    fontSize: 16,
    //...Fonts.style.semiBoldWhite
  },
  currencyTextView: {
    right: 35,
    position: 'absolute'
  },
  shadowContainer: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11
  },
  marginTop: {
    // marginTop: isIphoneX() ? 10 : 8
  },
  paddingBottom: {
    paddingBottom: 25
  },
  toggleView:{
    right:35,
    position:'absolute'
  }
}
);
