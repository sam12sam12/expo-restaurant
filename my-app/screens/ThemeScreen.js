import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Phone from '../components/Phone';
import BackgroundImage from '../components/BackgroundImage';
import * as Icon from 'react-native-feather';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

export default function ThemeScreen() {
  const { colors, changeTheme, activeTheme } = useTheme();
  const navigation = useNavigation();

  const handleThemeChange = (theme) => {
    changeTheme(theme);
  };

  const { width, height } = useWindowDimensions();

  let iconSize;

  if (width > 428) {
    iconSize = mvs(29);
  } else {
    iconSize = mvs(35);
  }

  const renderRadio = (theme) => {
    return (
      <TouchableOpacity
        style={{
          width: 10,
          height: 10,
          borderRadius: 50,
          padding: 7,
          borderWidth: 2,
          borderColor: activeTheme === theme ? colors.bgColor : colors.text,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => handleThemeChange(theme)}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 50,
            backgroundColor:
              activeTheme === theme ? colors.bgColor : colors.text,
          }}></View>
      </TouchableOpacity>
    );
  };

  return (
    <BackgroundImage>
      <View
        className="flex-1 justify-center border"
        style={{
          backgroundColor: colors.screenBackground,
          paddingTop: StatusBar.currentHeight + vs(20),
        }}>
        <View
          style={{
            paddingHorizontal: s(16),
          }}
          className="flex-row justify-between items-center ">
          {/* JustifyIcon */}
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{
              backgroundColor: colors.mainBackground,
              borderRadius: 10,
              shadowColor: colors.shadowColor,
              padding: mvs(5),
            }}
            className=" shadow-md  ">
            <Icon.BarChart2
              style={{
                transform: [{ rotate: '270deg' }],
              }}
              height={iconSize}
              width={iconSize}
              strokeWidth={1.5}
              stroke={colors.titleColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className=" items-center justify-center rounded-full shadow ">
            <Icon.ArrowLeft
              width={mvs(24)}
              height={mvs(24)}
              strokeWidth={3}
              stroke={colors.text}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingHorizontal: width >= 428 ? s(48) : s(16),
            marginTop: vs(160),
          }}
          className="flex-1   flex-row justify-between">
          <TouchableOpacity
            onPress={() => handleThemeChange('light')}
            className="items-center gap-y-2.5">
            <Phone backgroundColor={'white'} />
            <TouchableOpacity
              style={{
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {renderRadio('light')}
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleThemeChange('blur')}
            className="items-center gap-y-2.5">
            <Phone backgroundColor={'coral'} />

            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              {renderRadio('blur')}
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleThemeChange('dark')}
            className="items-center gap-y-2.5">
            <Phone backgroundColor={'black'} />

            <TouchableOpacity
              style={{
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {renderRadio('dark')}
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundImage>
  );
}
