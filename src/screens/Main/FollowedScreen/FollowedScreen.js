import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef} from 'react';
import MainHeader from '../../../components/MainHeader';
import commonStyles from '../../../utils/CommonStyles';
import {Spacer} from '../../../components/Spacer';
import CustomTab from '../../../components/CustomTab';
import {colors} from '../../../utils/Colors';
import SepratorLine from '../../../components/SepratorLine';
import FollowedTopNav from './Molecules/FollowedTopNav';
import PagerView from 'react-native-pager-view';
import MutualContainer from './Molecules/MutualContainer';
import FollowerContainer from './Molecules/FollowerContainer';
import FollowingContainer from './Molecules/FollowingContainer';

const FollowedScreen = ({navigation, route}) => {
  const [tab, setTab] = useState(0);
  const UserData = route?.params.event;
  // console.log('UserData', UserData);
  const [followedData, setFollowedData] = useState([]);

  const pager = useRef(null);

  const matchDay = [
    {id: 1, day: '10 Mutual'},
    {id: 2, day: 'Followers'},
    {id: 3, day: 'Following'},

    ,
  ];

  const onClickTab = index => {
    setTab(index);
    pager?.current?.setPage(index);
    if (index == 0) {
      setFollowedData(UserData?.Mutual);
      return;
    }
    if (index == 1) {
      setFollowedData(UserData?.AllFollowers);
      return;
    }
    if (index == 2) {
      setFollowedData(UserData?.AllFollowing);
      return;
    }
  };
  return (
    <SafeAreaView style={commonStyles.main}>
      <MainHeader navigation={navigation} txt={`@${UserData.username}`} />
      <Spacer height={10} />

      <View style={commonStyles.rowContainer}>
        {matchDay.map((item, index) => {
          return (
            <>
              <Spacer width={20} />

              <CustomTab
                tab={tab}
                setTab={onClickTab}
                index={index}
                item={item}
              />
              <Spacer width={5} />
            </>
          );
        })}
      </View>
      <Spacer height={5} />
      <SepratorLine height={2} />
      <Spacer height={2} />

      <PagerView
        onPageSelected={props => {
          setTab(props.nativeEvent.position);

          if (props.nativeEvent.position == 0) {
            setFollowedData(UserData?.Mutual);
            return;
          }
          if (props.nativeEvent.position == 1) {
            setFollowedData(UserData?.AllFollowers);
            return;
          }
          if (props.nativeEvent.position == 2) {
            setFollowedData(UserData?.AllFollowing);
            return;
          }
        }}
        style={{flex: 1}}
        initialPage={0}
        scrollEnabled={true}
        ref={pager}>
        <View style={{flex: 1}} key="1">
          {/* <AllTickets/> */}
          <MutualContainer followedData={followedData} />
        </View>

        <View style={{flex: 1}} key="2">
          <MutualContainer followedData={followedData} />

          {/* <FollowerContainer/> */}
          {/* <MyTickets/> */}
        </View>
        <View style={{flex: 1}} key="3">
          <MutualContainer followedData={followedData} />

          {/* <FollowingContainer/> */}
          {/* <MyTickets/> */}
        </View>
      </PagerView>

      {/* <FollowedTopNav/> */}

      {/* <View style={{...commonStyles.rowContainer,}}>
        {matchDay.map((item, index) => {
          return (
            <>
              <Spacer width={20} />

              <CustomTab
                lineColor={colors.black}
                txtUnActiveColor={colors.inputGray}
                txtActiveColor={colors.black}
                tab={tab}
                setTab={setTab}
                index={index}
                item={item}
              />
              <Spacer width={5} />
            </>
          );
        })}
      </View>
      <SepratorLine height={2} /> */}
    </SafeAreaView>
  );
};

export default FollowedScreen;

const styles = StyleSheet.create({});
