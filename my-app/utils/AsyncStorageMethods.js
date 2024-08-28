import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Set an item in AsyncStorage.
 * @param {string} key - The key under which to store the value.
 * @param {string} value - The value to store.
 * @throws {Error} - Throws an error if AsyncStorage operation fails.
 */
export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error storing value for key "${key}":`, error);
    throw error;
  }
};

/**
 * Get an item from AsyncStorage.
 * @param {string} key - The key of the item to retrieve.
 * @returns {Promise<string|null>} - Resolves with the stored value or null if not found.
 * @throws {Error} - Throws an error if AsyncStorage operation fails.
 */
export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(`Error retrieving value for key "${key}":`, error);
    throw error;
  }
};

/**
 * Remove an item from AsyncStorage.
 * @param {string} key - The key of the item to remove.
 * @throws {Error} - Throws an error if AsyncStorage operation fails.
 */
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing value for key "${key}":`, error);
    throw error;
  }
};
