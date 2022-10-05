import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { NavigationContainer } from "@react-navigation/native";
import CategoriesScreen from "./screens/CategoriesScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import Icon from "react-native-vector-icons/Ionicons";
import SettingsScreen from "./screens/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsScreen from "./screens/NewsScreen";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "./utils/Colors";
import { useEffect } from "react";
import { getDataFromStorage } from "./utils/Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { settingsActions } from "./store/slices/settingsSlice";

const Tab = AnimatedTabBarNavigator();
const Stack = createNativeStackNavigator();
const CategoriesScreenNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories Screen"
        component={CategoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={Platform.OS === "ios" ? {} : { headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const tabStyles = {
  tabBarBackground: "#b3b3b3",
  horizontalPadding: 90,
};

const AppEntry = () => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const theme = settings.theme;

  useEffect(() => {
    const foo = async () => {
      const theme = await getDataFromStorage("@theme");
      if (!theme) {
        return;
      }
      dispatch(settingsActions.changeTheme(theme));
    };
    foo();
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeBackgroundColor: Colors[theme].tabBar.activeBackgroundColor,
            labelStyle: {
              color: Colors[theme].tabBar.labelStyle,
            },
          }}
          appearance={{
            tabBarBackground: Colors[theme].tabBar.backgroundColor,
          }}
        >
          <Tab.Screen
            name="Categories"
            component={CategoriesScreenNavigation}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name={focused ? "home" : "home-outline"}
                  size={size ? size : 24}
                  color={focused ? color : Colors[theme].tabBar.iconColor}
                  focused={focused}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Favorite"
            component={FavoriteScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name={focused ? "heart" : "heart-outline"}
                  size={size ? size : 24}
                  color={focused ? color : Colors[theme].tabBar.iconColor}
                  focused={focused}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  name={focused ? "settings" : "settings-outline"}
                  size={size ? size : 24}
                  color={focused ? color : Colors[theme].tabBar.iconColor}
                  focused={focused}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default AppEntry;
