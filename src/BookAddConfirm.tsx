import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Button } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const screenWidth = Dimensions.get("screen").width;

type Props = {
  route: RouteProp<RootStackParamList, "BookAddConfirm">;
  navigation: StackNavigationProp<RootStackParamList, "BookAddConfirm">;
};

export default function BookAddConfirm({ route, navigation }: Props) {
  const bookInfo = route.params.isbninfo;
  const [addbook, setAddBook] = useState<BookAddInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const loadingView = <Text>loading</Text>;

  const getAddBookInfo = async () => {
    // const apiURL = "http://localhost/api/library/book/index/12";
    const apiURL = "http://192.168.128.118/api/library/book/create/" + bookInfo;
    const responce = await axios.get(apiURL);
    setIsLoading(true);
    try {
      const responce = await axios.get(apiURL);
      const items = responce.data;
      setAddBook(items);
      console.log(addbook);
      console.log(items);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  //画面遷移時の処理
  useFocusEffect(
    React.useCallback(() => {
      getAddBookInfo();
    }, [])
  );

  const storeBookInfo = async () => {
    const apiURL =
      "http://192.168.128.118/api/library/book/store/12" +
      "/" +
      addbook?.book_id +
      "/" +
      addbook?.title +
      "/" +
      addbook?.contents +
      "/" +
      addbook?.isbn +
      "/" +
      addbook?.img_path +
      "/" +
      addbook?.img_url;
    // setIsLoading(true);
    try {
      const responce = await axios.get(apiURL);
      // const items = responce.data;
      // setAddBook(items);
      // console.log(addbook);
      console.log(apiURL);
    } catch (error) {
      alert(error);
    } finally {
      // setIsLoading(false);
      navigation.navigate("Spartalibrary");
    }
  };

  const bookTitleView = (
    <Text style={styles.bookTitle}>{addbook?.title}</Text>
  );

  const bookContentsView = (
    <Text style={styles.bookContents}>{addbook?.contents}</Text>
  );

  const bookIsbnView = (
    <Text style={styles.bookContents}>{addbook?.isbn}</Text>
  );

  const imgurlView = (
    <Image style={styles.picture} source={{ uri: addbook?.img_url }} />
  );

  const imgpathView = (
    <Image
      style={styles.picture}
      source={{ uri: "http://192.168.128.118/" + addbook?.img_path }}
    />
  );

  const addButtonView = (
    <Button style={styles.addButton} onPress={storeBookInfo} mode="contained">
      Add
    </Button>
  );

  const errorView = (
    <Text style={styles.bookContents}>無効なISBNです</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? loadingView : null}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <Text style={styles.bookTitle}>{addbook?.title}</Text> */}
        {addbook?.title ? bookTitleView : null}
        {addbook?.img_path ? imgpathView : null}
        {addbook?.img_url ? imgurlView : null}
        {addbook?.contents ? bookContentsView : null}
        {addbook?.isbn ? bookIsbnView : null}
        {addbook?.isbn ? addButtonView : null}
        {addbook?.error !== null ? errorView : null}
        {/* <Image style={styles.picture} source={{ uri: addbook?.img_url }} />
        <Image style={styles.picture} source={{ uri: addbook?.img_path }} /> */}
        {/* <Text style={styles.bookContents}>{addbook?.contents}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
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
  bookInfoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  picture: {
    width: screenWidth * 0.62,
    height: (screenWidth * 0.62 * 4) / 3,
  },
  bookTitle: {
    fontSize: 20,
    margin: 5,
  },
  bookContents: {
    fontSize: 20,
    margin: 5,
  },
  addButton: {
    margin: 5,
  },
});
