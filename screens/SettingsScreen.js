import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../utils/Colors";
import GestureRecognizer from "react-native-swipe-gestures";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { settingsActions } from "../store/slices/settingsSlice";
import { COUNTRIES } from "../data/countries";

const SettingsScreen = ({ navigation }) => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const rightSwipeHandler = () => {
    navigation.navigate("Favorite");
  };
  const setCountry = (value) => {
    dispatch(settingsActions.changeCountry(value));
  };
  return (
    <View style={styles.rootContainer}>
      <View style={styles.root}>
        <Text style={styles.pickerLabelText}>Country</Text>
        <View style={styles.pickerContainer}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.settingsScreen,
  },
  root: {
    flex: 1,
    marginTop: 50,
    // alignItems: "center",
    paddingHorizontal: 20,
  },
  pickerLabelText: {
    color: "#fdf3ef",
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 6,
    marginLeft: 4,
    letterSpacing: 1,
  },
  pickerContainer: {
    width: "100%",
    backgroundColor: "#fce8e0",
    borderRadius: 10,
  },
  picker: {
    color: "black",
    fontWeight: "500",
  },
});

export default SettingsScreen;
