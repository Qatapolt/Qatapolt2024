import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../../utils/Colors';
import commonStyles, {PH20} from '../../../utils/CommonStyles';
import {icons} from '../../../assets/icons';
import CustomText from '../../../components/CustomText';
import {SafeAreaView} from 'react-native-safe-area-context';
import TopNav from '../../../routes/TopNav/TopNav';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Spacer} from '../../../components/Spacer';
import {InterFont} from '../../../utils/Fonts';
import CustomSearch from '../../../components/CustomSearch';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  setGroupsTab,
  setIndividualTab,
  setMessagesTab,
} from '../../../redux/reducers/GroupChatReduser';
import {
  getAuthGroupRequest,
  getIndividualRequest,
} from '../../services/MessagesServices';
import {getSpecificUser} from '../../services/UserServices';
const HomeChat = () => {
  const navigation = useNavigation();
  const [blockReport, setBlockReport] = useState(false);
  const [search, setSearch] = useState('');
  const tabActive = useSelector(state => state.groupChat?.activeTab);
  const messageData = useSelector(state => state.groupChat.messagesTabData);
  const groupRequestData = useSelector(state => state.groupChat.groupTabData);
  const individualRequestData = useSelector(
    state => state.groupChat.individualTabData,
  );

  const [requestData, setRequestData] = useState([]);
  const [groupRequest, setGroupRequest] = useState([]);
  const {uid} = useSelector(state => state.auth.currentUser);
  // console.log("AllResuqsrData",groupRequest?.request.length)
  const dispatch = useDispatch();

  // console.log('AllMessageDataTabOther', tabActive);

  useEffect(() => {
    getAllRequest();
  }, []);

  useEffect(() => {
    if (requestData || groupRequest) {
      MergeAllData();
    }
  }, [requestData, groupRequest]);

  const getAllRequest = () => {
    getIndividualRequest(uid, setRequestData);
    getAuthGroupRequest(uid, setGroupRequest);
  };

  const MergeAllData = async () => {
    // console.log("SingleRequest",requestData,)
    // console.log("groupRequest",groupRequest?.request.length)
    // let combineRequest = [];
    // let singleRequest = [];
    // let groupRequestList = [];
    // groupRequest?.request?.forEach(data => {
    //   groupRequestList.push(data);
    //   combineRequest.push(data);
    // });
    // for (let index = 0; index <= requestData?.request?.length; index++) {
    //   const element = requestData?.request[index];
    //   const data = await getSpecificUser(
    //     element?.from == uid ? element?.to : element?.from,
    //   );
    //   combineRequest?.push({
    //     ...element,
    //     name: data?.name,
    //     username: data?.username,
    //     profileImage: data?.profileImage?.profileImage
    //       ? data?.profileImage
    //       : '',
    //   });
    //   singleRequest.push({
    //     ...element,
    //     name: data?.name,
    //     username: data?.username,
    //     profileImage: data?.profileImage?.profileImage
    //       ? data?.profileImage
    //       : '',
    //   });
    // }
    // const sortedCombine = combineRequest.sort(
    //   (objA, objB) => Number(objB.date) - Number(objA.date),
    // );
    // const sortedSingle = singleRequest.sort(
    //   (objA, objB) => Number(objB.date) - Number(objA.date),
    // );
    // const sortedGroup = groupRequestList.sort(
    //   (objA, objB) => Number(objB.date) - Number(objA.date),
    // );
    // dispatch(setMessagesTab(sortedCombine));
    // dispatch(setIndividualTab(sortedSingle));
    // dispatch(setGroupsTab(sortedGroup));
  };

  const onSearch = txt => {
    setSearch(txt);

    // try {
    //   setSearch(txt);

    //   if (txt.length == 0) {
    //     getAllRequest();
    //   }

    //   if (tabActive === 0) {
    //     const filterMessageData = messageData.filter(item => {
    //       return `${item.name} ${item.lastMessage?.text}  ${item.lastMessage?.groupDes}
    //       ${item?.groupName}
    //       `
    //         .toLowerCase()
    //         .trim()
    //         .includes(search.toLowerCase().trim());
    //     });

    //     dispatch(setMessagesTab(filterMessageData));
    //   }

    //   if (tabActive === 1) {
    //     const filterIndData = individualRequestData.filter(item => {
    //       return `${item.name} ${item.lastMessage?.text}  ${item.lastMessage?.groupDes}
    //       ${item?.groupName}
    //       `
    //         .toLowerCase()
    //         .trim()
    //         .includes(search.toLowerCase().trim());
    //     });

    //     dispatch(setIndividualTab(filterIndData));
    //   }
    //   if (tabActive === 2) {
    //     const filterGroupData = groupRequestData.filter(item => {
    //       return `${item.name} ${item.lastMessage?.text}  ${item.lastMessage?.groupDes}
    //       ${item?.groupName}
    //       `
    //         .toLowerCase()
    //         .trim()
    //         .includes(search.toLowerCase().trim());
    //     });

    //     dispatch(setGroupsTab(filterGroupData));
    //   }
    // } catch (error) {
    //   console.log(' error:', error);
    // }
  };

  const Header = () => (
    <View>
      <PH20>
        <View style={commonStyles.rowJustify}>
          <CustomText
            label={'Qatapolt'}
            fontSize={22}
            fontFamily={InterFont.semiBold}
          />
          {/* <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={moderateScale(20)}
              color={colors.black}
            />
          </TouchableOpacity> */}

          {/* <TouchableOpacity onPress={() => setBlockReport(!blockReport)}>
            {blockReport && (
              <View
                style={{
                  position: 'absolute',
                  top: 22,
                  width: scale(100),
                  height: verticalScale(35),
                  borderRadius: scale(5),
                  backgroundColor: colors.white,
                  right: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor:
                    Platform.OS == 'ios' ? colors.inputGray : colors.black,
                  shadowRadius: 5,
                  elevation: 5,
                  shadowOpacity: 1,

                  shadowOffset: {width: 1, height: 4},
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // SettingScreen
                    navigation.navigate('SettingScreen');
                    setBlockReport(false);
                  }}
                  style={{
                    width: '100%',
                    height: '45%',
                    // borderBottomWidth: 1,
                    // borderBottomColor: colors.lightGray,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <CustomText
                    label="Settings"
                    fontSize={13}
                    textAlign="center"
                    color={colors.green}
                    fontFamily={InterFont.semiBold}
                  />
                </TouchableOpacity>
              </View>
            )}

            <Entypo
              name="dots-three-horizontal"
              // color={colors.white}
              size={moderateScale(25)}
            />
          </TouchableOpacity> */}
          {/* <Image source={icons.add} style={{height: 27, width: 27}} /> */}
        </View>
      </PH20>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Spacer height={10} />

      <Header />

      <Spacer height={10} />
      <PH20>
        <CustomSearch search={search} onSearchFilter={onSearch} />
      </PH20>

      <Spacer height={10} />
      <TopNav />
    </SafeAreaView>
  );
};

export default HomeChat;

const styles = StyleSheet.create({});
