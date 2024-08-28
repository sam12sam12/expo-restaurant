import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RestaurantListCard from '../components/RestaurantListCard';
import * as Icon from 'react-native-feather';
import { useTheme } from '../ThemeContext';
import BackgroundImage from '../components/BackgroundImage';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
export default function RestaurantListScreen() {
  const { colors, activeTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurantsList, category } = route.params;

  useEffect(() => {
    // Update selectedCategory and restaurants when the route params change
    if (route.params) {
      setSelectedCategory(category);
      setRestaurants(restaurantsList);
    }
  }, [route.params]);

  const filteredRestaurants = selectedCategory
    ? restaurants.filter(
        (restaurant) => restaurant.category._ref === selectedCategory
      )
    : restaurants;

  const getIndexFromRestaurantList = (restaurantName) => {
    // Find the index of the restaurant in the restaurantsList array
    return restaurantsList.findIndex(
      (restaurant) => restaurant.name === restaurantName
    );
  };
  const statusBarStyle = activeTheme === 'light' ? 'dark' : 'light';

  const { width, height } = useWindowDimensions();
  let marginHori;

  if (width > 428) {
    marginHori = ms(48);
  } else {
    marginHori = ms(16);
  }

  let title;

  if (width > 428) {
    title = vs(20);
  } else {
    title = vs(23);
  }
  return (
    <BackgroundImage>
      <ExpoStatusBar style={statusBarStyle} />
      <View style={{ flex: 1, backgroundColor: colors.screenBackground }}>
        <View
          style={{
            paddingTop: StatusBar.currentHeight + vs(10),
            flex: 1,
          }}>
          <View
            style={{
              paddingHorizontal: s(16),
            }}
            className="w-full justify-end items-end ">
            <Animated.View entering={FadeInLeft.duration(1000).springify()}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className=" items-center justify-center rounded-full shadow"
                style={{
                  backgroundColor: colors.bgColor,
                  width: mvs(40),
                  height: mvs(40),
                }}>
                <Icon.ArrowLeft
                  width={mvs(24)}
                  height={mvs(24)}
                  strokeWidth={3}
                  stroke={'white'}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>

          <View
            style={{
              marginTop: vs(20),
              paddingHorizontal: marginHori,
            }}
            className="  flex-row justify-between items-center  ">
            {/* Description */}
            <Animated.View
              entering={FadeInRight.duration(500).springify()}
              className="flex-1">
              <Text style={styles(colors).descriptionTitle}>خوراکونه</Text>
              <Text style={styles(colors).descriptionText}>
                موږ فوډی فوډ تاسو ته وړاندی کوو خوراکونه
              </Text>
            </Animated.View>

            {/* Image */}
            <View className="flex-0">
              <Animated.View entering={FadeInLeft.duration(500).springify()}>
                <Image
                  style={styles(colors).descriptionImage}
                  source={require('../assets/images/chef2.png')}
                  resizeMode="contain"
                />
              </Animated.View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={filteredRestaurants}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item._id}
              contentContainerStyle={{
                paddingBottom: 10,
                paddingTop: vs(20),
              }}
              ItemSeparatorComponent={() => (
                <View style={{ height: 10 }}></View>
              )}
              renderItem={({ item }) => {
                const index = getIndexFromRestaurantList(item.name);

                return (
                  <RestaurantListCard
                    restaurant={item}
                    restaurants={restaurantsList}
                    index={index}
                    key={index.toString()}
                  />
                );
              }}
            />
          </View>
        </View>
      </View>
    </BackgroundImage>
  );
}

const styles = (colors) =>
  StyleSheet.create({
    mainBackgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    descriptionTitle: {
      color: colors.titleColor,
      fontSize: mvs(20),
      fontWeight: 'bold',
    },
    descriptionText: {
      color: colors.text,
      fontSize: mvs(16),
    },
    descriptionImage: {
      height: mvs(100),
      width: mvs(60),
      borderWidth: 1,
    },
  });
