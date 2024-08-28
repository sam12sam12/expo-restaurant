// SearchHistory.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import RestaurantListCard from './RestaurantListCard';
import * as Icon from 'react-native-feather';
import { useSearchHistory } from '../searchHistoryContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';

export default function SearchHistory({ restaurants }) {
  const { searchHistory } = useSearchHistory();
  const limitedHistory = searchHistory.slice(0, 10);
  const navigation = useNavigation();

  const getIndexFromRestaurantList = (restaurantName) => {
    // Find the index of the restaurant in the restaurantsList array
    return restaurants.findIndex(
      (restaurant) => restaurant.name === restaurantName
    );
  };

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('Restuarant', { restaurant });
  };

  return (
    <View>
      <FlatList
        data={limitedHistory}
        contentContainerStyle={{
          paddingBottom: 50,
          paddingTop: 10,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
        renderItem={({ item }) => {
          const index = getIndexFromRestaurantList(item.name);
          return (
            <RestaurantListCard
              onPress={() => handleRestaurantPress(item, index)} // Pass item and index to handleRestaurantPress
              restaurant={item}
              restaurants={restaurants}
              index={index}
              key={index.toString()}
            />
          );
        }}
      />
    </View>
  );
}
