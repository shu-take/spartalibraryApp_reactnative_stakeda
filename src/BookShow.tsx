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
import { BottomNavigation, FAB } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";


const screenWidth = Dimensions.get("screen").width;

type Props = {
  route: RouteProp<RootStackParamList, "BookShow">;
  navigation: StackNavigationProp<RootStackParamList, "BookShow">;
};

export default function BookShow({ route, navigation}: Props) {
  const bookInfo = route.params.bookinfo;
  // const img_path = "http://localhost/" + item.book_img_path;
  const img_path = "http://192.168.128.118/" + bookInfo.book_img_path;

  // // FlatList内で表示する部分
  // const renderBookInfo = ({ item }: ListRenderItemInfo<BooksInfo>) => {
  //   return (

  //   );
  // };

  return (
    // <SafeAreaView style={styles.container}>
    //   <FlatList
    //     data={bookInfo.book_title}
    //     renderItem={({ item }) => <Text>{item}</Text>}
    //   />
    // </SafeAreaView>

    // <View style={styles.container}>
    // <SafeAreaView style={styles.container}>
    //   <Text style={styles.pictureTitle}>{bookInfo.book_title}</Text>
    //   <Image style={styles.picture} source={{ uri: img_path }} />
    //   <Text style={styles.pictureContents}>{bookInfo.book_contents}</Text>
    //   <Text style={styles.pictureContents}>{bookInfo.book_contents}</Text>
    // </SafeAreaView>
    // </View>
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.bookTitle}>{bookInfo.book_title}</Text>
        <Image style={styles.picture} source={{ uri: img_path }} />
        <Text style={styles.bookContents}>{bookInfo.book_contents}</Text>
        <Text style={styles.bookContents}>ISBN:{bookInfo.book_isbn}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 5,
    width: screenWidth * 0.9,
  },
  picture: {
    width: screenWidth * 0.62,
    height: (screenWidth * 0.62 * 4) / 3,
    margin: 5,
  },
  bookTitle: {
    fontSize: 20,
  },
  bookContents: {
    fontSize: 20,
    margin: 5,
  },
});