import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import commonStyles, {PH10} from '../../../../utils/CommonStyles';
import {colors} from '../../../../utils/Colors';
import AppTopHeader from '../../../../components/AppTopHeader';
import ProfilePhotoEdit from '../../../../components/ProfilePhotoEdit';
import {scale} from 'react-native-size-matters';
import {Spacer} from '../../../../components/Spacer';
import GroupInfoHeader from './Molecules/GroupInfoHeader';
import GroupDescription from './Molecules/GroupDescription';
import CustomText from '../../../../components/CustomText';
import {InterFont} from '../../../../utils/Fonts';
import {getAllViewBy} from '../../../services/UserServices';
import ParticipantsItem from './Molecules/ParticipantsItem';
import {useSelector} from 'react-redux';
import {deleteImage} from '../../../services/PostServices';
import {uploadImage} from '../../../services/StorageServics';
import Toast from 'react-native-root-toast';
import {createGroupRequest} from '../../../services/MessagesServices';
import loaderAnimation from '../../../../assets/Loaders';
import SimpleLoader from '../../../../utils/SimpleLoader';

const GroupInfo = ({navigation, route}) => {
  const groupData = route?.params?.groupData;
  const authState = useSelector(state => state?.auth?.currentUser);
  const [participantsData, setParticipantsData] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false)
  const [groupDetails, setGroupDetails] = useState({
    groupName: '',
    groupDes: '',
  });
  // console.log('GroupData', groupDetails);

  useEffect(() => {
    getAllParticipants();
  }, []);

  const getAllParticipants = () => {
    let arr = [];

    // Loop through the car object
    for (i of groupData?.participantsData) {
      // Push the values of every object into arr
      arr?.push(...Object.values(i));
    }

    getAllViewBy(setParticipantsData, arr);
  };

  const renderParticipant = ({item, index}) => {
    return (
      <ParticipantsItem
        groupAdminId={groupData?.groupAdmin}
        authData={authState}
        index={index}
        participantsData={participantsData}
        item={item}
        navigation={navigation}
      />
    );
  };

  const onSaveGroup = async () => {
    setLoading(true)
    const requestData = {
      groupName: groupDetails.groupName
        ? groupDetails.groupName
        : groupData.groupName,
      groupDes: groupDetails.groupDes
        ? groupDetails.groupDes
        : groupData.groupDes,
      groupId: groupData.groupId,
      groupImage: groupData?.groupImage ? groupData?.groupImage : '',
    };

    if (imageUrl) {
      const res = deleteImage(groupData?.groupImage);

      if (res) {
        const linkData = await uploadImage(imageUrl, authState.uid);
        requestData['groupImage'] = linkData;
      }
    }
    // console.log('DAtaGrupo', requestData);

    await createGroupRequest(requestData?.groupId, requestData);
    setLoading(false)

    Toast.show('Group Info is Updated');
  };

  return (
      <>
       <SafeAreaView style={commonStyles.main}>
       <AppTopHeader
            isSave={true}
            isEnable={
              imageUrl
                ? true
                : groupDetails.groupDes
                ? true
                : groupDetails.groupName
                ? true
                : false
            }
            onSave={onSaveGroup}
            navigation={navigation}
            // title={'Group Info'}
          />
      <ScrollView
        contentContainerStyle={{flex: 1, backgroundColor: colors.white}}>
        <PH10>
        
          <Spacer height={20} />

          <ProfilePhotoEdit
            addPhoto
            width={scale(80)}
            height={scale(80)}
            multiUser
            imageUrl={imageUrl ? imageUrl : groupData?.groupImage}
            setImageUrl={setImageUrl}
            mainStyle={{
              shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
              shadowRadius: 2,
              elevation: 5,
              shadowOpacity: 0.4,
              // inputMarginTop:-20,
              shadowOffset: {width: -1, height: 3},
            }}
          />

          <GroupInfoHeader
            groupDetails={groupDetails}
            defaultValue={groupData?.groupName}
            groupDateLength={groupData?.participantsData?.length}
            setGroupDetails={setGroupDetails}
          />
          <Spacer height={10} />
          <GroupDescription
            defaultValue={groupData?.groupDes}
            groupDetails={groupDetails}
            setGroupDetails={setGroupDetails}
            des={groupDetails}
          />
          <Spacer height={15} />

          <CustomText
            numberOfLines={1}
            fontSize={14}
            fontFamily={InterFont.bold}
            label={`${groupData?.participantsData?.length} Participants`}
          />

          <Spacer height={15} />
          {participantsData?.length != 0 ? (
            <View
              style={{
                width: '100%',
                paddingHorizontal: scale(10),
                backgroundColor: colors.white,
                shadowColor: Platform.OS == 'ios' ? '#343a40' : colors.black,
                shadowRadius: 2,
                elevation: 5,
                shadowOpacity: 0.4,
                shadowOffset: {width: 1, height: 1},
                borderRadius: scale(5),
              }}>
              <FlatList
                data={participantsData}
                // style={{backgroundColor:"red",flex:1}}
                // contentContainerStyle={{flex:1}}
                keyExtractor={item => item.id}
                renderItem={renderParticipant}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <></>
          )}
        </PH10>
      </ScrollView>
    </SafeAreaView>


    {
    loading&&(
      <SimpleLoader file={loaderAnimation}/>


    )
  }
      </>
   


  );
};

export default GroupInfo;

const styles = StyleSheet.create({});
