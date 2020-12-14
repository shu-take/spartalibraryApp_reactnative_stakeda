import React from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Button, TextInput, } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export default function BookAdd() {
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
