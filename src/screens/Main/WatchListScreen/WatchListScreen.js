import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../../utils/Colors';
import CustomText from '../../../components/CustomText';
import {icons} from '../../../assets/icons';
import {Spacer} from '../../../components/Spacer';
import {Avatar, Divider, Image, ListItem} from 'react-native-elements';
import TopTabs from '../../../components/TopTabs';
import commonStyles, {PH10, PH20} from '../../../utils/CommonStyles';
import {images} from '../../../assets/images';
import {moderateScale, scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomSearch from '../../../components/CustomSearch';
import {useSelector} from 'react-redux';
import WatchItem from './Molecules/WatchItem';
import {getAllFollowers} from '../../services/UserServices';
import {useIsFocused} from '@react-navigation/native';
import WatchHeader from './Molecules/WatchHeader';
import {SafeAreaView} from 'react-native';
import {InterFont} from '../../../utils/Fonts';

const WatchListScreen = ({navigation}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const focused = useIsFocused();
  const [watchListData, setWatchListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authUser = useSelector(state => state.auth.currentUser);
  const [onReFresh, setonReFresh] = useState(false);
  // console.log('AuthWatch', authUser?.WatchList);

  useEffect(() => {
    getAllWatchList();
  }, [focused, onReFresh]);

  const getAllWatchList = () => {
    if (authUser?.WatchList?.length == 0 || authUser?.WatchList == undefined) {
      setWatchListData([]);
      setIsLoading(false);
    } else {
      getAllFollowers(setWatchListData, authUser?.WatchList);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const filterWatchList = txt => {
    setSearch(txt);
    // console.log('TxtData', txt);
    if (txt.length == 0) {
      getAllFollowers(setWatchListData, authUser?.WatchList);
      return;
    } else {
      let filterSearch = watchListData?.filter(item => {
        return `${item.name} ${item.username}`
          .toLowerCase()
          .trim()
          .includes(txt.toLowerCase().trim());
      });
      setWatchListData(filterSearch);
    }
  };

  const RenderWatchList = ({item, index}) => {
    return (
      <WatchItem
        getAllWatchList={getAllWatchList}
        setonReFresh={setonReFresh}
        onReFresh={onReFresh}
        authUser={authUser}
        item={item}
        navigation={navigation}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer height={Platform.OS == 'android' ? 40 : 10} />
      <WatchHeader
        filterWatchList={filterWatchList}
        search={search}
        navigation={navigation}
      />
      <Spacer height={10} />

      {watchListData?.length == undefined ||
        (watchListData?.length == 0 && (
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              flex: 1,
              top: 130,
            }}>
            <PH20>
              {!isLoading && (
                <CustomText
                  label={
                    watchListData?.length == undefined ||
                    watchListData?.length == 0
                      ? 'Click the star on another users profile to start your list!'
                      : ``
                  }
                  fontSize={12}
                  fontFamily={InterFont.medium}
                  color={colors.black}
                />
              )}
            </PH20>
          </View>
        ))}

      <ScrollView showsVerticalScrollIndicator={false}>
        <PH20>
          {!isLoading && (
            <>
              <CustomText
                label={
                  !watchListData?.length == undefined ||
                  !watchListData?.length == 0
                    ? `${watchListData?.length} in your list`
                    : ``
                }
                fontSize={14}
              />
              <Spacer height={5} />
            </>
          )}
        </PH20>
        <Spacer height={10} />

        <FlatList
          data={watchListData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderWatchList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WatchListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal:20
  },
  postContainer: {
    // aspectRatio: 1,
    width: '100%',
    height: 350,
    // flex: 1,
  },
  postFooterIcon: {
    width: 24,
    height: 26,
  },
  tag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: colors.superDuperLightGray,
    borderRadius: 5,
  },
});
