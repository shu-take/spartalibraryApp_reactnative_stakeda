import React, {useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
  ListRenderItemInfo,
} from "react-native";
import axios from "axios";
import { BottomNavigation, FAB } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";


const screenWidth = Dimensions.get("screen").width;

export default function BookIndex() {
  // BookAIP情報取得
  const [books, setBooks] = useState<BooksInfo[]>();
  const [isLoading, setIsLoading] = useState(false);
  const loadingView = <Text>loading</Text>;

  const getBooksInfo = async () => {
    const apiURL = "http://localhost/api/library/book/index/12";
    const responce = await axios.get(apiURL);
    setIsLoading(true);
    try {
      const responce = await axios.get(apiURL);
      const items = responce.data;
      console.log(items);
      // const retsult = items.map((item: BooksInfo) => {
      //   const book_result =
      // });
      setBooks(items);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  //画面遷移時の処理
  useFocusEffect(
    React.useCallback(() => {
      getBooksInfo();
      console.log(books);
    }, [])
  );

  // FlatList内で表示する部分
  const renderBookInfo = ({ item }: ListRenderItemInfo<BooksInfo>) => {
    return (
      <View>
        <Text>{item.book_title}</Text>
      </View>
    );
  };

  // ButtonNavigationの表示
  const BookRoute = () => (
    <SafeAreaView style={styles.container}>
      {isLoading ? loadingView : null}
      <FAB style={styles.addButton} icon="plus" onPress={() => {}} />
      <FlatList
        data={books}
        renderItem={renderBookInfo}
        keyExtractor={(item) => `${item.book_title}`}
      />
    </SafeAreaView>
  );

  const CodeRoute = () => <Text>Code</Text>;
  const AccountRoute = () => <Text>Account</Text>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "book", title: "Book", icon: "book" },
    { key: "code", title: "Code", icon: "note" },
    { key: "account", title: "Account", icon: "account" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    book: BookRoute,
    code: CodeRoute,
    account: AccountRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  picture: {
    width: screenWidth * 0.8,
    height: (screenWidth * 0.8 * 4) / 3,
  },
});
