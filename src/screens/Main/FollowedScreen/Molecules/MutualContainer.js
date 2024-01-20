import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import commonStyles from '../../../../utils/CommonStyles';
import {Spacer} from '../../../../components/Spacer';
import CustomText from '../../../../components/CustomText';
import CustomButton from '../../../../components/CustomButton';
import {colors} from '../../../../utils/Colors';
import CustomImage from '../../../../components/CustomImage';
import {verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import FollowedItem from './FollowedItem';

const MutualContainer = ({followedData}) => {
  const followerData = useSelector(state => state.user.userData);
  // console.log('followerData', followerData);

  const RenderFollowerData = ({item, index}) => {
    return (
      <TouchableOpacity style={{width: '100%'}} activeOpacity={0.6}>
        <View style={commonStyles.rowJustify}>
          <View style={commonStyles.rowContainer}>
            <View>
              <CustomImage
                width={50}
                height={50}
                imageUrl={item.profileImage}
              />
            </View>
            <Spacer width={15} />
            <View style={{display: 'flex', justifyContent: 'center'}}>
              <View>
                <CustomText label={item?.name} fontSize={13} />
                <Spacer height={2} />
                <CustomText
                  label={item?.username ? `${item?.username}` : ''}
                />
              </View>
            </View>
          </View>
          <CustomButton
            height={27}
            borderRadius={8}
            backgroundColor={colors.green}
            color={colors.white}
            fontSize={13}
            title={'Following'}
            width={'27%'}
          />
        </View>

        <Spacer height={15} />
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{display: 'flex', height: '90%', backgroundColor: colors.white}}>
      <View style={{padding: 15}}>
        <FlatList
          data={followerData?.AllFollowers}
          contentContainerStyle={{
            paddingBottom: verticalScale(50),
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return <FollowedItem item={item} />;
          }}
        />
      </View>
    </ScrollView>
  );
};

export default MutualContainer;

const styles = StyleSheet.create({});
