import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../utils/Colors";
import { CATEGORIES } from "../data/categories";
import CategoryItem from "../components/CategoryItem";
import GestureRecognizer from "react-native-swipe-gestures";
import { useDispatch } from "react-redux";
import { favoriteNewsActions } from "../store/slices/favoriteNewsSlice";
import { getDataFromStorage } from "../utils/Storage";

const CategoriesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const leftSwipeHandler = () => {
    navigation.navigate("Favorite");
  };
  useEffect(() => {
    const foo = async () => {
      const data = await getDataFromStorage("@favorites");
      if (!data) return;
      dispatch(favoriteNewsActions.fillFavorites(data));
    };
    foo();
  }, []);
  return (
    <View style={styles.root}>
      <FlatList
        style={styles.list}
        data={CATEGORIES}
        keyExtractor={(itemData) => itemData.name}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={(itemData) => (
          <>
            <CategoryItem item={itemData.item} />
          </>
        )}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: Colors.categoriesScreen,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
});

export default CategoriesScreen;
