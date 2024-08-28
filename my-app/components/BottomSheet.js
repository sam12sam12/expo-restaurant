import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import * as Icon from 'react-native-feather';
import { useTheme } from '../ThemeContext';
import { useSearchHistory } from '../searchHistoryContext';
import SearchHistory from './SearchHistory';
import { BlurView } from 'expo-blur';
import BackgroundImage from './BackgroundImage';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

export default function BottomSheet({ restaurants }) {
  const { colors } = useTheme();
  const { clearHistory } = useSearchHistory();
  const [isExpanded, setIsExpanded] = useState(false);

  const { width, height } = useWindowDimensions();

  let sheetH;
  if (width > 428) {
    sheetH = 0.4;
  } else {
    sheetH = 0.22;
  }

  let paddings;
  if (width > 428) {
    paddings = s(48);
  } else {
    paddings = s(32);
  }

  // Define shared value for sheet height
  const sheetHeight = useSharedValue(sheetH * height);

  // Animated style for bottom sheet
  const sheetStyle = useAnimatedStyle(() => {
    return {
      height: sheetHeight.value,
      borderColor: colors.borderColor,
      borderWidth: 1,
      borderBottomWidth: 0,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      width: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      backgroundColor: colors.screenBackground,
      shadowColor: colors.shadowColor,
    };
  });

  const handleToggle = () => {
    setIsExpanded((prev) => !prev); // Toggle the state of isExpanded

    // Animate sheet height based on isExpanded state
    if (!isExpanded) {
      sheetHeight.value = withSpring(0.6 * height);
    } else {
      sheetHeight.value = withSpring(sheetH * height);
    }
  };

  return (
    <Animated.View className="shadow-xl" style={sheetStyle}>
      <BackgroundImage blur={40}>
        <View
          style={{
            backgroundColor: colors.sheetBackground,
            flex: 1,
            paddingBottom: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: vs(15),
              paddingHorizontal: paddings,
            }}>
            <TouchableOpacity onPress={handleToggle}>
              {isExpanded ? (
                <Icon.ChevronDown size={mvs(24)} stroke={colors.text} />
              ) : (
                <Icon.ChevronUp size={mvs(24)} stroke={colors.text} />
              )}
            </TouchableOpacity>
            <Text
              style={{
                color: colors.titleColor,
                fontSize: mvs(20),
                fontWeight: 'bold',
              }}>
              مخکني
            </Text>
            <TouchableOpacity onPress={clearHistory}>
              <Icon.Trash size={mvs(24)} stroke={colors.bgColor} />
            </TouchableOpacity>
          </View>
          <View>
            <SearchHistory restaurants={restaurants} />
          </View>
        </View>
      </BackgroundImage>
    </Animated.View>
  );
}
