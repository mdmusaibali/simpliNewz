import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { Colors } from "../utils/Colors";
import GestureRecognizer from "react-native-swipe-gestures";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { settingsActions } from "../store/slices/settingsSlice";
import { COUNTRIES } from "../data/countries";
import { useTheme } from "@react-navigation/native";

const SettingsScreen = ({ navigation }) => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const rightSwipeHandler = () => {
    navigation.navigate("Favorite");
  };
  const setCountry = (value) => {
    dispatch(settingsActions.changeCountry(value));
  };
  const setTheme = (value) => {
    dispatch(settingsActions.changeTheme(value));
  };
  return (
    <View style={[styles.rootContainer, styles.rootContainer[settings.theme]]}>
      <View style={styles.root}>
        <Text style={[styles.label, styles.label[settings.theme]]}>
          Country
        </Text>
        <View
          style={[
            styles.pickerContainer,
            styles.pickerContainer[settings.theme],
          ]}
        >
          <Picker
            style={styles.picker}
            dropdownIconColor={Colors.settingsScreen}
            selectedValue={settings.country}
            onValueChange={setCountry}
          >
            {COUNTRIES.map((country, i) => (
              <Picker.Item
                key={i}
                label={country.label}
                value={country.value}
              />
            ))}
          </Picker>
        </View>
        <Text style={[styles.label, styles.label[settings.theme]]}>Theme</Text>
        <View
          style={[
            styles.pickerContainer,
            styles.pickerContainer[settings.theme],
          ]}
        >
          <Picker
            style={styles.picker}
            dropdownIconColor={Colors.settingsScreen}
            selectedValue={settings.theme}
            onValueChange={setTheme}
          >
            {/* <Picker.Item label={"System Default"} value={"default"} /> */}
            <Picker.Item label={"Light Mode"} value={"light"} />
            <Picker.Item label={"Dark Mode"} value={"dark"} />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    dark: {
      backgroundColor: Colors.dark.settingsScreen.backgroundColor,
    },
    light: {
      backgroundColor: Colors.light.settingsScreen.backgroundColor,
    },
  },
  root: {
    flex: 1,
    marginTop: 50,
    // alignItems: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 6,
    marginLeft: 4,
    letterSpacing: 1,
    dark: {
      backgroundColor: Colors.dark.settingsScreen.backgroundColor,
      color: Colors.dark.settingsScreen.labelColor,
    },
    light: {
      backgroundColor: Colors.light.settingsScreen.backgroundColor,
      color: Colors.light.settingsScreen.labelColor,
    },
  },
  pickerContainer: {
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
    dark: {
      backgroundColor: Colors.dark.settingsScreen.pickerColor,
    },
    light: {
      backgroundColor: Colors.light.settingsScreen.pickerColor,
    },
  },
  picker: {
    color: "black",
    fontWeight: "500",
  },
});

export default SettingsScreen;
