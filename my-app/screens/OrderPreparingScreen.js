import { StyleSheet, Image, ImageBackground, View } from 'react-native';

import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../components/BackgroundImage';
import { useTheme } from '../ThemeContext';

export default function OrderPreparingScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('Delivery');
  //   }, 3000);
  // }, []);
  return (
    <View style={{ flex: 1, backgroundColor: colors.screenBackground }}>
      <BackgroundImage>
        {/* <Image
          source={require('../assets/images/delivery.gif')}
          className="h-80 w-80"
        /> */}
      </BackgroundImage>
    </View>
  );
}
