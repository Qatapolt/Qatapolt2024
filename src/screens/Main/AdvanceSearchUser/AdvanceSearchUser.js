import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import {verticalScale} from 'react-native-size-matters';
import commonStyles, {PH20} from '../../../utils/CommonStyles';
import AddChatTop from '../ChatScreen/AddChat/Molecules/AddChatTop';
import AdvanceUserContainer from './Molecules/AdvanceUserContainer';
import AdvanceTop from './Molecules/AdvanceTop';
import {Spacer} from '../../../components/Spacer';
import {getAllUSers} from '../../services/UserServices';
import Loader from '../../../utils/Loader';
import loaderAnimation from '../../../assets/Loaders';

const AdvanceSearchUser = ({navigation, route}) => {
  const CurrentUser = useSelector(state => state.auth?.currentUser);
  const [check, setCheck] = useState(-1);
  const [search, setSearch] = useState('');
  const [userObject, setUserObject] = useState({});
  const getSearchData = useSelector(
    state => state.advanceSearch?.advanceSearchUser,
  );
  const focused = useIsFocused();
  const [userData, setUserData] = useState([]);
  const [allUsersData, setAllUsersData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const getAllUser = () => {
    getAllUSers(setAllUsersData, CurrentUser?.uid);
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllUser();
      const values = route.params;
      console.log('onFilterAdvanceUser values', values);

      if (values !== undefined && values) {
        try {
          const advanceFilerUsers = allUsersData.filter(user => {
            return (
              (!values.age || user?.age === values.age) &&
              (!values.gender || user?.gender === values.gender) &&
              (!values.accountType ||
                user?.accountType === values.accountType) &&
              (!values.position || user?.position === values.position) &&
              (!values.country || user?.country === values.country) &&
              (!values.city || user?.city === values.city) &&
              (!values.height || user?.height === values.height) &&
              (!values.selectSport ||
                user?.selectSport === values.selectSport) &&
              (!values.strongHand || user?.strongHand === values.strongHand) &&
              (!values.strongFoot || user?.strongFoot === values.strongFoot) &&
              (!values.skill1 || user?.skill1 === values.skill1) &&
              (!values.skill2 || user?.skill2 === values.skill2) &&
              (!values.skill3 || user?.skill3 === values.skill3) &&
              (typeof values.freeAgent === 'undefined' ||
                user?.freeAgent === values.freeAgent)
            );
          });

          console.log('advanceFilerUsers =====>', advanceFilerUsers);

          setTimeout(() => {
            if (advanceFilerUsers && advanceFilerUsers.length > 0) {
              setUserData(advanceFilerUsers);
            }
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.log('Error filtering users:', error);
          setLoading(true);
        }
      }

      return async () => {};
    }, [allUsersData, route.params]),
  );

  const searchUser = txt => {
    setSearch(txt);
    if (txt.length == 0) {
      try {
        setUserData(getSearchData);
      } catch (error) {
        console.log('VAlue', error);
      }

      return;
    }
    const filterUserData = userData.filter(item => {
      return `${item.name} ${item.username}`
        .toLowerCase()
        .trim()
        .includes(txt.toLowerCase().trim());
    });

    setUserData(filterUserData);
  };

  const Loading = () => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999999999999,
          height: '100%',
          width: '100%',
        }}>
        <Loader file={loaderAnimation} />
      </View>
    );
  };

  return (
    <SafeAreaView style={commonStyles.main}>
      <PH20>
        <AdvanceTop
          userObject={userObject}
          navigation={navigation}
          search={search}
          onSearch={searchUser}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={userData}
          nestedScrollEnabled={true}
          style={{marginVertical: 10, width: '100%', height: '100%'}}
          keyExtractor={(item, index) => item?.uid.toString()}
          renderItem={({item, index}) => {
            return (
              <>
                <Spacer height={5} />
                <AdvanceUserContainer
                  navigation={navigation}
                  item={item}
                  index={index}
                />
              </>
            );
          }}
        />
      </PH20>
    </SafeAreaView>
  );
};

export default AdvanceSearchUser;

const styles = StyleSheet.create({});
