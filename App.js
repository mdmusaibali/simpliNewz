import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { NavigationContainer } from "@react-navigation/native";
import CategoriesScreen from "./screens/CategoriesScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import Icon from "react-native-vector-icons/Feather";
import SettingsScreen from "./screens/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsScreen from "./screens/NewsScreen";
import { Provider } from "react-redux";
import { store } from "./store/store";

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

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Categories"
              component={CategoriesScreenNavigation}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Icon
                    name="home"
                    size={size ? size : 24}
                    color={focused ? color : "#222222"}
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
                    name="heart"
                    size={size ? size : 24}
                    color={focused ? color : "#222222"}
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
                    name="settings"
                    size={size ? size : 24}
                    color={focused ? color : "#222222"}
                    focused={focused}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
