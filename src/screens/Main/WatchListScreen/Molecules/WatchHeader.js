import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../../components/CustomText';
import {icons} from '../../../../assets/icons';
import CustomSearch from '../../../../components/CustomSearch';
import {Spacer} from '../../../../components/Spacer';
import {PH10} from '../../../../utils/CommonStyles';

const WatchHeader = props => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <View>
      <View style={styles.header}>
        {/* <CustomText label={''}/> */}
        <CustomText
          label={'Watchlist'}
          fontSize={20}
          fontFamily={'inter-semibold'}
        />
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setShowSearch(!showSearch)}>
            <Image
              source={icons.search}
              style={{height: 27, width: 27}}
              onPress={() => setShowSearch(!showSearch)}
            />
          </TouchableOpacity>

          <Spacer width={10} />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Notifications')}>
            <Image source={icons.bell} style={{height: 27, width: 27}} />
          </TouchableOpacity>
        </View>
      </View>
      {showSearch && (
        <>
          <Spacer height={10} />
          <PH10>
            <CustomSearch
              search={props.search}
              onSearchFilter={props.filterWatchList}
            />
          </PH10>
        </>
      )}
    </View>
  );
};

export default WatchHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
