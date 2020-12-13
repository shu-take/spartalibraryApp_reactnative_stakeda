import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import Main from "./src/Main";
import BookShow from "./src/BookShow";
import BookAdd from "./src/BookAdd";
import BookAddConfirm from "./src/BookAddConfirm";
import CodeShow from "./src/CodeShow";
import AccountShow from "./src/AccountShow";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Spartalibrary">
        <Stack.Screen name="Spartalibrary" component={Main} />
        <Stack.Screen name="BookShow" component={BookShow} />
        <Stack.Screen name="BookAdd" component={BookAdd} />
        <Stack.Screen name="BookAddConfirm" component={BookAddConfirm} />
        <Stack.Screen name="CodeShow" component={CodeShow} />
        <Stack.Screen name="AccountShow" component={AccountShow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
