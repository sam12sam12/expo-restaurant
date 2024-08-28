import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import FeatureRow from '../components/FeatureRow';
import Header from '../components/Header';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import Toast from 'react-native-toast-message';
import { useTheme } from '../ThemeContext';
import BackgroundImage from '../components/BackgroundImage';
import Categories from '../components/Categories';
import SearchBox from '../components/SearchBox';
import {
  loadAllDataFromStorage,
  fetchAndSaveAllData,
} from '../utils/DataHandling';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Calculate the card width based on screen dimensions
export default function HomeScreen() {
  const windowDimensions = useWindowDimensions();
  const paddingTop = windowDimensions.height <= 600 ? hp(4) : hp(6);
  const [loading, setLoading] = useState(true);
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const { colors, activeTheme } = useTheme();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const {
          featuredRestaurants: storedFeaturedRestaurants,
          categories: storedCategories,
        } = await loadAllDataFromStorage();

        if (!storedFeaturedRestaurants || !storedCategories) {
          await fetchAndSaveAllData();
        }

        setFeaturedRestaurants(storedFeaturedRestaurants || []);
        setCategories(storedCategories || []);

        const restaurantsList = storedFeaturedRestaurants
          ? storedFeaturedRestaurants.flatMap(
              (featured) => featured.restaurants
            )
          : [];
        setAllRestaurants(restaurantsList);
      } catch (error) {
        console.error('Error loading data:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load data',
        });
      } finally {
        setLoading(false);
      }
    };

    if (featuredRestaurants.length === 0 && categories.length === 0) {
      fetchData();
    }
  }, []);

  const statusBarStyle = activeTheme === 'light' ? 'dark' : 'light';
  let paddingt;

  if (width > 428) {
    paddingt = vs(25);
  } else {
    paddingt = vs(33);
  }
  return (
    <>
      <BackgroundImage>
        <ExpoStatusBar style={statusBarStyle} />
        <View style={{ backgroundColor: colors.screenBackground }}>
          {loading ? (
            <View
              style={{
                backgroundColor: 'black',
              }}
              className="flex-1 bg-black  justify-center items-center"></View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              stickyHeaderIndices={[1]}>
              <Header />
              <View
                style={{
                  backgroundColor: colors.caSeaBg,
                  paddingTop: paddingt,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}>
                <SearchBox restaurants={allRestaurants} />
                <Categories
                  restaurantsList={allRestaurants}
                  categories={categories}
                />
              </View>
              <View
                style={{
                  marginTop: vs(23),
                }}
                className="flex-1">
                {featuredRestaurants.map((item, index) => (
                  <FeatureRow
                    key={index}
                    title={item.name}
                    restaurants={item.restaurants}
                    description={item.description}
                    restaurantsList={allRestaurants}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </BackgroundImage>
    </>
  );
}
