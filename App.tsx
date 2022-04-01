import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ScanScreen from "./src/screens/ScanScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ScanDetailScreen from "./src/screens/ScanDetailScreen";
import GenerateQRCodeScreen from "./src/screens/GenerateQRCodeScreen";
import WebViewScreen from "./src/screens/WebViewScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ScanQRCode" component={ScanScreen} />
        <Stack.Screen name="GenerateQRCode" component={GenerateQRCodeScreen} />
        <Stack.Screen name="ScanDetail" component={ScanDetailScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
