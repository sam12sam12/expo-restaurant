import { View, Text, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import TopElements from './TopElements';
import RestaurantDescription from './RestaurantDescription';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

export default function Header({ restaurants }) {
  return (
    <View style={[styles.container, { zIndex: 0 }]}>
      {/* navigation Items */}
      <TopElements />

      {/* MainDescription */}
      <RestaurantDescription />

      {/* SearcBar */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + vs(20),
  },
});
