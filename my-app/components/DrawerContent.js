import { View, Text, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { useTheme } from '../ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DrawerContent() {
  const { colors } = useTheme();

  const { width, height } = useWindowDimensions();

  let paddingV;
  if (width > 428) {
    paddingV = s(20);
  } else {
    paddingV = s(10);
  }

  const handleClear = () => {
    AsyncStorage.clear();
  };
  return (
    <>
      <View style={{ marginBottom: mvs(50) }}>
        <View
          style={{
            width: '100%',
            height: vs(150),
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
            }}
            source={require('../assets/images/image.png')}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            paddingHorizontal: paddingV,
          }}
          className="items-center  ">
          <View
            className="shadow-md"
            style={{
              width: mvs(100),
              height: mvs(100),
              position: 'absolute',
              borderColor: colors.borderColor,
              borderRadius: 100,
              top: mvs(-50),
              padding: 5,
              borderWidth: 1,
              backgroundColor: colors.mainBackground,
              shadowColor: colors.shadowColor,
            }}>
            <Image
              className="w-full h-full "
              style={{}}
              source={require('../assets/images/chef2.png')}
              resizeMode="contain"
            />
          </View>
          <Text
            className="text-center font-bold"
            style={{
              fontSize: mvs(18),
              marginTop: mvs(60),
              color: colors.titleColor,
            }}>
            افغان ریستورانت
          </Text>
          <Text
            className="text-center"
            style={{
              fontSize: mvs(14),
              color: colors.text,
              marginTop: mvs(5),
            }}>
            افغان ریستورانت تاسو ته د خوراک په څانګه کی خدمات وړاندی کوی
          </Text>
        </View>

        <TouchableOpacity onPress={handleClear}>
          <Text>clear</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
