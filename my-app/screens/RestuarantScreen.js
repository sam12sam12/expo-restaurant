import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  StatusBar,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from 'react-native-reanimated';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import DishRow from '../components/DishRow';
import CartIcon from '../components/CartIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../slices/restaurantSlice';
import { urlFor } from '../sanity';
import { useTheme } from '../ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundImage from '../components/BackgroundImage';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

export default function RestaurantScreen() {
  const { colors, activeTheme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurants, initialIndex } = route.params; // Access the restaurant data array and initial index
  const dispatch = useDispatch();

  const [currentRestaurantIndex, setCurrentRestaurantIndex] =
    useState(initialIndex);

  useEffect(() => {
    const currentRestaurant = restaurants[currentRestaurantIndex];
    dispatch(setRestaurant({ ...currentRestaurant }));
  }, [currentRestaurantIndex, dispatch, restaurants]);

  const goToNextRestaurant = () => {
    if (currentRestaurantIndex < restaurants.length - 1) {
      setCurrentRestaurantIndex((prevIndex) => prevIndex + 1);
    }
  };

  const goToPreviousRestaurant = () => {
    if (currentRestaurantIndex > 0) {
      setCurrentRestaurantIndex((prevIndex) => prevIndex - 1);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Detect swipe left or right
      if (gestureState.dx > 50) {
        debounce(goToNextRestaurant);
      } else if (gestureState.dx < -50) {
        debounce(goToPreviousRestaurant);
      }
    },
    onPanResponderRelease: () => {},
  });

  const debounce = (func, delay = 50) => {
    clearTimeout(debounce.timer);
    debounce.timer = setTimeout(() => {
      func();
    }, delay);
  };
  const { width, height } = useWindowDimensions();

  let topImage;
  if (width > 428) {
    topImage = vs(200);
  } else {
    topImage = vs(240);
  }

  let smallSlideRes;
  if (width > 428) {
    smallSlideRes = mvs(80);
  } else {
    smallSlideRes = mvs(60);
  }

  let paddings;
  if (width > 428) {
    paddings = ms(48);
  } else {
    paddings = ms(16);
  }

  return (
    <View className="flex-1">
      <ExpoStatusBar style="light" />
      {/* backgroundImageContainer */}
      <View className="flex-1">
        <View className="absolute top-0 left-0   ">
          <Image
            style={{
              width: wp(100),
              height: vs(240),
              resizeMode: 'cover',
            }}
            source={require('../assets/images/image.png')}
          />

          {/* overlay fo(r backgroundImage */}
          <LinearGradient
            className=" absolute top-0   w-full h-full"
            locations={[0, 0.5, 1]}
            colors={[
              'rgba(000, 000, 000, 0.50)',
              'rgba(000, 000, 000, 0.40)',
              'rgba(000, 000, 000, 0.30)',
            ]}></LinearGradient>

          {/* backButton */}

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className=" z-50 rounded-full shadow justify-center items-center"
            style={{
              backgroundColor: colors.bgColor,
              position: 'absolute',
              top: StatusBar.currentHeight + vs(10),
              width: mvs(40),
              height: mvs(40),
              right: s(16),
              shadowColor: 'red',
            }}>
            <Icon.ArrowLeft
              width={mvs(24)}
              height={mvs(24)}
              strokeWidth={3}
              stroke={'white'}
            />
          </TouchableOpacity>
        </View>
        {/* mainContent */}

        <View
          style={{
            marginTop: vs(190),
          }}>
          <View
            style={{
              borderTopRightRadius: vs(20),
              borderTopLeftRadius: vs(20),
              flex: 1,
              marginTop: -40,
              backgroundColor: colors.screenBackground,
              paddingBottom: 70,
              // zIndex: 100,
            }}>
            <View
              className=" flex-row items-center justify-between w-full "
              style={{
                position: 'absolute',
                top: mvs(-125 / 2),
              }}
              {...panResponder.panHandlers}>
              {/* previousRestaurant */}
              {restaurants[currentRestaurantIndex - 1] ? (
                <Animated.View
                  style={{ paddingLeft: paddings }}
                  entering={FadeInRight.duration(500)}>
                  <TouchableOpacity
                    style={{
                      width: smallSlideRes,
                      height: smallSlideRes,
                      borderRadius: 100,
                    }}
                    onPress={goToPreviousRestaurant}>
                    {/* previousRestaurantImage */}
                    <Image
                      style={styles(colors).smallRestaurantImage}
                      source={{
                        uri: urlFor(
                          restaurants[currentRestaurantIndex - 1].image
                        ).url(),
                      }}
                    />
                  </TouchableOpacity>
                </Animated.View>
              ) : (
                <View
                  style={{
                    width: smallSlideRes,
                    height: smallSlideRes,
                  }}></View>
              )}

              {/* currentRestaurant */}
              {restaurants[currentRestaurantIndex].image && (
                <Animated.View>
                  <Image
                    style={{
                      width: mvs(125),
                      height: mvs(125),
                      resizeMode: 'contain',
                    }}
                    source={{
                      uri: urlFor(
                        restaurants[currentRestaurantIndex].image
                      ).url(),
                    }}
                  />
                </Animated.View>
              )}
              {/* nextRestaurant */}
              {restaurants[currentRestaurantIndex + 1] ? (
                <Animated.View
                  style={{ paddingRight: paddings }}
                  entering={FadeInLeft.duration(500)}>
                  <TouchableOpacity
                    style={{
                      width: smallSlideRes,
                      height: smallSlideRes,
                      borderRadius: 100,
                    }}
                    onPress={goToNextRestaurant}>
                    {/* nextRestaurntImage */}
                    <Image
                      style={styles(colors).smallRestaurantImage}
                      source={{
                        uri: urlFor(
                          restaurants[currentRestaurantIndex + 1].image
                        ).url(),
                      }}
                    />
                  </TouchableOpacity>
                </Animated.View>
              ) : (
                <View
                  style={{
                    width: smallSlideRes,
                    height: smallSlideRes,
                  }}></View>
              )}
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.screenBackground,
            flex: 1,
          }}>
          {/* topSlider */}

          {/* mainBackgroundImage */}
          {/* DishRowsContainer */}
          <View style={styles(colors).disRowsContainer}>
            {/* description */}
            <Animated.View
              entering={FadeInRight.duration(500).springify()}
              style={{
                paddingHorizontal: paddings,
                marginBottom: vs(15),
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
              }}>
              <Text
                style={{
                  fontSize: mvs(24),
                  fontWeight: 'bold',
                  color: colors.titleColor,
                }}>
                {restaurants[currentRestaurantIndex].name}
              </Text>
              <Text style={{ fontSize: mvs(16), color: colors.text }}>
                {restaurants[currentRestaurantIndex].description}
              </Text>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(200).springify()}
              style={{
                flex: 1,
              }}>
              <FlatList
                data={restaurants[currentRestaurantIndex].dishes}
                renderItem={({ item }) => <DishRow item={{ ...item }} />}
                contentContainerStyle={{
                  paddingHorizontal: paddings,
                  paddingTop: vs(10),
                  paddingBottom: vs(75),
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </Animated.View>
          </View>
        </View>
      </View>
      <CartIcon />
    </View>
  );
}

const styles = (colors) =>
  ScaledSheet.create({
    topImage: {},
    backButton: {},
    mainContent: {},

    smallSlidRestaurant: {
      // padding: '5@s',
    },
    smallRestaurantImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },

    currentRestaurantImage: {},
    disRowsContainer: {
      flex: 1,
    },
    descriptionTitle: {
      color: colors.titleColor,
      fontSize: 20,
      fontWeight: 'bold',
    },
    descriptionText: {
      color: colors.text,
      fontSize: 14,
    },
  });
