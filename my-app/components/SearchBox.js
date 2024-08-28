import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import { useSearchHistory } from '../searchHistoryContext';
import { useTheme } from '../ThemeContext'; // Import useTheme hook to access theme context
import Toast from 'react-native-toast-message';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

export default function SearchBox({ restaurants }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const { addToHistory } = useSearchHistory();

  const handleSearch = (text) => {
    // Filter restaurants based on restaurant name or dishes

    const matchedRestaurants = restaurants.filter((restaurant) => {
      const restaurantNameMatch = restaurant.name
        .toLowerCase()
        .startsWith(text.toLowerCase());
      const dishMatch = restaurant.dishes.some((dish) => {
        if (dish && dish.name) {
          // Check if dish object exists and has a name property
          return dish.name.toLowerCase().startsWith(text.toLowerCase());
        }
        return false; // Return false for non-existent or invalid dishes
      });

      return restaurantNameMatch || dishMatch;
    });

    if (matchedRestaurants.length > 0 && text) {
      // Check if any matched restaurant starts with the text

      const firstMatchedIndex = restaurants.findIndex(
        (restaurant) => restaurant === matchedRestaurants[0]
      );

      const startsWithText = matchedRestaurants.some((restaurant) =>
        restaurant.name.toLowerCase().startsWith(text.toLowerCase())
      );

      if (startsWithText) {
        // If at least one restaurant starts with the text, navigate to the 'Search' screen
        addToHistory(matchedRestaurants[0]); // Add the first matched restaurant to history
        navigation.navigate('Search', {
          matchedRestaurants,
          firstMatchedIndex,
          restaurants,
        });
      } else {
        // If no restaurant starts with the text, navigate to the 'Restaurant' screen with the first matched restaurant's data
        const matchedRestaurantWithDish = matchedRestaurants.find(
          (restaurant) =>
            restaurant.dishes.some((dish) => {
              if (dish && dish.name) {
                // Check if dish object exists and has a name property
                return dish.name.toLowerCase().startsWith(text.toLowerCase());
              }
              return false; // Return false for non-existent or invalid dishes
            })
        );
        if (matchedRestaurantWithDish) {
          addToHistory(matchedRestaurantWithDish); // Add the matched restaurant with the dish to history
          navigation.navigate('Restuarant', {
            restaurant: matchedRestaurantWithDish,
            restaurants,
            initialIndex: restaurants.indexOf(matchedRestaurantWithDish),
          });
        } else {
          console.log('Restaurant is not matched');
        }
      }
    } else {
      console.log('Restaurant is not matched');
    }
  };

  const onSearch = () => {
    handleSearch(searchText);
    if (!searchText) {
      Toast.show({
        type: 'errory',
        text1: 'پاملر نه',
        text2: 'د خپلی خوښی خوراک مو انتخاب کړی',
      });
    }
    Keyboard.dismiss();
    setSearchText('');
  };
  const { height, width } = useWindowDimensions();

  let searchIcon;
  if (height <= 650) {
    searchIcon = vs(30);
  } else if (height > 650 && height <= 720) {
    searchIcon = vs(24);
  } else if (width > 428) {
    searchIcon = vs(20);
  }

  let searchHeight;

  if (width > 428) {
    searchHeight = mvs(45);
  } else {
    searchHeight = mvs(50);
  }

  let paddings;
  if (width > 428) {
    paddings = ms(40);
  } else {
    paddings = ms(16);
  }
  let searchT;
  if (width > 428) {
    searchT = mvs(14);
  } else {
    searchT = mvs(16);
  }
  return (
    // container
    <View style={{ paddingHorizontal: paddings }}>
      <View
        style={{
          gap: 10,
        }}
        className="flex-row ">
        {/* SearchIcon */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.bgColor,
            height: searchHeight,
            width: searchHeight,
            elevation: 20,
            shadowColor: 'red',
            padding: 10,
          }}
          onPress={onSearch}
          className="rounded-full justify-center items-center ">
          <Icon.Search
            height={searchIcon}
            width={searchIcon}
            strokeWidth={2}
            stroke={'#fff'}
          />
        </TouchableOpacity>

        {/* searchInput */}
        <View
          style={{
            borderColor: colors.borderColor,
            borderWidth: 0.5,
            height: searchHeight,
            paddingHorizontal: mvs(20),
            color: colors.titleColor,
            backgroundColor: colors.searchBackground,
            elevation: 5,
            shadowColor: colors.shadowColor,
          }}
          className="flex-row rounded-full flex-1 items-center">
          {/* TextInput */}
          <TextInput
            style={{ color: colors.titleColor, fontSize: searchT }} //16px
            value={searchText}
            onChangeText={setSearchText}
            placeholder="د خوښی خواړه"
            placeholderTextColor={colors.text}
            className=" flex-1"
          />
          <TouchableOpacity className="p-1">
            <Icon.MapPin
              strokeWidth={1.5}
              height={mvs(20)}
              width={mvs(20)}
              stroke={colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
