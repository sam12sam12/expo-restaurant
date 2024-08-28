import { View, Text } from 'react-native';
import React from 'react';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

export default function Phone({ backgroundColor }) {
  return (
    <View
      style={{
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'lightgray',
        width: ms(80),
        height: ms(140),
        borderRadius: 20,
        backgroundColor: backgroundColor,
      }}
      className="w-full h-full"></View>
  );
}
