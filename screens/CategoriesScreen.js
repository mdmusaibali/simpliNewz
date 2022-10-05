import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../utils/Colors";
import { CATEGORIES } from "../data/categories";
import CategoryItem from "../components/CategoryItem";
import GestureRecognizer from "react-native-swipe-gestures";
import { useDispatch, useSelector } from "react-redux";
import { favoriteNewsActions } from "../store/slices/favoriteNewsSlice";
import { getDataFromStorage } from "../utils/Storage";

const CategoriesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
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
    <View style={[styles.root, styles.root[settings.theme]]}>
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
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    dark: {
      backgroundColor: Colors.dark.categoriesScreen.background,
    },
    light: {
      backgroundColor: Colors.light.categoriesScreen.background,
    },
  },
  list: {
    flex: 1,
  },
});

export default CategoriesScreen;
