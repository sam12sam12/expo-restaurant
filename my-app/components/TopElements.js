import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import { selectCartItems } from '../slices/cartSlice';
import { useSelector } from 'react-redux';
import { useTheme } from '../ThemeContext';
import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

export default function TopElements() {
  const cartItems = useSelector(selectCartItems);
  const navigation = useNavigation();
  const { colors } = useTheme();

  const navigateToCart = () => {
    if (cartItems.length > 0) {
      navigation.navigate('Cart');
    }
  };
  const { height, width } = useWindowDimensions();

  let iconSize;

  if (width > 428) {
    iconSize = mvs(29);
  } else {
    iconSize = mvs(35);
  }

  let itemSeWidth;

  if (width > 428) {
    itemSeWidth = mvs(15);
  } else {
    itemSeWidth = mvs(22);
  }
  let itemSeFont;

  if (width > 428) {
    itemSeFont = mvs(10);
  } else {
    itemSeFont = mvs(12);
  }

  return (
    <Animated.View
      entering={FadeInRight.duration(500)}
      style={{
        paddingHorizontal: s(16),
      }}
      className="flex-row justify-between items-center">
      {/* JustifyIcon */}
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{
          backgroundColor: colors.mainBackground,
          borderRadius: 10,
          shadowColor: colors.shadowColor,
          padding: mvs(5),
        }}
        className=" shadow-md  ">
        <Icon.BarChart2
          style={{
            transform: [{ rotate: '270deg' }],
          }}
          height={iconSize}
          width={iconSize}
          strokeWidth={1.5}
          stroke={colors.titleColor}
        />
      </TouchableOpacity>

      {/* ShoppingCard Icon */}
      <TouchableOpacity onPress={navigateToCart}>
        {/* Icon */}
        <Icon.ShoppingCart
          className="relative "
          height={iconSize}
          width={iconSize}
          // strokeWidth={1.5}
          stroke={colors.text}
        />

        {/* ItemsSelected */}
        <View
          style={{
            backgroundColor: colors.bgColor,
            width: itemSeWidth,
            height: itemSeWidth,
            borderColor: colors.bgColor,
            borderWidth: 1,
            top: -2,
            left: -5,
          }}
          className=" rounded-full items-center justify-center  absolute ">
          <Text
            style={{
              color: '#fff',
              fontSize: itemSeFont,
              marginBottom: 2,
            }}>
            {cartItems.length}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = (colors) =>
  ScaledSheet.create({
    itemsSelected: {},
    cartItems: {},
  });
