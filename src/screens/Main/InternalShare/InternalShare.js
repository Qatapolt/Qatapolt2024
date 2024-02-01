import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { verticalScale } from "react-native-size-matters";
import { getAllUSers, getSpecificUser } from "../../services/UserServices";

import commonStyles, { PH20 } from "../../../utils/CommonStyles";
import AddChatTop from "../ChatScreen/AddChat/Molecules/AddChatTop";
import InternalHeader from "./Molecules/InternalHeader";
import {
  checkIndividualRequest,
  createIndividualRequest,
  sendMessage,
  updateLastIndividualMessage,
} from "../../services/MessagesServices";
// import loaderAnimation from '../../../../assets/Loaders';
import loaderAnimation from "../../../assets/Loaders";
import SimpleLoader from "../../../utils/SimpleLoader";
import Toast from "react-native-root-toast";
import { updateInternalShareCount } from "../../services/PostServices";
import CustomAlert from "../../../components/CustomAlert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendNotification } from "../../services/NotificationServices";
import AddChatContainer from "./Molecules/AddChatContainer";

const InternalShare = ({ navigation, route }) => {
  const CurrentUser = useSelector((state) => state.auth?.currentUser);
  const authData = useSelector((state) => state.auth.currentUser);
  const [check, setCheck] = useState(-1);
  const postId = route.params?.postId;
  const internalShareIds = route.params?.internalShareIds;
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [stateError, setStateError] = useState({
    errorHeader: "",
    errorBody: "",
  });

  const focused = useIsFocused();

  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = () => {
    try {
      getAllUSers(setUserData, CurrentUser?.uid);
    } catch (error) {
      console.log("user not get", error);
    }
  };
  const searchUser = (txt) => {
    // console.log('cdc', txt);
    setSearch(txt);
    if (txt.length == 0) {
      try {
        getAllUSers(setUserData, CurrentUser?.uid);
      } catch (error) {
        console.log("VAlue", error);
      }

      return;
    }
    const filterUserData = userData.filter((item) => {
      return `${item.name} ${item.username}`
        .toLowerCase()
        .trim()
        .includes(txt.toLowerCase().trim());
    });

    setUserData(filterUserData);
  };
  const sendChat = async () => {
    if (selectedUser.length <= 0) {
      setStateError({
        ...stateError,
        errorHeader: "Missing Something",
        errorBody: "Please Select People to Share Post",
      });
      setModalVisible(true);
      return;
    } else {
      // Call the function
      sharePostWithSelectedUsers();
    }
  };
  const sharePostWithSelectedUsers = async () => {
    try {
      for (const element of selectedUser) {
        let selectedIdF = element.uid;
        console.log("selectedIdF", selectedIdF);

        if (internalShareIds?.includes(selectedIdF)) {
          Toast.show("Post Already Shared with this User");
          return;
        }

        setLoading(true);

        const RequestStatus = await checkIndividualRequest(
          selectedIdF,
          CurrentUser?.uid
        );

        const mediaFiles = {
          uri: "",
          type: "",
          thumbnail: "",
        };

        const internalShare = {
          senderId: CurrentUser?.uid,
          internalFile: {
            type: "",
            postId: postId,
          },
        };

        if (!RequestStatus) {
          const requestData = {
            from: CurrentUser?.uid,
            to: selectedIdF,
            relationStatus: 0,
            lastMessage: {},
          };
          await createIndividualRequest(requestData);
        }

        const messageData = await sendMessage(
          CurrentUser?.uid,
          selectedIdF,
          "send post",
          mediaFiles,
          internalShare
        );

        const userData = await getSpecificUser(selectedIdF);

        sendNotification(
          authData,
          userData,
          mediaFiles,
          "Qatapolt",
          "Share Your Post",
          "SHARE_POST"
        );

        updateInternalShareCount(postId, selectedIdF);
        updateLastIndividualMessage(CurrentUser?.uid, selectedIdF, messageData);

        setLoading(false);
      }

      Toast.show("Post Shared Successfully");
      let myObj = {
        success: true,
        postId: route.params?.postId,
      };
      await AsyncStorage.setItem("UPADTED_SHARE", JSON.stringify(myObj));
      navigation.goBack();
    } catch (error) {
      console.error("Error sharing post:", error);
      Toast.show("An error occurred while sharing the post");
      setLoading(false);
    }
  };

  const handleSelectAndGetSelectedUsers = (index) => {
    const updatedSelection = [...selectedItems];

    // Check if the item is already selected
    const isSelected = updatedSelection.includes(index);

    // If it's not selected, add it to the selection
    if (!isSelected) {
      updatedSelection.push(index);
    } else {
      // If it's already selected, remove it from the selection
      const selectedIndex = updatedSelection.indexOf(index);
      updatedSelection.splice(selectedIndex, 1);
    }

    setSelectedItems(updatedSelection);

    // Get all selected users from userData
    const selectedUsers = userData.filter((user, userIndex) =>
      updatedSelection.includes(userIndex)
    );

    console.log("selectedUsers", selectedUsers);
    setSelectedUser(selectedUsers);
  };
  return (
    <>
      <SafeAreaView style={commonStyles.main}>
        <PH20>
          <InternalHeader
            navigation={navigation}
            search={search}
            onSendChat={sendChat}
            onSearch={searchUser}
          />
          <FlatList
            data={userData}
            style={{ marginBottom: verticalScale(60) }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <AddChatContainer
                  userObject={selectedId}
                  setUserObject={setSelectedId}
                  check={check}
                  setCheck={setCheck}
                  item={item}
                  index={index}
                  selected={selectedItems.includes(index)}
                  onSelect={() => handleSelectAndGetSelectedUsers(index)}
                />
              );
            }}
          />

          {/* </View> */}
        </PH20>
      </SafeAreaView>

      {loading && <SimpleLoader file={loaderAnimation} />}

      <CustomAlert
        stateError={stateError}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default InternalShare;

const styles = StyleSheet.create({});
