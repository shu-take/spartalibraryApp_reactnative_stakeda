import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
  ListRenderItemInfo,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { BottomNavigation, FAB, Button, TextInput, } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;


// type Props = {
//   route: RouteProp<RootStackParamList, "BookShow">;
//   navigation: StackNavigationProp<RootStackParamList, "BookShow">;
// };

export default function BookAdd() {
  // const bookInfo = route.params.bookinfo;
  // // const img_path = "http://localhost/" + item.book_img_path;
  // const img_path = "http://192.168.128.118/" + bookInfo.book_img_path;

  // return (
  //   <SafeAreaView style={styles.container}>
  //     <ScrollView contentContainerStyle={styles.scrollContainer}>
  //       <Text style={styles.bookTitle}>{bookInfo.book_title}</Text>
  //       <Image style={styles.picture} source={{ uri: img_path }} />
  //       <Text style={styles.bookContents}>{bookInfo.book_contents}</Text>
  //       <Text style={styles.bookContents}>ISBN:{bookInfo.book_isbn}</Text>
  //     </ScrollView>
  //   </SafeAreaView>
  // );
  const [isbn, setIsbn] = React.useState(""); 
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="ISBN"
        multiline
        onChangeText={(text) => setIsbn(text)}
      />
      <Button
        style={styles.addButton}
        onPress={() => {navigation.navigate("BookAddConfirm", { isbninfo: isbn });}}
        mode="contained">
        Add
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: screenWidth * 0.9,
    margin: 5,
    marginTop: screenHeight * 0.2,
  },
  addButton: {
    margin: 5,
  },

});
