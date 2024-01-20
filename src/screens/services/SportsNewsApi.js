import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import {ListItem} from 'react-native-elements';
import CustomText from '../../components/CustomText';
import {Spacer} from '../../components/Spacer';

const API_KEY = '8355a7df66574a01b037df233de3b646';
// const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
export const BASE_URL = 'https://newsapi.org/v2/top-headlines';

const SportsNewsApi = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://api.sportsdata.io/v3/soccer/scores/json/News?key=8355a7df66574a01b037df233de3b646',
        );
        setNews(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
  }, []);

  // useEffect(() => {
  //   getSportsNews().then(articles => {
  //     setArticles(articles);
  //   });
  // }, []);

  // const renderItem = ({item}) => (
  //   <ListItem
  //     title={item.title}
  //     subtitle={item.publishedAt}
  //     leftAvatar={{source: {uri: item.imageUrl}}}
  //     onPress={() => Linking.openURL(item.url)}
  //     bottomDivider
  //     chevron
  //   />
  // );

  return (
    // <FlatList
    //   data={news}
    //   keyExtractor={item => item.id}
    //   renderItem={renderItem}
    // />
    <ScrollView>
      <Spacer height={Platform.OS == 'ios' ? 50 : 20} />
      <View>
        <Text>Soccer News</Text>
        <FlatList
          data={news}
          keyExtractor={item => item.NewsId.toString()}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.Title}</Text>
              <Text style={styles.date}>{item.StoryDate}</Text>
              <Text style={styles.content}>{item.Content}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
});

export default SportsNewsApi;
