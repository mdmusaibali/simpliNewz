import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { Colors } from "../utils/Colors";
import GestureRecognizer from "react-native-swipe-gestures";
import NewsItem from "../components/NewsItem";
import { useSelector } from "react-redux";

const FavoriteScreen = ({ navigation }) => {
  const favorites = useSelector((state) => state.favorite.favorite);
  const settings = useSelector((state) => state.settings);
  const leftSwipeHandler = () => {
    navigation.navigate("Settings");
  };
  const rightSwipeHandler = () => {
    navigation.navigate("Categories");
  };
  return (
    <View style={[styles.root, styles.root[settings.theme]]}>
      {favorites && favorites.length !== 0 && (
        <FlatList
          style={styles.list}
          data={favorites}
          keyExtractor={(item, index) => index}
          renderItem={(itemData) => <NewsItem item={itemData.item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
      {favorites && favorites.length === 0 && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("./../assets/img/404.png")}
          />
          {/* <Text style={styles.text}>No Favorite News</Text> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  list: {
    width: "100%",
  },
  root: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 25,
    alignItems: "center",
    width: "100%",
    dark: {
      backgroundColor: Colors.dark.favoriteScreen,
    },
    light: {
      backgroundColor: Colors.light.favoriteScreen,
    },
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    resizeMode: "contain",
  },
  text: {
    color: "white",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 2,
  },
});

export default FavoriteScreen;
