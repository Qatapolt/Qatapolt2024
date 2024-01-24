import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import ArenaScreen from "../../screens/Main/ArenaScreen/ArenaScreen";
import DeepLinkPost from "../../screens/Main/DeepLinkPost/DeepLinkPost";

const PostStack = ({ route }) => {
  const freeAgent = route?.params?.freeAgent;

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"DeepLinkPost"}
    >
      {/* {deepLinkData ? (
        <Stack.Screen name="DeepLinkPost" component={DeepLinkPost} />
      ) : null} */}

      <Stack.Screen
        initialParams={{ freeAgent: freeAgent }}
        name="ArenaScreen"
        component={ArenaScreen}
      />
    </Stack.Navigator>
  );
};

export default PostStack;
