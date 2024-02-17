import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../../../utils/Colors";
import { moderateScale, verticalScale } from "react-native-size-matters";
import {
  getAllFollowers,
  getSpecificUser,
  SaveUser,
  UpdateFollower,
  UpdateFollowing,
} from "../../services/UserServices";
import { useDispatch, useSelector } from "react-redux";
import { authData } from "../../../redux/reducers/authReducer";
import UserFollowedContainer from "../UserProfile/Molecules/UserFollowedContainer";
import UserFollowerHeader from "../UserFollowers/Molecules/UserFollowerHeader";
import UserFollowingContainer from "./Molecules/UserFollowingContainer";
import { sendFollowerNotification } from "../../services/NotificationServices";
import uuid from "react-native-uuid";

const UserFollowing = ({ navigation, route }) => {
  const [allFollower, setAllFollower] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.currentUser);
  const AllFollowers = route?.params?.AllFollowing;
  const [refreshState, setRefreshState] = useState(false);
  const [followerState, setFollowerState] = useState(false);

  useEffect(() => {
    getAllFollowerData();
  }, [route?.params?.event, refreshState]);

  const getAllFollowerData = () => {
    if (AllFollowers?.length == 0 || AllFollowers == undefined) {
      setAllFollower([]);
      return;
    }
    getAllFollowers(setAllFollower, AllFollowers);
  };

  const navigateTo = (item) => {
    let BlockExist = authState?.BlockUsers?.map((item) => item).includes(
      authState.uid
    );
    if (BlockExist) {
      navigation.navigate("BlockScreen");

      return;
    }

    if (authState.uid == item.uid) {
      navigation.navigate("Profile", {
        event: authState.uid,
      });
      return;
    }
    navigation.navigate("UserProfile", {
      event: item.uid,
    });
  };

  const RenderFollowerData = ({ item, index }) => {
    return (
      <UserFollowingContainer
        authId={authState.uid}
        authState={authState}
        authStateFollowing={authState?.AllFollowing}
        onNavigate={() => {
          navigateTo(item);
        }}
        onRemoveFollower={() => {
          onRemove(item);
        }}
        item={item}
      />
    );
  };
  const onRemove = async (item) => {
    let userFollowExist = item?.AllFollowers?.map((data) => data)?.includes(
      authState?.uid
    );
    try {
      if (userFollowExist) {
        // check auth following
        let authFollowingExist = authState?.AllFollowing?.map(
          (data) => data
        )?.includes(item?.uid);
        // filter user followers
        let filterUserFollowerList = item?.AllFollowers.filter(
          (data) => data != authState.uid
        );
        await SaveUser(item.uid, {
          followers: item.followers - 1,
          AllFollowers: filterUserFollowerList,
        });
        // check auth following
        if (authFollowingExist) {
          let filterFollowingList = authState?.AllFollowing.filter(
            (data) => data != item.uid
          );
          await SaveUser(authState?.uid, {
            following: authState?.uid.following - 1,
            AllFollowing: filterFollowingList,
          });
        }
        const data = await getSpecificUser(authState.uid);
        dispatch(authData(data));
        setFollowerState(!followerState);
        setRefreshState(!refreshState);

        return;
      }

      if (item?.privateProfile) {
        if (authState?.RequestIds?.includes(item.uid)) {
          // console.log('lvnlcnvln');

          // filter user followers
          let filterUserFollowRequest = item?.RequestIds.filter(
            (data) => data != authState?.uid
          );
          await SaveUser(item?.uid, {
            RequestIds: filterUserFollowRequest,
          });
          setRefreshState(!refreshState);
        } else {
          const id = uuid.v4();
          await UpdateFollowRequest(item.uid, authState?.uid, id);
          setRefreshState(!refreshState);
          // console.log('HitNoti');
          sendFollowerNotification(
            authState,
            item,
            "Follow Request",
            "FOLLOW__REQUEST",
            id
          );
        }
        return;
      }
      // update user followers
      await UpdateFollower(item.uid, authState.uid);
      await SaveUser(item.uid, { followers: item.followers + 1 });
      //  update auth following
      await SaveUser(authState?.uid, { following: authState.following + 1 });
      await UpdateFollowing(authState?.uid, item.uid);

      const data = await getSpecificUser(authState?.uid);
      dispatch(authData(data));
      sendFollowerNotification(
        authState,
        item,
        "Follow You",
        "FOLLOW",
        uuid.v4()
      );

      setFollowerState(!followerState);
      setRefreshState(!refreshState);

      // console.log('UpdateSttae');
    } catch (error) {
      console.log("ErrorHai", error);
    }
  };
  const onFilerFollowers = (txt) => {
    setSearch(txt);
    // console.log('TxtData', txt);
    if (txt.length == 0) {
      if (
        authState?.AllFollowers?.length == 0 ||
        authState?.AllFollowers == undefined
      ) {
        setAllFollower([]);
        return;
      }

      getAllFollowers(setAllFollower, authState?.AllFollowers);
    } else {
      let filterSearch = allFollower.filter((item) => {
        return `${item.name} ${item.username}`
          .toLowerCase()
          .trim()
          .includes(txt.toLowerCase().trim());
      });

      setAllFollower(filterSearch);
    }
  };

  return (
    <View>
      <UserFollowerHeader
        onFilerFollowers={onFilerFollowers}
        search={search}
        label={"Following"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          display: "flex",
          height: "90%",
          backgroundColor: colors.white,
        }}
      >
        <View style={{ padding: 15 }}>
          <FlatList
            data={allFollower}
            contentContainerStyle={{
              paddingBottom: verticalScale(50),
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={RenderFollowerData}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UserFollowing;
