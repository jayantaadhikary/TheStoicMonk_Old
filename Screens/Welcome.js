import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

function Welcome({ navigation }) {
  function pressHandler() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/TheStoicMonk.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.welcome}>
          <Pressable android_ripple={{ color: "#ccd" }} onPress={pressHandler}>
            <Text style={styles.message}>Welcome</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    // justifyContent: "center",
  },
  welcome: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#106D60",
    width: "75%",
    marginTop: "auto",
    elevation: 5,
    marginBottom: "10%",
    marginHorizontal: "13%",
  },
  message: {
    fontWeight: "500",
    fontSize: 18,
    padding: 10,
    paddingHorizontal: 15,
    textAlign: "center",
    color: "#ffff",
  },
});
