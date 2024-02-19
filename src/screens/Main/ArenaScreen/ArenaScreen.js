import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  RefreshControl,
  PermissionsAndroid,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { colors } from "../../../utils/Colors";
import CustomText from "../../../components/CustomText";
import { icons } from "../../../assets/icons";
import { Spacer } from "../../../components/Spacer";
import { Avatar, Divider, ListItem } from "react-native-elements";
import TopTabs from "../../../components/TopTabs";
import commonStyles, { PH10, PH20 } from "../../../utils/CommonStyles";
import { images } from "../../../assets/images";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import PostItem from "./Molecules/PostItem";
import ViewPost from "./Molecules/ViewPost";
import AppFounderModal from "../../../components/AppFounderModal";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import PostFilter from "./Molecules/PostFilter";
import { accountType, position, location } from "../../../utils/SignUpArray";
import { useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import messaging from "@react-native-firebase/messaging";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from "react-native-root-toast";
import moment from "moment";
import {
  deleteImage,
  deletePost,
  generateLink,
  getCustomTimeLinePost,
  getFeeAgentPosts,
  getPosts,
  getSpecificPost,
  getWatchListPosts,
} from "../../services/PostServices";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import {
  filterCustomTimeLine,
  getAllUSers,
  getAppFounder,
  getSpecificUser,
  NotificationSender,
  SaveUser,
} from "../../services/UserServices";
import { useDispatch } from "react-redux";
import { authData } from "../../../redux/reducers/authReducer";
import { InterFont } from "../../../utils/Fonts";
import auth from "@react-native-firebase/auth";
import dynamicLinks from "@react-native-firebase/dynamic-links";

import {
  EsportsSkills,
  EsportsSport,
  position1,
  position2,
  skill,
  sports,
} from "../../../utils/Data";
import CustomLocationBottomSheet from "../../../components/CustomLocationBottomSheet";
import HeigthBottomSheet from "../../Auth/ProfileDetail/molecules/HeigthBottomSheet";
import { showMessage } from "react-native-flash-message";
import PostOptionsSheet from "./Molecules/PostOptionsSheet";
import SimpleLoader from "../../../utils/SimpleLoader";
import loaderAnimation from "../../../assets/Loaders";
import { positionSkillValidate } from "../../../utils/Commons";
import ReportSheet from "./Molecules/ReportSheet";
import ArenaLayout from "../../../utils/Layouts/ArenaLayout";
import WelcomeModal from "../../../components/WelcomeModal";
import { TourGuideZoneByPosition, useTourGuideController } from "rn-tourguide";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/firestore";
const ArenaScreen = ({ navigation, route }) => {
  const modalizeRef = useRef(null);
  const modalizeRefReport = useRef(null);
  const [likePost, setLikePost] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const dispatch = useDispatch();
  const [heartPost, setHeartPost] = useState(false);
  const focused = useIsFocused();
  const CurrentUser = useSelector((state) => state.auth?.currentUser);
  const notiAlert = useSelector((state) => state.auth?.notificationAlert);
  const postOptionRef = useRef(null);
  // console.log('AlettNoti', notiAlert);

  const freeAgent = route?.params?.freeAgent;

  const [appFounderModal, setAppFounderModal] = useState(false);
  const [viewPostModal, setViewPostModal] = useState(false);
  const [postIndex, setPostIndex] = useState(-1);
  const [showFilter, setShowFilter] = useState(false);
  const [indexMain, setIndexMain] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [signupId, setSignupId] = useState(-1);
  const [value, setValue] = useState("");
  const [postData, setPostData] = useState([]);
  const [postObject, setPostObject] = useState({});
  const [allFilterPost, setAllFilterPost] = useState([]);
  const [heightValue, setHeightValue] = useState("");
  const [heightModalVisible, setHeightModalVisible] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [customTimeLineIds, setCustomTimeLineIds] = useState([]);
  const [applyTimeLineState, setApplyTimeLineState] = useState(false);
  const [showPostPotions, setShowPostPotions] = useState(false);
  const [showReportPotions, setShowReportPotions] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isWelcomeModal, setIsWelcomeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectPost, setSelectPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { canStart, start, stop, eventEmitter } = useTourGuideController();
  const [comments, setComments] = useState(0);
  const [commentCounts, setCommentCounts] = useState(0);
  const [newComment, setNewComment] = useState(false);
  const [repost, setRepost] = useState(false);
  const [internalShare, setInternalShare] = useState(false);
  const [appFounderData, setAppFounderData] = useState({});
  const [selectionType, setSelectionType] = useState("");
  const [allUsersData, setAllUsersData] = useState([]);
  const [optionSheet, setOptionSheet] = useState(false);
  const [showAllPost, setAllShowPosts] = useState(false);

  useEffect(() => {
    if (viewPostModal || optionSheet) {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
        tabBarVisible: false,
      });
      return () =>
        navigation
          .getParent()
          ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    } else {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: verticalScale(65),
          paddingTop: 5,
          backgroundColor: colors.white,
          display: route.name === "NewPost" ? "none" : "flex",
          paddingBottom: Platform.OS == "ios" ? 20 : 12,
        },
        tabBarVisible: true,
      });
    }
  }, [navigation, viewPostModal, optionSheet]);

  useEffect(() => {
    if (cityModalVisible === true) {
      setSelectionType("cities");
    } else if (countryModalVisible === true) {
      setSelectionType("country");
    } else {
    }
  }, [countryModalVisible, cityModalVisible]);

  const WelcomeToggleModal = () => {
    setIsWelcomeModal(!isWelcomeModal);
  };
  const [signupValues, setSignupValues] = useState({
    selectSport: "",
    accountType: "",
    position: "",
    country: "",
    city: "",
    height: "",
    age: "",
    gender: "",
    strongHand: "",
    strongFoot: "",
    skill1: "",
    skill2: "",
    skill3: "",
    freeAgent: freeAgent === false ? false : true,
  });
  const dataKey = positionSkillValidate(signupId, signupValues);
  // console.log('ALlPostDataposition', dataKey);

  useEffect(() => {
    checkDynamicLink();
    getFcmToken();
  }, []);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
  };

  const checkDynamicLink = async () => {
    let obg = [];

    dynamicLinks()
      .getInitialLink()
      .then(async (link) => {
        if (link?.url) {
          const id = link?.url?.split("=").pop();

          const data = await getSpecificPost(id);
          obg.push(data);

          setPostData(obg);
        }
      });
  };

  useEffect(() => {
    dynamicLinks().onLink(handleDynamicLink);
  }, [dynamicLinks]);

  const handleDynamicLink = async (link) => {
    let obg = [];
    if (link?.url) {
      // console.log('UrlLink', link?.url, link);
      const id = link.url?.split("=").pop();
      // console.log('Forground Id:', id);
      const data = await getSpecificPost(id);
      obg.push(data);

      setPostData(obg);
    }
  };

  useEffect(() => {
    if (CurrentUser.firstLogin == 0) {
      getAppFounderData();
      setAppFounderModal(true);
    }
    if (indexMain == 0) {
      setPostData([]);

      getAllPost();
      return;
    }
    if (indexMain == 1 && freeAgent === false) {
      setPostData([]);
      getFollowingPostData();
      return;
    }
    if (indexMain == 2) {
      setPostData([]);
      getWatchListPostData();
      return;
    }
    if (indexMain == 3) {
      setPostData([]);

      return;
    }
  }, [route?.params?.freeAgent, indexMain, isLoading, repost, newComment]);
  useEffect(() => {
    if (repost === true) {
      getAllPost();
    }
  }, [repost]);

  async function requestPermission() {
    try {
      if (Platform.OS === "android") {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]).then((result) => {
          // console.log('requestPermission result', result);
        });
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const getAppFounderData = async () => {
    const data = await getAppFounder();
    setAppFounderData(data);
  };
  const getNewPostsShare = async () => {
    try {
      const myObj = await AsyncStorage.getItem("UPADTED_SHARE");
      const myObjNew = await AsyncStorage.getItem("NEW_POST");
      if (myObj) {
        const result = JSON.parse(myObj);
        if (result.success === true) {
          getAllPostWithNew();
          await AsyncStorage.removeItem("UPADTED_SHARE");
        }
      }
      if (myObjNew) {
        const result = JSON.parse(myObjNew);
        // console.log('myObjNew =========>', result.success === true);
        if (result.success === true) {
          getAllPost();
          await AsyncStorage.removeItem("NEW_POST");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    const fetchDataFromAsyncStorage = async () => {
      try {
        const myObj = await AsyncStorage.getItem("USERS_VALUE_FILTER");
        const asyncValues = JSON.parse(myObj);
        // const myObjFree = await AsyncStorage.getItem(
        //   "USERS_VALUE_FILTER_FREE_AGENT"
        // );
        // const asyncValuesFree = JSON.parse(myObjFree);

        console.log("myObj =========>", asyncValues);
        if (asyncValues !== null) {
          onFilterTimeLine(asyncValues);
        } else {
        }
        // Handle your data or perform any actions based on myObj
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };

    if (indexMain === 3) {
      fetchDataFromAsyncStorage();
    } else {
      // Handle other cases if needed
    }
  }, [indexMain]);
  useFocusEffect(
    React.useCallback(() => {
      getNewPostsShare();
      requestPermission();
      getAllUser();
      modalizeRef?.current?.close();
      modalizeRefReport?.current?.close();
      return async () => {
        setShowFilter(false);
        setIndexMain(0);
        modalizeRef?.current?.close();
        modalizeRefReport?.current?.close();
      };
    }, [])
  );

  const startGuide = () => {
    if (canStart) {
      start();
    }
  };

  const OnPressNo = async () => {
    await AsyncStorage.removeItem("contactUsTour");
    await AsyncStorage.removeItem("searchTour");
    setIsWelcomeModal(false);
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    if (indexMain == 0) {
      setPostData([]);

      getAllPost();
      setRefreshing(false);
      return;
    }
    if (indexMain == 1) {
      setPostData([]);
      getFollowingPostData();
      setRefreshing(false);

      return;
    }
    if (indexMain == 2) {
      setPostData([]);
      getWatchListPostData();
      setRefreshing(false);

      return;
    }
  }, []);

  const getAllUser = () => {
    getAllUSers(setAllUsersData, CurrentUser?.uid);
  };

  const onFilterTimeLine = async (values, type) => {
    // if (
    //   (type === "FreeAgentPostScreen" && values !== null) ||
    //   values !== undefined
    // ) {
    // if (values !== undefined && values) {
    //   await AsyncStorage.removeItem("USERS_VALUE_FILTER_FREE_AGENT");
    //   await AsyncStorage.setItem(
    //     "USERS_VALUE_FILTER_FREE_AGENT",
    //     JSON.stringify(values)
    //   );
    // }
    // } else {
    //   if ((type === "ArenaScreen" && values !== null) || values !== undefined)
    if (values !== undefined && values) {
      await AsyncStorage.removeItem("USERS_VALUE_FILTER");
      await AsyncStorage.setItem("USERS_VALUE_FILTER", JSON.stringify(values));
    }
    // }

    if (values !== null) {
      // const myObjFree = await AsyncStorage.getItem(
      //   "USERS_VALUE_FILTER_FREE_AGENT"
      // );
      const myObjArena = await AsyncStorage.getItem("USERS_VALUE_FILTER");
      const asyncValues = JSON.parse(myObjArena);
      // if (values !== undefined && values) {
      //   await AsyncStorage.removeItem("USERS_VALUE_FILTER");
      //   await AsyncStorage.setItem(
      //     "USERS_VALUE_FILTER",
      //     JSON.stringify(values)
      //   );
      // }

      setLoading(true);

      if (
        !allUsersData ||
        !Array.isArray(allUsersData) ||
        allUsersData.length === 0 ||
        !postData ||
        !Array.isArray(postData)
      ) {
        setLoading(false);
        return;
      }
      const arenaFilerUsers = allUsersData.filter((user) => {
        return (
          (!values.age || user?.age === values.age) &&
          (!values.gender || user?.gender === values.gender) &&
          (!values.accountType || user?.accountType === values.accountType) &&
          (!values.position || user?.position === values.position) &&
          (!values.country || user?.country === values.country) &&
          (!values.city || user?.city === values.city) &&
          (!values.height || user?.height === values.height) &&
          (!values.selectSport || user?.selectSport === values.selectSport) &&
          (!values.strongHand || user?.strongHand === values.strongHand) &&
          (!values.strongFoot || user?.strongFoot === values.strongFoot) &&
          (!values.skill1 || user?.skill1 === values.skill1) &&
          (!values.skill2 || user?.skill2 === values.skill2) &&
          (!values.skill3 || user?.skill3 === values.skill3) &&
          (typeof values.freeAgent === "undefined" ||
            user?.freeAgent === values.freeAgent)
        );
      });

      const arenaFilerPost = arenaFilerUsers
        .map((user) => postData.find((post) => post.userId === user?.uid))
        .filter(Boolean);

      setTimeout(() => {
        setPostData(arenaFilerPost.length > 0 ? arenaFilerPost : postData);
        setLoading(false);
      }, 1000);
    } else {
    }
  };

  const getFollowingPostData = async () => {
    const postData = [];
    if (
      Array.isArray(CurrentUser.AllFollowing) &&
      CurrentUser.AllFollowing.length > 0
    ) {
      setLoading(true);

      try {
        firestore()
          .collection("Posts")
          .orderBy("createAt", "desc")
          .get()
          .then((datingSnapshot) => {
            datingSnapshot.forEach((da) => {
              CurrentUser.AllFollowing.forEach((id) => {
                if (id == da.data().userId) {
                  postData.push(da.data());
                }
              });
            });

            setPostData(postData);
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
        throw error;
      }
    }
  };
  const getWatchListPostData = async () => {
    setLoading(true);

    const postData = [];

    try {
      firestore()
        .collection("Posts")
        .orderBy("createAt", "desc")
        .get()
        .then((datingSnapshot) => {
          datingSnapshot.forEach((da) => {
            Array.isArray(CurrentUser.WatchList) &&
              CurrentUser.WatchList.forEach((id) => {
                if (id == da.data().userId) {
                  postData.push(da.data());
                }
              });
          });
          console.log("getWatchListPostData", postData);
          setPostData(postData);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const getAllPost = () => {
    setLoading(true);
    if (freeAgent == false) {
      getPosts(setPostData);
      setLoading(false);
    } else {
      try {
        firestore()
          .collection("Posts")
          .where("freeAgent", "==", true)
          .get()
          .then((datingSnapshot) => {
            datingSnapshot.forEach((da) => {
              postData.push(da.data());
            });
            const sortedArray = [...postData].sort((a, b) => {
              const createdAtA =
                a.createAt.seconds + a.createAt.nanoseconds / 1e9;
              const createdAtB =
                b.createAt.seconds + b.createAt.nanoseconds / 1e9;
              return createdAtB - createdAtA;
            });
            console.log("PostData", sortedArray.length);
            setPostData(sortedArray);
          });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error;
      }
      // getFeeAgentPosts(setPostData);
    }
  };
  const getAllPostWithNew = () => {
    if (freeAgent == false) {
      getPosts(setPostData);
      setLoading(false);
    } else {
      try {
        firestore()
          .collection("Posts")
          .where("freeAgent", "==", true)
          .get()
          .then((datingSnapshot) => {
            datingSnapshot.forEach((da) => {
              postData.push(da.data());
            });
            const sortedArray = [...postData].sort((a, b) => {
              const createdAtA =
                a.createAt.seconds + a.createAt.nanoseconds / 1e9;
              const createdAtB =
                b.createAt.seconds + b.createAt.nanoseconds / 1e9;
              return createdAtB - createdAtA;
            });
            console.log("PostData", sortedArray.length);
            setPostData(sortedArray);
          });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    }
  };

  const onHandelModal = async () => {
    try {
      setAppFounderModal(false);
      await SaveUser(CurrentUser.uid, { firstLogin: 1 });
      const user = await getSpecificUser(CurrentUser.uid);
      dispatch(authData(user));
      setTimeout(() => {
        setIsWelcomeModal(true);
      }, 1000);
    } catch (error) {}
  };

  const onSetHeightValue = (item) => {
    setSignupValues({ ...signupValues, height: `${item} cm` });
    setHeightModalVisible(false);
  };

  const onSetValue = (item, data) => {
    console.log(
      "onSaveValueee====>",
      "signupId type:",
      typeof signupId,
      "signupId value:",
      signupId,
      "item:",
      item,
      "data:",
      data
    );
    if (signupId == "Account Type") {
      setSignupValues({ ...signupValues, accountType: item });
      setModalVisible(false);
      return;
    }
    if (signupId == "Select Sport") {
      setSignupValues({
        ...signupValues,
        selectSport: item,
        sportEmoji: data.emoji,
      });
      setModalVisible(false);
      return;
    }
    if (signupId == 5 || signupId == 10) {
      setSignupValues({ ...signupValues, bio: item });
      setModalVisible(false);
      return;
    }
    if (signupId == "Select Position") {
      setSignupValues({ ...signupValues, position: item });
      setModalVisible(false);
      return;
    }
    if (signupId == "Skill #1") {
      setSignupValues({ ...signupValues, skill1: item });
      setModalVisible(false);
      return;
    }
    if (signupId == "Strong Hand") {
      setSignupValues({ ...signupValues, strongHand: item });
      setModalVisible(false);
      return;
    }
    if (signupId == "Strong Foot") {
      setSignupValues({ ...signupValues, strongFoot: item });
      setModalVisible(false);
      return;
    }
    if (signupId == "Skill #2") {
      setSignupValues({ ...signupValues, skill2: item });
      setModalVisible(false);
      return;
    }
    if (signupId == "Skill #3") {
      setSignupValues({ ...signupValues, skill3: item });
      setModalVisible(false);
      return;
    }
    setModalVisible(false);
  };

  const onCloseModal = () => {
    setShowPostPotions(!showPostPotions);
  };
  const onReportModal = () => {
    modalizeRefReport.current?.close();
  };

  const delPost = () => {
    Alert.alert("Delete Post", "Are you sure you want to delete?", [
      {
        text: "Yes",
        onPress: async () => {
          if (selectPost.uriData.uri) {
            deleteImage(selectPost?.uriData.uri);
          }

          deletePost(selectPost?.postId);

          let filterDeletePost = CurrentUser?.PostIds.filter(
            (data) => data.postId != selectPost?.postId
          );
          await SaveUser(CurrentUser.uid, {
            PostIds: filterDeletePost,
          });
          const data = await getSpecificUser(CurrentUser.uid);
          dispatch(authData(data));
          modalizeRef?.current?.close();
          setIsLoading(false);
          setRepost(true);
          Toast.show("Post deleted successfully!");
        },
      },
      {
        text: "No",
        onPress: () => {
          modalizeRef?.current?.close();
        },
      },
    ]);
  };

  const onCopyPostLink = async () => {
    const postLink = await generateLink(selectPost);
    if (postLink) {
      Clipboard.setString(postLink);
      setShowPostPotions(false);
      Toast.show("Link Copied!");
    }
  };
  const Header = ({ navigation }) => (
    <View style={styles.header}>
      {/* <CustomText label={''}/> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "69%",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();

            // getToken()
          }}
          style={{
            width: 40,
            height: 40,
            backgroundColor: colors.superLightGray,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            marginRight: 10,
          }}
        >
          <Image source={icons.drawer} style={{ height: 27, width: 27 }} />
        </TouchableOpacity>
        {freeAgent == false ? (
          <View>
            <CustomText
              label="QATAPOLT"
              alignSelf="center"
              fontFamily={InterFont.bold}
              fontSize={20}
            />
          </View>
        ) : (
          <CustomText
            label="Free Agent Posts"
            fontSize={15}
            fontFamily={InterFont.bold}
          />
        )}
      </View>

      <View style={styles.row}>
        {freeAgent == false && (
          <>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate("SearchScreen")}
            >
              <AntDesign
                name="search1"
                size={moderateScale(22)}
                color={colors.black}
              />
            </TouchableOpacity>
            <Spacer width={10} />
          </>
        )}

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Image source={icons.bell} style={{ height: 27, width: 27 }} />
          {notiAlert && <View style={styles.notificationContainer} />}
        </TouchableOpacity>
      </View>
    </View>
  );

  const RenderPostData = ({ item, index }) => {
    return (
      <View>
        <PostItem
          onOpen={onOpen}
          onOpenReport={onOpenReport}
          navigation={navigation}
          index={index}
          item={item}
          getAllPost={getAllPost}
          authData={CurrentUser}
          setShowPostPotions={setShowPostPotions}
          authId={CurrentUser?.uid}
          setSelectPost={setSelectPost}
          setPostObject={setPostObject}
          setShowReportPotions={setShowReportPotions}
          setPostIndex={setPostIndex}
          showPost={showPost}
          setShowPost={setShowPost}
          setViewPostModal={setViewPostModal}
          heartPost={heartPost}
          setHeartPost={setHeartPost}
          likePost={likePost}
          setLikePost={setLikePost}
          comments={item.comments.length > 0 ? item.comments : []}
          setComments={setComments}
          commentCounts={
            item?.comment_Count === undefined || item?.comment_Count === 0
              ? 0
              : item.comment_Count
          }
          setCommentCounts={setCommentCounts}
          setNewComment={setNewComment}
          repost={repost}
          setRepost={setRepost}
          internalShare={
            item?.internalShare === internalShare
              ? internalShare
              : item?.internalShare
          }
          rePostIds={item?.rePostIds ? item.rePostIds : null}
        />
      </View>
    );
  };
  const getHeader = () => {
    return (
      <>
        <Spacer height={10} />
        <Divider />
        <View>
          <>
            <Spacer height={5} />
            <PH10>
              <TopTabs
                setShowFilter={setShowFilter}
                setCustomTimeLineIds={setCustomTimeLineIds}
                signupValues={signupValues}
                setSignupValues={setSignupValues}
                showFilter={showFilter}
                indexMain={indexMain}
                setIndexMain={setIndexMain}
                freeAgent={freeAgent}
              />
            </PH10>
            <Spacer height={5} />
            <Divider />
          </>

          {showFilter && (
            <PostFilter
              setModalVisible={setModalVisible}
              signupValues={signupValues}
              setSignupValues={setSignupValues}
              setCityModalVisible={setCityModalVisible}
              setCountryModalVisible={setCountryModalVisible}
              setSignupId={setSignupId}
              onFilterTimeLine={(value, type) => onFilterTimeLine(value, type)}
              setHeightModalVisible={setHeightModalVisible}
              type={
                freeAgent === undefined || freeAgent === true
                  ? "FreeAgentPostScreen"
                  : "ArenaScreen"
              }
              freeAgent={freeAgent}
            />
          )}
          <Divider />
          <Spacer height={5} />
        </View>
      </>
    );
  };
  const onOpen = () => {
    modalizeRef.current?.open();
    setOptionSheet(true);
  };
  const onOpenReport = () => {
    modalizeRefReport.current?.open();
    setOptionSheet(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Spacer height={Platform.OS == "ios" ? 40 : 10} />
        <View>
          <Header freeAgent={freeAgent} navigation={navigation} />
        </View>

        {loading ? (
          <ArenaLayout />
        ) : (
          <>
            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={postData}
                contentContainerStyle={{
                  paddingBottom: verticalScale(80),
                }}
                keyExtractor={(item, index) => item?.postId?.toString()}
                renderItem={RenderPostData}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                extraData={postData}
                ListHeaderComponent={getHeader}
              />
            </View>
          </>
        )}
      </View>

      <AppFounderModal
        modalVisible={appFounderModal}
        handelModal={onHandelModal}
        appFounderData={appFounderData}
        authUser={CurrentUser}
        setIsWelcomeModal={setIsWelcomeModal}
        dispatch={dispatch}
        setModalVisible={setAppFounderModal}
      />
      <CustomBottomSheet
        modalVisible={modalVisible}
        value={signupId}
        type={signupValues}
        signupValues={signupValues}
        setSignupValues={setSignupValues}
        onSetValue={onSetValue}
        setValue={setValue}
        onCloseModal={() => setModalVisible(false)}
      />
      <CustomLocationBottomSheet
        modalVisible={countryModalVisible}
        onLocationPress={(data) => {
          setSignupValues({ ...signupValues, country: data });
          setCountryModalVisible(false);
        }}
        onCloseModal={() => setCountryModalVisible(false)}
        selectionType={selectionType}
      />
      <CustomLocationBottomSheet
        modalVisible={cityModalVisible}
        onLocationPress={(data) => {
          setSignupValues({ ...signupValues, city: data });
          setCityModalVisible(false);
        }}
        onCloseModal={() => setCityModalVisible(false)}
        selectionType={selectionType}
        selectedCountry={signupValues.country}
      />
      <HeigthBottomSheet
        EsportsSport
        modalVisible={heightModalVisible}
        onSetValue={onSetHeightValue}
        setValue={setHeightValue}
        onCloseModal={() => setHeightModalVisible(false)}
      />
      <ViewPost
        viewPostModal={viewPostModal}
        postIndex={postIndex}
        postObject={postObject}
        setViewPostModal={setViewPostModal}
        setSelectPost={setSelectPost}
        setShowPostPotions={setShowPostPotions}
        ikePost={likePost}
        setLikePost={setLikePost}
        navigation={navigation}
        setShowPost={setShowPost}
        showPost={showPost}
        showPostPotions={showPostPotions}
        onOpen={onOpen}
        setOptionSheet={setOptionSheet}
      />
      <PostOptionsSheet
        modalVisible={showPostPotions}
        onCloseModal={onCloseModal}
        selectPost={selectPost}
        postOptionRef={postOptionRef}
        selectedId={selectPost?.userId}
        authData={CurrentUser}
        onDelPost={delPost}
        onCopyLink={onCopyPostLink}
        navigation={navigation}
        modalizeRef={modalizeRef}
        viewPostModal={viewPostModal}
        setOptionSheet={setOptionSheet}
        setViewPostModal={setViewPostModal}
      />
      <ReportSheet
        modalVisible={showReportPotions}
        onCloseModal={onReportModal}
        selectPost={selectPost}
        selectedId={selectPost?.userId}
        authUser={CurrentUser}
        dispatch={dispatch}
        onDelPost={delPost}
        navigation={navigation}
        setRepost={setRepost}
        postData={postData}
        setPostData={setPostData}
        freeAgent={freeAgent}
        modalizeRefReport={modalizeRefReport}
        setOptionSheet={setOptionSheet}
        setViewPostModal={setViewPostModal}
      />
      <WelcomeModal
        toggleModal={WelcomeToggleModal}
        isModalVisible={isWelcomeModal}
        onPressStart={startGuide}
        PressNo={OnPressNo}
      />
    </>
  );
};

export default ArenaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // paddingHorizontal:20
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  postContainer: {
    // aspectRatio: 1,
    width: "100%",
    height: 350,
    // flex: 1,
  },
  postFooterIcon: {
    width: 24,
    height: 26,
  },
  notificationContainer: {
    width: 7,
    height: 7,
    backgroundColor: colors.red,
    borderRadius: 100,
    position: "absolute",
    right: 3,
    top: 3,
  },
});
