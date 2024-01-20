import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Spacer} from '../../../components/Spacer';
import {colors} from '../../../utils/Colors';
import {icons} from '../../../assets/icons';
import {Avatar, Badge, Image, ListItem} from 'react-native-elements';
import CustomText from '../../../components/CustomText';
import commonStyles, {PH10, PH20} from '../../../utils/CommonStyles';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddUser from '../../../components/AddUser';
import {images} from '../../../assets/images';
import {useSelector} from 'react-redux';
import {getGroupRequest} from '../../services/MessagesServices';
import GroupChatContainer from './Molecules/GroupChatContainer';
import {dateFormat, timeFormat} from '../../../utils/Commons';
import moment from 'moment';
import _ from 'lodash';

const GroupChat = ({navigation}) => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const [groupRequest, setGroupRequest] = useState([]);
  const [arrangeGroupRequest, setArrangeGroupRequest] = useState([]);
  useEffect(() => {
    getRequest();
  }, []);

  useEffect(() => {
    if (groupRequest?.request?.length > 0) {
      ArrangeGroupRequest();
    }
  }, [groupRequest]);

  const getRequest = () => {
    getGroupRequest(currentUser.uid, setGroupRequest);
  };
  const ArrangeGroupRequest = () => {
    let reqSingleData = [];

    groupRequest?.request?.forEach(data => {
      return reqSingleData.push(data);
    });

    const sortedDesc = reqSingleData.sort(
      (objA, objB) => Number(objB.date) - Number(objA.date),
    );
    setArrangeGroupRequest(sortedDesc);
  };

  const RenderRequestData = ({item, index}) => {
    const ChatDateTime = moment(
      new Date(item.date ? item.date.toDate() : item.createdAt.toDate()),
    );
    const ChatTime = timeFormat(
      item.date ? item.date : item.createdAt,
      'hh:mm a',
    );
    const date = dateFormat(ChatDateTime);

    return (
      <PH10>
        <GroupChatContainer
          item={item}
          index={index}
          navigation={navigation}
          ChatTime={ChatTime}
          date={date}
        />
      </PH10>
    );
  };


  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={arrangeGroupRequest}
          contentContainerStyle={{
            paddingBottom: verticalScale(50),
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={RenderRequestData}
        />
      </View>
    </>
  );
};

export default GroupChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  subtitleIcon: {
    height: 20,
    width: 20,
  },
});
