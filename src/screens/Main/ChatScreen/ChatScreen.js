import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import {getIndividualRequest} from '../../services/MessagesServices';
import {useSelector} from 'react-redux';
import ChatListContainer from './TopChats/Molecules/ChatListContainer';
import {chatFormat, dateFormat, timeFormat} from '../../../utils/Commons';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ChatScreen = ({navigation}) => {
  const currentUser = useSelector(state => state.auth.currentUser);

  const individualRequestData = useSelector(
    state => state.groupChat.individualTabData,
  );
  const [requestData, setRequestData] = useState([]);

  // console.log('IndicacvhfChat', requestData.request);

  useEffect(() => {
    getIndividualRequest(currentUser?.uid, setRequestData);
  }, []);

  const AddChat = () => (
    // <View style={{height:60,alignItems:"center",justifyContent:"center"}}>

    <LinearGradient
      colors={['#9F703C', '#C1925A', '#E3B77A']}
      style={{
        position: 'absolute',
        bottom: 0,
        right: scale(30),
        alignSelf: 'flex-end',
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        shadowColor: Platform.OS == 'ios' ? colors.inputGray : colors.black,
        shadowRadius: 5,
        elevation: 5,
        shadowOpacity: 1,

        shadowOffset: {width: 1, height: 4},
      }}>
      <FontAwesome5
        name="user-alt"
        color={colors.white}
        size={moderateScale(24)}
      />
      {/* <CustomText
            label={'Chat'}
            fontSize={22}
            fontFamily={'inter-semibold'}
          /> */}
      {/* <Image source={icons.add} containerStyle={{height: 27, width: 27}} /> */}
    </LinearGradient>

    // </View>
  );
  const ChatListItem = ({
    name,
    lastMsg,
    badgeValue,
    missedCall,
    deliveryTime,
    seen,
  }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate('ChatDetail')}>
      <ListItem bottomDivider>
        <Avatar rounded source={icons.profile} size={55} />
        <ListItem.Content>
          <ListItem.Title style={{fontWeight: 'bold'}}>{name}</ListItem.Title>
          <Spacer height={4} />
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            <CustomText label={lastMsg} color={colors.inputGray} />
          </ListItem.Subtitle>
        </ListItem.Content>
        <View>
          <CustomText
            label={deliveryTime}
            fontSize={8}
            color={colors.inputGray}
          />
        </View>
      </ListItem>
    </TouchableOpacity>
  );

  const RenderRequestData = ({item, index}) => {
    const ChatDateTime = moment(new Date(item?.date.toDate()));
    const ChatTime = timeFormat(item?.date, 'hh:mm a');
    const date = dateFormat(ChatDateTime);

    return (
      <PH10>
        <ChatListContainer
          item={item}
          index={index}
          userId={item.from == currentUser.uid ? item.to : item.from}
          formId={item.from}
          navigation={navigation}
          ChatTime={ChatTime}
          date={date}
          // name={name}
          // lastMsg={lastMsg}
          // badgeValue={badgeValue}
          // missedCall={missedCall}
          // deliveryTime={deliveryTime}
          // seen={seen}
        />
      </PH10>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <FlatList
            data={requestData?.request}
            contentContainerStyle={{
              paddingBottom: verticalScale(50),
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={RenderRequestData}
          />
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default ChatScreen;

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
