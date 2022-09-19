import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Colors } from "../utils/Colors";
import { getData } from "../utils/dummyApi";
import { FlatList } from "react-native-gesture-handler";
import NewsItem from "../components/NewsItem";
import { useSelector } from "react-redux";

const APIS = [
  { key: "d18e8bda03ac488ab643b24428a95b1d", index: 1 },
  { key: "c73c59d68ffb4226961c3efb31ef8a66", index: 2 },
  { key: "415b62d911a841c18e53a0fbfc6562fd", index: 3 },
  { key: "694c6e106aa549f0bcece615b0506e75", index: 4 },
  { key: "3972f40405c44de5acd1596828ba0d6f", index: 5 },
  { key: "9591efdfaa5e4c14bb5d64d5a0c9f59a", index: 6 },
  { key: "dfbf78ac50b3403a99bbb06c3ace1b6d", index: 7 },
  { key: "ab5a0402745c46b6aa608105526ba5ac", index: 8 },
  { key: "2443f49916dc44d3842eea606e29c07b", index: 9 },
  { key: "37cd04726013443e8e1b293308adf2b0", index: 10 },
  { key: "f191769de30b41d3914d3f80b39efba8", index: 11 },
  { key: "300ce33cc9be43b3a842b09702c046b8", index: 12 },
];

const NewsScreen = () => {
  const settings = useSelector((state) => state.settings);
  const [page, setPage] = useState(1);
  const [news, setNews] = useState([]);
  const [status, setStatus] = useState("");
  const route = useRoute();
  const category = route.params.category;

  useEffect(() => {
    const foo = async () => {
      try {
        // SWITCHING TRY
        if (status === "endReached") {
          return;
        }
        for (const item of APIS) {
          // ------DUMMY API--------
          // setStatus("pending");
          // const data = await getData({ key: item.key, page });
          // setStatus("fulfilled");
          // ------DUMMY API-------

          // ------ACTUAL API-------
          setStatus("pending");
          const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${settings.country}&apiKey=${item.key}&category=${category}&page=${page}`
          );
          setStatus("fulfilled");
          const data = await response.json();
          // ------ACTUAL API-------

          // console.log(`CALLED API WITH KEY ${item.key} for page ${page}`);
          // console.log(data);
          if (data.code) {
            if (data.code === "maximumResultsReached") {
              throw new Error("endReached");
            }
            if (item.index === APIS.length) {
              // boleto all api keys exhausted
              throw new Error("apiKeyExhausted");
            }
            continue;
          }
          if (data && data.articles && data.articles.length !== 0) {
            setNews((prevData) => [...prevData, ...data.articles]);
            break;
          }
          if (data.articles.length === 0) {
            throw new Error("endReached");
          }
        }
      } catch (error) {
        // console.log("ERROR", error.message);
        setStatus(error.message);
      }
    };
    foo();
  }, [page]);

  const reachedEndHandler = () => {
    // console.log("CHECK STATUS at endHandler:: ", status);
    if (status === "endReached" || status === "pending") {
      // console.log("NO PAGE CHANGE");
      return;
    }
    // console.log("SETTING NEW PAGE");
    setPage((prevPage) => prevPage + 1);
  };

  const footerComponent = () => {
    if (status === "endReached" || status === "apiKeyExhausted") {
      return (
        <View style={styles.endContainer}>
          <Image
            source={require("./../assets/img/end.jpg")}
            style={styles.endImage}
          />
          <Text style={styles.endText}>
            {status === "endReached"
              ? "You have reached the end."
              : "API keys exhausted😥. Please come back tomorrow."}
          </Text>
        </View>
      );
    }
    return <ActivityIndicator size="large" color="#F08A5D" />;
  };

  return (
    <View style={styles.root}>
      <FlatList
        style={styles.list}
        data={news}
        keyExtractor={(item, index) => index}
        renderItem={(itemData) => <NewsItem item={itemData.item} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={reachedEndHandler}
        ListFooterComponent={footerComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: Platform.OS === "ios" ? 0 : 50,
    paddingHorizontal: 25,
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.categoriesScreen,
  },
  list: {
    width: "100%",
  },
  endContainer: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 25,
    elevation: 3,
    borderRadius: 8,
    overflow: "hidden",
  },
  endImage: {
    height: 180,
    width: "100%",
    resizeMode: "cover",
  },
  endText: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 1,
    padding: 16,
    textAlign: "center",
    color: "red",
  },
});

export default NewsScreen;
