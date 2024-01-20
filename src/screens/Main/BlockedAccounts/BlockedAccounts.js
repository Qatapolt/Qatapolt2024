import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import BlockedContainer from './Molecules/BlockedContainer';
import {images} from '../../../assets/images';
import commonStyles, {PH10} from '../../../utils/CommonStyles';
import {Spacer} from '../../../components/Spacer';
import CustomHeader from '../../../components/CustomHeader';
import {colors} from '../../../utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../../../components/CustomText';
import {InterFont} from '../../../utils/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getSpecificUser, SaveUser} from '../../services/UserServices';
import { authData } from '../../../redux/reducers/authReducer';


const BlockedAccounts = ({navigation}) => {
  const authUser = useSelector(state => state.auth.currentUser);
  const [blockUserId, setBlockUserId] = useState([]);
  const dispatch=useDispatch()

  // useEffect(() => {
  //   getBlockUser();
  // }, []);

  // const getBlockUser = () => {
  //   setBlockUserId(authUser?.BlockUsers);
  // };

  const onUnBlockUser = async id => {
    let filterBlockUser = blockUserId.filter(d => d != id);
    await SaveUser(authUser?.uid,{BlockUsers:filterBlockUser});
   const user= await getSpecificUser(authUser?.uid)
    dispatch(authData(user))

  };
  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      {/* <View style={commonStyles.main}> */}

      <PH10>
        <Spacer height={10} />
        <CustomHeader
          LeftSide={() => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                color={colors.black}
                size={moderateScale(30)}
              />
            </TouchableOpacity>
          )}
          Center={() => (
            <CustomText
              label={'Blocked'}
              fontSize={18}
              textAlign="center"
              fontFamily={InterFont.bold}
              color={colors.black}
              // fontFamily={InterFont.bold}
            />
          )}
        />
        <Spacer height={40} />
        <View style={{height: '100%'}}>
          <FlatList
            data={authUser.BlockUsers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              // let name = item.name.replace('null', '');
              // console.log('index', index);

              return (
                <BlockedContainer
                  unblock={() => onUnBlockUser(item)}
                  // onPress={() => onAddGroupChat(item)}
                  // check={check}
                  // setCheck={setCheck}
                  // filterGroup={filterGroup}
                  id={item}
                  navigation={navigation}
                  index={index}
                />
              );
            }}
          />
        </View>
      </PH10>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default BlockedAccounts;
