import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Footer from "../components/Footer";

function Home() {
  const [quote, setQuote] = useState({});

  const getQuote = async () => {
    try {
      const response = await axios.get("https://stoic-quotes.com/api/quote");
      setQuote(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/images/Background.png")}
      resizeMode="cover"
    >
      {quote.text ? (
        <View style={styles.container}>
          <Text style={styles.title}>Stoic Quotes</Text>
          <View style={styles.innerContainer}>
            <View style={styles.gridView}>
              <Text style={styles.quote}>{quote.text}</Text>
              <Text style={styles.author}> - {quote.author}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable onPress={getQuote} android_ripple={{ color: "#bcdef2" }}>
              <Text style={styles.message}>Refresh</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Loading..</Text>
        </View>
      )}
      <Footer />
    </ImageBackground>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    // backgroundColor: "#F4FBFA",
  },
  innerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quote: {
    fontSize: 18,
    color: "#f3f5fb",
  },
  author: {
    fontSize: 15,
    fontStyle: "italic",
    textAlign: "right",
    color: "#f3f5fb",
  },
  gridView: {
    width: "100%",
    backgroundColor: "#106d60",
    marginBottom: 20,
    padding: 25,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    margin: 20,
    paddingBottom: 50,
    fontWeight: "bold",
    paddingTop: Platform.OS == "ios" ? 50 : 5,
    color: "#0B4B1D",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    padding: 10,
    color: "#F4FBFA",
  },
  buttonContainer: {
    // backgroundColor:'#b3b3b3',
    // borderWidth: 2,
    borderRadius: 12,
    marginHorizontal: 75,
    textAlign: "center",
    paddingHorizontal: 4,
    paddingVertical: 6,
    backgroundColor: "#0B4B1D",
  },
});
