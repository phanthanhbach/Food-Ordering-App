import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { getFocusedRouteNameFromRoute, NavigationContainer, useRoute, } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
//import * as SplashScreen from "expo-splash-screen";

import { HomeStack, MenuStack, ProfileStack, VoucherStack, } from "../../navigation";

//SplashScreen.preventAutoHideAsync();
const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  const route = useRoute();
  // const user_session = route.params.username;
  // console.log(user_session);

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {/* <NavigationContainer independent={true}> */}
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <Tab.Navigator
          activeColor="#EA5C2B"
          inactiveColor="#7A7A7A"
          initialRouteName="Trang chủ"
          shifting={true}
          barStyle={{
            backgroundColor: "white",
            height: 70,
          }}
          labelStyle={{
            fontSize: 13,
            fontFamily: "Roboto-Medium",
            textTransform: "none",
          }}
          screenOptions={({ route }) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
            },
            tabBarIcon: ({ focused, size, color }) => {
              let iconName;
              switch (route.name) {
                case "Trang chủ":
                  size = focused ? 25 : 24;
                  return (
                    <Ionicons name={"ios-home"} size={size} color={color} />
                  );
                case "Thực đơn":
                  //color = focused ? 'black' : '#7A7A7A'
                  size = focused ? 25 : 24;
                  return (
                    <MaterialCommunityIcons
                      name={"hamburger"}
                      size={size}
                      color={color}
                    />
                  );
                case "Ưu đãi":
                  //iconName = focused ? 'ticket-percent' : 'ticket-percent-outline'
                  size = focused ? 26 : 25;
                  return (
                    <MaterialCommunityIcons
                      name={"ticket-percent"}
                      size={size}
                      color={color}
                    />
                  );
                case "Cá nhân":
                  //iconName = focused ? 'ios-person' : 'ios-person-outline'
                  size = focused ? 25 : 24;
                  return (
                    <Ionicons name={"ios-person"} size={size} color={color} />
                  );
              }
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Trang chủ" component={HomeStack} />
          <Tab.Screen name="Thực đơn" component={MenuStack} />
          <Tab.Screen name="Ưu đãi" component={VoucherStack} />
          <Tab.Screen name="Cá nhân" component={ProfileStack} />
        </Tab.Navigator>
      </SafeAreaView>
      {/* </NavigationContainer> */}
    </SafeAreaProvider>
  );
};

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log(routeName);
  // const hideOnScreens = ["ScreenA", "ScreenB"]; // put here name of screen where you want to hide tab bar
  // return hideOnScreens.includes(routeName) ? { display: "none" } : {};
};

export default BottomTab;

// const BottomTab = () => {
//

//     //const route = useRoute();
//     // const user_session = route.params.username;
//     //console.log(user_session);

//     return (
//
//     );
// }

// export default BottomTab;
