import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

import { useNavigation } from '@react-navigation/native';
import { getCategories } from '../api';
import { urlFor } from '../sanity';
import { useTheme } from '../ThemeContext';
import Animated, { FadeInDown } from 'react-native-reanimated';
export default function Categories({ restaurantsList, categories }) {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState(null);
  const { colors, activeTheme } = useTheme();
  const { height, width } = useWindowDimensions();
  let paddingHori;
  if (width > 428) {
    paddingHori = ms(40);
  } else {
    paddingHori = ms(16);
  }
  let itemPaddingHor;
  if (width > 428) {
    itemPaddingHor = s(8);
  } else {
    itemPaddingHor = s(10);
  }

  const cateColors =
    activeTheme == 'light'
      ? ['#fdead6', '#FFEFEF', '#FFFAF0', '#FFFED7']
      : ['#FDCB96', '#FFC8C8', '#FFE8B9', '#FFFED7'];

  const cateShadow = ['#FF9F3A', '#FF7777', '#FBC14D', '#FFF824'];

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        ItemSeparatorComponent={() => <View style={{ width: s(15) }}></View>}
        contentContainerStyle={{
          paddingHorizontal: paddingHori,
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const isActive = item._id === activeCategory;

          const categoryColor = cateColors[index];

          const textColor = isActive ? colors.titleColor : colors.text;
          const boldText = isActive ? 800 : 100;
          return (
            // itemContainer
            <TouchableOpacity
              className=" rounded-full items-center flex-row  "
              style={{
                paddingHorizontal: itemPaddingHor,
                paddingLeft: ms(3),
                paddingVertical: ms(3),
                borderRadius: 100,
                marginTop: vs(15),
                borderWidth: 0.5,
                borderColor: colors.borderColor,
                backgroundColor: colors.mainBackground,
                elevation: 5,
                shadowColor: colors.shadowColor,
                shadowRadius: 20,
                marginBottom: mvs(10),
              }}
              onPress={() => {
                setActiveCategory(item._id);
                navigation.navigate('RestaurantList', {
                  category: item._id,
                  restaurantsList,
                });
              }}>
              {/* image */}
              <Animated.View
                style={{
                  overflow: 'hidden',
                  padding: 5,
                  paddingLeft: 3,
                  width: ms(35),
                  height: ms(35),
                  backgroundColor: categoryColor,
                  borderRadius: 50,
                  marginRight: 8,
                }}
                entering={FadeInDown.duration(1000)}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    marginRight: ms(5),
                  }}
                  resizeMode="contain"
                  source={{ uri: urlFor(item.image).url() }}
                />
              </Animated.View>
              {/* itemText */}
              <Text
                style={{
                  fontSize: mvs(13),
                  color: textColor,
                  fontWeight: boldText,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = (colors, backgroundColor, textColor, boldText, shadow) =>
  ScaledSheet.create({
    itemContainer: {},
    itemText: {},
  });
