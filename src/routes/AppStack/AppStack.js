import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/auth/Login";
import Home from "../../screens/main/Home";

const AppStack = () => {
  const Stack = createStackNavigator();



  return  (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
         

 
    </Stack.Navigator>
  );
};

export default AppStack;
