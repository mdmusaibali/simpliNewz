import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Colors } from "../utils/Colors";

const NoInternet = () => {
  const theme = useSelector((state) => state.settings.theme);
  return (
    <View style={[styles.container, styles.container[theme]]}>
      <Image
        style={styles.image}
        source={require("./../assets/img/nointernet.png")}
      />
      <Text style={[styles.text, styles.text[theme]]}>
        Please check your internet connection.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    light: { backgroundColor: Colors.light.noInternet.backgroundColor },
    dark: {
      backgroundColor: Colors.dark.noInternet.backgroundColor,
    },
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    light: {
      color: "black",
    },
    dark: {
      color: "#ccc",
    },
  },
});

export default NoInternet;
