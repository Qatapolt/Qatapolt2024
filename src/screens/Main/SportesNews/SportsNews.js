import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import CustomText from '../../../components/CustomText';
import {Spacer} from '../../../components/Spacer';
import {colors} from '../../../utils/Colors';
import {InterFont} from '../../../utils/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import SportsNewsLayout from '../../../utils/Layouts/SportsNewsLayout';
import {useFocusEffect} from '@react-navigation/native';
import {PH20, PH10} from '../../../utils/CommonStyles';
import CustomHeader from '../../../components/CustomHeader';
import CustomOpenDrawer from '../../../components/CustomOpenDrawer';
import {icons} from '../../../assets/icons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {TextInput} from 'react-native';
const SportsNews = ({navigation}) => {
  const {height} = Dimensions.get('window');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [search, setSearch] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      setArticles([]);
      fetchArticles().then(fetchedArticles => {
        setArticles(fetchedArticles);
      });
    }, []),
  );
  const apikey = 'e42547e8a496bcfc8ce62deedfe11213';

  const url =
    'https://gnews.io/api/v4/top-headlines?category=sports&lang=en&expand=content&apikey=' +
    apikey;
  const fetchArticles = async () => {
    setLoading(true);
    setArticles([]);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        const articles = data.articles.map(article => {
          return {
            title: article.title,
            tempTitle: truncateText(article.title, 10),
            description: article.description,
            tempDescription: truncateText(article.description, 30),
            content: article.content,
            url: article.url,
            image: article.image,
            publishedAt: formatDate(article.publishedAt),
            source: {
              name: article.source.name,
              url: article.source.url,
            },
          };
        });

        setLoading(false);
        // console.log('articles =====>', articles);
        return articles;
      } else {
        setLoading(false);
        setArticles([]);
        return [];
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
      setArticles([]);
      return [];
    }
  };
  function formatDate(dateString) {
    // Parse the ISO 8601 date string and format it
    const formattedDate = moment(dateString).format('DD-MM-YYYY');

    return formattedDate;
  }
  function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
      const truncatedText = words.slice(0, maxWords).join(' ') + '...';
      return truncatedText;
    } else {
      return text;
    }
  }

  const onRefresh = () => {
    setLoading(true);
    setRefreshing(true);
    setArticles([]);
    fetchArticles().then(fetchedArticles => {
      setArticles(fetchedArticles);
      setLoading(false);
      setRefreshing(false);
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate('SportsNewsDetail', {item: item})}
          activeOpacity={0.8}
          style={{
            // height: 550,
            width: 380,
            backgroundColor: colors.white,
            borderRadius: 10,
            justifyContent: 'center',
            marginVertical: 10,
            // flex: 1,
          }}>
          <View style={{...styles.ScrollInnerBody}}>
            <View>
              <CustomText
                label={item.publishedAt}
                fontSize={12}
                color={colors.inputGray}
                fontFamily={InterFont.semiBold}
              />
              <CustomText
                label={item?.source?.name}
                fontSize={12}
                color={colors.inputGray}
                fontFamily={InterFont.semiBold}
              />
            </View>
          </View>

          <View style={{padding: 10, paddingHorizontal: 15}}>
            <Image
              source={{uri: item?.image}}
              style={{width: '100%', height: 300, borderRadius: 15}}
              resizeMode="cover"
            />
          </View>

          <View style={{padding: 15}}>
            <CustomText
              label={item?.tempTitle}
              fontSize={15}
              fontFamily={InterFont.semiBold}
            />

            <Spacer height={10} />

            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: colors.borderColor,
              }}
            />
            <Spacer height={10} />
            <CustomText fontSize={11} label={item?.tempDescription} />
          </View>
        </TouchableOpacity>
      </>
    );
  };
  const SportsNewsHeader = ({navigation}) => {
    return (
      <View>
        <PH20>
          <CustomHeader
            LeftSide={() => <CustomOpenDrawer navigation={navigation} />}
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
                <View style={styles.searchBody}>
                  <Octicons
                    name="search"
                    color={colors.black}
                    size={moderateScale(20)}
                  />
                  <TextInput
                    value={search}
                    style={{
                      width: '86%',
                      padding: 0,
                      height: '100%',
                      paddingRight: scale(10),
                      paddingLeft: scale(7),
                      color: colors.black,
                      zIndex: 999999999,
                    }}
                    onChangeText={text => {
                      setSearch(text);
                    }}
                    placeholder="Search..."
                    placeholderTextColor={colors.black}
                  />
                </View>
              </PH10>
            </>
          )}
        </View>
        <Spacer height={20} />
      </View>
    );
  };

  return (
    <View style={{display: 'flex', flex: 1, backgroundColor: colors.greyWhite}}>
      <View
        style={{
          backgroundColor: colors.green,
          height: height / 2,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      />
      <View
        style={{
          position: 'absolute',
          flex: 1,
          height: '100%',
          width: '100%',
        }}>
        <Spacer height={Platform.OS == 'ios' ? 50 : 20} />
        <View>
          <PH20>
            <CustomHeader
              LeftSide={() => <CustomOpenDrawer navigation={navigation} />}
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
            <>
              <Spacer height={10} />
              <PH10>
                <View style={styles.searchBody}>
                  <Octicons
                    name="search"
                    color={colors.black}
                    size={moderateScale(20)}
                  />
                  <TextInput
                    value={search}
                    style={{
                      width: '86%',
                      padding: 0,
                      height: '100%',
                      paddingRight: scale(10),
                      paddingLeft: scale(7),
                      color: colors.black,
                      zIndex: 999999999,
                    }}
                    onChangeText={text => {
                      setSearch(text);
                    }}
                    placeholder="Search..."
                    placeholderTextColor={colors.black}
                  />
                </View>
              </PH10>
            </>
          </View>
          <Spacer height={20} />
        </View>
        <Spacer height={20} />
        <CustomText
          label="Sports News"
          color={colors.white}
          paddingHorizontal={20}
          fontSize={18}
          fontFamily={InterFont.bold}
        />
        <Spacer height={15} />

        {loading ? (
          <SportsNewsLayout />
        ) : (
          <View
            styles={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              data={articles.filter(
                article =>
                  article?.title.includes(search) ||
                  article?.description.includes(search) ||
                  article?.content.includes(search) ||
                  article?.source?.name.includes(search),
              )}
              renderItem={renderItem}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View>
        )}
        <View style={{top: 50}} />
      </View>
    </View>
  );
};

export default SportsNews;

const styles = StyleSheet.create({
  ScrollInnerBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  searchBody: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: verticalScale(30),
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#dee2e6',
  },
});
