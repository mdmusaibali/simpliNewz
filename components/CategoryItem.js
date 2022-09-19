import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const CategoryItem = ({ item }) => {
  const { width } = useWindowDimensions();
  let size = width < 380 ? 150 : 165;
  const [pressed, setPressed] = useState(false);
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("News", { category: item.name });
  };
  return (
    <Pressable
      style={[
        styles.rootItem,
        pressed ? { transform: [{ scale: 0.95 }] } : {},
        { height: size, width: size },
      ]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={pressHandler}
    >
      <View style={styles.item}>
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <LinearGradient
            colors={["rgba(255,255,255,0.16)", "rgba(255,255,255,0.16)"]}
            style={[
              styles.gradient,
              pressed ? { backgroundColor: "rgba(255,255,255,0.3)" } : {},
            ]}
          />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  rootItem: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
    margin: 14,
  },
  item: {
    width: "100%",
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  itemText: {
    letterSpacing: 1,
    fontSize: 16,
    color: "black",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 4,
    padding: 4,
    textAlign: "center",
    fontWeight: "600",
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
  gradient: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});

export default CategoryItem;
