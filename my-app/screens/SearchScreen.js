import {
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import SearchBox from '../components/SearchBox';
import * as Icon from 'react-native-feather';
import RestuarantCard from '../components/RestaurantCard';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import BottomSheet from '../components/BottomSheet';
import BackgroundImage from '../components/BackgroundImage';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

const { height } = Dimensions.get('window');
export default function SearchScreen({ route }) {
  const { matchedRestaurants, restaurants, firstMatchedIndex } = route.params;
  const navigation = useNavigation();
  const { colors, activeTheme } = useTheme();
  const statusBarStyle = activeTheme === 'light' ? 'dark' : 'light';
  const { width, height } = useWindowDimensions();

  let paddings;
  if (width > 428) {
    paddings = ms(48);
  } else {
    paddings = ms(16);
  }

  let paddingB;

  if (width > 428) {
    paddingB = 0.4;
  } else {
    paddingB = 0.22;
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
          <View className="w-full  justify-end items-end">
            <Animated.View entering={FadeInLeft.duration(500).springify()}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className=" items-center justify-center rounded-full shadow-lg "
                style={{
                  backgroundColor: colors.bgColor,
                  width: mvs(40),
                  height: mvs(40),
                  marginRight: s(16),
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
              marginVertical: vs(20),
              paddingHorizontal: paddings,
            }}
            className="  flex-row justify-between items-center   ">
            {/* Description */}
            <Animated.View
              entering={FadeInRight.duration(500).springify()}
              className="flex-1">
              <Text style={styles(colors).descriptionTitle}>
                خوند تری واخلی
              </Text>
              <Text style={styles(colors).descriptionText}>
                مختلف خواړه د خوندورو خوندونو
              </Text>
            </Animated.View>

            {/* Image */}
            <Animated.View
              entering={FadeInLeft.duration(500).springify()}
              className="flex-0">
              <Image
                style={styles(colors).descriptionImage}
                source={require('../assets/images/search.png')}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          <View>
            <SearchBox restaurants={restaurants} />
          </View>
          {matchedRestaurants.length > 0 && (
            <View
              style={{ paddingBottom: paddingB * height }}
              className=" flex-1 items-center justify-center">
              <RestuarantCard
                restaurants={restaurants}
                item={matchedRestaurants[0]}
                index={firstMatchedIndex}
              />
            </View>
          )}
          <BottomSheet restaurants={restaurants} />
        </View>
      </View>
    </BackgroundImage>
  );
}

const styles = (colors) =>
  StyleSheet.create({
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
      height: vs(50),
      width: vs(90),
      marginLeft: 10,
    },
  });
