import { StyleSheet, Text, View,FlatList,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import commonStyles from '../../../../utils/CommonStyles'
import { images } from '../../../../assets/images';
import { scale, verticalScale } from 'react-native-size-matters';
import { Spacer } from '../../../../components/Spacer';
import UserHightLightContainer from './OtherUserHightLightContainer';
import MediaView from '../../../../components/MediaView';
import OtherUserHightLightContainer from './OtherUserHightLightContainer';
import _ from 'lodash';


const OtherUserHighlights = ({route}) => {
  const [viewMedia, setViewMedia] = useState(false)
  const [userData, setUserData] = useState({})
  const [imageIndex, setImageIndex] = useState(0)

  const [hightLightData, setHightLightData] = useState([])

  useEffect(() => {
    const filterIds=route.params?.PostIds?.filter(item=>item.type!="")
    setUserData(route?.params);

    const sortedByDate = _.orderBy(
      filterIds,
      item => item?.createAt,
      ["desc"],
    );
    // console.log("sortedByDate",sortedByDate)


    setHightLightData(sortedByDate)

   
  }, [route.params])

  const renderHightLightData=({item,index})=>{
    // console.log("PistIdDsts",item.postId)
    return(
      <OtherUserHightLightContainer
      index={index}
      setViewMedia={setViewMedia}
      setImageIndex={setImageIndex}
      
       postId={item.postId}/>
    )
  }



  return (
    <>
       <View style={commonStyles.main} > 
    <Spacer height={20}/>
     <FlatList
        data={hightLightData}
        numColumns={3}
        style={{marginHorizontal:20}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderHightLightData}
      />


     
    </View>
    <MediaView 
      setViewMedia={setViewMedia}
      viewMedia={viewMedia}
      imageIndex={imageIndex}
      userData={userData}
       hightLightData={hightLightData}/>
    </>
 
  )
}

export default OtherUserHighlights

const styles = StyleSheet.create({})