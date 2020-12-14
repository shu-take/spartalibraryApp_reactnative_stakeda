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
} from "react-native";
import axios from "axios";
import { BottomNavigation} from "react-native-paper";
import { useFocusEffect} from "@react-navigation/native";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const screenWidth = Dimensions.get("screen").width;

type Props = {
  route: RouteProp<RootStackParamList, "AccountShow">;
  navigation: StackNavigationProp<RootStackParamList, "AccountShow">;
};

export default function AccountShow({ route, navigation }: Props) {
  const accountInfo = route.params.accountinfo;

  // API情報取得
  const [books, setBooks] = useState<BooksInfo[]>();
  const [codes, setCodes] = useState<CodesInfo[]>();
  const [isLoading, setIsLoading] = useState(false);
  const loadingView = <Text>loading</Text>;

  const getBooksInfo = async () => {
    // const apiURL = "http://localhost/api/library/book/index/12";
    const apiURL =
      "http://192.168.128.118/api/library/book/index/" + accountInfo.user_id;
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

  const getCodesInfo = async () => {
    // const apiURL = "http://localhost/api/library/book/index/12";
    const apiURL =
      "http://192.168.128.118/api/library/code/index/" + accountInfo.user_id;
    setIsLoading(true);
    try {
      const responce = await axios.get(apiURL);
      const items = responce.data;
      setCodes(items);
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
      getCodesInfo();
    }, [])
  );

  // FlatList内で表示する部分
  const renderBookInfo = ({ item }: ListRenderItemInfo<BooksInfo>) => {
    // const img_path = "http://localhost/" + item.book_img_path;
    const img_path = "http://192.168.128.118/" + item.book_img_path;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("BookShow", { bookinfo: item });
        }}
      >
        <View style={styles.bookInfoContainer}>
          <Image style={styles.picture} source={{ uri: img_path }} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderCodeInfo = ({ item }: ListRenderItemInfo<CodesInfo>) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CodeShow", { codeinfo: item });
        }}
      >
        <View style={styles.codeInfoContainer}>
          <Text style={styles.codeTitle}>{item.code_title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // ButtonNavigationの表示
  const BookRoute = () => (
    <SafeAreaView style={styles.container}>
      {isLoading ? loadingView : null}
      <FlatList
        data={books}
        renderItem={renderBookInfo}
        keyExtractor={(item) => `${item.book_id}`}
      />
    </SafeAreaView>
  );

  const CodeRoute = () => (
    <SafeAreaView style={styles.container}>
      {isLoading ? loadingView : null}
      <FlatList
        data={codes}
        renderItem={renderCodeInfo}
        keyExtractor={(item) => `${item.code_id}`}
      />
    </SafeAreaView>
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "book", title: "Book", icon: "book" },
    { key: "code", title: "Code", icon: "note" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    book: BookRoute,
    code: CodeRoute,
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
  codeInfoContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 5,
    width: screenWidth * 0.9,
  },
  codeTitle: {
    fontSize: 17,
  },
  accountInfoContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 5,
    width: screenWidth * 0.9,
  },
  accountTitle: {
    fontSize: 17,
  },
});