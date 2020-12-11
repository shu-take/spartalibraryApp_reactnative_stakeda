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
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { BottomNavigation, FAB } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import BookShow from "./BookShow";

const screenWidth = Dimensions.get("screen").width;

export default function BookIndex() {
  // BookAIP情報取得
  const [books, setBooks] = useState<BooksInfo[]>();
  const [isLoading, setIsLoading] = useState(false);
  const loadingView = <Text>loading</Text>;
  // Navigation
  const navigation = useNavigation();

  const getBooksInfo = async () => {
    // const apiURL = "http://localhost/api/library/book/index/12";
    const apiURL = "http://192.168.128.118/api/library/book/index/12";
    const responce = await axios.get(apiURL);
    setIsLoading(true);
    try {
      const responce = await axios.get(apiURL);
      const items = responce.data;
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
    // const img_path = "http://localhost/" + item.book_img_path;
    const img_path = "http://192.168.128.118/" + item.book_img_path;
    return (
      <TouchableOpacity onPress={ () => { navigation.navigate("BookShow", { bookinfo:item }) } }>
        <View style={styles.bookInfoContainer}>
          <Image style={styles.picture} source={{ uri: img_path }} />
        </View>
      </TouchableOpacity>
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
    right: 5,
    bottom: 16,
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
});
