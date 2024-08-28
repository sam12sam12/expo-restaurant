import { View, Text, useWindowDimensions } from 'react-native';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

import { useTheme } from '../ThemeContext';
import Animated, { FadeInRight } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default function RestaurantDescription() {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();

  let title;

  if (width > 428) {
    title = mvs(20);
  } else {
    title = mvs(24);
  }

  let description;

  if (width > 428) {
    description = mvs(16);
  } else {
    description = mvs(18);
  }

  let margint;

  if (width > 428) {
    margint = vs(25);
  } else {
    margint = vs(33);
  }
  return (
    <>
      {/* Description Container */}
      <Animated.View
        entering={FadeInRight.duration(600)}
        className=" flex-row justify-between items-center"
        style={{
          paddingHorizontal: s(16),
          marginTop: margint,
          overflow: 'hidden',
        }}>
        {/* Description */}
        <View className="flex-1">
          <Text
            style={{
              color: colors.titleColor,
              fontSize: title,
              fontWeight: 'bold',
            }}>
            افغان ریستورانت ته ښه راغلاست!
          </Text>
          {/* descriptionText */}
          <View className="mt-1">
            <Text
              style={{
                color: colors.text,
                fontSize: description, //18px
              }}>
              خپل د خوښی خواړه مو انتخاب کړی
            </Text>
          </View>
        </View>
        {/* Image */}
      </Animated.View>
    </>
  );
}
