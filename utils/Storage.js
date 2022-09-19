import AsyncStorage from "@react-native-async-storage/async-storage";
export const setDataInStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("ERROR STORING DATA");
  }
};

export const getDataFromStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("ERROR RETRIEVING DATA");
  }
};
