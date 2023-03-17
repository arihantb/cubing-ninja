import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Saves the data to the local storage.
 * @param {string} key the key of the data to be saved.
 * @param {object} data the data to be saved.
 */
export const saveToLocalStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

/**
 * Loads the data from the local storage.
 * @param {string} key the data associated with the key.
 * @returns the JSON object.
 */
export const loadFromLocalStorage = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    console.error(error);
  }
};
