import React from "react";
import { StyleSheet, View, Text } from "react-native";
import axios from "axios";
import { BottomNavigation, FAB } from "react-native-paper";

const MusicRoute = () => (
  <View>
    <Text>Music</Text>
    <Text>Music</Text>
    <FAB icon="pencil"></FAB>
  </View>
);

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;


const apiBaseURL = "http://localhost/api/test2";
const testURL = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=0283443";

export default function LoginScreen() {

  const test = async () => {
    const responce = await axios.get(apiBaseURL);
    console.log(responce.data);
    return responce;
  }
  test();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "music", title: "Music", icon: "book" },
    { key: "albums", title: "Albums", icon: "note" },
    { key: "recents", title: "Recents", icon: "account" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  return (
    <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
    />
  );


  // return (
  //   <View style={styles.container}>
  //     <Text> LoginScreen </Text>
  //     <FAB icon="pencil" />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
