import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setItem, getItem } from './utils/AsyncStorageMethods';

const themeConfig = {
  light: {
    titleColor: '#000',
    text: '#7a7d85',
    bgColor: '#F55A51',
    borderColor: 'rgba(0,0,0,0.05)',
    searchBackground: '#fff',
    mainBackground: '#fff',
    screenBackground: '#fff',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadow: 'black',
    smallSlide: 'rgba(0,0,0,0.2)',
    caSeaBg: '#fff',
  },
  blur: {
    titleColor: '#000',
    text: 'rgba(0,0,0,0.6)',
    bgColor: '#F55A51',
    borderColor: 'rgba(255,255,255,0.3)',
    searchBackground: 'rgba(255,255,255,0.25)',
    mainBackground: 'rgba(255,255,255,0.25)',
    screenBackground: 'rgba(255,255,255,0.4)',
    shadowColor: 'transparent',
    sheetBackground: 'rgba(255,255,255,0.4)',
    smallSlide: 'rgba(255,255,255,0.3)',
  },
  dark: {
    titleColor: '#fff',
    text: 'rgba(255,255,255,0.8)',
    bgColor: '#F55A51',
    borderColor: 'rgba(255,255,255,0.1)',
    searchBackground: '#1c1d1f',
    mainBackground: '#1c1d1f',
    screenBackground: '#0e0e0f',
    shadowColor: 'black',
    shadow: 'gray',
    smallSlide: 'rgba(255,255,255,0.2)',
    caSeaBg: '#0e0e0f',
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState('light');
  const [colors, setColors] = useState(themeConfig.light);

  useEffect(() => {
    async function loadStoredTheme() {
      try {
        const storedTheme = await getItem('theme');
        if (storedTheme && themeConfig[storedTheme]) {
          setActiveTheme(storedTheme);
          setColors(themeConfig[storedTheme]);
        }
      } catch (error) {
        console.error('Error loading theme from storage:', error);
      }
    }

    loadStoredTheme();
  }, []);

  const changeTheme = async (themeName) => {
    if (themeConfig[themeName]) {
      setActiveTheme(themeName);
      setColors(themeConfig[themeName]);
      setItem('theme', themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ colors, activeTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
