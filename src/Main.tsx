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

const screenWidth = Dimensions.get("screen").width;

export default function Main() {
  // API情報取得
  const [books, setBooks] = useState<BooksInfo[]>();
  const [codes, setCodes] = useState<CodesInfo[]>();
  const [accounts, setAccounts] = useState<AccountsInfo[]>();
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

  const getCodesInfo = async () => {
    // const apiURL = "http://localhost/api/library/book/index/12";
    const apiURL = "http://192.168.128.118/api/library/code/index/12";
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

  const getAccountsInfo = async () => {
    // const apiURL = "http://localhost/api/library/book/index/12";
    const apiURL = "http://192.168.128.118/api/library/account/index";
    setIsLoading(true);
    try {
      const responce = await axios.get(apiURL);
      const items = responce.data;
      setAccounts(items);
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
      getAccountsInfo();
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

  const renderCodeInfo = ({ item }: ListRenderItemInfo<CodesInfo>) => {
    return (
      <TouchableOpacity onPress={() => { navigation.navigate("CodeShow", { codeinfo: item }) }}>
        <View style={styles.codeInfoContainer}>
          <Text style={styles.codeTitle}>{item.code_title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAccountInfo = ({ item }: ListRenderItemInfo<AccountsInfo>) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AccountShow", { accountinfo: item });
        }}
      >
        <View style={styles.accountInfoContainer}>
          <Text style={styles.accountTitle}>{item.user_name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // ButtonNavigationの表示
  const BookRoute = () => (
    <SafeAreaView style={styles.container}>
      {isLoading ? loadingView : null}
      <FAB style={styles.addButton} icon="plus" onPress={() => {navigation.navigate("BookAdd")}} />
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

  const AccountRoute = () => (
    <SafeAreaView style={styles.container}>
      {isLoading ? loadingView : null}
      <FlatList
        data={accounts}
        renderItem={renderAccountInfo}
        keyExtractor={(item) => `${item.user_id}`}
      />
    </SafeAreaView>
  );

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
