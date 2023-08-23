import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { auth, setDoc, db, doc } from "./firebase";

import Splash from "./src/screens/Splash";
import BottomTab from "./src/components/BottomTab";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import ForgotPassword from "./src/screens/ForgotPassword";
// import Menu from './src/screen/Menu';
// import OrderConfirm from './src/screen/Checkout/OrderConfirm';
// import OrderHistory from './src/screen/OrderHistory';
// import OrderTracking from './src/screen/OrderTracking';
// import OrderManagement from './src/screen/OrderManagement';
// import Home from './src/screen/Home';
// import FoodDetail from './src/screen/FoodDetail';
// import ReviewDescription from './src/screen/Rating/ReviewDescription';
// import Account from './src/screen/Account';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const Stack = createStackNavigator();
  console.log(Stack);
  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <SafeAreaView style={{ flex: 1 }}
        >
          {/* <StatusBar style='light' /> */}
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            {loggedIn ? (
              <Stack.Screen name="BottomTab" component={BottomTab} />
            ) : (
              <Stack.Group>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
