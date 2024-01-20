import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {colors} from '../../../utils/Colors';
import {Spacer} from '../../../components/Spacer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomText from '../../../components/CustomText';
import {images} from '../../../assets/images';
import {InterFont} from '../../../utils/Fonts';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import LiveScoreHeader from './Molecules/LiveScoreHeader';
import {icons} from '../../../assets/icons';
import commonStyles from '../../../utils/CommonStyles';
import {verticalScale} from 'react-native-size-matters';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import LeagueDetail from './Molecules/LeagueDetails';
import MatchesLayout from '../../../utils/Layouts/MatchesLayout';
import {WebView} from 'react-native-webview';
import {Button} from 'react-native';
const LiveScores = ({navigation}) => {
  const webViewRef = useRef(null);
  let dateIndex;
  const [error, setError] = useState(false);
  const [isScoreBody, setIsScoreBody] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [tab, setTab] = useState(0);
  const [liveMatches, setLiveMatches] = useState([]);
  const [activeMatches, setActiveMatches] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const API_KEY =
    '186dc8585f9864d0653169212205216dd28c46a085ef20021273152b35aa2927';
  const initialUrl =
    'https://www.scorebat.com/embed/livescore/?token=MTI5MzEyXzE3MDA0ODY4NDdfOTY4Njk0MDJjNmNhM2EwMzUzZjMzMmE1NWY3N2ZkMGU2ZWIwOWRiMQ==';

  const goBackToHome = () => {
    if (webViewRef.current) {
      // Load the initial URL directly
      webViewRef.current.injectJavaScript(
        `window.location.href = '${initialUrl}';`,
      );
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     dateIndex = 0;
  //     fetchAndSetLiveMatches(selectedDate);
  //   }, []),
  // );
  // useEffect(() => {
  //   const currentDate = new Date().toISOString().split('T')[0];
  //   if (currentDate === selectedDate) {
  //     const intervalId = setInterval(() => {
  //       fetchAndSetLiveMatches(selectedDate);
  //     }, 60000);
  //     return () => clearInterval(intervalId);
  //   } else {
  //   }
  // }, [selectedDate]);
  // useEffect(() => {
  //   fetchAndSetLiveMatches(selectedDate);
  // }, [selectedDate]);
  // const fetchLiveMatches = async selectedDate => {
  //   setLoading(true);
  //   try {
  //     const currentDate = new Date().toISOString().split('T')[0];
  //     if (selectedDate === currentDate) {
  //       setTab(0);
  //       const response = await axios.get(
  //         `https://apiv3.apifootball.com/?action=get_events&from=${currentDate}&to=${currentDate}&match_live=1&APIkey=${API_KEY}`,
  //       );

  //       if (response.status === 200) {
  //         const liveMatches = response.data;
  //         setLoading(false);
  //         setRefreshing(false);
  //         return liveMatches;
  //       }
  //     } else if (selectedDate !== currentDate) {
  //       const response = await axios.get(
  //         `https://apiv3.apifootball.com/?action=get_events&from=${selectedDate}&to=${selectedDate}&match_live=0&APIkey=${API_KEY}`,
  //       );

  //       if (response.status === 200) {
  //         const liveMatches = response.data;
  //         setLoading(false);
  //         setRefreshing(false);
  //         return liveMatches;
  //       }
  //     } else {
  //       throw new Error('Failed to fetch live matches');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching live matches:', error);
  //     setLoading(false);
  //     throw error;
  //   }
  // };

  // const fetchAndSetLiveMatches = async selectedDate => {
  //   try {
  //     const data = await fetchLiveMatches(selectedDate);
  //     const extractedData = data.reduce((accumulator, match) => {
  //       // Find the index of the league with the same name in the accumulator array
  //       const leagueIndex = accumulator.findIndex(
  //         item => item.leagueName === match.league_name,
  //       );

  //       if (leagueIndex !== -1) {
  //         // If the league already exists in the accumulator, add the match to its matches array
  //         accumulator[leagueIndex].matches.push({
  //           matchDate: match.match_date,
  //           teamHomeLogo: match.team_home_badge,
  //           teamAwayLogo: match.team_away_badge,
  //           liveScoreHome: match.match_hometeam_score,
  //           liveScoreAway: match.match_awayteam_score,
  //           teamHomeName: match.match_hometeam_name,
  //           teamAwayName: match.match_awayteam_name,
  //           countryName: match.country_name,
  //         });
  //       } else {
  //         // If the league doesn't exist in the accumulator, create a new league object
  //         accumulator.push({
  //           leagueName: match.league_name,
  //           leagueLogo: match.league_logo,
  //           matches: [
  //             {
  //               matchDate: match.match_date,
  //               teamHomeLogo: match.team_home_badge,
  //               teamAwayLogo: match.team_away_badge,
  //               liveScoreHome: match.match_hometeam_score,
  //               liveScoreAway: match.match_awayteam_score,
  //               teamHomeName: match.match_hometeam_name,
  //               teamAwayName: match.match_awayteam_name,
  //               countryName: match.country_name,
  //             },
  //           ],
  //         });
  //       }

  //       return accumulator;
  //     }, []);

  //     // console.log('matches ==== >', JSON.stringify(extractedData));
  //     setLiveMatches(extractedData);
  //     setRefreshing(false);
  //   } catch (error) {
  //     console.error('Error fetching live matches:', error);
  //   }
  // };

  // API-Football method
  // const fetchLiveMatches = async selectedDate => {
  //   setLoading(true);
  //   const currentDate = new Date().toISOString().split('T')[0];
  //   const apiKey = 'fb72918e3d2cec2f226793a82b6c379d';

  //   try {
  //     let url;

  //     if (currentDate === selectedDate) {
  //       url = `https://v3.football.api-sports.io/fixtures?date=${currentDate}`;
  //     } else if (selectedDate !== currentDate) {
  //       url = `https://v3.football.api-sports.io/fixtures?date=${selectedDate}`;
  //     } else {
  //       throw new Error('Invalid date');
  //     }

  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'x-rapidapi-host': 'v3.football.api-sports.io',
  //         'x-rapidapi-key': apiKey,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data.response) {
  //         const liveMatches = data.response;
  //         setLoading(false);
  //         setRefreshing(false);

  //         return liveMatches;
  //       } else {
  //         console.error('No data in the response:', data);
  //       }
  //     } else {
  //       console.error('Response not OK:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching live matches:', error);
  //     setLoading(false);
  //     throw error;
  //   }
  // };

  // const fetchAndSetLiveMatches = async selectedDate => {z
  //   try {
  //     const data = await fetchLiveMatches(selectedDate);
  //     const leagueData = {};
  //     data.forEach(match => {
  //       const leagueName = match.league.name;
  //       if (!leagueData[leagueName]) {
  //         leagueData[leagueName] = {
  //           leagueName: leagueName,
  //           leagueLogo: match.league.logo,
  //           matches: [],
  //         };
  //       }
  //       leagueData[leagueName].matches.push({
  //         matchDate: match.fixture.date,
  //         teamHomeLogo: match.teams.home.logo,
  //         teamAwayLogo: match.teams.away.logo,
  //         liveScoreHome: match.goals.home,
  //         liveScoreAway: match.goals.away,
  //         teamHomeName: match.teams.home.name,
  //         teamAwayName: match.teams.away.name,
  //         countryName: match.league.country,
  //       });
  //     });
  //     const extractedData = Object.values(leagueData);
  //     setLiveMatches(extractedData);
  //     setRefreshing(false);
  //   } catch (error) {
  //     console.error('Error fetching live matches:', error);
  //   }
  // };

  const toggleItem = (index, item) => {
    const newValue = index === currentIndex ? null : index;
    setCurrentIndex(newValue);
    setSelectedLeague(item?.matches);
    setTimeout(() => {
      setLoading(true);
      setIsScoreBody(!isScoreBody);
      setLoading(false);
    }, 500);
  };
  const getDate = date => {
    setSelectedDate(date);
  };

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   fetchAndSetLiveMatches(selectedDate);
  // };
  // const renderItem = ({item, index}) => {
  //   return (
  //     <View style={{padding: 10}}>
  //       <View style={{...styles.ScoreHeader}}>
  //         <View
  //           style={{
  //             ...styles.flexRow,
  //             justifyContent: 'space-between',
  //           }}>
  //           <TouchableOpacity
  //             onPress={() => {
  //               toggleItem(index, item);
  //             }}>
  //             <View style={{display: 'flex', flexDirection: 'row'}}>
  //               {item?.leagueLogo ? (
  //                 <Image
  //                   source={{
  //                     uri: item?.leagueLogo,
  //                   }}
  //                   style={{height: 20, width: 20}}
  //                   resizeMode="contain"
  //                 />
  //               ) : (
  //                 <Image
  //                   source={icons.football2}
  //                   style={{height: 22, width: 30}}
  //                   resizeMode="contain"
  //                 />
  //               )}

  //               <Spacer width={10} />
  //               <CustomText
  //                 label={item?.leagueName}
  //                 fontFamily={InterFont.semiBold}
  //               />
  //             </View>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //       <Spacer height={1} />
  //       {currentIndex === index && (
  //         <View>
  //           {isScoreBody && (
  //             <Animated.View
  //               // animation={isScoreBody ? 'fadeInDown' : 'fadeOutUp'}
  //               style={[styles.ScoreBody]}>
  //               <Spacer height={5} />
  //               {selectedLeague.map((league, index) => {
  //                 let key = `${league.teamHomeName}-${league.teamAwayName}-${index}`;
  //                 return (
  //                   <LeagueDetail
  //                     teamAwayLogo={league.teamAwayLogo}
  //                     teamHomeLogo={league.teamHomeLogo}
  //                     liveScoreHome={league.liveScoreHome}
  //                     liveScoreAway={league.liveScoreAway}
  //                     teamHomeName={league.teamHomeName}
  //                     teamAwayName={league.teamAwayName}
  //                   />
  //                 );
  //               })}
  //             </Animated.View>
  //           )}
  //         </View>
  //       )}
  //     </View>
  //   );
  // };
  const handleError = syntheticEvent => {
    const {nativeEvent} = syntheticEvent;
    console.error('WebView error: ', nativeEvent);
    setError(true);
  };

  const renderErrorView = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black', fontSize: 14}}>
        An error occurred while loading the content.
      </Text>
    </View>
  );
  const goBack = () => {
    if (webViewRef?.current) {
      webViewRef?.current?.goBack();
    }
  };

  const onShouldStartLoadWithRequest = request => {
    const {url, navigationType} = request;
    const token =
      'MTI5MzEyXzE3MDA0ODY4NDdfOTY4Njk0MDJjNmNhM2EwMzUzZjMzMmE1NWY3N2ZkMGU2ZWIwOWRiMQ==';

    // Check if the navigation type is a click
    if (navigationType === 'click') {
      const modifiedUrl = url.replace('/embed/', `/embed/${token}/`);

      // Load the modified URL in the current WebView
      webViewRef.current &&
        webViewRef.current.injectJavaScript(
          `window.location.href = '${modifiedUrl}';`,
        );

      return true; // Prevent the default behavior
    }
    return true;
  };
  const injectScript = `
  document.addEventListener('click', function(e) {
    window.ReactNativeWebView.postMessage('linkClick');
  });
`;
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: colors.white,
        overflow: 'visible',
      }}>
      <View
        style={{
          zIndex: 10000000,
        }}>
        <LiveScoreHeader
          navigation={navigation}
          onDateClick={getDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          loading={loading}
          tab={tab}
          setTab={setTab}
          goBack={goBack}
          goBackToHome={goBackToHome}
        />
      </View>
      {error ? (
        renderErrorView()
      ) : (
        <>
          <View
            style={{
              flex: 1,
              // top: -50,
              backgroundColor: 'white',
              overflow: 'visible',
            }}>
            <WebView
              ref={webViewRef}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              mixedContentMode="always"
              source={{uri: initialUrl}}
              style={{flex: 1}}
              injectedJavaScript={injectScript}
              onError={handleError}
              onShouldStartLoadWithRequest={event =>
                onShouldStartLoadWithRequest(event)
              }
              // onNavigationStateChange={navState => {
              //   console.log('Navigation state changed:', navState);
              //   return true;
              // }}
              androidHardwareAccelerationDisabled={true}
              setSupportMultipleWindows={false}
              nestedScrollEnabled={true}
            />
          </View>
        </>
      )}
      {/* <LiveScoreHeader
        navigation={navigation}
        onDateClick={getDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        loading={loading}
        tab={tab}
        setTab={setTab}
      />

      {loading ? (
        <MatchesLayout />
      ) : (
        <FlatList
          data={liveMatches}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          // initialNumToRender={40} // Adjust as needed
          // maxToRenderPerBatch={50} // Adjust as needed
        />
      )} */}
    </View>
  );
};
export default LiveScores;

const styles = StyleSheet.create({
  ScoreHeader: {
    height: 40,
    padding: 12,
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: colors.borderColor,
    borderWidth: 0.5,
    shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
    shadowRadius: 3,
    elevation: 5,
    // shadowOpacity: 0.6,
    shadowOffset: {width: 1, height: 2},
  },
  ScoreBody: {
    // height: 40,
    // padding: 12,
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
    borderWidth: 0.5,
    shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
    shadowRadius: 0.5,
    elevation: 5,
    shadowOpacity: 0.4,
    shadowOffset: {width: 1, height: 2},
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
});
