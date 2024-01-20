import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import {timeFormat} from '../../utils/Commons';

export const sendMessage = async (from, to, text, mediaFiles, interShare) => {
  const id =
    from > to
      ? from + '__' + to + '__' + uuid.v4()
      : to + '__' + from + '__' + uuid.v4();
  const message = {
    id,
    from,
    to,
    text,
    mediaFiles,
    interShare,

    // date:date,

    createdAt: new Date(),
  };
  // console.log('MessageSend', message);
  await firestore().doc(`chats/${id}`).set(message, {merge: true});
  return {id, text, from, to, mediaFiles, interShare};
};
export const sendGroupMessage = async (
  groupId,
  senderDetail,
  text,
  mediaFiles,
) => {
  const id = uuid.v4();
  const message = {
    id,
    senderDetail,
    groupId,
    text,
    mediaFiles,
    createdAt: new Date(),
  };
  // console.log('MessageSend', message);
  await firestore().doc(`groupChat/${id}`).set(message, {merge: true});
  return {
    id,
    groupId,
    senderDetail,
    text,
    mediaFiles,
  };
};

export const sendComment = async (
  postId,
  senderDetail,
  commentMessage,
  commentLike,
) => {
  const id = uuid.v4();

  const message = {
    id,
    postId,
    senderId,
    commentMessage,
    commentLike,

    // date:date,

    createdAt: new Date(),
  };
  // console.log('commentSend', message);
  await firestore().doc(`comments/${id}`).set(message, {merge: true});
  return {
    id,
    postId,
    senderId,
    commentMessage,
    commentLike,
  };
};

export const checkIndividualRequest = async (from, to) => {
  const id = from > to ? from + '__' + to : to + '__' + from;
  // console.log('CompleteIdwith', id);
  const result = await firestore()
    .collection('IndividualRequest')
    .doc(id)
    .get();
  return result.data();
};

export const getIndividualRequest = (authId, setData) => {
  // console.log('UserRequest', authId);

  try {
    firestore()
      .collection('IndividualRequest')
      .orderBy('date', 'desc')
      // .where('to','==',authId)
      // .where('from', '==', authId )

      .onSnapshot(notesSnapshot => {
        const request = [];

        notesSnapshot?.forEach(note => {
          if (note?.data()?.from === authId) {
            request.push(note.data());
          } else if (note?.data()?.to === authId) {
            request.push(note.data());
          }
        });
        setData({request});
      });
  } catch (error) {
    console.log('getUserNotes line 47', error);
    throw error;
  }
};

export const getGroupRequest = (authId, setData) => {
  console.log('DataIdAuth', authId);
  try {
    firestore()
      .collection('GroupRequest')
      // .orderBy('createdAt', "asc")

      // .where('participantsData','==',authId)
      // .where('from', '==', authId )

      .onSnapshot(notesSnapshot => {
        const request = [];

        notesSnapshot?.forEach(note => {
          let authGroups = note
            .data()
            ?.participantsData?.find(data => data?.participantId == authId);
          console.log('kcnkdncd', authGroups);
          if (authGroups?.participantId) {
            request.push(note.data());
          }

          // if(note.data()?.participantsData)

          // if (note?.data()?.from === authId) {
          //   request.push(note.data());
          // } else if (note?.data()?.to === authId) {
          //   request.push(note.data());
          // }
        });
        setData({request});
      });
  } catch (error) {
    console.log('getUserNotes line 47', error);
    throw error;
  }
};

export const getAuthGroupRequest = (authId, setData) => {
  console.log('DataIdAuth', authId);
  try {
    firestore()
      .collection('GroupRequest')
      .onSnapshot(notesSnapshot => {
        const request = [];
        notesSnapshot?.forEach(note => {
          if (note?.data()?.lastMessage.text) {
            let authGroups = note
              .data()
              ?.participantsData?.find(data => data?.participantId == authId);
              // console.log("authGroups",authGroups)
            if (authGroups?.participantId) {
              request?.push(note?.data());
            }
          }
        });
        setData({request});
      });
  } catch (error) {
    console.log('getUserNotes line 47', error);
    throw error;
  }
};

export const createIndividualRequest = async requestData => {
  const id =
    requestData.from > requestData.to
      ? requestData.from + '__' + requestData.to
      : requestData.to + '__' + requestData.from;

  await firestore()
    .doc(`IndividualRequest/${id}`)
    .set(
      {
        ...requestData,
        createdAt: new Date(),
        id: id,
      },
      {merge: true},
    );
};

export const createGroupRequest = async (id, requestData) => {
  console.log("GroupDataChat",id,requestData)
  await firestore()
    .doc(`GroupRequest/${id}`)
    .set(
      {
        ...requestData,
        createdAt: new Date(),
      },
      {merge: true},
    );
};

export const updateLastIndividualMessage = async (from, to, lastMessage) => {
  // console.log('fromLastMessage', from);
  const id = from > to ? from + '__' + to : to + '__' + from;
  try {
    await firestore().doc(`IndividualRequest/${id}`).set(
      {
        date: new Date(),
        lastMessage,
      },
      {merge: true},
    );
  } catch (error) {
    console.log('updateLastMessage', error);
  }
};
export const updateGroupIndividualMessage = async (groupId, lastMessage) => {
  try {
    await firestore().doc(`GroupRequest/${groupId}`).set(
      {
        date: new Date(),
        lastMessage,
      },
      {merge: true},
    );
  } catch (error) {
    console.log('updateLastMessage', error);
  }
};

export const getCommentsMessages = (user1, user2, setMessages) => {
  const id =
    user1 > user2 ? user1 + '__' + user2 + '__' : user2 + '__' + user1 + '__';
  return firestore()
    .collection('comments')
    .orderBy('id')
    .startAt(id)
    .endAt(id + '~')
    .onSnapshot(chatsSnapshot => {
      const messages = [];
      chatsSnapshot?.forEach(chatSnapshot => {
        const message = chatSnapshot.data();
        if (message?.id) {
          messages.push({
            _id: message.id,
            text: message?.text,
            date: message.createdAt,
            createdAt: timeFormat(message.createdAt, 'HH:mm A'),
            to: message.to,
            // date:message?.date,
            from: message.from,
            days: timeFormat(message.createdAt, 'MMMM - DD'),
          });
        }
      });
      // console.log('MessageID', messages);
      setMessages(
        messages.sort((a, b) => a?.date?.seconds - b?.date?.seconds || 0),
      );
    });
};

export const getSpecificGroupRequest = async id => {
  try {
    const user = await firestore().collection('GroupRequest').doc(id).get();
    return user.data();
  } catch (error) {
    // console.log('getUser line 51', error);
    throw error;
  }
};

export const getGroupMessages = (groupId, setMessages) => {
  return firestore()
    .collection('groupChat')
    .where('groupId', '==', groupId)
    .onSnapshot(chatsSnapshot => {
      const messages = [];
      chatsSnapshot?.forEach(chatSnapshot => {
        const message = chatSnapshot.data();
        if (message?.id) {
          messages.push({
            id: message.id,
            text: message?.text,
            date: message.createdAt,
            createdAt: timeFormat(message.createdAt, 'HH:mm A'),
            groupId: message.groupId,
            mediaFiles: message?.mediaFiles,
            // date:message?.date,
            senderDetail: message.senderDetail,
            days: timeFormat(message.createdAt, 'MMMM - DD'),
          });
        }
      });
      setMessages(
        messages
          .sort((a, b) => a?.date?.seconds - b?.date?.seconds || 0)
          .reverse(),
      );
    });
};

export const getIndividualMessages = (user1, user2, setMessages) => {
  const id =
    user1 > user2 ? user1 + '__' + user2 + '__' : user2 + '__' + user1 + '__';
  return firestore()
    .collection('chats')
    .orderBy('id')
    .startAt(id)
    .endAt(id + '~')
    .onSnapshot(chatsSnapshot => {
      const messages = [];
      chatsSnapshot?.forEach(chatSnapshot => {
        const message = chatSnapshot.data();
        if (message?.id) {
          messages.push({
            _id: message.id,
            text: message?.text,
            date: message.createdAt,
            createdAt: timeFormat(message.createdAt, 'HH:mm A'),
            to: message.to,
            mediaFiles: message?.mediaFiles,
            interShare: message?.interShare,
            // date:message?.date,
            from: message.from,
            days: timeFormat(message.createdAt, 'MMMM - DD'),
          });
        }
      });
      // console.log('MessageID', messages);
      setMessages(
        messages.sort((a, b) => b?.date?.seconds - a?.date?.seconds || 0),
      );
    });
};

export const deleteIndividualChat = async (user1, user2) => {
  const id =
    user1 > user2 ? user1 + '__' + user2 + '__' : user2 + '__' + user1 + '__';

  try {
    const res = await firestore()
      .collection('chats')
      .orderBy('id')
      .startAt(id)
      .endAt(id + '~')
      .onSnapshot(querySnapshot => {
        Promise.all(querySnapshot.docs.map(d => d.ref.delete()));
      });

    if (res == undefined) {
      return true;
    }
  } catch (error) {
    console.log('not deleted!', error);
  }
};

export const leaveGroupChat = () => {};
