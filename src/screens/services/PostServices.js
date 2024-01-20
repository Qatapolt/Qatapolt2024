import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import axios from 'axios';
import {sendNotification} from './NotificationServices';

export const combineData = async id => {
  try {
    const [posts, users] = await Promise.all([getPosts(), getAllUsers(id)]);

    // Combine the data as per your requirement
    const combinedData = [...posts, ...users];

    return combinedData;
  } catch (error) {
    throw error;
  }
};

export const getSpecificUser = async postID => {
  try {
    const user = await firestore().collection('Posts').doc(postID).get();
    return user.data();
  } catch (error) {
    // console.log('getUser line 51', error);
    throw error;
  }
};

export const SavePost = async data => {
  try {
    const response = await firestore()
      .collection('Posts')
      .doc(data?.postId)
      .set(data, {merge: true});
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSpecificPost = async (userId, postDate) => {
  try {
    const user = await firestore().collection('Posts').doc(userId).get();
    return user.data();
  } catch (error) {
    // console.log('getUser line 51', error);
    throw error;
  }
};

export const generateLink = async postData => {
  console.log('PostData', postData);

  try {
    var link = await dynamicLinks().buildShortLink(
      {
        link: `https://qatapoltsharepost.page.link/iDzQ?id=${postData?.postId}`,
        domainUriPrefix: 'https://qatapoltsharepost.page.link',

        android: {
          packageName: 'com.qatapolt',
          // fallbackUrl:
        },
        ios: {
          bundleId: 'com.qatapolt.qatapolt',
        },

        social: {
          title: 'Check out this post on Qatapolt',
          descriptionText: postData?.description ? postData?.description : '',
          imageUrl: postData?.uriData?.thumbnail
            ? postData?.uriData?.thumbnail
            : postData?.uriData?.uri
            ? postData?.uriData?.uri
            : 'https://firebasestorage.googleapis.com/v0/b/qatapolt-2023.appspot.com/o/image0.png?alt=media&token=8e50fe8a-f946-4ccf-96b5-0e7b70b40031',
        },
      },
      dynamicLinks.ShortLinkType.DEFAULT,
    );
    return link;
  } catch (error) {
    console.log('error raised', error);
  }
};

export const getPosts = setData => {
  const postData = [];

  try {
    firestore()
      .collection('Posts')
      .orderBy('createAt', 'desc')
      .get()
      .then(datingSnapshot => {
        datingSnapshot.forEach(da => {
          postData.push(da.data());
        });
        // postData.sort((a, b) => a?.createAt?.localeCompare(b?.createAt));
        setData(postData);
      });
  } catch (error) {
    throw error;
  }
};
export const getWatchListPosts = (setData, followingIds) => {
  const postData = [];

  try {
    firestore()
      .collection('Posts')
      .orderBy('createAt', 'desc')
      .get()
      .then(datingSnapshot => {
        datingSnapshot.forEach(da => {
          followingIds.forEach(id => {
            if (id == da.data().userId) {
              postData.push(da.data());
            }
          });

          // followingIds.forEach(id=>{
          //   if( da.data()){
          //     postData.push(da.data());

          //   }

          // })
        });
        // postData.sort((a, b) => a?.createAt?.localeCompare(b?.createAt));
        setData(postData);
      });
  } catch (error) {
    throw error;
  }
};
export const getFollowingPosts = (setData, watchlistIds) => {
  const postData = [];

  try {
    firestore()
      .collection('Posts')
      .orderBy('createAt', 'desc')
      .get()
      .then(datingSnapshot => {
        datingSnapshot.forEach(da => {
          watchlistIds.forEach(id => {
            if (id == da.data().userId) {
              postData.push(da.data());
            }
          });

          // followingIds.forEach(id=>{
          //   if( da.data()){
          //     postData.push(da.data());

          //   }

          // })
        });
        // postData.sort((a, b) => a?.createAt?.localeCompare(b?.createAt));
        setData(postData);
      });
  } catch (error) {
    throw error;
  }
};
export const deletePost = id => {
  try {
    firebase
      .firestore()
      .collection('Posts')
      .doc(id)
      .delete()
      .then(() => {
        // console.log('Post isDelete');
      });
  } catch (error) {
    throw error;
  }
};

export const deleteImage = async url => {
  const storageRef = storage().refFromURL(url);
  const imageRef = storage().ref(storageRef.fullPath);

  try {
    await imageRef.delete();
    return true;
  } catch (error) {
    throw error;
  }
};

export const getFeeAgentPosts = setData => {
  const postData = [];

  try {
    firestore()
      .collection('Posts')
      .where('freeAgent', '==', true)
      .get()
      .then(datingSnapshot => {
        datingSnapshot.forEach(da => {
          postData.push(da.data());
        });
        // postData.sort((a, b) => a?.createAt?.localeCompare(b?.createAt));
        // console.log('PostDataAll', typeof postData);
        setData(postData);
      });
  } catch (error) {
    throw error;
  }
};

export const getOrganizations = async element => {
  try {
    return await axios.get(
      `${'https://event-app-production-production.up.railway.app/'}${'api/v1/client'}/${
        element.clientID
      }`,
      {
        headers: {
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlubmVydmlldzM0QGdtYWlsLmNvbSIsImFkbWluSWQiOiI2NDk3NDQ3ZTExNjlhNzI5ZGUyNzBlMDIiLCJpYXQiOjE2ODc3MDQyOTl9.Sa59ljcfm8ExmP3Z5axK92lwhyY234E8wwSLDq9uGDI',
        },
      },
    );
  } catch (error) {}
};

export const deleteNotiRequest = async id => {
  try {
    await firebase.firestore().collection('notifications').doc(id).delete();

    return true;
  } catch (error) {
    throw error;
  }
};

// const unlikeProduct = async () => {

//   firestore()
//     .collection('likes')
//     .doc(entity.id)
//     .update({
//       status: "unliked",
//     })
//     .then(() => {
//         console.log("unliked");
//       Alert.alert(
//         'You have unliked this product!',
//       );
//     });
// };

export const getCustomTimeLinePost = (setData, id) => {
  const postData = [];

  try {
    firestore()
      .collection('Posts')

      // .orderBy('createAt', 'desc')
      .where('userId', 'in', id)
      .get()
      .then(datingSnapshot => {
        datingSnapshot.forEach(da => {
          postData.push(da.data());
        });
        // postData.sort((a, b) => a?.createAt?.localeCompare(b?.createAt));
        setData(postData);
      });
  } catch (error) {
    throw error;
  }
};

export const getFilterPost = (id, setData) => {
  const postData = [];

  try {
    firestore()
      .collection('Posts')

      // .orderBy('createAt', 'desc')
      .where('postId', 'in', id)
      .get()
      .then(datingSnapshot => {
        datingSnapshot.forEach(da => {
          postData.push(da.data());
        });
        // postData.sort((a, b) => a?.createAt?.localeCompare(b?.createAt));
        setData(postData);
      });
  } catch (error) {
    throw error;
  }
};

export const handlePress = async (
  postData,
  currentUser,
  setLikeCount,
  setImageSource,
  likePost,
  icons,
  userProfileData,
) => {
  const updatedLikePost = !likePost;

  const postRef = firebase.firestore().collection('Posts').doc(postData.postId);
  try {
    const postSnapshot = await postRef.get();
    const postData = postSnapshot.data();
    const medalsIdArray = postData.medalsId || [];

    if (updatedLikePost) {
      if (medalsIdArray.includes(currentUser.uid)) {
        const updatedMedalsIdArray = medalsIdArray.filter(
          id => id !== currentUser.uid,
        );
        await postRef.update({
          medalsId: updatedMedalsIdArray,
          medals: Math.max(0, postData.medals - 1),
        });

        // console.log('Unlike count updated successfully');
        // console.log('User already liked the post');
      } else {
        medalsIdArray.push(currentUser.uid);
        await postRef.update({
          medalsId: medalsIdArray,
          medals: postData.medals + 1,
        });
        let postUri = '';
        if (postData?.uriData?.type?.includes('image')) {
          postUri = postData?.uriData?.uri;
        } else {
          postUri = postData?.uriData?.thumbnail;
        }
        // console.log(
        //   'AllLinkDatacurrentUser',
        //   currentUser,
        //   userProfileData,
        //   postUri,
        // );
        sendNotification(
          currentUser,
          userProfileData,
          postUri,
          'Qatapolt',
          'gave you a medal',
          'LIKE_POST',
        );

        // console.log('Like count updated successfully');
      }
    } else {
      if (!medalsIdArray.includes(currentUser.uid)) {
        medalsIdArray.push(currentUser.uid);
        await postRef.update({
          medalsId: medalsIdArray,
          medals: postData.medals + 1,
        });
        // console.log('Like count updated successfully');
        // console.log('User has not liked the post');
      } else {
        const updatedMedalsIdArray = medalsIdArray.filter(
          id => id !== currentUser.uid,
        );
        await postRef.update({
          medalsId: updatedMedalsIdArray,
          medals: Math.max(0, postData.medals - 1),
        });
        // console.log('Unlike count updated successfully');
      }
    }

    const updatedPostSnapshot = await postRef.get();
    const updatedPostData = updatedPostSnapshot.data();

    setLikeCount(updatedPostData.medals || 0);
    const updatedImageSource = updatedPostData.medalsId.includes(
      currentUser.uid,
    )
      ? icons.likemadel
      : icons.unFilledMedal;
    setImageSource(updatedImageSource);
  } catch (error) {
    console.error('Error updating like count:', error);
  }
};

export const incrementViewCount = async (postId, currentUser, setViewCount) => {
  const postRef = firebase.firestore().collection('Posts').doc(postId);

  try {
    const postSnapshot = await postRef.get();
    const postData = postSnapshot.data();
    const viewsIdArray = postData.viewsId || [];

    if (!viewsIdArray.includes(currentUser.uid)) {
      await postRef.update({
        views: postData.views + 1,
        viewsId: [...viewsIdArray, currentUser.uid],
      });
      // console.log('View count updated successfully');
      setViewCount(prevCount => prevCount + 1);
    } else {
      // console.log('User already viewed the post');
    }
  } catch (error) {
    console.error('Error updating view count:', error);
  }
};

export const updateInternalShareCount = async (postId, id) => {
  const postRef = firebase.firestore().collection('Posts').doc(postId);
  try {
    const postSnapshot = await postRef.get();
    const postData = postSnapshot.data();
    if (postData) {
      await postRef.update({
        internalShare: postData.internalShare + 1,
        internalShareIds: firebase.firestore.FieldValue.arrayUnion(id),
      });
      // console.log('internalShare count updated successfully');
    } else {
      // console.log('data no found');
    }
  } catch (error) {
    console.error('Error updating view count:', error);
  }
};

export const updateRepostCount = async (postId, id) => {
  const postRef = firebase.firestore().collection('Posts').doc(postId);
  try {
    const postSnapshot = await postRef.get();
    const postData = postSnapshot.data();
    if (postData) {
      await postRef.update({
        rePostCount: postData.rePostCount + 1,
        rePostIds: firebase.firestore.FieldValue.arrayUnion(id),
      });
      // console.log('internalShare count updated successfully');
    } else {
      // console.log('data no found');
    }
  } catch (error) {
    console.error('Error updating view count:', error);
  }
};
export const handleCommentLikePress = async (
  item,
  currentUser,
  setLikeCount,
  setImageSource,
  icons,
  likeComment,
) => {
  const updatedLikeComments = !likeComment;
  const commentId = item.id;
  const postRef = firebase.firestore().collection('Posts').doc(item.postId);

  try {
    const postSnapshot = await postRef.get();
    const postData = postSnapshot.data();
    const comments = postData?.comments || [];
    const commentIndex = comments.findIndex(
      comment => comment.id === commentId,
    );

    if (commentIndex !== -1) {
      const comment = comments[commentIndex];
      const medalsIdArray = comment.medalsId || [];

      if (updatedLikeComments) {
        if (medalsIdArray.includes(currentUser.uid)) {
          const updatedMedalsIdArray = medalsIdArray.filter(
            id => id !== currentUser.uid,
          );
          comment.medalsId = updatedMedalsIdArray;
          comment.medals = Math.max(0, comment.medals - 1);

          // console.log('Unlike comment count updated successfully');
          // console.log('User already liked the comment');
        } else {
          medalsIdArray.push(currentUser.uid);
          comment.medalsId = medalsIdArray;
          comment.medals = comment.medals + 1;

          // console.log('Like comment count updated successfully');
        }
      } else {
        if (!medalsIdArray.includes(currentUser.uid)) {
          medalsIdArray.push(currentUser.uid);
          comment.medalsId = medalsIdArray;
          comment.medals = comment.medals + 1;

          // console.log('Like comment count updated successfully');
          // console.log('User has not liked the comment');
        } else {
          const updatedMedalsIdArray = medalsIdArray.filter(
            id => id !== currentUser.uid,
          );
          comment.medalsId = updatedMedalsIdArray;
          comment.medals = Math.max(0, comment.medals - 1);

          // console.log('Unlike comment count updated successfully');
        }
      }

      comments[commentIndex] = comment;
      await postRef.update({
        comments: comments,
      });
      setLikeCount(comment.medals || 0);
      const updatedImageSource = comment.medalsId.includes(currentUser.uid)
        ? icons.likemadel
        : icons.unFilledMedal;
      setImageSource(updatedImageSource);
    } else {
      console.error('Comment not found in post data');
    }
  } catch (error) {
    console.error('Error updating comment like count:', error);
  }
};
