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
import { white } from "react-native-paper/lib/typescript/src/styles/colors";


const screenWidth = Dimensions.get("screen").width;

type Props = {
  route: RouteProp<RootStackParamList, "CodeShow">;
  navigation: StackNavigationProp<RootStackParamList, "CodeShow">;
};

export default function CodeShow({ route }: Props) {
  const codeInfo = route.params.codeinfo;
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.leftcontainer}>
        <Text style={styles.codeTitle}>CodeTitle : {codeInfo.code_title}</Text>
        <Text style={styles.codeContents}>
          CodeContents : {codeInfo.code_contents}
        </Text>
        <Text style={styles.codeContents}>BookTitle :</Text>
        <Text style={styles.codeContents}>「 {codeInfo.code_book}」</Text>
      </View> */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentsContainer}>
          <Text style={styles.codeTitle}>CodeTitle :</Text>
          <Text style={styles.codeTitle}>{codeInfo.code_title}</Text>
          <Text style={styles.codeContents}>
            CodeContents : {codeInfo.code_contents}
          </Text>
          <Text style={styles.codeContents}>{codeInfo.code_contents}</Text>
          <Text style={styles.codeContents}>BookTitle :</Text>
          <Text style={styles.codeContents}>「 {codeInfo.code_book}」</Text>
        </View>
        <View style={styles.codeContainer}>
          <Text style={styles.codeMain}>{codeInfo.code}</Text>
        </View>
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
  contentsContainer: {
    justifyContent: "flex-start",
  },
  codeContainer: {
    justifyContent: "flex-start",
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
  codeTitle: {
    fontSize: 16,
    margin: 5,
    justifyContent: "flex-start",
  },
  codeContents: {
    fontSize: 16,
    margin: 5,
  },
  codeMain: {
    fontSize: 15,
    margin: 5,
  },
});