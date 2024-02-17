import React, { useState, useEffect, useCallback, useRef } from "react";
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
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import SearchComponent from "./molecule/SearchComponent";
import Autocomplete from "react-native-autocomplete-input";
import commonStyles, { PH20, PH10 } from "../../../utils/CommonStyles";
import { Spacer } from "../../../components/Spacer";
import CustomHeader from "../../../components/CustomHeader";
import {
  scale,
  moderateScale,
  verticalScale,
  ScaledSheet,
} from "react-native-size-matters";
// New import for search
import { Avatar, Divider, Image, ListItem } from "react-native-elements";
import PostItem from "../../Main/ArenaScreen/Molecules/PostItem";
import ViewPost from "../../Main/ArenaScreen/Molecules/ViewPost";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import PostFilter from "../../Main/ArenaScreen/Molecules/PostFilter";
import AntDesign from "react-native-vector-icons/AntDesign";
import messaging from "@react-native-firebase/messaging";
import Clipboard from "@react-native-clipboard/clipboard";
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

import {
  filterCustomTimeLine,
  getAllUSers,
  getSpecificUser,
  NotificationSender,
  SaveUser,
} from "../../services/UserServices";
import { authData } from "../../../redux/reducers/authReducer";
import CustomLocationBottomSheet from "../../../components/CustomLocationBottomSheet";
import HeigthBottomSheet from "../../Auth/ProfileDetail/molecules/HeigthBottomSheet";
import PostOptionsSheet from "../../Main/ArenaScreen/Molecules/PostOptionsSheet";
import { positionSkillValidate } from "../../../utils/Commons";
import ReportSheet from "../../Main/ArenaScreen/Molecules/ReportSheet";
import ArenaLayout from "../../../utils/Layouts/ArenaLayout";
import WelcomeModal from "../../../components/WelcomeModal";
import { TourGuideZoneByPosition, useTourGuideController } from "rn-tourguide";
import { setEmptyPositionsAndSkills } from "../../../redux/reducers/authReducer";
import SearchTabs from "../../../components/SearchTabs";
// End of import for search
import { colors } from "../../../utils/Colors";
import CustomText from "../../../components/CustomText";
import Octicons from "react-native-vector-icons/Octicons";
import { InterFont } from "../../../utils/Fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import AppTour from "../../../components/AppTour";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const SearchScreen = ({ navigation, route }) => {
  const modalizeRef = useRef(null);
  const modalizeRefReport = useRef(null);
  const postOptionRef = useRef(null);
  const [likePost, setLikePost] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const dispatch = useDispatch();
  const [heartPost, setHeartPost] = useState(false);
  const CurrentUser = useSelector((state) => state.auth?.currentUser);
  const notiAlert = useSelector((state) => state.auth?.notificationAlert);
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
  const [search, setSearch] = useState(false);
  const authState = useSelector((state) => state.auth.currentUser);
  const [searchData, setSearchData] = useState([]);
  const [isAppTour, setIsAppTour] = useState(false);
  const [query, setQuery] = useState("");
  const [userAllData, setUserAllData] = useState([]);
  const [isclickOnProfile, setIsClickOnProfile] = useState(false);
  const [comments, setComments] = useState(0);
  const [commentCounts, setCommentCounts] = useState(0);
  const [newComment, setNewComment] = useState(false);
  const [repost, setRepost] = useState(false);
  const [optionSheet, setOptionSheet] = useState(false);

  const [filter, setFilter] = useState("");
  const [filterIndex, setFilterIndex] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  useEffect(() => {
    console.log("check=====>", viewPostModal, optionSheet);
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
  const onSearchFilter = (txt) => {
    setLoading(true);
    setQuery(txt);
    if (txt === "") {
      setSearchData([]);
      setFilter("");
      setSearchFocused(false);
      setLoading(false);
    } else {
      const filterUsers = userAllData.filter((user) => {
        const searchString = `${user?.name}${user?.username}${user?.country}`;

        return searchString.toLowerCase().includes(txt.toLowerCase().trim());
      });
      // console.log('filterUsers', filterUsers);
      setSearchData(filterUsers);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAppTour();
  }, []);

  useEffect(() => {
    getFilterUser();
    getPosts(setPostData);
  }, [query, filterIndex]);

  const getFilterUser = () => {
    getAllUSers(setUserAllData, authState?.uid);
  };
  const toggleModal = async () => {
    try {
      await AsyncStorage.removeItem("searchTour");
    } catch (error) {}

    setIsAppTour(!isAppTour);
  };
  const checkAppTour = async () => {
    try {
      const value = await AsyncStorage.getItem("searchTour");
      // console.log('Value', value);
      if (value) {
        setIsAppTour(true);
      }
    } catch (error) {
      console.log("error", error);
    }
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
  });

  useEffect(() => {
    if (customTimeLineIds.length != 0) {
      getTimeLinePost();
      return;
    }
  }, [applyTimeLineState]);

  const getTimeLinePost = () => {
    // console.log('FunctionRun', customTimeLineIds);

    setLoading(true);
    getCustomTimeLinePost(setPostData, customTimeLineIds);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const getAllPost = () => {
    setLoading(true);

    if (freeAgent == false) {
      // console.log('DelPOst');
      getPosts(setPostData);
    } else {
      getFeeAgentPosts(setPostData);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const onSetHeightValue = (item) => {
    setSignupValues({ ...signupValues, height: `${item} cm` });
    setHeightModalVisible(false);
  };

  const onSetValue = (item, data) => {
    if (signupId == "Account Type") {
      setSignupValues({ ...signupValues, accountType: item });
      setModalVisible(false);
      // console.log('ItemAccountType', item);

      return;
    }
    if (signupId == "Select Sport") {
      // console.log('empjoData', data?.emoji);
      // setSportEmoji(data.emoji)
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
    setShowReportPotions(!showReportPotions);
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
          onCloseModal();
        },
      },
      {
        text: "No",
        onPress: () => {
          onCloseModal();
        },
      },
    ]);
  };

  const onCopyPostLink = async () => {
    const postLink = await generateLink(selectPost?.postId);
    Clipboard.setString(postLink);
    setShowPostPotions(false);
  };

  const closeSerach = async () => {
    setSearchFocused(false);
    setQuery("");
    setSearchData([]);
    await AsyncStorage.removeItem("searchFocused");
    navigation.goBack();
  };
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
  const onOpen = () => {
    modalizeRef.current?.open();
    setOptionSheet(true);
  };
  const onOpenReport = () => {
    modalizeRefReport.current?.open();
    setOptionSheet(true);
  };
  const RenderUser = ({ item, index }) => {
    return (
      <SearchComponent
        authData={authState}
        navigation={navigation}
        item={item}
      />
    );
  };

  return (
    <>
      <View style={commonStyles.main}>
        <Spacer height={Platform.OS == "ios" ? 50 : 10} />
        <PH10>
          <CustomHeader
            LeftSide={() => (
              <Pressable onPress={closeSerach}>
                <Ionicons
                  name="chevron-back"
                  color={colors.black}
                  size={moderateScale(30)}
                />
              </Pressable>
            )}
            Center={() => (
              <CustomText
                label={"Search"}
                fontSize={18}
                textAlign="center"
                fontFamily={InterFont.bold}
                color={colors.black}
                marginLeft={25}
              />
            )}
            RightSide={() => (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setEmptyPositionsAndSkills());
                  navigation.navigate("AdvanceSearch");
                }}
              >
                <Text
                  style={{
                    color: "blue",
                    fontSize: scale(13),
                    fontWeight: "600",
                  }}
                >
                  Advance
                </Text>
              </TouchableOpacity>
            )}
          />
        </PH10>

        <Spacer height={20} />
        <View>
          {/* <Autocomplete
            data={searchData}
            value={query}
            onChangeText={text => onSearchFilter(text)}
            flatListProps={{
              keyExtractor: (_, idx) => idx.toString(),
              renderItem: ({item, index}) => {
                return (
                  !searchFocused && (
                    <KeyboardAwareScrollView
                      nestedScrollEnabled
                      style={{flex: 1}}>
                      <SearchComponent
                        authData={authState}
                        navigation={navigation}
                        item={item}
                      />
                    </KeyboardAwareScrollView>
                  )
                );
              },
              style: styles.dropdown,
            }} */}
          {/* // renderTextInput={() => ( */}
          <PH10>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: verticalScale(36),
                width: "95%",
                backgroundColor: "#dee2e6",
                borderRadius: scale(10),
                paddingLeft: scale(10),
              }}
            >
              <Octicons
                name="search"
                color={colors.black}
                size={moderateScale(20)}
              />
              <TextInput
                style={styles.textInput}
                placeholderTextColor={"#6c757d"}
                placeholder="Search..."
                value={query}
                onChangeText={(text) => setQuery(text)}
                onSubmitEditing={() => {
                  setSearchFocused(true);
                  setFilter("Posts");
                  setFilterIndex(0);
                }}
                onFocus={() => {
                  setSearchFocused(false);
                }}
              />
            </View>
          </PH10>
          {/* )} */}
          {/* inputContainerStyle={styles.inputContainer} */}
          {/* /> */}
        </View>
        <View style={{ marginTop: 20 }}>
          {searchFocused === true && (
            <>
              <PH10>
                <SearchTabs
                  filter={filter}
                  setFilter={setFilter}
                  filterIndex={filterIndex}
                  setFilterIndex={setFilterIndex}
                />
              </PH10>
              <Spacer height={5} />
              <Divider />
            </>
          )}
        </View>
        <View
          style={{
            flex: 1,
            bottom: 5,
          }}
        >
          {searchFocused === true && filter === "Users" ? (
            <>
              <View>
                <FlatList
                  data={
                    query !== "" &&
                    userAllData.filter((user) => {
                      const searchString = `${user?.name}${user?.username}${user?.country}`;

                      return searchString
                        .toLowerCase()
                        .includes(query.toLowerCase().trim());
                    })
                  }
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={RenderUser}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  nestedScrollEnabled
                  extraData={postData.filter((post) =>
                    post.description
                      .toLowerCase()
                      .includes(query.toLowerCase().trim())
                  )}
                />
              </View>
            </>
          ) : searchFocused === true && filter === "Posts" ? (
            <>
              <View>
                <FlatList
                  data={searchData.filter((post) =>
                    post.description
                      .toLowerCase()
                      .includes(query.toLowerCase().trim())
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={RenderPostData}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  nestedScrollEnabled
                  extraData={postData.filter((post) =>
                    post.description
                      .toLowerCase()
                      .includes(query.toLowerCase().trim())
                  )}
                />
              </View>
            </>
          ) : (
            <>
              <View>
                <FlatList
                  data={
                    query !== "" &&
                    userAllData.filter((user) => {
                      const searchString = `${user?.name}${user?.username}${user?.country}`;

                      return searchString
                        .toLowerCase()
                        .includes(query.toLowerCase().trim());
                    })
                  }
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={RenderUser}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  nestedScrollEnabled
                  extraData={postData.filter((post) =>
                    post.description
                      .toLowerCase()
                      .includes(query.toLowerCase().trim())
                  )}
                />
              </View>
            </>
          )}
        </View>
      </View>

      <CustomBottomSheet
        modalVisible={modalVisible}
        value={signupId}
        type={signupValues}
        onSetValue={onSetValue}
        setValue={setValue}
        onCloseModal={() => setModalVisible(false)}
      />
      <CustomLocationBottomSheet
        modalVisible={countryModalVisible}
        onLocationPress={(data) => {
          setSignupValues({ ...signupValues, country: data?.description });
          setCountryModalVisible(false);
        }}
        // onSetValue={onSetValue}
        // setValue={setValue}
        onCloseModal={() => setCountryModalVisible(false)}
      />
      <CustomLocationBottomSheet
        modalVisible={cityModalVisible}
        onLocationPress={(data) => {
          setSignupValues({ ...signupValues, city: data?.description });
          setCityModalVisible(false);
        }}
        onCloseModal={() => setCityModalVisible(false)}
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
      <AppTour
        title="Advanced Search"
        emoji="🔍"
        marginTop={80}
        description={
          "This will help you to find exactly who or what you are looking for within our app."
        }
        toggleModal={toggleModal}
        isModalVisible={isAppTour}
      />
    </>
  );
};

const styles = ScaledSheet.create({
  searchBody: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#dee2e6",
    height: verticalScale(30),
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    height: verticalScale(36),
    width: "95%",
    backgroundColor: "#dee2e6",
    borderRadius: scale(10),
    paddingLeft: scale(10),
    color: colors.black,
  },
  dropdown: {
    marginTop: Platform.OS == "android" ? scale(60) : 10,
    width: "100%",
    borderWidth: 0,
    // backgroundColor:"green",
    minHeight: verticalScale(800),
    // bottom: 50,
    height: "100%",
  },
  inputContainer: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
});

export default SearchScreen;
