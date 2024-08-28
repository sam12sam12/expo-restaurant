import { setItem, getItem } from './AsyncStorageMethods';
import { getFeaturedRestaurants, getCategories } from '../api';

/**
 * Fetch data from the API and save it to AsyncStorage.
 * @throws {Error} - Throws an error if fetching or storing data fails.
 */
export const fetchAndSaveAllData = async () => {
  try {
    const [featuredRestaurantsData, categoriesData] = await Promise.all([
      getFeaturedRestaurants(),
      getCategories(),
    ]);

    await Promise.all([
      setItem('featuredRestaurants', JSON.stringify(featuredRestaurantsData)),
      setItem('categories', JSON.stringify(categoriesData)),
    ]);
  } catch (error) {
    console.error('Error fetching and saving data:', error);
    throw error;
  }
};

/**
 * Load data from AsyncStorage.
 * @returns {Promise<{ featuredRestaurants: any, categories: any }>} - Resolves with the loaded data.
 * @throws {Error} - Throws an error if loading data fails.
 */
export const loadAllDataFromStorage = async () => {
  try {
    const [featuredRestaurantsJSON, categoriesJSON] = await Promise.all([
      getItem('featuredRestaurants'),
      getItem('categories'),
    ]);

    const featuredRestaurants = featuredRestaurantsJSON
      ? JSON.parse(featuredRestaurantsJSON)
      : null;
    const categories = categoriesJSON ? JSON.parse(categoriesJSON) : null;

    return { featuredRestaurants, categories };
  } catch (error) {
    console.error('Error loading data from storage:', error);
    throw error;
  }
};
