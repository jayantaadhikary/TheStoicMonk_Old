import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";

import Footer from "../components/Footer";

function Meditate() {
  const [seconds, setSeconds] = useState(2 * 60);
  const [isActive, setIsActive] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState(null);

  useEffect(() => {
    const loadBackgroundMusic = async () => {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(require("../assets/backgroundMusic.mp3"));
        setBackgroundMusic(soundObject);
      } catch (error) {
        console.log("Failed to load background music", error);
      }
    };

    loadBackgroundMusic();

    return () => {
      if (backgroundMusic !== null) {
        try {
          backgroundMusic.stopAsync();
          backgroundMusic.unloadAsync();
        } catch (error) {
          console.log("Failed to stop background music", error);
        }
      }
    };
  }, []);

  // useEffect(() => {
  //   let interval = null;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //       setSeconds((seconds) => seconds - 1);
  //     }, 1000);
  //   } else {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [isActive]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          if (newSeconds === 0) {
            setIsActive(false);
            try {
              backgroundMusic.stopAsync();
              backgroundMusic.setPositionAsync(0);
              setSeconds(2 * 60);
            } catch (error) {
              console.log("Failed to stop background music", error);
            }
          }
          return newSeconds;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, backgroundMusic]);

  const handleToggle = async () => {
    setIsActive(!isActive);

    try {
      if (!isActive) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        await backgroundMusic.playAsync();
      } else {
        await backgroundMusic.stopAsync();
        await backgroundMusic.setPositionAsync(0);
      }
    } catch (error) {
      console.log("Failed to play/stop background music", error);
    }

    if (!isActive) {
      setSeconds(2 * 60);
    }
  };

  const handleReset = async () => {
    setIsActive(false);

    try {
      await backgroundMusic.stopAsync();
      await backgroundMusic.setPositionAsync(0);
    } catch (error) {
      console.log("Failed to stop background music", error);
    }

    setSeconds(2 * 60);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/images/Background.png")}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Meditation Zone</Text>
        <Pressable
          onPress={isActive ? handleReset : handleToggle}
          style={{ overflow: "hidden" }}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.quote}>{formatTime(seconds)}</Text>
            <Text style={styles.author}>{isActive ? "Reset" : "Start"}</Text>
          </View>
        </Pressable>
      </View>
      <Footer />
    </ImageBackground>
  );
}

export default Meditate;

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
    fontSize: 30,
    color: "#f3f5fb",
  },
  author: {
    fontSize: 15,
    fontStyle: "italic",
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
    overflow: "hidden",
    // backgroundColor:'#b3b3b3',
    // borderWidth: 2,
    borderRadius: 100,
    // marginHorizontal: "20%",
    alignSelf: "center",
    height: 200,
    width: 200,
    textAlign: "center",
    paddingHorizontal: 4,
    paddingVertical: 6,
    backgroundColor: "#106d60",
    justifyContent: "center",
    alignItems: "center",
  },
});
