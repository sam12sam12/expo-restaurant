import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FlipInEasyX,
  FlipInEasyY,
  LightSpeedInRight,
} from 'react-native-reanimated';
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from '../slices/cartSlice';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

import { urlFor } from '../sanity';
import { useTheme } from '../ThemeContext';
import BackgroundImage from '../components/BackgroundImage';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

export default function CartScreen() {
  const { colors, activeTheme } = useTheme();
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [groupedItems, setGroupedItems] = useState({});
  const deliveryFee = 2;
  const dispatch = useDispatch();
  const statusBarStyle = activeTheme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item._id]) {
        group[item._id].push(item);
      } else {
        group[item._id] = [item];
      }
      return group;
    }, {});

    setGroupedItems(items);
  }, [cartItems]);

  useEffect(() => {
    // Check if cart is empty and navigate back if it is
    if (cartItems.length === 0) {
      navigation.goBack();
    }
  }, [cartItems]); // Ensure navigation is included in the dependency array

  const { width, height } = useWindowDimensions();

  let descriptionImage;
  if (width > 428) {
    descriptionImage = ms(40);
  } else {
    descriptionImage = ms(50);
  }
  let button;
  if (width > 428) {
    button = mvs(12);
  } else {
    button = mvs(15);
  }

  let paddings;
  if (width > 428) {
    paddings = ms(48);
  } else {
    paddings = ms(16);
  }

  let gap;
  if (width > 428) {
    gap = mvs(15);
  } else {
    gap = mvs(10);
  }
  return (
    <BackgroundImage>
      <ExpoStatusBar style={statusBarStyle} />
      <View style={{ flex: 1, backgroundColor: colors.screenBackground }}>
        {/* backgroundImage */}
        {/* Container */}
        <View style={styles(colors).container}>
          <View
            style={{
              paddingHorizontal: s(16),
            }}
            className="w-full justify-end items-end ">
            <Animated.View entering={FadeInLeft.duration(500).springify()}>
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

          {/* DescriptionContainer */}
          <View
            style={{ marginVertical: vs(20), marginHorizontal: paddings }}
            className="  flex-row justify-between items-center   ">
            {/* Description */}
            <Animated.View
              entering={FadeInRight.duration(500).springify()}
              className="flex-1">
              <Text style={styles(colors).descriptionTitle}>
                ستاسو خوراکونه
              </Text>
              <Text
                style={{ fontSize: mvs(16), color: colors.text, marginTop: 5 }}>
                ستاسو تر کورونو پوری په ډیره چټکی سره
              </Text>
            </Animated.View>

            {/* descriptionI */}
            <Animated.View
              entering={FadeInLeft.duration(500).springify()}
              className="flex-0">
              <Image
                style={styles(colors).descriptionImage}
                source={require('../assets/images/waiter.png')}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 50,
              backgroundColor: colors.backgroundColor,
              rowGap: mvs(10),
            }}>
            {Object.entries(groupedItems).map(([key, items]) => {
              let dish = items[0];
              return (
                // selectedItemContainer
                <Animated.View
                  entering={FadeInDown.duration(500).springify()}
                  key={key}
                  className="flex-row items-center shadow-lg "
                  style={{
                    borderRadius: 20,
                    borderWidth: 0.5,
                    borderColor: colors.borderColor,
                    backgroundColor: colors.mainBackground,
                    paddingHorizontal: ms(15),
                    paddingVertical: 10,
                    shadowColor: colors.shadowColor,
                    marginHorizontal: paddings,
                  }}>
                  {/* itemDescripton */}
                  <View className="flex-row items-center gap-x-2.5 flex-1">
                    <TouchableOpacity
                      className="rounded-full items-center justify-center shadow-lg"
                      style={styles(colors).minusIcon}
                      onPress={() =>
                        dispatch(removeFromCart({ id: dish._id }))
                      }>
                      <Icon.Minus
                        strokeWidth={2}
                        height={ms(18)}
                        width={ms(18)}
                        stroke="white"
                      />
                    </TouchableOpacity>
                    {/* quantity of slectedItems */}

                    <Text style={styles(colors).number}>x {items.length}</Text>

                    {/* selecteditemImage */}
                    <Animated.View
                      entering={FadeInDown.duration(500).springify()}>
                      <Image
                        style={{
                          width: descriptionImage,
                          height: descriptionImage,
                        }}
                        resizeMode="contain"
                        source={{ uri: urlFor(dish.image).url() }}
                      />
                    </Animated.View>

                    {/* selectedItemName */}
                    <Text style={styles(colors).selectedTitle}>
                      {dish.name}
                    </Text>
                  </View>

                  <View style={{ flex: 0 }} className="flex-row gap-x-2.5 ">
                    {/* coinImage */}
                    <View className="flex-row  justify-center items-center ">
                      <Text style={styles(colors).number1} className="pr-0.5 ">
                        {dish.price}
                      </Text>
                      <Animated.View
                        className="justify-center "
                        entering={FlipInEasyY.duration(800)}>
                        <Image
                          style={styles(colors).coinImage}
                          source={require('../assets/images/afghani.png')}
                        />
                      </Animated.View>

                      {/* dishPrice */}
                    </View>

                    {/* minusIcon */}
                  </View>
                </Animated.View>
              );
            })}
          </ScrollView>

          {/* catItems And tota Statstics  */}
          <Animated.View
            entering={FadeInDown.duration(500).springify()}
            className=" shadow-2xl"
            style={{
              paddingHorizontal: paddings,
              paddingVertical: mvs(20),
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderWidth: 0.5,
              borderBottomWidth: 0,
              borderColor: colors.borderColor,
              backgroundColor: colors.mainBackground,
              shadowColor: colors.shadowColor,
              rowGap: gap,
            }}>
            <View className="flex-row justify-between">
              <Text style={styles(colors).descriptionText}>
                د خوراکونو مجموعه
              </Text>
              <View className="flex-row items-center">
                <Text className="pr-0.5" style={styles(colors).number1}>
                  {cartTotal}
                </Text>
                <Animated.View entering={FlipInEasyY.duration(800)}>
                  <Image
                    style={styles(colors).coinImage}
                    source={require('../assets/images/afghani.png')}
                  />
                </Animated.View>
              </View>
            </View>
            <View className="flex-row justify-between">
              <Text style={styles(colors).descriptionText}>د لاری مصرف</Text>
              <View className="flex-row items-center">
                <Text className="pr-0.5" style={styles(colors).number1}>
                  {deliveryFee}
                </Text>
                <Animated.View entering={FlipInEasyY.duration(800)}>
                  <Image
                    style={styles(colors).coinImage}
                    source={require('../assets/images/afghani.png')}
                  />
                </Animated.View>
              </View>
            </View>
            <View className="flex-row justify-between">
              <Text
                style={{
                  fontSize: mvs(18),
                  fontWeight: 'bold',
                  color: colors.titleColor,
                }}>
                مجموعه
              </Text>
              <View className="flex-row items-center">
                <Text className="pr-0.5" style={styles(colors).number1}>
                  {deliveryFee + cartTotal}
                </Text>
                <Animated.View entering={FlipInEasyY.duration(800)}>
                  <Image
                    style={styles(colors).coinImage}
                    source={require('../assets/images/afghani.png')}
                  />
                </Animated.View>
              </View>
            </View>
            <Animated.View entering={FadeInDown.duration(700).springify()}>
              <TouchableOpacity
                className="shadow-lg"
                onPress={() =>
                  navigation.navigate('FormScreen', {
                    groupedItems: Object.values(groupedItems),
                  })
                }
                style={{
                  backgroundColor: colors.bgColor,
                  borderRadius: 20,
                  shadowColor: 'red',
                  paddingHorizontal: s(20),
                  paddingVertical: button,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: mvs(17),
                    fontWeight: 'bold',
                  }}
                  className="text-white font-bold">
                  ارډر کول
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    </BackgroundImage>
  );
}

const styles = (colors) =>
  ScaledSheet.create({
    container: {
      paddingTop: StatusBar.currentHeight + vs(10),

      flex: 1,
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
      height: '80@mvs',
      width: '53@mvs',
      marginLeft: '10@s',
    },
    selectedItemContainer: {},
    number: {
      color: colors.text,
      fontSize: '14@ms',
      fontWeight: 'bold',
    },
    number1: {
      color: colors.titleColor,
      fontSize: '16@ms',
      fontWeight: 'bold',
      paddingLeft: '3@ms',
    },
    coinImage: {
      width: '20@ms',
      height: '20@ms',
    },
    selctedItemImage: {},
    minusIcon: {
      backgroundColor: colors.bgColor,
      width: '26@ms',
      height: '26@ms',
      shadowColor: 'red',
    },
    totals: {},
    button: {},
    selectedTitle: {
      color: colors.titleColor,
      fontSize: '16@ms',
      fontWeight: 'bold',
    },
  });
