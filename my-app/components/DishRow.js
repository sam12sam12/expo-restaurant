import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  selectCartItemsById,
} from '../slices/cartSlice';
import { urlFor } from '../sanity';
import { useTheme } from '../ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

export default function DishRow({ item }) {
  const navigation = useNavigation(); // Initialize navigation

  const handleDishPress = () => {
    // Navigate to DishScreen and pass dish details as params
    navigation.navigate('Dish', {
      dish: item,
    });
  };

  const { colors } = useTheme();
  const dispatch = useDispatch();
  const totalItems = useSelector((state) =>
    selectCartItemsById(state, item._id)
  );
  const handleIncrease = () => {
    dispatch(addToCart({ ...item }));
  };

  const handleDecrease = () => {
    dispatch(removeFromCart({ id: item._id }));
  };

  const { width, height } = useWindowDimensions();

  let plusSize;
  if (width > 428) {
    plusSize = ms(20);
  } else {
    plusSize = ms(26);
  }

  let plus;
  if (width > 428) {
    plus = ms(14);
  } else {
    plus = ms(18);
  }

  let descriptionImage;

  if (width > 428) {
    descriptionImage = ms(50);
  } else {
    descriptionImage = ms(59);
  }

  return (
    // dishRowContainer
    <Animated.View
      entering={FadeInDown.duration(500)}
      className="flex-row items-center justify-between    "
      style={styles(colors).dishRowContainer}>
      <View className="flex-row items-center  flex-1">
        <View
          style={{
            borderRadius: 50,
          }}
          className="justify-center items-center gap-y-1 ">
          {/* PlusIcon */}
          <TouchableOpacity
            onPress={handleIncrease}
            style={{
              width: plusSize,
              height: plusSize,
              backgroundColor: colors.bgColor,
              shadowColor: colors.bgColor,
            }}
            className="rounded-full items-center justify-center   ">
            <Icon.Plus
              stroke={'white'}
              width={plus}
              height={plus}
              strokeWidth={2}
            />
          </TouchableOpacity>

          {/* slectedItemsNumber */}
          <Text
            className="mx-3"
            style={{
              color: colors.titleColor,
              fontSize: ms(13),
              fontWeight: 'bold',
            }}>
            {totalItems.length}
          </Text>

          {/* Minus Icon */}
          <TouchableOpacity
            disabled={!totalItems.length}
            onPress={handleDecrease}
            style={{
              width: plusSize,
              height: plusSize,
              backgroundColor: colors.bgColor,
              elevation: 10,
              shadowColor: colors.bgColor,
            }}
            className="items-center justify-center rounded-full  ">
            <Icon.Minus
              stroke={'#fff'}
              width={plus}
              height={plus}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleDishPress}
          style={{
            gap: ms(10),
            paddingLeft: ms(10),
          }}
          className="flex-row   items-center">
          {/* DishRowImage */}
          <Animated.View entering={FadeInDown.duration(500).springify()}>
            <Image
              style={{
                height: descriptionImage,
                width: descriptionImage,
              }}
              source={{ uri: urlFor(item.image).url() }}
            />
          </Animated.View>

          {/* DishDescription */}
          <View className="flex-1">
            <Text style={styles(colors).descriptionTitle}>{item.name}</Text>
            <Text style={styles(colors).descriptionText}>
              {item.description}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* itemPrice And Image */}
      <View className="flex-row justify-center   h-full items-end">
        {/* coinImage */}
        <Text
          style={{
            color: colors.titleColor,
            fontSize: ms(17),
            fontWeight: 'bold',
            marginRight: ms(3),
            // lineHeight: 16,
          }}>
          {item.price}
        </Text>
        <Image
          style={styles(colors).coinImage}
          source={require('../assets/images/afghani.png')}
        />

        {/* itemPrice */}
      </View>
    </Animated.View>
  );
}

const styles = (colors) =>
  ScaledSheet.create({
    dishRowContainer: {
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: colors.borderColor,
      backgroundColor: colors.mainBackground,
      elevation: 8,
      shadowColor: colors.shadowColor,
      padding: '10@mvs',
      marginBottom: '10@mvs',
    },
    plusIcon: {},
    number: {},
    dishRowImage: {},
    descriptionTitle: {
      color: colors.titleColor,
      fontSize: '17@ms',
      fontWeight: 'bold',
    },
    descriptionText: {
      color: colors.text,
      fontSize: '14@ms',
      marginTop: '2@mvs',
    },
    coinImage: {
      width: '20@ms',
      height: '20@ms',
      // alignItems: 'center',
    },
  });
