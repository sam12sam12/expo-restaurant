import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import { urlFor } from '../sanity';
import { useTheme } from '../ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FlipInEasyX } from 'react-native-reanimated';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

export default function RestaurantListCard({ restaurant, restaurants, index }) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  let descriptionImage;

  if (width > 428) {
    descriptionImage = ms(50);
  } else {
    descriptionImage = ms(59);
  }

  let descriptionTitle;

  if (width > 428) {
    descriptionTitle = ms(14);
  } else {
    descriptionTitle = ms(17);
  }

  let descriptionText;

  if (width > 428) {
    descriptionText = ms(12);
  } else {
    descriptionText = ms(14);
  }

  let marginHori;

  if (width > 428) {
    marginHori = ms(48);
  } else {
    marginHori = ms(16);
  }
  return (
    // listCardContainer
    <View
      className="flex-row items-center justify-between p-2.5  shadow-lg  "
      style={{
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: colors.borderColor,
        backgroundColor: colors.mainBackground,
        shadowColor: colors.shadowColor,
        marginHorizontal: marginHori,
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'Restuarant',
            {
              restaurant,
              restaurants,
              initialIndex: index, // Pass the initial index here
            },
            console.log(restaurants)
          )
        }
        className="flex-row items-center gap-x-2.5 flex-1">
        <Animated.View entering={FadeInDown.duration(600).springify()}>
          <Image
            style={{
              height: descriptionImage,
              width: descriptionImage,
            }}
            resizeMode="contain"
            source={{ uri: urlFor(restaurant.image).url() }}
          />
        </Animated.View>
        <View className="flex-1">
          <Text
            style={{
              color: colors.titleColor,
              fontSize: descriptionTitle,
              fontWeight: 'bold',
            }}>
            {restaurant.name}
          </Text>
          <Text
            style={{
              color: colors.text,
              fontSize: descriptionText,
            }}>
            {restaurant.description}
          </Text>
        </View>
      </TouchableOpacity>
      <Animated.View entering={FlipInEasyX.duration(700)} className="  pl-1   ">
        <Icon.ChevronLeft
          width={mvs(24)}
          height={mvs(24)}
          stroke={colors.text}
        />
      </Animated.View>
    </View>
  );
}
