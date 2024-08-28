import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../sanity';
import { useTheme } from '../ThemeContext';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

export default function RestuarantCard({ item, restaurants, index }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  let cardWidth;

  if (height <= 650) {
    cardWidth = wp(50);
  } else if (height > 650 && height <= 720) {
    cardWidth = wp(60);
  } else if (width > 428) {
    cardWidth = wp(29);
  }

  let topTitle;
  if (width > 428) {
    topTitle = vs(14);
  } else {
    topTitle = vs(18);
  }

  let descrip;
  if (width > 428) {
    descrip = vs(10);
  } else {
    descrip = vs(16);
  }

  let imageTop;
  if (width > 428) {
    imageTop = hp(10);
  } else {
    imageTop = hp(18);
  }

  let absolutePostion;
  if (width > 428) {
    absolutePostion = hp(-10 / 2);
  } else {
    absolutePostion = hp(-18 / 2);
  }

  let absoluteMargin;
  if (width > 428) {
    absoluteMargin = hp(10 / 2 + 1.5);
  } else if (height <= 720) {
    absoluteMargin = hp(18 / 2 + 1);
  }

  let cardTopMargin;
  if (width > 428) {
    cardTopMargin = hp(10 / 2 + 2);
  } else if (height <= 720) {
    cardTopMargin = hp(18 / 2) + vs(15);
  }

  let cardBottomMargin;
  if (width > 428) {
    cardBottomMargin = hp(3.3);
  } else if (height <= 720) {
    cardBottomMargin = vs(20);
  }

  let cardPadding;
  if (width > 428) {
    cardPadding = wp(2.5);
  } else if (height <= 720) {
    cardPadding = hp(2.5);
  }
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('Restuarant', {
          restaurant: { ...item },
          restaurants,
          initialIndex: index, // Pass the initial index here
        })
      }>
      <View
        style={{
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          backgroundColor: colors.mainBackground,
          borderWidth: 0.5,
          borderColor: colors.borderColor,
          width: cardWidth,
          marginTop: cardTopMargin,
          marginBottom: cardBottomMargin,
          elevation: 5,
          shadowColor: colors.shadowColor,
        }}>
        {/* image */}
        <View
          style={{
            position: 'absolute',
            top: absolutePostion,
          }}
          className="w-full  items-center justify-center">
          <View
            style={{
              shadowColor: colors.shadowColor,
            }}
            className=" rounded-full ">
            <Animated.View entering={FadeInDown.duration(600)}>
              <Image
                style={{
                  height: imageTop,
                  width: imageTop,
                  transform: [{ rotate: '0deg' }],
                }}
                resizeMode="contain"
                source={{ uri: urlFor(item.image).url() }}
              />
            </Animated.View>
          </View>
        </View>

        {/* Description */}

        <View
          style={{
            marginTop: absoluteMargin,
            paddingHorizontal: cardPadding,
            paddingBottom: cardPadding,
          }}>
          <Text
            style={{
              fontSize: topTitle,
              fontWeight: 'bold',
              color: colors.titleColor,
              marginBottom: mvs(5),
            }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: descrip, color: colors.text }}>
            {item.description}
          </Text>
          <Text style={{ fontSize: descrip, color: colors.text }}>
            د مختلفو خوندونو سره
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
