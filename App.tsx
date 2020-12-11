import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import BookIndex from "./src/BookIndex";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BookIndex">
        <Stack.Screen name="BookIndex" component={BookIndex} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
