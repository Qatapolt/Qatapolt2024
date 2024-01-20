import AsyncStorage from "@react-native-async-storage/async-storage";

export const getIsVerified= async()=>{

    const res = await AsyncStorage.getItem('isBioMetric');


    return res






}