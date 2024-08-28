import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchHistoryContext = createContext();

export const useSearchHistory = () => useContext(SearchHistoryContext);

export const SearchHistoryProvider = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('searchHistory');
        if (history) {
          setSearchHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    };

    loadSearchHistory();
  }, []);

  const addToHistory = async (restaurant) => {
    try {
      const existingIndex = searchHistory.findIndex(
        (item) => item.name === restaurant.name
      );
      if (existingIndex !== -1) {
        // If restaurant already exists in history, move it to the top
        const updatedHistory = [...searchHistory];
        const existingItem = updatedHistory.splice(existingIndex, 1)[0];
        setSearchHistory([restaurant, ...updatedHistory]);
        await AsyncStorage.setItem(
          'searchHistory',
          JSON.stringify([restaurant, ...updatedHistory])
        );
      } else {
        // If the restaurant is not already in the history, add it
        const updatedHistory = [restaurant, ...searchHistory.slice(0, 10)]; // Limit to 3 entries
        setSearchHistory(updatedHistory);
        await AsyncStorage.setItem(
          'searchHistory',
          JSON.stringify(updatedHistory)
        );
      }
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const removeFromHistory = async (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
    try {
      await AsyncStorage.setItem(
        'searchHistory',
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const clearHistory = async () => {
    setSearchHistory([]); // Reset the searchHistory state
    try {
      await AsyncStorage.removeItem('searchHistory'); // Remove search history from AsyncStorage
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  return (
    <SearchHistoryContext.Provider
      value={{ searchHistory, addToHistory, removeFromHistory, clearHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};
