import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import RestaurantCard from './RestaurantCard';
import { useTheme } from '../ThemeContext';
import Animated, { FadeInRight } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

export default function FeatureRow({
  title,
  description,
  restaurants,
  restaurantsList,
}) {
  const { colors } = useTheme();

  const getIndexFromRestaurantList = (restaurantName) => {
    // Find the index of the restaurant in the restaurantsList array
    return restaurantsList.findIndex(
      (restaurant) => restaurant.name === restaurantName
    );
  };

  const { height, width } = useWindowDimensions();
  let topTitle;
  if (width > 428) {
    topTitle = vs(14);
  } else {
    topTitle = vs(18);
  }

  let topDes;
  if (width > 428) {
    topDes = mvs(14);
  } else {
    topDes = mvs(16);
  }
  return (
    <>
      <View
        style={{ paddingHorizontal: s(16) }}
        className="flex-row justify-between items-center overflow-visible  ">
        {/* topTextContainer */}
        <Animated.View entering={FadeInRight.duration(600)}>
          {/* title */}
          <Text
            style={{
              color: colors.titleColor,
              fontSize: topTitle, //19fontSize
              fontWeight: 'bold',
            }}>
            {title}
          </Text>

          {/* Description */}
          <Text
            style={{
              color: colors.text,
              fontSize: topDes,
            }}>
            {description}
          </Text>
        </Animated.View>
      </View>
      <View style={styles(colors).restaurantsContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ width: s(15) }}></View>}
          contentContainerStyle={{
            paddingHorizontal: s(15),
          }}
          data={restaurants}
          renderItem={({ item }) => {
            const index = getIndexFromRestaurantList(item.name);
            return (
              <RestaurantCard
                item={item}
                restaurants={restaurantsList}
                index={index}
                key={index.toString()}
              />
            );
          }}
        />
      </View>
    </>
  );
}

const styles = (colors) =>
  ScaledSheet.create({
    restaurantsContainer: {
      flex: 1,
    },
  });
