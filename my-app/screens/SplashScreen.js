import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import { StatusBar } from 'expo-status-bar';

const SplashScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home'); // Navigate to the Home screen after 4 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigation]);

  return (
    <>
      <StatusBar style="light" />
      <View
        style={{
          backgroundColor: colors.bgColor,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Image
            style={{ width: 150, height: 120, resizeMode: 'contain' }}
            source={require('../assets/images/logo.png')}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
            افغان ریستورانت
          </Text>
        </View>
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
