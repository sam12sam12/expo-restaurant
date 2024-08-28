import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';

const BackgroundImage = ({ children, height, blur, margin, right, left }) => {
  const { colors } = useTheme();
  const [activeTheme, setActiveTheme] = useState(null);

  // Load the active theme from AsyncStorage on component mount
  useEffect(() => {
    async function loadStoredTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        setActiveTheme(storedTheme);
      } catch (error) {
        console.error('Error loading theme from storage:', error);
      }
    }

    loadStoredTheme();
  }, []);

  // Re-render when the active theme changes
  useEffect(() => {
    // Update the active theme state
    async function updateTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        setActiveTheme(storedTheme);
      } catch (error) {
        console.error('Error loading theme from storage:', error);
      }
    }

    updateTheme();
  }, [children]); // Re-render when the children prop changes

  const heights = height ? height : '100%';
  const blurs = blur ? blur : 25;
  const margins = margin ? margin : 0;
  const rights = right ? right : 0;
  const lefts = left ? left : 0;

  return activeTheme === 'blur' ? (
    <ImageBackground
      blurRadius={blurs}
      style={{
        flex: 1,

        width: '100%',
        height: heights,
        marginTop: margins,
        borderTopRightRadius: rights,
        borderTopLeftRadius: lefts,
        overflow: 'visible',
      }}
      resizeMode="cover"
      source={require('../assets/images/wallpap.png')}>
      {children}
    </ImageBackground>
  ) : (
    [children]
  ); // If the active theme is not 'blur', don't render the ImageBackground
};

export default BackgroundImage;
