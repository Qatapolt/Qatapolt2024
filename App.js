import "react-native-gesture-handler";
import { enableLatestRenderer } from "react-native-maps";
// enableLatestRenderer();
import { View, Text, LogBox, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Provider } from "react-redux";

import store from "./src/redux/store";
import RootNavigator from "./src/routes";

// import firebase from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';
LogBox.ignoreLogs(["VirtualizedLists", "Warning:..."]);
LogBox.ignoreAllLogs();
// const firebaseConfig = {
//   apiKey: 'AIzaSyDJQjcJiTpN5RmkK5Z6cv2gHGleDRw-PYY',
//   authDomain: '',
//   projectId: 'qatapolt-2023',
//   storageBucket: '',
//   messagingSenderId: '',
//   appId: '1:146031539666:android:a64f70535d2f212c3bc40b',
//   // databaseURL: '',
// };
// firebase.initializeApp(firebaseConfig);
const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
