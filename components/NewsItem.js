import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Pressable,
} from "react-native";
import React, { memo } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Button from "./Button";
import FostistoIcon from "react-native-vector-icons/Fontisto";
import { useDispatch, useSelector } from "react-redux";
import { favoriteNewsActions } from "../store/slices/favoriteNewsSlice";
import { formatDate } from "../utils/formatDate";
import { Colors } from "../utils/Colors";

const NewsItem = ({ item }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.favorite);
  const theme = useSelector((state) => state.settings.theme);
  const isFavorite =
    favorites.find((favorite) => favorite.title === item.title) !== undefined;
  const seeMoreHandler = async () => {
    Linking.openURL(item.url);
  };
  const favoriteHandler = () => {
    if (isFavorite) {
      dispatch(favoriteNewsActions.removeFromFavorite(item.title));
    } else {
      dispatch(favoriteNewsActions.addToFavorite(item));
    }
  };
  return (
    <View style={[styles.root, styles.root[theme]]}>
      <Image
        source={
          item.urlToImage
            ? { uri: item.urlToImage }
            : require("./../assets/img/imageNotFound.jpg")
        }
        style={styles.image}
      />
      <View style={styles.newsInfo}>
        <Text style={[styles.title, styles.textColor[theme]]}>
          {item.title}
        </Text>
        <Text style={styles.sourceContainer}>
          <View>
            <Text style={styles.source}>{item.source.name}</Text>
          </View>
          {item.author && (
            <View>
              <Text style={styles.author}>By {item.author.split(" ")[0]}</Text>
            </View>
          )}
        </Text>
        <Text style={[styles.description, styles.textColor[theme]]}>
          {item.description}
        </Text>
        {item.publishedAt && (
          <Text style={styles.date}>
            Published on {formatDate(item.publishedAt).date} at{" "}
            {formatDate(item.publishedAt).time}
          </Text>
        )}
        <View style={styles.newsAction}>
          {item.url && (
            <Button onPress={seeMoreHandler} style={styles.button}>
              <FostistoIcon
                name="world-o"
                style={styles.browserIcon}
                size={16}
                color="white"
              />
              <Text style={styles.buttonText}>See more</Text>
            </Button>
          )}
          <Pressable onPress={favoriteHandler}>
            <Icon
              name={isFavorite ? "heart" : "hearto"}
              size={30}
              color="red"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    marginBottom: 25,
    elevation: 3,
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    light: {
      backgroundColor: Colors.light.newsItem.backgroundColor,
    },
    dark: {
      backgroundColor: Colors.dark.newsItem.backgroundColor,
    },
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  newsInfo: {
    padding: 16,
    width: "100%",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 1,
    marginBottom: 10,
  },
  sourceContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
  source: {
    backgroundColor: "#ea580c",
    color: "white",
    fontWeight: "600",
    padding: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  author: {
    backgroundColor: "#84cc16",
    color: "white",
    fontWeight: "600",
    padding: 4,
    borderRadius: 4,
  },
  description: {
    fontSize: 14,
    textAlign: "justify",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  date: {
    marginBottom: 30,
    fontWeight: "500",
    color: "gray",
  },
  newsAction: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ea580c",
    elevation: 5,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  browserIcon: {
    marginRight: 8,
  },
  textColor: {
    light: {
      color: Colors.light.newsItem.textColor,
    },
    dark: {
      color: Colors.dark.newsItem.textColor,
    },
  },
});

export default memo(NewsItem);
