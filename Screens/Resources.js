import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Linking,
  Pressable,
  Platform
} from "react-native";
import Footer from "../components/Footer";

const Resources = () => {
  // Sample data for reading recommendations
  const readingRecommendations = [
    {
      id: "1",
      title: "Meditations",
      author: "Marcus Aurelius",
      website: "https://www.goodreads.com/book/show/30659.Meditations",
    },
    {
      id: "2",
      title: "Letters from a Stoic",
      author: "Seneca",
      website: "https://www.goodreads.com/book/show/97411.Letters_from_a_Stoic",
    },
    {
      id: "3",
      title: "Discourses and Selected Writings",
      author: "Epictetus",
      website: "https://www.goodreads.com/en/book/show/4143812",
    },
    {
      id: "4",
      title: "Atomic Habits",
      author: "James Clear",
      website: "https://www.goodreads.com/book/show/40121378-atomic-habits",
    },
  ];

  const handleClick = (website) => {
    Linking.openURL(website);
  };

  const renderRecommendationItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Pressable onPress={() => handleClick(item.website)}>
        <Text style={styles.title}>{item.title}</Text>
      </Pressable>
      <Text style={styles.author}>{item.author}</Text>
    </View>
  );

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/images/Background.png")}
    >
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Reading Recommendations</Text>
        <FlatList
          data={readingRecommendations}
          renderItem={renderRecommendationItem}
          keyExtractor={(item) => item.id}
          style={styles.listContainer}
        />
      </View>
      <Footer />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: Platform.OS == 'ios' ? 25 : 18,
    textAlign: "center",
    color: "#0B4B1D",
  },
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "#FBFEFD",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#106d60",
  },
  author: {
    fontSize: 16,
    color: "#888888",
    marginTop: 4,
    fontStyle: "italic",
  },
});

export default Resources;
